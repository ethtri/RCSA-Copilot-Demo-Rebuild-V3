# Legacy Reference Assets

This folder stores read-only snapshots from the V6 workspace at `C:\Projects\RCSA_Demp_V6`. They exist strictly for historical context, design comparison, and requirements traceability.

## Usage guidelines

- Do not edit files in place. If you need to modify or import an artifact, copy it into the active Sprint 0 structure (`src`, `design-system`, `docs`, etc.) and note the relationship in `docs/bootstrap-manifest.md`.
- Preserve original relative paths when adding new references so contributors can quickly cross-reference the V6 source.
- Append `_legacy` to the filename only when a naming conflict would otherwise occur in this repository.

Each file added here must have an entry in `docs/bootstrap-manifest.md` describing why it was copied.
