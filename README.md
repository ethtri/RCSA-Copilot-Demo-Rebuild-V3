# RCSA Copilot Demo Rebuild – Sprint 0 Scaffold

This repository captures the clean V7 working tree for the RCSA Copilot demo rebuild. Sprint 0 establishes an isolated space for experimentation and planning without touching the legacy V6 assets that remain in `C:\Projects\RCSA_Demp_V6`.

## What is here

- Baseline folder layout for future feature work (`src/pages/*`, `design-system`, `docs`, `tools`).
- `legacy-reference/` containing read-only copies of critical V6 artifacts used for context only.
- Bootstrap documentation describing priorities, decisions, and follow-up tasks before development sprints begin.

## Working agreements

1. Treat anything under `legacy-reference/` as immutable snapshots—do not edit or import directly into production bundles.
2. New UX, data, or automation assets belong in the fresh Sprint 0 structure (`src`, `design-system`, `tools`).
3. Reference the manifest in `docs/bootstrap-manifest.md` whenever adding or retiring copied legacy files.
4. Keep the repository free from environment-specific secrets and untracked build output. Use `.gitignore` as needed.

## Getting started

1. Review `docs/bootstrap-manifest.md` to understand which inputs were carried over from V6 and why.
2. Use the staged page folders under `src/pages` to prototype the new Home, Dashboard, and Wiz Assessment experiences.
3. Capture additional planning notes or research in `docs/`, keeping the manifest up to date for any new legacy references.

## Contributing next steps

- Open issues or feed backlog grooming notes into the project board before committing large changes.
- When copying new legacy assets, mirror their V6 path inside `legacy-reference/` and document the rationale in the manifest.
- Keep discussions about IA, UX, and technical spikes inside the repo so Sprint teams can track the evolution.

See `CONTRIBUTING.md` for the day-to-day workflow.
