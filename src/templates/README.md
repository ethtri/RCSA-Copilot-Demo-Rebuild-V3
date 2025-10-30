# Shared Templates

This directory contains the shared layout chrome introduced in Sprint&nbsp;1 Stream&nbsp;1.2. The Liquid layout and includes follow the contract defined in `docs/target-architecture-blueprint.md:40-52` and align to the sprint tracker expectations in `docs/sprint-1-plan.md:12`, `docs/sprint-1-plan.md:34`.

- `layouts/default.liquid` injects the design system stylesheets, renders the shared header/footer, exposes `main` as the content slot, and ships an analytics JSON stub that downstream instrumentation can replace (`docs/target-architecture-blueprint.md:45`, `:104`).
- `includes/header.liquid` preserves the legacy active-state routing logic (`legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header/Header.webtemplate.source.html:12`) while consuming nav data from `includes/navigation.json.liquid`. Visual styling relies on design-system tokens; rerun `npm run build:design-system` whenever header classes change so `design-system/dist/rcsa-components.css` stays in sync.
- `includes/navigation.json.liquid` centralises the primary nav contract (`label`, `href`, `icon`) referenced across pages and enables future build-time validation.
- `includes/footer.liquid` provides the gradient placeholder required for 2LoD parity (`legacy-reference/docs/rcsa-2lod-requirements.md:96`) until a bespoke component is delivered.

Preview guidance:
1. Run `npm run build:design-system` to regenerate CSS (required before local Liquid previews so new header/footer tokens resolve).
2. Render pages with `layout: "default"` so the shared chrome loads; the header expects Bootstrap 5 assets already bundled via the layout.
