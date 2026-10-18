# BhumiGuard reference adaptation

The uploaded `BhumiGuard-BD-main.zip` was reviewed as a product/workflow reference. The JomiGuard React client now includes a transaction-first screening workspace inspired by the reference's documented ideas: validated synthetic scenarios, custom transaction evidence, rule-by-rule PASS/WARNING/FAIL output, risk summary, evidence summary, downloadable screening report, Bangla/English labels, and a legal-safety disclaimer.

The implementation remains in the existing React/npm monorepo and calls the separate Node/Express backend. The Python/Streamlit implementation from the reference archive has not been copied into the frontend or represented as a connected service. The transaction engine currently uses synthetic records only; it does not connect to Bangladesh government land registries or establish legal title.
