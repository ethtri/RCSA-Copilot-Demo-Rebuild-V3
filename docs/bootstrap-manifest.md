# Bootstrap Manifest

This document logs every asset introduced during Sprint 0 scaffolding, especially legacy references imported from the V6 workspace. Update the tables below whenever you add, relocate, or remove files within this repository.

## Repository structure

| Path | Purpose |
| ---- | ------- |
| `docs/` | Planning notes, manifests, and decision records. |
| `design-system/` | Future design tokens, shared UI assets, and style experiments. |
| `legacy-reference/` | Read-only V6 snapshots for historical comparison. |
| `src/pages/home/` | Home page rebuild workbench. |
| `src/pages/dashboard/` | Dashboard (1LoD/2LoD) rebuild workbench. |
| `src/pages/wizassessment/` | Wizard assessment rebuild workbench. |
| `tools/` | Automation and developer tooling scripts. |

## Legacy asset manifest

| Copied File | Source (V6) | Reason for Inclusion |
| ----------- | ----------- | -------------------- |
| `legacy-reference/design-system/rcsa-styles.css` | `design-system/rcsa-styles.css` | Baseline design tokens and utility classes used by V6 pages. |
| `legacy-reference/docs/PORTAL_REBUILD_PLAN.md` | `docs/PORTAL_REBUILD_PLAN.md` | Legacy rebuild plan highlighting scope and sequencing decisions. |
| `legacy-reference/docs/rcsa-2lod-requirements.md` | `docs/rcsa-2lod-requirements.md` | Functional requirements captured for 2LoD oversight. |
| `legacy-reference/HEADER_OPTIMIZATION_SUMMARY.md` | `HEADER_OPTIMIZATION_SUMMARY.md` | Summary of header UX adjustments to inform new information architecture. |
| `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html` | `powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html` | Original portal header template for comparison during redesign. |
| `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html` | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html` | Snapshot of the wizard assessment experience to map migration gaps. |
| `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html` | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/Home.webpage.copy.html` | High-level home page shell used to understand navigation flow. |
| `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/content-pages/Home.en-US.webpage.copy.html` | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/home/content-pages/Home.en-US.webpage.copy.html` | Localized home page content block for reference while rewriting copy. |
| `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html` | `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html` | Dashboard layout snapshot to guide 1LoD dashboard rebuild. |

## Pending assets / follow-up

- Identify design token delta between `rcsa-styles.css` and planned Sprint 1 styling approach.
- Audit remaining Power Pages templates to determine additional snapshots needed.
