# LandTech 2026 Rulebook Compliance — JomiGuard BD

This project is aligned to the uploaded **LandTech 2026 Rule Book, Version 1.2**. The chosen primary problem statement is **P3: Catch Fraud & Double-Selling** (Rule Book, Section 5). The prototype screens supplied deed/transaction references against a fictional history and surfaces review signals; it does not access government registries.

## Rulebook requirements mapped to this repository

| Rulebook requirement | Project implementation / action |
|---|---|
| Choose one of P1–P6 and name it in concept note (Section 5) | Primary problem: **P3 — Catch Fraud & Double-Selling**. Keep the submission focused on this problem. |
| Original project; no uncredited copying (Section 10) | Keep source credits and license notices. Explain the code during judging. Any reused third-party code/assets must be credited. |
| Use dummy data or organizer-provided samples; do not use real people or land records (Section 10; FAQ) | All bundled people, deeds, parcels, and transaction IDs are fictional synthetic IDs. Never import real NID, names, phone numbers, signatures, or identifiable deeds. |
| Do not scrape/bulk-download government websites (Section 10) | No government scraping or official registry integration is implemented. Do not add one without organizer approval. |
| Test security only on your own system (Section 10) | Only test this app and local/deployed resources you control. |
| AI tools allowed but list them and explain code (Section 10; FAQ) | Update the AI/tool disclosure in README to reflect the tools actually used by the team. Students must review and understand the implementation. |
| Preserve authentic Git history (Section 10) | Commit normally; do not fabricate or erase history. |
| Round 1 concept note PDF up to 4 pages (Section 8) | Use `docs/CONCEPT_NOTE_OUTLINE.md` as a writing checklist; export the final concept note to PDF and keep it within 4 pages. |
| Code link + README (Section 8) | Each repo has setup notes; use the main README and this compliance file. Publish a GitHub/GitLab link that judges can access. |
| Demo video up to 3 minutes (Section 8) | Use `docs/DEMO_SCRIPT.md`, record a real demo, and keep the final video at or under 3 minutes. |
| Live link optional but recommended (Section 8) | Deploy only after configuring and testing the environment; do not call it live until tested. |

## Main prototype features (P3-focused)

1. Eight explainable checks for deed ID reuse, seller/buyer/parcel references, seller ownership, transfer-area limits, possible same-portion sale, and mutation-owner mismatch.
2. Seven controlled synthetic scenarios, including positive baseline, duplicate deed, possible double-sale, ownership mismatch, area over-transfer, mutation mismatch, and missing evidence.
3. Rule-by-rule PASS / WARNING / FAIL output with recommended next steps.
4. JSON report export and a bilingual (Bangla/English) client/admin interface.

## Important limitations

- These checks only evaluate evidence supplied to this prototype. They do not prove fraud, legal title, ownership, or document authenticity.
- The synthetic scenarios are software test fixtures, not representative real-world prevalence data.
- No OCR model, seal authentication model, government API, cadastral map feed, or official registry connection is claimed as implemented.
- No accuracy/precision/recall/F1 numbers are claimed. Report metrics only after a documented, permission-compliant and manually labelled evaluation.
- Before submission, the team must run the install/build/test commands, record actual results, fill in team/mentor details, add source credits, and confirm all statements match the final code.

## Rulebook reference

LandTech 2026 — LandTech Innovation Hackathon, Rule Book v1.2, especially Sections 5, 8, 10, 11 and FAQ. See the rulebook supplied by the team for the full official wording.
