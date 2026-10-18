# LandTech 2026 Concept Note Outline (maximum 4 pages)

**Project:** JomiGuard BD — Explainable pre-registration transaction screening  
**Chosen problem:** P3 — Catch Fraud & Double-Selling  
**Team/leader:** [fill in]  
**Faculty mentor:** [fill in]  
**Industry mentor:** [fill in]

## 1. Problem in Bangladesh
Land transactions may involve repeated deed identifiers, ownership/transfer inconsistencies, or differences between deed, mutation and parcel records. Citizens and reviewers need understandable signals that tell them which supplied fields require further verification.

## 2. Proposed solution
JomiGuard BD compares supplied transaction evidence with a fictional case history and produces explainable screening results. It is a decision-support prototype and is not an official title search or legal conclusion.

## 3. How it works
- User selects a synthetic scenario or supplies synthetic evidence.
- The rule engine runs eight deterministic checks.
- The interface displays PASS/WARNING/FAIL, a screening score, explanations and next steps.
- User can export a JSON report for the demonstration.

## 4. Architecture and technology
- Client and admin: React, TypeScript, Vite.
- API: Cloudflare Worker using Hono.
- Authentication: Firebase Authentication; admin access checks a Firestore user role.
- Image storage: Cloudinary signed upload flow for profile images only.
- Data in the hackathon demo: fictional, bundled synthetic records only; no government APIs or scraped records.

## 5. Core features and expected users
Sub-Registry reviewers, citizens/buyers, lawyers and land-sector teams can use this concept as a pre-review checklist. It flags potential inconsistencies; a qualified person must verify official certified records.

## 6. Evaluation plan
Describe the seven synthetic scenarios and the expected rule outcomes. Report only test results actually obtained. This is a deterministic rules prototype, not an OCR/ML accuracy benchmark. Do not claim real-world fraud detection accuracy.

## 7. Nationwide use and safeguards
A future authorized pilot could integrate certified sources only under formal agreements and applicable access controls. This submission does not scrape or connect to government systems. Never upload real personal data for the demo.

## 8. AI/tools and credits
[List the AI coding tools actually used, open-source libraries, image/font sources, licenses and attributions. Students must be able to explain all submitted code.]
