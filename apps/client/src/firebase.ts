import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
export const firebaseConfigured = Boolean(config.apiKey && config.authDomain && config.projectId && config.storageBucket && config.appId);
const app = firebaseConfigured ? (getApps()[0] || initializeApp(config)) : null;
// Safe placeholders are never used for authentication; the UI explains missing config.
export const auth = app ? getAuth(app) : (null as unknown as ReturnType<typeof getAuth>);
export const storage = app ? getStorage(app) : (null as unknown as ReturnType<typeof getStorage>);
