# JomiGuard BD — production setup and deployment

This repo is the frontend monorepo: `apps/client`, `apps/admin`, `packages/shared`. The API repo is separate at `../JomiGuard-Backend-Repo`.

## Important: what is and is not preconfigured

- Client uses Firebase Authentication (email/password, Google popup, password reset) when Firebase web configuration is supplied.
- Admin login now checks Firebase Authentication **and** `users/{uid}.role == "admin"`. A localStorage flag is not accepted as authentication.
- Profile photos upload to Cloudinary through a signed upload signature from the Cloudflare Worker. Firebase Storage is not used for profile pictures.
- Cloudflare Worker API provides health, synthetic demo cases, a rules-based analysis endpoint and an authenticated Cloudinary signature endpoint.
- Firestore rules are deny-by-default for land records. Add reviewed collection-specific rules before implementing real persistent land-record CRUD. The current app still uses synthetic demo cases; do not mistake them for persisted official records.
- You must add your own Firebase and Cloudinary account values. No third-party credentials can be prefilled in a downloadable project.

## 1. Requirements

Node.js 20+ (LTS recommended), npm, Git, a Cloudflare account, Firebase project and Cloudinary account.

## 2. Firebase

1. In Firebase Console create/select a project.
2. Authentication → Sign-in method: enable Email/Password and Google.
3. Firestore Database → create a database.
4. Authentication → Settings → Authorized domains: add both deployed Pages domains and any custom domains.
5. Register a Web app and copy its config.
6. Create `apps/client/.env.local` and `apps/admin/.env.local` by copying each app's `.env.example`. Set `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, and `VITE_API_URL`.
7. Publish Firestore rules: from this directory run `npx firebase-tools deploy --only firestore:rules --project YOUR_FIREBASE_PROJECT_ID` after installing Firebase CLI (`npm i -g firebase-tools`) and `firebase login`.
8. Create the first admin using Firebase Authentication, then create `users/{UID}` in Firestore with fields `{ "role": "admin", "email": "admin@example.com" }` from the Firebase Console. Do not allow public signup to set their own role.

## 3. Cloudinary

1. Create an account and copy Cloud name, API Key, API Secret.
2. The Worker signs authenticated profile uploads. The client uploads directly to Cloudinary after it gets a signature from the Worker. Only profile folder `jomiguard/profiles/{uid}` is permitted by this endpoint.
3. Keep API Secret only in Cloudflare Worker secrets; never add it to `VITE_*` variables or commit it.

## 4. Run the frontend locally

```bash
cd JomiGuard-Frontend-Repo
npm install
cp apps/client/.env.example apps/client/.env.local
cp apps/admin/.env.example apps/admin/.env.local
# edit both .env.local files with your own Firebase config and API URL
npm run dev:client
# another terminal
npm run dev:admin
```

Client: http://localhost:5173, Admin: http://localhost:5174.

## 5. Deploy the API Worker

```bash
cd JomiGuard-Backend-Repo/cloudflare-worker
npm install
npx wrangler login
npx wrangler secret put CLOUDINARY_API_SECRET
npx wrangler secret put FIREBASE_WEB_API_KEY
```

Set these non-secret Worker variables in Cloudflare dashboard → Worker → Settings → Variables:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CORS_ORIGINS` = exact comma-separated production client/admin origins, e.g. `https://YOUR-CLIENT.pages.dev,https://YOUR-ADMIN.pages.dev`
- `APP_ENV` = `production`

Then deploy:

```bash
npm run deploy
```

Copy the deployed `https://...workers.dev` URL into both frontend `.env.local` files as `VITE_API_URL=https://YOUR-WORKER.workers.dev/api` (note the `/api` suffix). Rebuild/redeploy both Pages projects after changing the variable.

Test `https://YOUR-WORKER.workers.dev/api/health` and `/api/cases` in a browser.

## 6. Deploy the two Pages projects

Push `JomiGuard-Frontend-Repo` to its own GitHub repository. In Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git:

**Client project**
- Root directory: `/` (repository root)
- Build command: `npm run build --workspace=@jomiguard/client`
- Build output directory: `apps/client/dist`
- Environment variables: all `VITE_FIREBASE_*` values and `VITE_API_URL`.

**Admin project**
- Same GitHub repository
- Root directory: `/`
- Build command: `npm run build --workspace=@jomiguard/admin`
- Build output directory: `apps/admin/dist`
- Environment variables: same Firebase values and `VITE_API_URL`.

Use each app's `.env.example` names in Cloudflare Pages settings. `VITE_*` values are public build-time configuration, not secrets. Add deployed domains to Firebase Authorized domains and set the Worker `CORS_ORIGINS` to the exact origins.

## 7. Backend local development

The existing Express backend is retained for local development and tests:

```bash
cd JomiGuard-Backend-Repo
npm install
cp .env.example .env
npm run dev
```

The Cloudflare deployable implementation is in `cloudflare-worker/`; Express cannot be deployed directly as a Worker without adaptation.

## 8. Security / release checklist

- Never commit `.env`, `.env.local`, `.dev.vars`, API secrets or service-account JSON.
- Do not enable broad Firestore read/write rules in production.
- Admin role must be assigned manually by a trusted project owner. The admin UI checks the role document; restrict who can create/update role documents.
- Configure Firebase App Check and rate limiting before public launch.
- The current records and risk examples are synthetic. No government land registry API is connected, OCR is not integrated, and this tool does not prove legal ownership.
- Test sign-up, sign-in, password reset, Google sign-in, admin role rejection, image upload, CORS and mobile layout on the deployed URLs.
