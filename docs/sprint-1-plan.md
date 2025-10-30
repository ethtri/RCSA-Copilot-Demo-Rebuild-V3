# Sprint 1 Plan - RCSA Copilot Demo Rebuild (Agent 1.0)

## 1. Goals
- Implement the V7 foundations defined in the Sprint 0 blueprint: modular layout, refactored design system, and page rebuild scaffolding (`docs/target-architecture-blueprint.md:30`, `docs/target-architecture-blueprint.md:45`, `docs/target-architecture-blueprint.md:58`).
- Replace legacy inline behaviours with reusable components and validated data contracts while keeping work aligned to the Sprint 0 DoD and risk controls (`docs/legacy-audit-sprint0.md:10`, `docs/legacy-audit-sprint0.md:12`, `docs/sprint-0-plan.md:33`).
- Prove the end-to-end developer loop (design system build, JSON validation, CLI rehearsal) in the V7 workspace (`docs/target-architecture-blueprint.md:104`, `docs/bootstrap-manifest.md:5`).

## 2. Stream Scope & Deliverables
| Stream ID | Focus | In Scope | Out of Scope | Blueprint & Legacy References |
| --- | --- | --- | --- | --- |
| 1.1 | Design system refactor | Extract tokens, utilities, and component bundles; wire build scripts and dist placeholders (`design-system/`) | Publishing compiled CSS to production environments | `docs/target-architecture-blueprint.md:58`, `legacy-reference/design-system/rcsa-styles.css:7` |
| 1.2 | Shared header & layout | Rebuild header partial, navigation JSON include, and default layout shell (`src/templates/**`) | Net-new navigation IA or sitemap changes | `docs/target-architecture-blueprint.md:40`, `legacy-reference/powerpages/.../header/Header.webtemplate.source.html:12` |
| 1.3 | Data contracts & mocks | Author ROI, dashboard, and wizard JSON contracts + schema validation (`docs/data-contracts/`, `src/data/**`) | Live service integrations or API deployments | `docs/target-architecture-blueprint.md:69`, `legacy-reference/powerpages/.../home/Home.webpage.copy.html:1221` |
| 1.4 | Home page rebuild | Implement sectioned Liquid includes and hook ROI calculator to mocks (`src/pages/home/**`) | Localization rollout beyond en-US | `docs/target-architecture-blueprint.md:49`, `legacy-reference/powerpages/.../home/Home.webpage.copy.html:47` |
| 1.5 | Dashboard rebuild | Compose card modules and trend components driven by data contracts (`src/pages/dashboard/**`, `src/components/dashboard/**`) | 2LoD dashboard scope | `docs/target-architecture-blueprint.md:49`, `legacy-reference/powerpages/.../scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:31` |
| 1.6 | WizAssessment rebuild | Recreate stepper, insights, and modal workflow using modular scripts and mocks (`src/pages/wizassessment/**`) | Expanding questionnaire inventory beyond audited content | `docs/target-architecture-blueprint.md:51`, `legacy-reference/powerpages/.../wizAssessment.en-US.webpage.copy.html:6935` |
| 1.7 | CLI & automation rehearsal | Implement npm scripts, schema tests, and Power Pages CLI dry run (`tools/`, `package.json`) | Production deployment or environment reconfiguration | `docs/target-architecture-blueprint.md:104`, `docs/sprint-0-plan.md:6` |

## 3. Agent Catalog & Sequencing
| Agent | Stream | Primary Deliverables | Dependencies | Parallelization Notes | Reviewer |
| --- | --- | --- | --- | --- | --- |
| 1.1 | Design system refactor | `design-system/tokens/*.json`, `design-system/src/*.scss`, build scripts | None | Runs first to unblock downstream styling | Tech Lead |
| 1.2 | Shared header & layout | `src/templates/layouts/default.liquid`, `src/templates/includes/header.liquid`, `src/templates/includes/navigation.json.liquid` | 1.1 | Sequential with 1.1; exposes layout contract for page teams | UX Reviewer |
| 1.3 | Data contracts & mocks | `docs/data-contracts/*.json`, `src/data/*.json`, validation tests | 1.1 | Sequential with 1.1; parallel with 1.2 after token schema agreed | Data Steward |
| 1.4 | Home page rebuild | `src/pages/home/index.liquid`, `src/pages/home/sections/*.liquid`, ROI script refactor | 1.2, 1.3 | Parallel with 1.5 once layout + data stabilized | UX Reviewer |
| 1.5 | Dashboard rebuild | `src/pages/dashboard/index.liquid`, `src/components/dashboard/*.liquid/js` | 1.2, 1.3 | Parallel with 1.4; coordinate shared components | Tech Lead |
| 1.6 | WizAssessment rebuild | `src/pages/wizassessment/index.liquid`, `src/pages/wizassessment/modules/*.js` | 1.2, 1.3 | Follows data contract readiness; can overlap late sprint | Tech Lead |
| 1.7 | CLI & automation rehearsal | `package.json` scripts, `tools/cli-rehearsal.md`, pipeline stub | 1.1, 1.3, 1.4-1.6 | Runs after feature branches land; validates release loop | Release Engineer |

## 4. Sprint 1 Tracker
| Agent | Task Focus | Status | Deliverable Path(s) | Reviewer | Dependencies |
| --- | --- | --- | --- | --- | --- |
| 1.1 | Design system refactor | In Review – `npm run build:design-system` 2025-10-30 | `design-system/tokens/*.json`, `design-system/src/` | Tech Lead | - |
| 1.2 | Shared header & layout | Planned | `src/templates/layouts/default.liquid`, `src/templates/includes/header.liquid` | UX Reviewer | 1.1 |
| 1.3 | Data contracts & mocks | In Progress | `docs/data-contracts/`, `src/data/`, `tools/validate-data-contracts.js`, `package.json#L7` (`test:data-contracts`) | Data Steward | 1.1 |
| 1.4 | Home page rebuild | Planned | `src/pages/home/**` | UX Reviewer | 1.2, 1.3 |
| 1.5 | Dashboard rebuild | Planned | `src/pages/dashboard/**`, `src/components/dashboard/**` | Tech Lead | 1.2, 1.3 |
| 1.6 | WizAssessment rebuild | Planned | `src/pages/wizassessment/**` | Tech Lead | 1.2, 1.3 |
| 1.7 | CLI & automation rehearsal | Planned | `tools/`, `package.json`, pipeline template | Release Engineer | 1.1, 1.3, 1.4-1.6 |

_Verification_: 2025-10-30 – `npm run test:data-contracts` ✅ ROI, Dashboard, and Wizard mocks validated against seeded schemas.

## 5. Definition of Done Extensions
- Extend Sprint 0 DoD with automated validation: run `npm run build:design-system` and `npm run test:data-contracts` before handoff (`docs/target-architecture-blueprint.md:104`, `docs/target-architecture-blueprint.md:107`).
- Each agent publishes verification notes (lint/test output, CLI dry run) in tracker comments alongside reviewer confirmation (`docs/sprint-0-plan.md:72`).
- Repository-relative references to legacy artefacts are required in documentation updates or comments to preserve traceability (`docs/legacy-audit-sprint0.md:17`, `docs/bootstrap-manifest.md:25`).

## 6. Risk Mitigations & Escalation Paths
- **RM1** – Data contracts missing: seed `docs/data-contracts/` and `src/data/` placeholders before 1.3 begins; aligns with Sprint 0 risk R5 (`docs/sprint-0-plan.md:50`, `docs/target-architecture-blueprint.md:108`). Owner: Tech Lead. Due: Sprint Day 2.
- **RM2** – Design token drift: enforce review checklist requiring comparison against legacy CSS evidence before merges (`legacy-reference/design-system/rcsa-styles.css:7`, `docs/target-architecture-blueprint.md:58`). Owner: 1.1 agent.
- **RM3** – CLI rehearsal blocked by environment access: dry run using sandbox GUID `a73cd7d7-71c2-4e01-a147-de5dcbb80683` per Sprint 0 plan; escalate to Release Engineer if CLI auth fails (`docs/sprint-0-plan.md:20`, `docs/sprint-0-plan.md:6`). Owner: 1.7 agent.

## 7. Readiness & Follow-Ups
- Create `docs/data-contracts/` directory with stub JSON files and schema README before 1.3 (mirrors blueprint requirement, linking to Risk RM1).
- Add `.gitkeep` (or equivalent README) to `design-system/dist/` once build pipeline scaffolded so placeholder artefacts are tracked (`docs/target-architecture-blueprint.md:105`).
- Seed `src/templates/includes/footer.liquid` placeholder in tandem with header work to match blueprint expectations (`docs/target-architecture-blueprint.md:45`).
- Document ROI calculator mock inputs in `tools/` or `docs/data-contracts/` to align with legacy assumptions until services are available (`legacy-reference/powerpages/.../home/Home.webpage.copy.html:1221`).

## 8. References
- `docs/target-architecture-blueprint.md` – component, styling, and data directives (key lines: 30, 40, 45, 58, 69, 104, 108).
- `docs/legacy-audit-sprint0.md` – reuse rationale and risk evidence (key lines: 10, 12, 17).
- `docs/bootstrap-manifest.md` – repository structure and asset provenance (key lines: 5, 21, 25).
- `docs/sprint-0-plan.md` – DoD baseline, tracker conventions, and risk ownership (key lines: 33, 50, 72).
- `docs/project-oversight-log.md` – Sprint 0 oversight summary and prompting guardrails (key lines: 4, 12, 20).

---

**Agent DoD Snippet**
```
[ ] Sprint 0 DoD + Sprint 1 automation checks executed.
[ ] Tracker updated with status, reviewer, verification artefacts.
[ ] Risks/escalations logged with owner and due date.
```
