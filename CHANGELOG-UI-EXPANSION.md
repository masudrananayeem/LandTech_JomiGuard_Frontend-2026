# JomiGuard BD — UI Expansion

## Added client interfaces
- Overview landing workspace with feature shortcuts and metric cards
- Land analyzer with case search, risk filter, report view and print layout
- Document desk with upload validation feedback and OCR pipeline status
- Ownership timeline view
- Schematic plot explorer (clearly marked not to scale / not cadastral)
- Interactive buyer checklist with progress and print support
- Activity & field guide with evaluation and privacy guidance
- About project page
- Expanded responsive footer with navigation and disclaimers
- Responsive sidebar/mobile navigation and toast feedback

## Added admin interfaces
- Overview and readiness checklist
- Searchable/filterable case catalogue with local review toggles
- Evaluation centre distinguishing synthetic rule tests from OCR metrics
- Data governance and source register
- Settings/notes and synthetic JSON export
- Footer and responsive navigation

## Still not implemented
- Actual OCR inference / trained Bangla handwriting model
- Government API integration or official record verification
- Persistent PostgreSQL-backed API data
- Admin authentication, authorization and audit logging
- Real cadastral GIS layers

## Validation
The project archive was updated, but dependency installation timed out in the authoring environment. Run `npm install`, `npm run typecheck`, and `npm run build` locally before relying on it for the hackathon demo.
