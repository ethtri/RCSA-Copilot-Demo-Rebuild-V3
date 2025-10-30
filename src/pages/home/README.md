# Home Page Rebuild (Agent 1.4)

This directory contains the modular V7 rebuild of the Home experience. The page shell extends the shared layout and mirrors the legacy Power Pages flow referenced in `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html`.

## Structure
- `index.liquid` – Page shell extending `src/templates/layouts/default.liquid`. The root wrapper is tagged with `data-page-guid="ff3226c2-b362-456e-bc3a-93f91165b1a0"` (see `docs/page-guid-map.md:6`) and includes all sections via `include_relative`.
- `sections/hero.liquid` – Marketing hero derived from the legacy hero copy (`Home.webpage.copy.html:47`).
- `sections/trust-badges.liquid` – Trust badges summarizing legacy testimonials (`Home.webpage.copy.html:312`).
- `sections/roi-band.liquid` – ROI calculator module powered by `src/data/roi-calculator.mock.json` using the schema in `docs/data-contracts/roi.schema.json`. The script hydrates copy, inputs, and results from the contract and reports the contract version via `data-roi-version`.
- `sections/cta.liquid` – Engagement CTA band aligned with the Sprint 1 pattern backlog (coordinate with Agent 1.5 for shared CTA treatment).
- `sections/resources.liquid` – Resource cards mapped to supporting artefacts (`Home.webpage.copy.html:872`).

## Data Binding
- ROI defaults, multipliers, copy, and formatting load asynchronously from `src/data/roi-calculator.mock.json`. Values are validated by `npm run test:data-contracts`.
- Contract-driven strings render into `data-roi-*` nodes, ensuring updates to the mock propagate without manual edits.
- Results use the configured locale/currency and enforce thresholds defined in the contract (e.g., `thresholds.maxManagers`).

## Preview Notes
1. Serve the site with the project CLI (same workflow used by other pages) and browse to `/home`.
2. Compare each section against the legacy HTML:
   - Hero/trust badges: `legacy-reference/.../Home.webpage.copy.html:47` & `:312`.
   - ROI module: `legacy-reference/.../Home.webpage.copy.html:1221`.
   - CTA/actions grid: `legacy-reference/.../Home.webpage.copy.html:1184`.
3. Adjust ROI inputs and confirm metric deltas match the legacy math (82% time reduction, $2,400 annual platform cost per manager).

Document last verified during Sprint 1 on 2025-10-30.
