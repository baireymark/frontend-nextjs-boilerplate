# Adding a feature

This walkthrough adds a feature called `invoices`. Copy the pattern from `features/contact` (Server Action) or `features/status` (client data fetching).

1. Create the folder `features/invoices/` with these files as needed:
   - `schema.ts` for Zod schemas and the types inferred from them. Client components must not import a file that uses classic `zod`; use `zod/mini` for schemas that run in the browser (see `shared/api/schemas.ts`)
   - `actions.ts` for Server Actions, starting with `'use server'`
   - `api.ts` for TanStack Query hooks and query keys
   - `store.ts` for a Zustand store, only if several components share UI state
   - `components/` for the feature's components
2. Export the public pieces from `features/invoices/index.ts`. Everything else stays private to the feature.
3. Add a route in `app/`, for example `app/(app)/invoices/page.tsx`, that imports from `@/features/invoices`.
4. Write tests next to the code: schema and action tests first, then component tests. Mock network calls with MSW (`server.use(...)`) rather than mocking `fetch`.
5. Add an E2E test in `tests/e2e/` for the main user journey, and call `checkA11y()` on each new page.
6. If you added environment variables, add them to `config/env.ts` and `.env.example`.
7. Run `npm run lint && npm run typecheck && npm test` before pushing.

If two features need the same code, move it to `shared/` instead of importing one feature from another.
