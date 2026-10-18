# JomiGuard BD — Frontend Monorepo

React + TypeScript + Vite npm workspaces with separate client and admin apps and shared packages.

## Apps
- `apps/client` — public landing page, user workspace and authentication UI.
- `apps/admin` — administration interface.
- `packages/shared` — shared translations and utilities.
- `firebase/` — Firestore and Storage security rules to apply in Firebase Console.

## Install and run
```bash
npm install
npm run dev:client
# in another terminal
npm run dev:admin
```

## Build
```bash
npm run build -w @jomiguard/client
npm run build -w @jomiguard/admin
```

Copy `apps/client/.env.example` to `apps/client/.env.local` and fill in Firebase web app values. Never commit real secrets. See `DEPLOY-FIREBASE-CLOUDFLARE.md` for Firebase and Cloudflare setup.

**Status:** starter/prototype. Configure Firebase providers, authorized domains, Storage, Firestore rules and API base URL, then test the full flows before production use. Cloudflare Pages deployment is not performed automatically by this repository.

## Transaction screening workspace

The Client monorepo includes a BhumiGuard-inspired transaction screening workspace with a Bangla-first transaction review flow, six controlled synthetic scenarios, custom evidence controls, eight rule-by-rule PASS/WARNING/FAIL outputs, risk summary, downloadable JSON report and a legal-safety disclaimer. It calls the separate backend at `VITE_API_URL` (default `http://localhost:4000/api`).

This is a synthetic decision-support demo, not official ownership verification. Do not submit real personal land documents to the demo.
