# CLI Rehearsal Log – 2025-10-30

Captured commands and non-sensitive output while auditing V7 Power Pages GUIDs.

| Command | Notes | Key Output |
| --- | --- | --- |
| `pac auth list` | Run via `C:/Users/etrifari/.nuget/packages/microsoft.powerapps.cli/1.50.1/tools/pac.exe` | Active profile `etrifari@captechventures.com` mapped to `https://org601a79e1.crm.dynamics.com/`. |
| `pac paportal list --environment https://org601a79e1.crm.dynamics.com` | Validated site catalog | Located V7 site `a73cd7d7-71c2-4e01-a147-de5dcbb80683`. |
| `pac paportal download --modelVersion Enhanced --webSiteId a73cd7d7-71c2-4e01-a147-de5dcbb80683 --path portal-snapshots/v7-pages` | Snapshot stored for read-only reference | Output confirms download + manifest update in 10.79s. |
