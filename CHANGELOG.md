# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Next.js 16 App Router starter with strict TypeScript and Tailwind CSS 4 design tokens.
- Example features: a contact form using a Server Action with Zod validation, and a dashboard status card using TanStack Query and Zustand.
- Nonce-based Content Security Policy in `proxy.ts` and static security headers in `next.config.ts`.
- Startup validation of environment variables that stops the server on invalid values.
- Vitest, Testing Library, and MSW for unit and component tests; Playwright with axe for E2E and accessibility tests.
- ESLint module-boundary rules, Prettier, Husky, lint-staged, and commitlint.
- Storybook with the accessibility add-on.
- GitHub Actions CI, Lighthouse CI budgets, Renovate, and a Dockerfile for self-hosting.
- App icon, so browsers no longer request a missing `/favicon.ico`.

### Changed

- The Lighthouse JavaScript budget is 190 KB instead of 170 KB, to fit browser-side response validation with `zod/mini`.

### Fixed

- Classic Zod no longer ships to the browser. It added about 90 KB of JavaScript and triggered a CSP `eval` violation. Browser-side schemas now use `zod/mini`.
- The E2E CSP check now also catches violations that page code handles without logging an error.
