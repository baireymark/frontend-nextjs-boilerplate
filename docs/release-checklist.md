# Release checklist

Before promoting a build to production:

1. CI is green on `main`: lint, types, unit, E2E, accessibility, Lighthouse, and Storybook.
2. The staging or preview deployment was checked on the main user journeys.
3. New environment variables are set in every environment and listed in `.env.example`.
4. `CHANGELOG.md` has an entry for the release, and the version follows Semantic Versioning.
5. Database or API changes are backward compatible with the previous release, so a rollback is safe.
6. The rollback path is known: redeploy the previous build or image tag.
7. After release, check the logs and error monitoring for new errors, and confirm `/api/health` responds.
