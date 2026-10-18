# JomiGuard BD — LandTech 2026

**Selected problem statement: P3 — Catch Fraud & Double-Selling** (LandTech 2026 Rule Book v1.2, Section 5).

JomiGuard BD is an explainable, synthetic-data-only pre-registration screening prototype. It checks supplied deed/transaction references for duplicate deed IDs, missing references, seller ownership conflicts, transfer-area issues, possible same-portion sales, and mutation-owner mismatches. Results are screening signals, not proof of fraud, legal title, or ownership.

## Repository layout

- `apps/client` — bilingual public demo and transaction screening UI.
- `apps/admin` — admin workspace; Firebase role verification is required when configured.
- `packages/shared` — shared translations and API configuration.
- `firebase/` — Firestore and Storage rules to review and apply.
- `docs/CONCEPT_NOTE_OUTLINE.md` — outline for the rulebook's maximum-four-page concept note.
- `docs/DEMO_SCRIPT.md` — demo plan designed for a maximum-three-minute recording.
- `RULEBOOK_COMPLIANCE.md` — mapping to the supplied LandTech 2026 Rule Book v1.2.

## Requirements

- Node.js 20+ and npm.
- Firebase project only if you want to test live sign-in/profile functions.
- Cloudflare account for Worker/Pages deployment.
- Cloudinary account for signed profile-photo uploads.

## Run locally

Terminal 1 — API:

```bash
cd JomiGuard-Backend-Repo/cloudflare-worker
npm install
npm run dev
```

Terminal 2 — Client:

```bash
cd JomiGuard-Frontend-Repo
npm install
cp apps/client/.env.example apps/client/.env.local
npm run dev:client
```

Terminal 3 — Admin:

```bash
cd JomiGuard-Frontend-Repo
cp apps/admin/.env.example apps/admin/.env.local
npm run dev:admin
```

Set `VITE_API_URL` in both frontend env files to `http://localhost:8787/api` when using Wrangler's default local port. The API's health route is `http://localhost:8787/api/health`. The Vite client normally uses port 5173 and admin uses port 5174; confirm the printed terminal URLs.

## Verify before submission

```bash
# Frontend repository
npm run typecheck
npm run build

# Backend Worker repository
npm run typecheck
```

For the separate Node/Express reference backend in `JomiGuard-Backend-Repo`, use its own README and scripts; the Cloudflare Worker is the deployment target described in the Cloudflare guide. If installation or any command fails, document the actual error and resolve it before claiming a successful build. Do not report tests/builds as passed unless you ran them.

## Production deployment

Follow `DEPLOY-FIREBASE-CLOUDFLARE.md`. Configure the exact Client and Admin origins in Worker `CORS_ORIGINS`, set the frontend `VITE_API_URL` to the deployed Worker URL plus `/api`, and configure secrets with Wrangler/Cloudflare. Cloudflare Pages builds are not automatic until the repository is connected and build settings/environment variables are saved.

## Rulebook data and safety commitments

- All included people/deed/parcel IDs and case data are fictional.
- Do not use real NID, phone numbers, signatures, names tied to actual records, or real land documents. The rulebook allows only dummy data unless organizers approve a fully anonymized document.
- Do not scrape or bulk-download government websites; do not test security on systems you do not own.
- There is no official government registry connection, OCR model, or trained AI model claimed in this version.
- No OCR accuracy, fraud-detection accuracy, precision, recall or F1 is claimed. Add metrics only after a reproducible, documented evaluation.
- Update the AI-tools and third-party credits section below to reflect the actual tools and assets used by the team. Students must understand and be able to explain the submitted code.

## AI tools and third-party credits

The team must list the AI tools actually used, the open-source libraries and their licenses, and any external assets/data sources actually included. Do not claim a dataset or model was used unless it is present and documented. React, Vite, TypeScript, Firebase SDK, Hono, Wrangler and Lucide React are dependencies; their license details are available from their package metadata.

## Limitations

This is a prototype, not legal advice or an official verification service. It only evaluates supplied synthetic evidence. A result must not be presented as a definitive statement that a deed is fake or that a person owns a plot. Real-world use would require authorized data access, legal review, security review and agreements.
