# Target-State Architecture Blueprint (Agent 0.4)

## 1. Purpose & Context
- Align Sprint 0 outputs (Agents 0.1-0.3R) into a single V7 target state that future sprints can implement.
- Reference evidence from V6 artifacts while working exclusively in the V7 workspace.
- Deliverables covered here: component hierarchy, styling refactor plan, data contracts, deployment workflow, and automation hooks.

## 2. Component Hierarchy & Reuse Decisions
```text
Power Pages Portal (V7)
├─ Shared Layout
│  ├─ Header (Liquid template + nav configuration)
│  └─ Footer (placeholder; new partial)
├─ Global Partials
│  ├─ Navigation data (JSON / Liquid include)
│  ├─ Call-to-action banner
│  └─ Analytics/instrumentation stub
├─ Page Shells (content pages extending shared layout)
│  ├─ Home
│  ├─ 1LoD Dashboard
│  └─ WizAssessment
└─ Experience-Specific Modules
   ├─ ROI Calculator (Home)
   ├─ Metric Cards & Trends (Dashboard)
   └─ Guided Wizard Steps & Insights (WizAssessment)
```

| Legacy Asset | Evidence | V7 Approach | Notes |
| --- | --- | --- | --- |
| Header web template | `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:12`, `:128`, `:167` | **Refactor & reuse logic**. Preserve Liquid routing but migrate styling to design system and convert substitution block into optional include. | Replace inline `<style>` block with tokens; expose nav config via JSON (Section 4). |
| Home page shell | `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1`, `:47`, `:1221` | **Rebuild** using modular sections (hero, ROI, testimonials) that extend shared layout. | Remove full HTML scaffold; convert ROI script into service-backed component (Section 5). |
| WizAssessment content | `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:6935`, `:7181` | **Rebuild core UI**, but extract data dictionaries into mock API payloads to keep copy consistent. | Re-implement modals with Bootstrap helpers; wire to JSON mocks/stubs. |
| 1LoD Dashboard page | `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:31`, `:2483` | **Rebuild** with card components driven by data contracts; no inline design system. | Replace emergency header scripts with reusable layout utilities. |
| Design system CSS | `legacy-reference/design-system/rcsa-styles.css:7`, `:1006` | **Refactor** into layered tokens, utilities, and component bundles. | Convert "protected fixes" into documented utilities with linting guardrails. |
| Header z-index guidance | `legacy-reference/HEADER_OPTIMIZATION_SUMMARY.md:5`, `:25` | **Adopt** as acceptance rule for new header height/z-index variables. | Enforce via design tokens and regression tests. |

## 3. Shared Templates & Page Composition
- **Header template**  
  - Keep Liquid active-state logic (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:8`-`:155`).  
  - Extract nav items into `_includes/navigation.json.liquid` with structure `{ "label": "", "href": "", "icon": "" }`.  
  - Remove embedded `<style>` and map to `design-system/tokens/header.json` + `.scss` entry (Section 4).  
  - Move search/forum substitution (`:167`-`:189`) into conditional include invoked only when those markers exist, preventing default render.

- **Layout partials**  
  - Create `src/templates/layouts/default.liquid` to load header, footer, analytics stub, and a `main` slot.  
  - Provide `src/templates/includes/footer.liquid` placeholder using the same gradient system for parity with eventual 2LoD requirements (`legacy-reference/docs/rcsa-2lod-requirements.md:96`).

- **Page section breakdowns**
  - **Home**: Hero, Trust badges, ROI calculator, Call-to-action band, Resource cards. Each section defined as Liquid include under `src/pages/home/sections/*.liquid` to promote reuse across localized versions.
  - **1LoD Dashboard**: Layout grid > Summary KPIs > Trend charts > Control actions. Compose from `src/components/dashboard/` partials that accept JSON data (see Section 5).
  - **WizAssessment**: Stepper shell, Insight cards, Action plan modal, Export footer. Replace manual DOM manipulation with Alpine.js/vanilla modules that hydrate from data contracts.

## 4. Styling Strategy & Design-System Refactor Plan
1. **Token extraction**  
   - Convert root variables from `legacy-reference/design-system/rcsa-styles.css:7`-`:19` into `design-system/tokens/colors.json`.  
   - Mirror header z-index and spacing rules from `legacy-reference/HEADER_OPTIMIZATION_SUMMARY.md:5`-`:15` in `design-system/tokens/layout.json`.
2. **Layered architecture**  
   - `design-system/src/tokens.scss` (compiled from JSON) -> `design-system/dist/rcsa-tokens.css`.  
   - `design-system/src/utilities.scss` houses spacing/typography helpers without `!important`; original protected fixes (`legacy-reference/design-system/rcsa-styles.css:1006`-`:1016`) become opt-in utility classes (`.u-risk-badge`, etc.).  
   - Component styles (header, dashboard cards, wizard modals) live in `design-system/src/components/`. Each component consumes tokens and autogenerates CSS modules.
3. **Build pipeline**  
   - Add `tools/build-design-system.ps1` to compile Sass via `npm` scripts (`npm run build:design-system`).  
   - Gate PRs with `npm run lint:css` to catch regressions (ties into automation checklist below).
4. **Power Pages delivery**  
   - Publish compiled CSS to `web-files` via CLI; update the header to request a versioned asset (replacing inline `<style>` at `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:16`-`:126`).  
   - Ensure localized pages reference `~/design-system/rcsa.css?v=<hash>` to avoid the missing tilde issue (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/content-pages/Home.en-US.webpage.copy.html:8`).

## 5. Data Contracts & Integration Readiness
- **ROI Calculator (Home)**  
  - Legacy logic hard-codes assumptions (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1221`-`:1239`).  
  - Create `src/data/roi-calculator.mock.json`:
    ```json
    {
      "defaults": { "assessmentsPerMonth": 50, "baselineHours": 2.5, "managers": 3, "hourlyCost": 125 },
      "multipliers": { "timeReduction": 0.82, "platformCostPerManager": 2400 },
      "copy": { "headline": "Transform Risk Assessment from Hours to Minutes", "cta": "Get Free Guide" }
    }
    ```
  - Expose via `src/api/roi-calculator.ts` stub returning Promise-based data; future integration can swap to a Dataverse table without changing the UI.

- **Wizard Insights & Recommendations**  
  - Risk dictionaries currently embedded in JS (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:7181`-`:7190`).  
  - Move to `src/data/wizard-insights.mock.json` with arrays for risks, mitigations, AI explanations, and export templates.  
  - Implement adapter `src/api/wizard-insights.ts` to group by risk type and feed UI components.

- **Dashboard Metrics**  
  - Align with future 2LoD expectations (`legacy-reference/docs/rcsa-2lod-requirements.md:96`-`:107`) by defining shared schema `src/data/dashboard-metrics.mock.json` including priority alerts, KPIs, trend data, and action queues.  
  - Provide GraphQL-like TypeScript interfaces under `src/types/dashboard.ts` to ease substitution with Dataverse or Fabric endpoints later.

- **Integration hooks**
  - All mock APIs export `getData({ preview: true })` so automation can toggle between mocks and real services.  
  - Provide environment flag `RCSA_DATA_MODE=mock|live` consumed by build scripts.

## 6. Automation & Tooling Hooks
- **Power Pages CLI loop** (reuse checklist from `legacy-reference/docs/PORTAL_REBUILD_PLAN.md:27`-`:35`):  
  1. `pac auth create --url https://org601a79e1.crm.dynamics.com --name rcsa-sprint0`.  
  2. `pac powerpages upload --path powerpages/rcsa-copilot-demo---rcsa-demo --webSiteId <guid> --modelVersion 2`.  
  3. Verify in Studio, clear cache via `_services/about`, publish.  
  4. Pull back edits with `pac powerpages download ...` before merging.
- **Branching & review**  
  - Continue `feature/0.4-target-architecture` naming from `docs/ai-agent-guide.md`.  
  - Mandate PR checklist referencing this blueprint and DoD (docs/sprint-0-plan.md Section 5).  
- **Design system build**  
  - Add GitHub Action or Azure Pipeline stub invoking `npm ci`, `npm run build:design-system`, `npm run lint:css`.  
  - Store generated artifacts under `design-system/dist/` with `.gitkeep`; actual compiled CSS uploaded via CLI, not committed.
- **Data contract validation**  
  - Add `npm run test:data-contracts` executing JSON schema validation so mocks stay consistent with interfaces.  
  - Generate schema snapshots in `docs/data-contracts/` (to be created Sprint 1).

## 7. Deployment & Environment Workflow
1. **Local authoring**  
   - Build the design system, run `npm run lint` (future script) to ensure templates and data mocks pass checks.  
   - Use Power Pages CLI download to sync the latest site before editing shared templates.
2. **Branch flow**  
   - Feature branch per major component (header, home, dashboard, wizard) referencing this blueprint.  
   - Merge to `main` only after reviewer sign-off and tracker update (Section 9 of the sprint plan).
3. **Environment alignment**  
   - Maintain updated website GUID inventory in `docs/sprint-0-plan.md` referencing the legacy plan (`legacy-reference/docs/PORTAL_REBUILD_PLAN.md:8`-`:18`).  
   - Document cache-clearing proof in the tracker to avoid reintroducing high z-index fixes (`legacy-reference/HEADER_OPTIMIZATION_SUMMARY.md:5`-`:27`).
4. **Release preparation**  
   - `tools/release-notes.md` (planned) enumerates components ready for upload.  
   - Store CLI logs under `tools/deploy/` for traceability per DoD checklist.

## 8. Risks, Guardrails, and Next Steps
- **Cascade regression**: Removing `!important` can break existing styling; mitigate by snapshot testing header layout against the z-index baseline (`legacy-reference/HEADER_OPTIMIZATION_SUMMARY.md:5`-`:15`).  
- **Data integrity**: Mock contracts must stay in sync with future Dataverse schema; enforce schema validation and document changes in sprint retros.  
- **Template drift**: Shared header changes require sequential ownership; keep the dependency map (docs/sprint-0-plan.md Section 7) up to date and run visual diff before merge.  
- **Upcoming work**:  
  1. Scaffold directories described above and generate placeholder files.  
  2. Implement the design system build pipeline.  
  3. Replace inline scripts/styles in Home/Dashboard/Wizard with the modular architecture defined here.  
  4. Align Sprint 1 backlog with data contract stories (ROI service, insight API, dashboard telemetry).

This blueprint completes Agent 0.4 scope and supersedes the legacy header-focused mandate. Subsequent agents should reference Sections 3-7 before modifying shared assets.
