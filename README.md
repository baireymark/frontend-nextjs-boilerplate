# Next.js Boilerplate

A production-ready starter for Next.js apps. It ships with strict TypeScript, Tailwind CSS, unit, component, end-to-end, and accessibility tests, a nonce-based Content Security Policy, and a CI pipeline that blocks merges when a check fails.

## Requirements

- Node.js 24 (see `.nvmrc`; run `nvm use`)
- npm 11 or newer. npm 10 cannot resolve this dependency tree, and `.npmrc` sets `engine-strict` so it fails with a clear message.

## Getting started

```bash
nvm use
cp .env.example .env.local   # fill in the values
npm install
npm run dev                  # http://localhost:3000
```

Confirm the setup:

```bash
npm test
npm run lint
npm run typecheck
```

## Scripts

| Script                    | What it does                                                               |
| ------------------------- | -------------------------------------------------------------------------- |
| `npm run dev`             | Start the dev server                                                       |
| `npm run build`           | Production build                                                           |
| `npm start`               | Serve the production build                                                 |
| `npm test`                | Unit and component tests (Vitest)                                          |
| `npm run test:watch`      | Tests in watch mode                                                        |
| `npm run test:coverage`   | Tests with a coverage report in `coverage/`                                |
| `npm run test:e2e`        | End-to-end and accessibility tests (Playwright); builds and starts the app |
| `npm run lint`            | ESLint, including module-boundary rules; fails on any warning              |
| `npm run format`          | Format every file with Prettier                                            |
| `npm run typecheck`       | Generate route types, then run the TypeScript compiler                     |
| `npm run storybook`       | Component workshop at http://localhost:6006                                |
| `npm run build-storybook` | Static Storybook build                                                     |
| `npm run lhci`            | Lighthouse CI against a production build (run `npm run build` first)       |

Before the first E2E run, install the browsers once with `npx playwright install`.

## Project structure

```text
app/                 routes, layouts, loading and error files (App Router)
  (marketing)/       public pages
  (app)/             signed-in pages
  api/               route handlers
features/            one folder per feature, exported through its index.ts
shared/
  ui/                design-system components
  lib/               pure helpers
  api/               fetch client and shared response schemas
config/              environment validation
proxy.ts             per-request CSP nonce (Next.js 16 replaced middleware.ts with proxy.ts)
tests/
  e2e/               Playwright specs
  fixtures/          MSW handlers shared by tests
docs/                architecture, how-tos, and decision records
```

Imports flow one way: `app` → `features` → `shared`. ESLint enforces this. Read [docs/architecture.md](docs/architecture.md) for details.

```mermaid
flowchart TD
  app["app/<br/>routes, layouts, route handlers"]
  subgraph features["features/ (imported only through index.ts)"]
    contactIdx["contact/index.ts"]
    statusIdx["status/index.ts"]
  end
  shared["shared/<br/>ui, lib, api"]
  config["config/env.ts"]

  app -->|"@/features/contact"| contactIdx
  app -->|"@/features/status"| statusIdx
  app -->|"@/shared/*"| shared
  app -->|publicEnv| config
  features -->|"@/shared/*"| shared
  features -->|parseServerEnv| config
  features -.->|"✕ lint error"| app
  shared -.->|"✕ lint error"| features

  linkStyle 6,7 stroke:#d1242f
```

The red arrows fail `npm run lint`, and so does any import that reaches past a feature's `index.ts`, such as `@/features/contact/components/contact-form`.

## How it works

### Page requests and the CSP nonce

```mermaid
sequenceDiagram
  participant B as Browser
  participant P as proxy.ts
  participant L as app/layout.tsx
  B->>P: GET /dashboard
  Note over P: nonce = base64(randomUUID())<br/>CSP script-src 'nonce-…' 'strict-dynamic'
  P->>L: request + x-nonce header
  Note over L: await connection() → render per request<br/>Next.js adds the nonce to its scripts
  L-->>B: HTML + CSP header with the same nonce<br/>+ HSTS, nosniff, X-Frame-Options from next.config.ts
  Note over B: runs only scripts that carry this nonce
```

Every request gets a new nonce, so no page is prerendered ([ADR 0002](docs/adr/0002-nonce-csp.md)). API routes, static assets, and link prefetches skip the proxy.

### Reads and writes

```mermaid
flowchart LR
  subgraph browser["Browser"]
    form["ContactForm<br/>useActionState"]
    card["StatusCard<br/>Zustand: autoRefresh"]
    query["useHealth<br/>TanStack Query + fetchJson"]
  end
  subgraph server["Server"]
    action["submitContact()<br/>Server Action"]
    health["GET /api/health"]
  end
  webhook["Webhook<br/>CONTACT_WEBHOOK_URL"]

  form -->|submit| action
  action -->|fieldErrors or success| form
  action -->|"POST JSON, if set"| webhook
  card -->|every 30 s if on| query
  query -->|GET| health
  health -->|JSON| query

  classDef zod stroke:#2f6feb,stroke-width:2px
  class action,query zod
```

The two blue-outlined nodes validate with Zod: the Server Action checks form input on the server, and `fetchJson` checks every API response before a component sees it.

### From commit to production

```mermaid
flowchart LR
  subgraph local["Local git hooks"]
    pre["pre-commit<br/>eslint · prettier · tsc"]
    msg["commit-msg<br/>commitlint"]
  end
  subgraph ci["CI: 5 jobs in parallel"]
    direction TB
    quality["quality<br/>lint · format · types · audit"]
    unit["unit<br/>Vitest + coverage"]
    e2e["e2e<br/>Playwright × 3 browsers + axe"]
    lighthouse["lighthouse<br/>LCP 2.5 s · CLS 0.1 · TBT 200 ms"]
    storybook["storybook<br/>static build"]
  end
  merge{"all pass?<br/>merge to main"}
  managed["Managed platform<br/>npm run build"]
  docker["Docker<br/>deps → build → runner"]
  start["Server start<br/>instrumentation.ts validates env,<br/>exits 1 if invalid"]

  pre --> msg
  msg -->|push| ci
  ci --> merge
  merge --> managed
  merge --> docker
  managed --> start
  docker --> start
```

CI blocks a merge only after these five jobs are marked as required checks in the repository's branch protection settings.

## Environment variables

Every variable is listed in `.env.example` and validated at startup by `config/env.ts`. The server exits with a clear message if a value is missing or malformed. Only variables prefixed `NEXT_PUBLIC_` reach the browser.

## Deployment

The app runs on any Node.js host or managed Next.js platform.

- **Managed platform:** connect the repository. The platform runs `npm run build` and serves preview deployments for each pull request.
- **Docker:** `docker build -t app .` then `docker run -p 3000:3000 --env-file .env.production app`. The image uses Next.js standalone output and runs as a non-root user with a health check on `/api/health`.

See [docs/release-checklist.md](docs/release-checklist.md) before releasing.

## Documentation

- [Architecture](docs/architecture.md)
- [Adding a feature](docs/adding-a-feature.md)
- [Release checklist](docs/release-checklist.md)
- [Decision records](docs/adr/)
- [Contributing](CONTRIBUTING.md)
