# JomiGuard BD — LandTech 2026 MVP

**AI-assisted land-document inconsistency screening** for Bangladesh. The MVP compares manually entered/extracted fields across sample deed, khatian and mutation records, explains discrepancies, and produces a review report. It is a decision-support prototype, not a legal ownership verdict.

## Repository layout
- `Frontend/`: npm workspaces monorepo with `apps/client`, `apps/admin`, and `packages/shared`.
- `Backend/`: standalone Express + TypeScript API (deploy as a separate repository).

## Prerequisites
Node.js 20+ and npm 10+. PostgreSQL is optional for this demo; current API uses a clearly labelled synthetic JSON dataset so it runs immediately.

## Run locally
Terminal 1:
```bash
cd Backend
npm install
npm run dev
```
Terminal 2:
```bash
cd Frontend
npm install
npm run dev:client
```
Client: http://localhost:5173

Terminal 3 (optional admin):
```bash
cd Frontend
npm run dev:admin
```
Admin: http://localhost:5174

API health: http://localhost:4000/api/health
Admin prototype: demo-only, no authentication yet. Do not expose it publicly until proper authentication/RBAC is implemented.

## MVP features
1. Search three synthetic Bangladesh land cases (low, medium, high discrepancy).
2. Compare owner, dag, khatian, area, deed number/date and mutation fields.
3. Explain mismatch findings with a deterministic weighted risk score.
4. Upload a document image/PDF for OCR endpoint (OCR adapter is optional/configurable; MVP stores no uploaded file permanently and warns OCR output needs review).
5. Admin view of cases, findings and test/evaluation summary.

## API
- `GET /api/health`
- `GET /api/cases`
- `GET /api/cases/:id`
- `POST /api/analyze` with `{ "caseId": "case-high" }` or `{ "records": [...] }`
- `POST /api/ocr/preview` multipart form field `document` (image/PDF; returns extraction status/instructions; OCR provider can be plugged in)
- `GET /api/metrics` synthetic rule-engine test summary

## Scoring
Risk score 0–100 is a **rule-based screening score**, not probability of fraud. It is calculated from measured record inconsistencies: owner mismatch (25), dag/khatian mismatch (20), area mismatch (20), deed/date issue (10), mutation mismatch (15), incomplete fields (10), capped at 100. Thresholds: 0–20 low, 21–45 moderate, 46–70 high, 71–100 critical. Each finding includes evidence and a suggested human follow-up.

## Data & sources
- Synthetic demo data in `Backend/data/cases.json`; all names and identifiers are fictional.
- Candidate handwritten dataset: [Bangla Handwritten Dolil Dataset (653 images), Mendeley Data](https://data.mendeley.com/datasets/yk3c3xy9vm/1), DOI `10.17632/yk3c3xy9vm.1`, CC BY 4.0 as listed by its publisher. Review its current licence/terms and cite it before using in a competition submission.
- Sample deed formats: [Land Registration BD sample deeds](https://landregistrationbd.com/category/দলিলের-নমুনা-sample-deed/), [Saf Kabla sample](https://landregistrationbd.com/সাফ-কবলা-দলিলের-নমুনা/), [Baynapotro sample](https://landregistrationbd.com/বায়নাপত্র-দলিলের-নমুনা-sample/), [Partition deed sample](https://landregistrationbd.com/বন্টননামা-দলিলের-নমুনা/).
- Government form reference: [DLRS forms](https://dlrs.gov.bd/views/all-forms/6922d9f0933eb65569e0132a). Check download, usage and attribution terms before redistribution.
- The NLM dataset-catalog URL supplied in the brief was not confirmed as a Bangladesh land-document dataset; validate the dataset title, licence and relevance before using it.

No government API is connected. Never upload real NID, deed scans or personal data to this demo. No claim of legal validity, fraud determination, or verified ownership is made.

## Evaluation
`npm test` in Backend runs deterministic tests for the rule engine. `GET /api/metrics` reports rule-test pass rate over the built-in labelled synthetic cases; this is **not OCR accuracy** and must not be reported as model accuracy. OCR field accuracy / CER / WER should be measured separately on a held-out, manually transcribed dataset before making performance claims.

## Production checklist
- Add PostgreSQL/PostGIS migrations and authenticated user roles.
- Use secure object storage, retention limits, consent, encryption and audit logs.
- Add actual OCR provider/model and train/validate on licensed handwritten Bangla data.
- Add dataset split strategy at document/page level to prevent leakage.
- Add human review workflow and legal expert review; verify with authorized official records only.
- Add admin authentication/RBAC, rate limiting, antivirus file scan and deployment secrets.

## License
Prototype code: MIT. Dataset and third-party document samples remain under their respective licences/terms.

## UI expansion update (2026-10-16)

The client workspace now has a responsive sidebar and these views:

- **Overview** — hero, workspace snapshot, feature shortcuts and safety callout.
- **Land analyzer** — searchable/filterable synthetic scenarios, transparent findings, comparison table and print-to-PDF.
- **Document desk** — upload validation UI and clearly labelled OCR pipeline stages (OCR itself is not implemented here).
- **Ownership timeline** — illustrative historical event timeline with record-gap explanations.
- **Plot explorer** — schematic, explicitly non-cadastral plot layout and property details.
- **Buyer checklist** — ten interactive due-diligence checklist items and print support.
- **Activity & field guide** — scope, evaluation metrics and privacy explanations.
- **About JomiGuard** — mission, approach and prototype limitations.
- **Expanded footer** — workspace/resource navigation, synthetic-data notice and legal/safety disclaimer.

The admin app now includes Overview, Case Catalogue (search/filter/review toggles), Evaluation Centre, Data Governance, and Settings/Notes (including JSON export of synthetic cases). Review state is local to the current browser session and is not persisted to a database.

### Run

From `Frontend/`:

```bash
npm install
npm run dev:client
# second terminal
npm run dev:admin
```

From `Backend/`:

```bash
npm install
npm run dev
```

Client default URL: `http://localhost:5173`; admin default URL: `http://localhost:5174`; backend default URL: `http://localhost:4000`.

### Important status note

This UI expansion does not add a trained Bangla OCR model, official land-record integrations, persistent PostgreSQL API storage, or admin authentication/RBAC. The plot map is schematic, not a cadastral map. Do not upload real sensitive documents or claim legal ownership verification. Dependency installation and full builds must be run locally before submission; the build could not be fully verified in the authoring environment.
