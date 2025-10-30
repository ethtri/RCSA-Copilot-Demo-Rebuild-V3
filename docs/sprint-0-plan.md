# Sprint 0 Charter – RCSA Copilot Demo Rebuild (Agent 0.3R)

## 1. Goals
- Establish the Sprint 0 operating model for rebuilding the RCSA Copilot demo in the clean V7 workspace at `C:\Projects\RCSA-DEMO-V7-100325`, while preserving the legacy V6 source of truth at `C:\Projects\RCSA_Demp_V6`.
- Translate audit insights (`docs/legacy-audit-sprint0.md`) and bootstrap inventory (`docs/bootstrap-manifest.md`) into actionable objectives for Home, Dashboard, and WizAssessment migrations.
- Define agent workflows, Definition of Done (DoD) templates, and sequencing/parallelization rules so numbered agents (0.x) can execute consistently.
- Document risks, dependencies, and repo hygiene expectations before Sprint 1 development begins.

## 2. Environment & Repository References
- **Editable Sprint 0 workspace**: `C:\Projects\RCSA-DEMO-V7-100325` (mirrors GitHub repo `https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V2`).
- **Legacy reference (read-only)**: `C:\Projects\RCSA_Demp_V6` and mirrored assets under `legacy-reference/**`.
- **Power Pages environment**: Org `org601a79e1.crm.dynamics.com`, website GUID `a73cd7d7-71c2-4e01-a147-de5dcbb80683`.
- Always cross-check legacy insights in `docs/legacy-audit-sprint0.md` and asset provenance in `docs/bootstrap-manifest.md` before making reuse decisions.

## 3. Scope Definition (Per Page)
| Page | In Scope | Out of Scope | Acceptance Inputs |
| --- | --- | --- | --- |
| Home (`/`) | Rebuild top navigation, hero, ROI messaging, and CTA flows using shared header template and modular sections. | Net-new components beyond audit recommendations; data integrations. | `legacy-reference/powerpages/.../home/Home.webpage.copy.html`, `docs/legacy-audit-sprint0.md`. |
| `scrDashboard_1LoD` | Recompose dashboard cards, metrics, and quick actions with accessible layout and consolidated CSS. | 2LoD dashboard (deferred to sprint >=1); live data wiring. | `legacy-reference/powerpages/.../scrDashboard_1LoD.en-US.webpage.copy.html`, `legacy-reference/docs/rcsa-2lod-requirements.md`. |
| `wizAssessment` | Recreate wizard sections, modal behavior, and AI insight callouts with consistent header interactions. | Expanding questionnaire workflow; data persistence logic. | `legacy-reference/powerpages/.../wizAssessment.en-US.webpage.copy.html`, `legacy-reference/HEADER_OPTIMIZATION_SUMMARY.md`. |

## 4. Milestones & Timeline (Target 2-week Sprint)
| Day | Milestone |
| --- | --- |
| 0–1 | Confirm environment access, refresh legacy comparisons, align on DoD template. |
| 2–4 | Establish shared header/nav, configure sitemap markers in sandbox. |
| 5–7 | Home and Dashboard content migration drafts complete; peer review scheduled. |
| 8–10 | WizAssessment migration, modal testing, and CSS reconciliation. |
| 11–12 | Power Pages CLI upload/download rehearsal; cache clear validation. |
| 13–14 | Sprint review, finalize risk/dependency log, prep Agent 0.4 handoff. |

## 5. Definition of Done Template (for Numbered Agents)
```
Agent <0.x> DoD Checklist
[ ] Scope validated against docs/sprint-0-plan.md Section 3 and relevant audit references.
[ ] Changes made only in approved directories (docs/, design-system/, src/, tools/) unless escalated.
[ ] Deliverable files formatted (Prettier/HTML lint) and include repository-relative links.
[ ] Verification evidence captured (Power Pages preview / CLI output) and logged in Sprint Tracker.
[ ] Action items, questions, or blockers recorded before handoff.
```
Agents attach the completed checklist (inline or comment) when handing off work and update the tracker table (Section 9).

## 6. Risk Log
| ID | Risk | Impact | Owner | Mitigation | Status |
| --- | --- | --- | --- | --- | --- |
| R1 | Architecture drift from legacy inline overrides resurfaces | Medium UX regressions | Tech Lead | Centralize CSS per audit guidance; enforce DoD checklist item on formatting | Open |
| R2 | Sandbox GUID/config mismatches cause deployment failures | High deployment delays | Release Engineer | Store GUID `a73cd7d7-71c2-4e01-a147-de5dcbb80683` in tracker; rehearse CLI loop by Day 11 | Open |
| R3 | Legacy assets copied without manifest entry | Medium traceability gap | Product Owner | Require manifest review during DoD sign-off | Open |
| R4 | Parallel agents overwrite shared header/template work | High rework | Agent Coordinator | Follow dependency map (Section 7) and enforce sequential steps for header updates | Open |
| R5 | Blueprint requires new data-contract stubs under `docs/data-contracts/` that are not yet provisioned | Medium integration delays | Tech Lead | Seed placeholders and schema workflow in Sprint 1 kickoff; anchor follow-up in Sprint 1 plan Section 4 | Mitigated (Sprint 1 Day 3 - data mocks & layout hand-off landed) |

## 7. Dependency Map & Parallelization Guidance
- **Sequential**: Header/nav foundation → Page migrations → CLI validation. Agents modifying shared templates or design tokens run sequentially to avoid conflicts (0.1, 0.2, 0.3R).
- **Parallel**: Content authoring and accessibility testing within isolated page folders may run concurrently once shared assets stabilize (eligible for Agent 0.4+).
- **External dependencies**: All tasks rely on insights from `docs/legacy-audit-sprint0.md` and `docs/bootstrap-manifest.md`; missing updates must be escalated before work proceeds.

## 8. Agent Catalog (0.x Series)
| Agent | Charter | Parallelization Notes | Status |
| --- | --- | --- | --- |
| 0.1 | Inventory legacy assets and confirm bootstrap manifest completeness. | Sequential kick-off; informs all later agents. | Complete (reference manifest v1). |
| 0.2 | Establish repo hygiene rules and contributor workflow (`README.md`, `CONTRIBUTING.md`). | Sequential; must precede task execution. | Complete. |
| 0.3R | Author Sprint 0 plan + AI operations guide (this document set). | Sequential; provides DoD and tracker for others. | In Progress (closes with this delivery). |
| 0.4 | Target-state architecture blueprint defining shared components, styling, and data contracts. | Sequential to 0.3R; informs all page migrations and Sprint 1 backlog. | Complete. |
| 0.5+ | (Future) Page-specific migrations and QA sweeps. | Can parallelize once 0.4 complete; respect dependency map. | Pending. |

## 9. Sprint Tracker (Update Per Agent)
| Agent | Task Focus | Status | Deliverable Path(s) | Reviewer | DoD Checklist |
| --- | --- | --- | --- | --- | --- |
| 0.1 | Legacy asset inventory | Complete | `docs/bootstrap-manifest.md` | Product Owner | Attached in manifest MR |
| 0.2 | Repo hygiene agreements | Complete | `README.md`, `CONTRIBUTING.md` | Tech Lead | DoD archived in tracker notes |
| 0.3R | Sprint 0 plan + AI guide | In Review | `docs/sprint-0-plan.md`, `docs/ai-agent-guide.md` | Product Owner (TBD) | ✅ upon approval |
| 0.4 | Target-state architecture blueprint | Complete | `docs/target-architecture-blueprint.md` | Tech Lead | DoD checklist validated in Section 8; reviewer sign-off recorded |
| 0.5 | Home page migration | Planned | `src/pages/home/` | UX Reviewer | Pending |
| 0.6 | Dashboard migration | Planned | `src/pages/dashboard/` | UX Reviewer | Pending |
| 0.7 | WizAssessment migration | Planned | `src/pages/wizassessment/` | Tech Lead | Pending |
| 0.8 | CLI deployment rehearsal | Planned | `tools/` logs | Release Engineer | Pending |

## 10. Repo Hygiene Expectations
- Work exclusively within the V7 workspace. Do not modify `legacy-reference/**` or V6 directories; cite them in analysis only.
- Maintain branch hygiene per `CONTRIBUTING.md` (task-focused branches, clean `main`, descriptive commits).
- Update `docs/bootstrap-manifest.md` whenever importing new legacy assets; include rationale.
- Ensure all documentation references use repository-relative paths and align with the manifest and audit findings.
- Log decisions and verification evidence in this plan (Sections 6–9) to keep Sprint 0 transparent.

## 11. References
- `docs/legacy-audit-sprint0.md` – Audit insights driving scope, risks, and reuse decisions.
- `docs/bootstrap-manifest.md` – Inventory of legacy assets present in V7.
- `README.md` and `CONTRIBUTING.md` – Current working agreements and contribution flow.
- `legacy-reference/docs/PORTAL_REBUILD_PLAN.md`, `legacy-reference/docs/rcsa-2lod-requirements.md`, `legacy-reference/HEADER_OPTIMIZATION_SUMMARY.md` – Supplemental guidance for page rebuilds and UX standards.

This document remains living for the duration of Sprint 0; record updates in the Sprint Tracker and notify the Product Owner before modifying sections 3–8.



