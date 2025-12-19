---
paths: capture-client-site/{tests,playwright.config.ts,package.json,tsconfig.json}
---

# Testing & validation

## Fast checks
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Playwright
- Start the dev server first: `npm run dev` (Playwright assumes `http://localhost:3000` is already running).
- Run a targeted test: `npx playwright test tests/critical-pages-validation.spec.ts`
