# JomiGuard BD — LandTech 2026

A React + TypeScript prototype for explaining inconsistencies across **synthetic** land-record examples. It is a decision-support demo, not a legal opinion, ownership certificate, fraud probability, or government-connected service.

## Architecture

- `Frontend/` — npm workspaces monorepo
  - `apps/client` — public landing page, local demo sign-in, citizen workspace
  - `apps/admin` — separate admin app, local demo sign-in, case catalogue and evaluation/data governance views
  - `packages/shared` — shared API/types and explicit Bangla/English translation dictionary
- `Backend/` — separate Express + TypeScript API project, sample data and rule engine
- `docs/` — demo script and dataset evaluation plan

## Requirements

- Node.js 20+ recommended
- npm 10+

## Run locally

Terminal 1 — API:

```bash
cd Backend
npm install
npm run dev
```

Terminal 2 — frontend client:

```bash
cd Frontend
npm install
npm run dev:client
```

Terminal 3 — frontend admin:

```bash
cd Frontend
npm run dev:admin
```

- Client: `http://localhost:5173`
- Admin: `http://localhost:5174`
- API health: `http://localhost:4000/api/health` (when backend is running)

Frontend checks:

```bash
cd Frontend
npm run typecheck
npm run build
```

Backend checks:

```bash
cd Backend
npm install
npm run typecheck
npm test
```

## Demo sign-in and security

The sign-in is intentionally **local demo gating only**: any non-empty email/password pair opens the demo workspace, and the demo-access button is provided for quick walkthroughs. It is not secure authentication, does not verify credentials, and must not be represented as production security. Admin access is not protected by server-side role-based authorization. Do not deploy this prototype publicly until proper authentication, server-side RBAC, sessions, CSRF protection where applicable, audit logs, rate limiting, secure storage and privacy review are implemented.

## Features

- Public landing page with feature summary, process overview, clear CTA and footer
- Separate client and admin applications, each with sign-in gate
- Bangla/English language switch with shared explicit translation dictionary
- Dark/night and light theme; preference saved in browser local storage
- Client overview, sample case analyzer, findings/recommendations, JSON report export, print-friendly report, document-selection demo, illustrative ownership timeline, fictional plot explorer, checklist with progress and export, and field guide
- Admin overview, case search/filter, local reviewed-state persistence, JSON export, evaluation guidance, data governance and settings
- Synthetic demo records with clear limitations

## Data, OCR and claims

- Included case data is fictional.
- The document picker currently demonstrates the UI flow only. Bangla handwritten OCR/model inference is **not integrated** in this version.
- The map is illustrative only; no official cadastral geometry or GPS verification is connected.
- PostgreSQL schema is a starting point; API persistence is not configured by default.
- Do not upload real NID, phone numbers, signatures or identifiable land documents.
- Review dataset licences and attribution requirements before training or redistributing data.
- Report only measured OCR CER/WER and field-extraction precision/recall/F1. Never claim a target accuracy without a measured, documented evaluation.

## Data and AI sources

The repository's dataset plan should document source URL, dataset version, licence, attribution, labels/transcriptions, split strategy, preprocessing, metrics and known limitations. Sample deed-format sites are reference material, not official verification sources. Government API integration requires authorized access and applicable approval.
