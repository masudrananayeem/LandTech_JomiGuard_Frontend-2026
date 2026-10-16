# JomiGuard BD: Firebase Auth + Cloudflare Pages setup

## Implemented in this update
- Firebase email/password registration and sign-in.
- Google sign-in popup.
- Password reset email.
- Show/hide password control.
- Profile photo upload to Firebase Storage (JPEG/PNG/WebP, max 5 MB) and Firebase Auth profile update.
- Firebase auth state restoration.
- Cloudflare Pages Wrangler config for separate client and admin apps.

## 1. Create/configure Firebase project
1. In Firebase Console, create a project and add a Web App.
2. Authentication → Sign-in method: enable **Email/Password** and **Google**.
3. Authentication → Settings → Authorized domains: add your local and deployed domains.
4. Storage → Get started. Ensure the Storage bucket matches the web app config.
5. Copy `Frontend/apps/client/.env.example` to `Frontend/apps/client/.env.local`, then fill in all `VITE_FIREBASE_*` values from Project settings → Your apps.
6. Do not commit `.env.local` or service-account credentials. Firebase web config is client-side configuration, not a server secret; enforce security with rules.
7. Deploy `Firebase/storage.rules` and `Firebase/firestore.rules` in Firebase Console (or configure Firebase CLI).

The code cannot create a Firebase project or enable providers on your behalf; those actions require access to your Firebase account.

## 2. Local development
```bash
cd Frontend
npm install
npm run dev:client
```
Client runs at `http://localhost:5173`. Add `localhost` to Firebase Authorized domains if needed.

Admin preview:
```bash
cd Frontend
npm run dev:admin
```
Admin is a prototype and is **not** secured by role-based Firebase authorization yet. Do not expose sensitive admin operations publicly until server-side role checks are implemented.

## 3. Deploy client to Cloudflare Pages
Install Wrangler in the frontend workspace if needed:
```bash
cd Frontend
npm install -D wrangler
npm run build -w @jomiguard/client
npx wrangler pages deploy apps/client/dist --project-name jomiguard-client
```
Set the same `VITE_FIREBASE_*` variables under Cloudflare Pages → client project → Settings → Environment variables (Production and Preview), then trigger a new build. Vite variables are baked into the build, so deploy a fresh build after changing them.

## 4. Deploy admin separately
```bash
cd Frontend
npm run build -w @jomiguard/admin
npx wrangler pages deploy apps/admin/dist --project-name jomiguard-admin
```
Create the Cloudflare Pages project first, and configure any app-specific variables before build. The current admin UI is not a secure admin portal without server-side authorization.

## 5. Backend
The Express backend remains a separate service. Deploy it to a Node-compatible host or refactor its routes for Cloudflare Workers. Set `VITE_API_URL` to its public API URL before building the client. Cloudflare Pages static hosting does not automatically deploy the separate Express server.

## Important security notes
- Never put Firebase Admin SDK service-account keys in the React app or public repo.
- A Google/email login proves account authentication, not authorization to administer land records.
- Profile photo upload is restricted by Storage rules to the authenticated user's own folder.
- This demo still uses synthetic land records; OCR/legal verification and production database integration are not implied by Firebase login.
