# Data Contract Scaffolding (Sprint 1 Stream 1.3)

This catalog seeds the JSON contracts outlined for Agent 1.3 so page teams can reuse consistent mock payloads while services remain offline. The scope aligns with the Sprint 1 tracker entry for Data Contracts & Mocks (`docs/sprint-1-plan.md:41`) and closes Sprint 0 Risk R5 by providing the missing scaffolding (`docs/sprint-0-plan.md:50`).

## Contract Map
- `roi.schema.json` – ROI calculator assumptions and messaging, consumed by `src/data/roi-calculator.mock.json`. Derived from the legacy homepage script defaults (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1221`) and blueprint guidance for ROI mocks (`docs/target-architecture-blueprint.md:69`).
- `dashboard.schema.json` – Executive dashboard telemetry covering KPIs, trends, alerts, and action queues, paired with `src/data/dashboard-metrics.mock.json`. Built to reflect dashboard evidence (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:31`) and future 2LoD alignment noted in the blueprint (`docs/target-architecture-blueprint.md:83`).
- `wizard.schema.json` – Assessment wizard risk dictionaries, control mappings, and AI insight templates, validated against `src/data/wizard-insights.mock.json`. Extracted from the legacy wizard dictionaries (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:6935`) and Section 5 data directives (`docs/target-architecture-blueprint.md:74`).

## Validation & Usage
- Schemas follow JSON Schema Draft 2020-12 so they can be enforced with Ajv during development.
- Sample payloads in `src/data/` mirror the schema `additionalProperties` rules and embed commentary fields (where allowed) to document assumptions the UI depends on.
- The forthcoming `npm run test:data-contracts` harness (Sprint 1 DoD extension, `docs/target-architecture-blueprint.md:108`) validates that all mocks stay in lockstep with these schemas.

## Assumptions & Evidence
- ROI calculations fix the 82 % time-reduction multiplier and $2,400 annual platform cost per manager called out in the legacy JavaScript and blueprint examples (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1221`, `docs/target-architecture-blueprint.md:69`).
- Dashboard metrics expose both aggregated KPIs and week-over-week trend arrays so downstream cards can animate exactly as the legacy experience demonstrated at load (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:31`).
- Wizard payloads retain the canonical risk/control IDs used throughout the legacy session data (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:6935`), enabling the new UI modules to replay saved progress without remapping keys.
