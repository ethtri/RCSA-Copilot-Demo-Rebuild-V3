# Legacy Audit - Sprint 0

## Context
- Legacy source: `C:\Projects\RCSA_Demp_V6\powerpages\rcsa-copilot-demo---rcsa-demo` plus scoped design and documentation assets.
- Target repository for rebuild deliverables: `C:\Projects\RCSA-DEMO-V7-100325` (this report lives here).
- Power Pages environment references surfaced during review: org `org601a79e1.crm.dynamics.com`, prior rebuild target GUID `ba6e57b7-0876-4771-b1db-b5608caa5530` (`docs/PORTAL_REBUILD_PLAN.md:8`, `docs/PORTAL_REBUILD_PLAN.md:11`).
- Scope covered legacy navigation, shared templates, CSS, inline scripts, Liquid dependencies, and documentation notes for Home, scrDashboard_1LoD, and wizAssessment experiences.

## Risk Summary
- **Architecture drift**: Each legacy page ships a standalone HTML document with bespoke CSS/JS, bypassing the shared header/template system and creating conflicting overrides (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:1`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:1`).
- **Fragile UX fixes**: Emergency scripts continually rewrite header styling and z-indexes, reintroducing issues the optimization guide claims were solved (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:2483`, `HEADER_OPTIMIZATION_SUMMARY.md:25`).
- **Static demo data**: Key value props (ROI calculator, wizard risk intelligence) rely on hard-coded assumptions without integration points, limiting reuse in V7 without a data strategy (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1221`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:7181`).

## Component Reuse Matrix
| Component | Location | Current State | Recommendation | Key Evidence |
| --- | --- | --- | --- | --- |
| Header template | `powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html` | Liquid sets active nav, yet styling is embedded and duplicated across pages | Refactor and keep nav logic; move styling to shared CSS and confirm routes for V7 | `powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:12`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:17`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:167` |
| RCSA design system CSS | `design-system/rcsa-styles.css` | 1k+ lines of tokens and overrides dominated by `!important` flags and “protected fixes” | Rationalize tokens and extract page-specific patches before adopting in V7 | `design-system/rcsa-styles.css:7`<br>`design-system/rcsa-styles.css:1006`<br>`design-system/rcsa-styles.css:1059` |
| Home (root page) | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html` | Full HTML shell with hidden nav and inline scripts | Rebuild as page sections that extend shared template; centralize scripts | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:47`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1221`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1307` |
| Home (en-US) localized copy | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/content-pages/Home.en-US.webpage.copy.html` | Duplicates global markup and points to a relative stylesheet path | Rebuild from shared partials; ensure asset links resolve via web files | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/content-pages/Home.en-US.webpage.copy.html:1`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/content-pages/Home.en-US.webpage.copy.html:8` |
| scrDashboard_1LoD page | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html` | Massive inline “design system”, invalid CSS blocks, and header-patching scripts | Rebuild UX using modular cards and a consistent header component | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:31`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:2483`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:2513` |
| scrDashboard fallback CSS | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/scrDashboard_1LoD.webpage.custom_css.css` | Fallback tokens replicate design system and suppress default nav | Fold necessary rules into shared CSS; delete redundant overrides | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/scrDashboard_1LoD.webpage.custom_css.css:5`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/scrDashboard_1LoD.webpage.custom_css.css:49`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/scrDashboard_1LoD.webpage.custom_css.css:65` |
| wizAssessment page | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html` | 6k+ line monolith managing wizard state, AI copy, and modals via custom JS | Rebuild wizard with modular components, Bootstrap modals, and real data hooks | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:6364`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:6935`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:11774` |
| wizAssessment fallback CSS | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/wizAssessment.webpage.custom_css.css` | Styling limited to heat map and progress elements outside shared tokens | Merge into the cleaned design system; retain class hooks for future React/PCF | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/wizAssessment.webpage.custom_css.css:1`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/wizAssessment.webpage.custom_css.css:28`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/wizAssessment.webpage.custom_css.css:92` |
| Portal rebuild plan | `docs/PORTAL_REBUILD_PLAN.md` | Accurate CLI checklist but tied to prior V4 tenant metadata | Keep as onboarding guide; update URLs/GUIDs once V7 scaffolding finalizes | `docs/PORTAL_REBUILD_PLAN.md:8`<br>`docs/PORTAL_REBUILD_PLAN.md:11`<br>`docs/PORTAL_REBUILD_PLAN.md:30` |
| 2LoD requirements | `docs/rcsa-2lod-requirements.md` | Comprehensive future-state notes for scrDashboard_2LoD scope | Keep as product requirements reference; map into new backlog | `docs/rcsa-2lod-requirements.md:96` |
| Header optimization summary | `HEADER_OPTIMIZATION_SUMMARY.md` | Documents intended header fix, but legacy code regressed | Update after refactoring header so guidance matches implementation | `HEADER_OPTIMIZATION_SUMMARY.md:6`<br>`HEADER_OPTIMIZATION_SUMMARY.md:25` |

## Detailed Findings
### Header template
- Loads Bootstrap and icons from CDN plus the design system web file, duplicating references other pages also inject (`powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:12`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:14`).
- Ships inline header styling that conflicts with the shared CSS strategy (`powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:17`).
- Navigation is hard-coded to three demo routes with a fixed CTA; new flows require template edits (`powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:148`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:158`).
- The substitution block exposes search/forum-specific markup that no longer applies to the current demo (`powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:167`).

### RCSA design system CSS
- Defines brand tokens and utility classes with aggressive `!important` usage, making downstream overrides brittle (`design-system/rcsa-styles.css:7`).
- Contains “protected fix” sections that hard-code card spacing and badges, signaling prior layout regressions and technical debt to resolve before reuse (`design-system/rcsa-styles.css:1006`).
- Sets header z-index to 1040 to respect Bootstrap modal stacking, yet page overrides undo this (`design-system/rcsa-styles.css:1059`).

### Home experience
- Inline CSS hides all navbar elements, forcing a one-off hero layout and breaking global navigation (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:47`).
- ROI calculator logic is hard-coded in-page with fixed assumptions (82% reduction, etc.) and no persistence (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1221`).
- CTA download simulates content via a generated text file, underscoring the absence of real assets or data integrations (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1307`).
- The localized copy duplicates the full markup and relies on a relative CSS path that may fail outside root (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/content-pages/Home.en-US.webpage.copy.html:8`).

### scrDashboard_1LoD experience
- Inline “design system” CSS includes an orphaned block (no selector) and extensive use of `!important`, indicating a fragile cascade (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:31`).
- Emergency scripts continuously reapply header styles, set z-index back to 9999, and schedule multiple retries, which conflicts with the documented fix and hurts performance (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:2483`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:2513`).
- Mutation observers and timeouts attempt to reapply styling whenever DOM changes occur, signaling systemic instability (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:2538`).
- Page-level fallback CSS also hides the native navbar, reinforcing divergence from the shared header (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/scrDashboard_1LoD.webpage.custom_css.css:49`).

### wizAssessment experience
- A global `assessmentData` object owns all wizard state, mixing UI and data logic in a single file (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:6364`).
- Debug utilities and session storage resets ship in production markup (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:6395`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:7030`).
- AI insights, risk descriptions, and recommendations are hard-coded dictionaries rather than data-driven (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:7181`).
- Modals are injected manually with `class="modal fade show"` and inline styles instead of Bootstrap’s modal API, leading to accessibility and layering issues (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:6935`).
- Action plan generation and exports create client-side files without backend persistence (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:11774`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:11797`).

### Legacy documentation & process notes
- Rebuild plan captures CLI workflow and emphasizes fresh site provisioning for stability (`docs/PORTAL_REBUILD_PLAN.md:8`, `docs/PORTAL_REBUILD_PLAN.md:30`).
- 2LoD requirements outline future dashboard expectations that are not implemented in V6 but should inform V7 backlog (`docs/rcsa-2lod-requirements.md:96`).
- Header optimization summary describes the intended z-index hierarchy, highlighting the gap between guidance and current code (`HEADER_OPTIMIZATION_SUMMARY.md:6`, `HEADER_OPTIMIZATION_SUMMARY.md:25`).

### Shared dependencies
- Bootstrap, Bootstrap Icons, and the design-system web file are included via CDN/web file links on multiple pages, increasing the risk of double-loading and cache drift (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:9`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:12`).

## Issue Log
| ID | Severity | Component | Issue | Evidence | Suggested Next Step |
| --- | --- | --- | --- | --- | --- |
| IL-01 | High | scrDashboard_1LoD | `forceFixHeader` reinstates z-index 9999, defeating the documented modal layering fix | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:2483`<br>`HEADER_OPTIMIZATION_SUMMARY.md:25` | Remove emergency override, reuse shared header styles, and verify modal stacking in V7 |
| IL-02 | High | All legacy pages | Pages ship full HTML shells (`<!DOCTYPE>` and `<html>`), clashing with Power Pages templates | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:1`<br>`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:1` | Strip to content sections and let V7 templates own global HTML structure |
| IL-03 | High | Home | CSS hides the navbar entirely, leaving no navigation path out of the hero | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:47` | Adopt shared header and expose nav links in the rebuilt home page |
| IL-04 | Medium | Home (en-US) | Stylesheet reference omits `~/`, risking 404s in localized contexts | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/content-pages/Home.en-US.webpage.copy.html:8` | Point localized pages at the managed web file path before deployment |
| IL-05 | Medium | wizAssessment | Custom modal scaffolding bypasses Bootstrap behavior, leading to accessibility issues | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:6935` | Replace with `bootstrap.Modal` usage or componentize in V7 |
| IL-06 | Medium | scrDashboard_1LoD | Inline CSS block lacks a selector, hinting at brittle copy-paste fixes | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html:31` | Recreate dashboard layout with structured styles and linting |

## Open Questions
- Do we still need the search/forum substitution block in the header template, or can it be retired for V7 simplicity (`powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:167`)?
- What is the long-term data source for ROI and AI metrics so we can replace hard-coded assumptions (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html:1221`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html:7181`)?
- Should the design-system tokens remain as a web file or move into a component library for V7 (`design-system/rcsa-styles.css:7`, `design-system/rcsa-styles.css:1006`)?
- What updated website GUID and CLI profile should the team target for the rebuilt environment (`docs/PORTAL_REBUILD_PLAN.md:8`, `docs/PORTAL_REBUILD_PLAN.md:11`)?

## GUID Inventory
- Header web template ID `79e0f4a9-1505-4b82-8b98-968a23ea9629` (`powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.yml:2`).
- Page template ID `3ece66bc-d756-440a-be51-6e85dcebd2a5` used by Home, dashboard, and wizard pages (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.yml:9`).
- Publishing state ID `5c88a359-5719-44bf-928c-a320e34b4a07` shared across reviewed pages (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.yml:11`).
- Home page ID `88c12c7a-31f2-4b55-bea4-45f12fae67cb` (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.yml:14`).
- scrDashboard_1LoD page ID `d8bacd3b-12b4-fcc0-dd09-3b4a16f4a8a4` (parented to Home) (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/scrDashboard_1LoD.webpage.yml:9`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/scrDashboard_1LoD.webpage.yml:14`).
- wizAssessment page ID `a4b1faef-3422-778b-0ec4-4f4ab724cc68` (parented to Home) (`powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/wizAssessment.webpage.yml:9`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/wizAssessment.webpage.yml:14`).
- Prior rebuild target website GUID `ba6e57b7-0876-4771-b1db-b5608caa5530` (`docs/PORTAL_REBUILD_PLAN.md:11`).
