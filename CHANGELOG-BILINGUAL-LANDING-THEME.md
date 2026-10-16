# Bilingual, theme and entry-flow update

- Replaced fragile text-node mutation translation with an explicit shared `t(key, locale)` dictionary for interface copy.
- Added a public client landing page with feature overview, process steps, sample analysis visual, call-to-action and complete footer.
- Added local demo sign-in gates before entering client and admin workspaces, plus demo-access buttons.
- Added consistent shared CSS design tokens so cards, tables, inputs, notices, map demo, footers, and panels use the same dark/light theme variables.
- Language and theme preferences persist in local storage and apply across the client/admin apps in the same browser profile.
- Expanded functional flows: sample-case selector, rule findings, JSON report export, print report, file-selection state, map plot selection, checklist progress/reset/export, admin search/filter, reviewed-case persistence, and case JSON export.
- Added explicit caveats: demo sign-in is not secure production authentication; OCR is not integrated; map is illustrative; data is synthetic; no government connection is present.

## Validation status

Source files and ZIP structure were checked. A complete TypeScript/Vite build could not be run in this environment because npm dependency installation could not complete (registry access timed out and packages were not cached). Run `npm install`, `npm run typecheck`, and `npm run build` locally before submission.
