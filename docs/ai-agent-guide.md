# AI Agent Operations Guide – Sprint 0 (Agent 0.3R)

## Purpose
Support numbered agents (0.x) executing Sprint 0 workstreams for the RCSA Copilot demo rebuild housed in `C:\Projects\RCSA-DEMO-V7-100325`. Use this guide alongside `docs/sprint-0-plan.md` to ensure consistent prompts, handoffs, and review practices derived from `docs/legacy-audit-sprint0.md` and `docs/bootstrap-manifest.md`.

## Environment Bundle
- **Editable workspace** (V7): `C:\Projects\RCSA-DEMO-V7-100325` (mirrors GitHub repo `https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V2`).
- **Legacy source of truth** (read-only): `C:\Projects\RCSA_Demp_V6` mirrored under `legacy-reference/**`.
- **Power Pages sandbox**: Org `org601a79e1.crm.dynamics.com`, website GUID `a73cd7d7-71c2-4e01-a147-de5dcbb80683`.
- **Key references**: `docs/sprint-0-plan.md`, `docs/legacy-audit-sprint0.md`, `docs/bootstrap-manifest.md`, `legacy-reference/docs/PORTAL_REBUILD_PLAN.md`, `legacy-reference/docs/rcsa-2lod-requirements.md`, `legacy-reference/HEADER_OPTIMIZATION_SUMMARY.md`.

## Copy-Paste Prompt Template
```markdown
**Role**: <e.g., "Agent 0.4 – Header/Nav Integrator">
**Objective**: <Tie to Sprint 0 plan Section 3 scope and tracker entry>
**Environment Bundle**:
- Workspace (editable): `C:\Projects\RCSA-DEMO-V7-100325`
- Legacy reference (read-only): `C:\Projects\RCSA_Demp_V6` / `legacy-reference/**`
- Sandbox GUID: `a73cd7d7-71c2-4e01-a147-de5dcbb80683`
- Audit: `docs/legacy-audit-sprint0.md`
- Manifest: `docs/bootstrap-manifest.md`
- Supplemental: `docs/sprint-0-plan.md`, `legacy-reference/docs/PORTAL_REBUILD_PLAN.md`, `legacy-reference/HEADER_OPTIMIZATION_SUMMARY.md`
**Deliverables**: <List repo-relative paths to create/update>
**Verification**: <Relevant DoD checklist items, preview/CLI evidence, reviewers>
**Open Questions / Escalations**: <What pauses work or requires human input>
```

## Required Inputs & Outputs per Handoff
- **Inputs**: Prompt template fields above, task ID (0.x), relevant DoD checklist from `docs/sprint-0-plan.md`, links to audit/manifest evidence, prior tracker entry.
- **Work Products**: Updated files within allowed directories (docs/, design-system/, src/, tools/), CLI logs saved under `tools/` or referenced via command output summaries, notes on legacy artifacts referenced.
- **Outputs**: Completed DoD checklist pasted into handoff, Sprint Tracker row updated (Section 9 of `docs/sprint-0-plan.md`), reviewer identified, and verification evidence attached (screenshots, command output snippets, etc.).

## Definition of Done Alignment
- Apply the DoD template from `docs/sprint-0-plan.md` Section 5; include checkbox results in handoff message or commit notes.
- Ensure repository-relative links to audit/manifest files appear in documentation updates.
- Record manual validation (Power Pages preview, accessibility checks) with timestamps in tracker comments.

## Version Control Rules
- Branch naming: `feature/<agent-id>-<short-task>` (e.g., `feature/0.4-header-nav`).
- Commits: Prefix with task ID (`0.4: Standardize header markup`) and keep messages scoped.
- Pull Requests: Reference agent ID and include DoD checklist in PR description; request review from role listed in Sprint Tracker.
- Never commit changes under `legacy-reference/**`; copy assets out before editing.
- Sync with `main` regularly; resolve conflicts locally before requesting review.

## Escalation Triggers
- Task requires editing read-only assets (`legacy-reference/**`, V6 directory) or modifying architecture beyond Sprint 0 scope.
- Sandbox behavior diverges from documented GUID/environment references (e.g., unexpected site markers).
- Missing artifacts (updated audit, manifest revisions) prevent DoD completion—pause work and request Product Owner guidance.
- Conflicting edits detected in shared templates/design tokens; coordinate with Agent Coordinator before proceeding.

## Handoff Checklist
1. Confirm tracker row updated with status, reviewer, DoD outcome.
2. Provide summary of changes referencing repository paths (e.g., `src/pages/home/index.html`).
3. Attach verification evidence or list command outputs (Power Pages CLI, linting results).
4. Log any decisions or follow-ups in `docs/sprint-0-plan.md` risk/dependency sections if impacted.
5. Notify next agent when sequential dependency clears (see Section 7 of `docs/sprint-0-plan.md`).

## Communication & Cadence
- Daily async update referencing tracker status transitions (Planned → In Progress → In Review → Complete).
- Mid-sprint sync (Day 7): Agents summarize DoD evidence, highlight blockers tied to audit/manifest.
- Sprint review (Day 14): Share final deliverables list, confirm risks mitigated, and prep Agent 0.4+ backlog.

## References
- `docs/sprint-0-plan.md` – Goals, agent catalog, tracker, DoD template.
- `docs/legacy-audit-sprint0.md` – Reuse decisions and risk context.
- `docs/bootstrap-manifest.md` – Asset provenance and required updates.
- `README.md`, `CONTRIBUTING.md` – Repo hygiene and contribution standards.

Keep this guide aligned with the Sprint 0 plan; log adjustments in the Sprint Tracker when conventions change.
