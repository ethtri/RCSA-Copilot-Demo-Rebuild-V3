# Contributing Guide

This Sprint 0 scaffold exists to prepare follow-on development sprints for the RCSA Copilot demo rebuild. Follow the practices below to keep the fresh V7 workspace organized and traceable.

## Branch & commit flow

- Develop work on task-focused branches; keep `main` clean and deployable.
- Reference Azure DevOps or GitHub issue IDs in branch names and commit messages where possible.
- Use concise commits grouped by logical change—documentation, scaffolding, style experiments, etc.

## Working with legacy artifacts

- Legacy inputs live only under `legacy-reference/`. Preserve their original relative path (e.g., `legacy-reference/powerpages/...`) and avoid editing the copies.
- Record every added artifact and its purpose in `docs/bootstrap-manifest.md` so future contributors know why it is present.
- If you need to transform a legacy asset, create a new file outside `legacy-reference/` and cite the source snapshot.

## Adding new assets

- Place reusable styling or design tokens in `design-system/`.
- Create new feature code under `src/pages/{home,dashboard,wizassessment}` or deeper sub-folders as needed.
- Document architecture decisions, research findings, or sprint rituals in `docs/`.
- Store automation scripts in `tools/` with inline usage instructions.

## Quality expectations

- Prefer automated linting/testing when available; add scripts under `tools/` as they materialize.
- Keep documentation up to date with the manifest and README as plans evolve.
- Before merge, validate that `.gitignore` is preventing local secrets or build outputs from accidentally committing.
