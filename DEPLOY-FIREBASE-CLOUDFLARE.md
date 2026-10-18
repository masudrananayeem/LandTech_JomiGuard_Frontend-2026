# Deployment guide — Cloudflare Pages + Workers, Firebase, Cloudinary

This guide configures the prototype; it cannot prefill private values from your accounts or deploy on your behalf.

## 1. Firebase

1. Create/select a Firebase project and register two web apps if you want separate Client/Admin configs.
2. Enable Email/Password and Google providers under Authentication.
3. Add local and production Client/Admin domains to Authentication's authorized domains.
4. Create Firestore. Review `firebase/firestore.rules` and deploy them from the Firebase console/CLI. The default rules deny all collections except each signed-in user's own profile operations; do not loosen them to public read/write.
5. Admin access requires a trusted administrator to create/update the user's `users/{uid}` profile with `role: "admin"`. Do not let a user choose their own admin role. Verify the rules and admin sign-in with a test account.

## 2. Cloudinary

1. Create a Cloudinary account and note the Cloud name and API key.
2. The API secret must be stored only as a Cloudflare Worker secret.
3. The Worker creates a signature for `jomiguard/profiles/{firebaseUid}` only after Firebase token validation. The browser uploads directly to Cloudinary using the returned signature.
4. Never expose the API secret in a `VITE_*` variable, browser code or Git repository.

## 3. Run locally

Worker terminal:

```bash
cd JomiGuard-Backend-Repo/cloudflare-worker
npm install
npm run dev
```

Frontend terminal(s):

```bash
cd JomiGuard-Frontend-Repo
npm install
cp apps/client/.env.example apps/client/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

Set `VITE_API_URL=http://localhost:8787/api` in both env files for the Wrangler local server. Set the Firebase web config values for sign-in tests. Start Client with `npm run dev:client` and Admin with `npm run dev:admin` in separate terminals.

## 4. Deploy Worker

1. In `cloudflare-worker/wrangler.toml`, set `CORS_ORIGINS` to the exact origins for the deployed Client and Admin. Example: `https://your-client.pages.dev,https://your-admin.pages.dev`.
2. Set vars `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_API_KEY` in Wrangler config or Worker Settings.
3. From `JomiGuard-Backend-Repo/cloudflare-worker`, run:

```bash
npx wrangler login
npx wrangler secret put CLOUDINARY_API_SECRET
npx wrangler secret put FIREBASE_WEB_API_KEY
npx wrangler deploy
```

4. Verify `https://YOUR-WORKER.workers.dev/api/health` and `/api/transactions/scenarios`.

## 5. Deploy Client and Admin as separate Pages projects

Connect the frontend repository to Cloudflare Pages twice.

- Client project root directory: `JomiGuard-Frontend-Repo`; build command: `npm run build -w @jomiguard/client`; output directory: `apps/client/dist`.
- Admin project root directory: `JomiGuard-Frontend-Repo`; build command: `npm run build -w @jomiguard/admin`; output directory: `apps/admin/dist`.

If the Pages build environment does not install npm workspaces correctly with that root/output configuration, use the repository root and the same workspace commands; verify the build log rather than guessing. Set the same `VITE_FIREBASE_*` values in both Pages projects and `VITE_API_URL=https://YOUR-WORKER.workers.dev/api`. For Admin, set `VITE_CLIENT_URL=https://YOUR-CLIENT.pages.dev`.

After first deploy, add the Pages domains to Firebase Authentication authorized domains. Update Worker `CORS_ORIGINS` with the final origins and redeploy. Rebuild/redeploy the Pages apps after changing any `VITE_*` variables.

## 6. Production checks

- Confirm health, scenario list, baseline screen and double-sale screen work in the deployed browser.
- Confirm Admin rejects a regular user and accepts only a trusted admin role.
- Confirm Firebase rules do not allow public reads/writes and no user can self-assign admin.
- Confirm image upload fails for unauthenticated users and API secrets are not present in browser assets.
- Inspect Network/Console for CORS, 404 and Firebase domain errors.
- Do not use real land records or personal data in this hackathon prototype.
- Keep this as a prototype until all security and functionality checks pass.
