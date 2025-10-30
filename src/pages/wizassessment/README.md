# WizAssessment Page Skeleton (Agent 1.6A)

## Overview
- Page shell: `index.liquid` extends `src/templates/layouts/default.liquid` and registers the Wizassessment GUID (`4f3e4f1f-142c-923a-21a1-f4d2557399d9`) in the document head for Power Pages mapping.
- Sections live under `sections/`:
  - `hero.liquid` – marketing hero placeholder with GUID and schema metrics (step/mode counts updated by the stepper module).
  - `stepper-shell.liquid` – renders the wizard controls container and wires data attributes (`data-stepper-root`, `data-mock-url`) consumed by the module.
  - `summary-placeholder.liquid` – reserves insight/export real estate and exposes a lightweight state dump for quick validation.
- Client module: `modules/stepper.js` loads `src/data/wizard-insights.mock.json`, hydrates the step list, updates hero metrics, and publishes the current mode/step for downstream components.

## Notes for Agent 1.6B
1. Replace the hero and summary placeholder content with final copy/UX once the design system components are available; keep the GUID bindings intact.
2. Update `stepper.js` once the data contract adds explicit `process.steps[]` definitions. Currently the script synthesises labels from `process.stepCount` and logs a warning because the schema lacks step metadata (escalation logged in Sprint tracker).
3. Extend `setActiveStep` to swap real modules (risk selection, control mapping, insights) into `data-stepper-content`. The placeholder card illustrates the slot boundary.
4. Continue using `updateSummary()` to expose minimal state snapshots for reviewer validation; expand payload as orchestrators evolve.

## Verification & Preview
- Data contract validation: `npm run test:data-contracts`.
- Local preview: run the static dev server (`npm run dev` if available) or open the built page and observe:
  - Wizard mode selector populated from `process.modes`.
  - Step buttons generated from the mock (currently “Step 1…N” via fallback).
  - Hero metrics and summary state dump updating as you switch steps/modes.

## Open Items
- Schema gap: `docs/data-contracts/wizard.schema.json` does not expose step metadata. Follow up with the data stewardship team to add `process.steps[]` so the UI can present canonical labels and descriptions.
