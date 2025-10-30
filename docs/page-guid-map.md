# V7 Page GUID Map

Snapshot of Power Pages GUIDs for the V7 site (`a73cd7d7-71c2-4e01-a147-de5dcbb80683`) downloaded on 2025-10-30 into `portal-snapshots/v7-pages/`. Use this reference when wiring Sprint 1 page registrations and navigation dependencies.

| Page | GUID | Navigation Parent | Source Path |
| --- | --- | --- | --- |
| Home | `ff3226c2-b362-456e-bc3a-93f91165b1a0` | `(root)` | `portal-snapshots/v7-pages/rcsa-copilot-demo-v7---rcsa-copilot-demo-v7/web-pages/home/Home.webpage.yml` |
| Dashboard | `baca011a-2023-437c-9fae-e8dbef66d129` | `Home (ff3226c2-b362-456e-bc3a-93f91165b1a0)` | `portal-snapshots/v7-pages/rcsa-copilot-demo-v7---rcsa-copilot-demo-v7/web-pages/dashboard/Dashboard.webpage.yml` |
| Wizassessment | `4f3e4f1f-142c-923a-21a1-f4d2557399d9` | `Home (ff3226c2-b362-456e-bc3a-93f91165b1a0)` | `portal-snapshots/v7-pages/rcsa-copilot-demo-v7---rcsa-copilot-demo-v7/web-pages/wizassessment/Wizassessment.webpage.yml` |
| Access Denied | `67444d67-d208-4f44-a758-d757926bdb9c` | `Home (ff3226c2-b362-456e-bc3a-93f91165b1a0)` | `portal-snapshots/v7-pages/rcsa-copilot-demo-v7---rcsa-copilot-demo-v7/web-pages/access-denied/Access-Denied.webpage.yml` |
| Page Not Found | `3eefef3d-cd1b-4bf8-ab82-fdaacb913b1b` | `Home (ff3226c2-b362-456e-bc3a-93f91165b1a0)` | `portal-snapshots/v7-pages/rcsa-copilot-demo-v7---rcsa-copilot-demo-v7/web-pages/page-not-found/Page-Not-Found.webpage.yml` |

All entries represent base webpage records (`*.webpage.yml`) captured via `pac paportal download --modelVersion Enhanced`. Content-specific locales live under the corresponding `content-pages/` folders within the snapshot.
