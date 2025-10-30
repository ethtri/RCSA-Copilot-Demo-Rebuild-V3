# Dashboard Module Notes (Agent 1.5)

## 1. Data Binding Summary
| Component | Template | Data contract path | Notes |
| --- | --- | --- | --- |
| Summary banner | `src/components/dashboard/summary-banner.liquid` | `summary`, `version`, `updatedAt` | Mirrors reporting window + cadence from `docs/data-contracts/dashboard.schema.json` to surface contract metadata on page load. |
| KPI grid/cards | `src/components/dashboard/kpi-grid.liquid`, `src/components/dashboard/kpi-card.liquid` | `kpis[]` | Values, units, targets, and trend deltas driven by the mock; Liquid computes delta/formatting before JS toggles the narrative insight. |
| Trend series | `src/components/dashboard/trend-grid.liquid`, `src/components/dashboard/trend-card.liquid` | `trendSeries[]` | Primary series data embedded via inline JSON for sparkline rendering and table toggle; target markers applied when present. |
| Action queue | `src/components/dashboard/action-queue.liquid` | `actionQueue.owner`, `actionQueue.items[]` | Filters tasks by status with graceful empty handling; exposes owner provenance from mock payload. |
| Alerts panel | `src/components/dashboard/alerts-panel.liquid` | `alerts[]` | Severity badge + CTA map directly from the schema enum/object contract. |
| Data quality callout | `src/components/dashboard/data-quality.liquid` | `dataQuality` | Optional banner surfaced when the contract provides completeness/lag metadata. |

## 2. Schema + Mock Dependencies
- Dashboard schema: `docs/data-contracts/dashboard.schema.json` (validated via `npm run test:data-contracts`). The mock lives at `src/data/dashboard-metrics.mock.json`.
- Liquid include `src/templates/includes/dashboard/dashboard-data.json.liquid` is auto-generated from the mock through `npm run sync:dashboard-data` (`tools/sync-dashboard-data.mjs`). Regenerate whenever the mock payload changes to keep the runtime binding aligned.
- Page-level capture/parse occurs in `src/pages/dashboard/index.liquid`, ensuring downstream components consume the single parsed object rather than re-reading the include.

## 3. UX Alignment vs Legacy Dashboard
- Legacy reference (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:31`) showcased KPI cards, charts, action items, and alerts laid out under a single container. The rebuild mirrors the four-panel structure with Bootstrap grid sections for parity.
- The original implementation surfaced manual trend callouts and inline scripting for sparkline placeholders. New trend cards replace them with accessible tables plus JS-rendered SVG sparklines to preserve quick-glance visuals without inline styles.
- Action queue and alerts maintain the dual-column layout with severity/status filtering, matching the operational workflow expectations captured in the legacy markup and blueprint notes (`docs/target-architecture-blueprint.md:49`).

## 4. Interaction Scripts
- KPI narrative toggle: `src/components/dashboard/kpi-card.js.liquid` adds disclosure control per card.
- Trend sparkline & table toggle: `src/components/dashboard/trend-card.js.liquid` reads inline JSON payloads to render SVG lines and manage table visibility.
- Alerts filtering + action queue status filtering live in `src/components/dashboard/alerts-panel.js.liquid` and `src/components/dashboard/action-queue.js.liquid`, respectively, scoped to their containers.

## 5. Coordination & Follow-ups
- No additional schema fields required for current scope; flag future needs to the Data Steward if new severity levels or queue metadata emerge.
- Shared component APIs (cards, badges) remain aligned with design-system tokens; coordinate with Agents 1.4 and 1.6 if they reuse these dashboard partials for their pages.
