import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Firebase is used purely as a datastore for lead submissions — nothing else
 * on this site reads or writes Firebase. All access goes through the Admin
 * SDK on the server (Server Actions / route handlers), so no Firebase config
 * is ever shipped to the browser.
 *
 * PLACEHOLDER — set these in your environment (see .env.local.example):
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY   (keep the \n escapes; they are unescaped below)
 * These come from a Firebase service account JSON
 * (Project Settings -> Service Accounts -> Generate new private key).
 */
function getFirebaseAdminApp(): App {
  const existing = getApps();
  if (existing.length) return existing[0];

  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  // Strip wrapping quotes defensively: a .env *file* parser strips
  // `KEY="value"` quoting automatically, but a dashboard env var field
  // (e.g. Vercel's) takes the pasted value verbatim — copying the quoted
  // .env.local.example form straight into a field like that leaves literal
  // `"` characters in the key and silently breaks PEM parsing.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim()
    .replace(/^"|"$/g, "")
    .replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase admin credentials are missing. Set FIREBASE_PROJECT_ID, " +
        "FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in your environment " +
        "(see .env.local.example)."
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export function getDb() {
  return getFirestore(getFirebaseAdminApp());
}
