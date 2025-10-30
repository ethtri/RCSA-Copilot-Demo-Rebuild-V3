# RCSA Demo Relaunch Plan

## Current Direction
- Provision a brand-new Power Pages site in the sandbox environment and scaffold pages to mirror the previous demo (Home, wizAssessment, scrDashboard_1LoD, etc.).
- Keep navigation labels and page hierarchy consistent so existing content blocks and links can be ported over with minimal rewriting.
- Migrate the static HTML/CSS/JS from the repository into the new site page by page, updating navigation targets, variables, and resource links for the new structure.
- Validate each page in Power Pages Studio as it is migrated, then publish once end-to-end flow works without security or binding issues.
- Latest rebuild target: **RCSA Copilot Demo V4**  
  - Public URL: `https://rcsa-copilot-demo-v4.powerappsportals.com/`  
  - Editor: `https://make.powerpages.microsoft.com/e/ffbe8b10-3cb8-e700-ac43-948a883dee17/sites/ba6e57b7-0876-4771-b1db-b5608caa5530`  
  - Website GUID: `ba6e57b7-0876-4771-b1db-b5608caa5530`

## Lessons Learned from First Attempt
- Trial-to-sandbox migrations can leave behind orphaned root pages and site markers that are difficult to reconcile, even when content uploads succeed.
- Reliance on cached configuration, combined with limited visibility into GUIDs from the Portal Management UI, makes troubleshooting 404 issues time-consuming.
- Uploading the entire site via CLI is fast, but ensuring the runtime host resolves to the imported homepage still requires careful binding, marker, and cache management.
- Having a working “fallback” route (`/rcsa-home`, `/ai-home`) proved the content was intact; the blocker was the host configuration rather than missing assets.
- Given the demo uses static data, rebuilding in a clean site provides more predictable results than continuing to chase environmental inconsistencies.
- The Power Platform CLI (`pac`) is installed via the MSI (`https://aka.ms/PowerAppsCLI`); locate the installed binaries under `C:\Users\<user>\.nuget\packages\microsoft.powerapps.cli\<version>\tools` and prepend that path to `PATH` for each shell session (for example: `$env:PATH = 'C:\Users\etrifari\.nuget\packages\microsoft.powerapps.cli\1.50.1\tools;' + $env:PATH; pac auth list`).

## Immediate Next Steps
- Create and name the new pages in the fresh site so they align with the folders and references in the repository.
- Hand off once the skeleton is ready so the existing code can be copied over and adjusted for the new environment.
- Smoke-test navigation and published output early to catch any new permalink or layout regressions before migrating all content.

## Power Pages CLI Deployment Checklist
- Authenticate once per workstation with `pac auth create --url https://org601a79e1.crm.dynamics.com --name RCSA-Prod` and select the profile before uploading.
- From the repo root, push the site artifacts that live under `powerpages/rcsa-copilot-demo---rcsa-demo/` with  
  `pac powerpages upload --path powerpages/rcsa-copilot-demo---rcsa-demo --webSiteId <guid> --modelVersion 2`  
  (swap `<guid>` for the Website GUID listed above; add flags such as `--language en-US` or `--overwrite` when necessary).
- After the upload finishes, verify the pages in Power Pages Studio, clear cache via `https://<site>/_services/about`, and publish.
- Some trial tenants render a blank screen at `/ _services/about`. If that happens, skip it and use Studio’s **Sync configuration** or a quick publish instead of attempting the unsupported cache clear.
- If you make fixes directly in Studio, pull them back into the repo with  
  `pac powerpages download --path powerpages/rcsa-copilot-demo---rcsa-demo --webSiteId <guid> --modelVersion 2`  
  before committing to keep git in sync with the live site.

## Prompting Guidance for New Agents
- Start each agent with the environment URL, site GUID, and target pages (Home `/`, `scrDashboard_1LoD`, `wizAssessment`) so navigation wiring is predictable.
- Reinforce Power Pages constraints: enhanced data model, use uploaded web files for CSS/JS, clear cache via `_services/about`, navigate using partial URLs.
- Provide path references to the legacy assets (`powerpages/rcsa-copilot-demo---rcsa-demo/...`) and note that all data is static dummy content.
- Assign explicit deliverables (e.g., “Port wizAssessment HTML/CSS”, “Recreate scrDashboard cards”) and require Studio previews before handoff.
- Encourage agents to document page IDs or site markers in this file as they work to keep the team aligned.
- Always ensure the header web template includes CDN references and `~/design-system/rcsa-styles.css` (use a versioned query string to bust cache) before running any CLI upload to avoid stripping the design system.

## Experience Architecture Notes
- The `wizAssessment` flow remains a single-page experience to preserve demo fidelity, but break the markup into logical sections (hero overview, risk evaluation, automation insights, submission) using partial templates or Liquid includes to keep maintenance manageable.
- Where practical, reuse components (cards, accordions, callouts) built in the `design-system/rcsa-styles.css` file and align with the standards captured in `docs/rcsa-2lod-requirements.md` and `HEADER_OPTIMIZATION_SUMMARY.md`.
- Maintain cross-page UX consistency: top navigation, breadcrumb cues, and action buttons should follow our CX patterns (primary CTA on the right, contextual links below, etc.).
- Consider future agility by isolating dummy data values inside snippets or data files so content tweaks don’t require page rewrites.
