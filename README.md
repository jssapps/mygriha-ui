# Bangalore Flat Finder

A lead-generation site for Bangalore apartment buyers, built with Next.js
(App Router) and statically generated at build time. Firebase is used only
as a datastore for lead submissions — nothing else on the site touches it.

## Stack

- **Next.js 16** (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4
- **Firebase Admin SDK** (Firestore) — server-only, for lead storage
- **next-sitemap** — sitemap.xml / robots.txt generation
- Deploy target: **Vercel**

## Before you launch: things to verify

1. **Project data** — `src/data/projects.ts` is hand-authored from a one-time
   public-listing extraction (99acres/homznspace/ghar.tv, 2026-07-26), not
   from the builder directly. Every field marked `VERIFY` in that file
   (price bands, RERA status/number, possession date, unit/tower counts,
   exact plot coordinates) must be confirmed with Signature Dwellings before
   go-live.
2. **Images** — all image paths under `public/images/` are placeholders
   (auto-generated solid-color JPEGs with labels) so the site renders end to
   end. Replace them with the builder's official photography/renders, keeping
   the same filenames (or update the paths in `src/data/projects.ts`).
3. **Contact details** — `src/lib/constants.ts` has placeholder
   `WHATSAPP_NUMBER`, `CONTACT_PHONE_DISPLAY`, and `CONTACT_EMAIL`. Replace
   before launch.
4. **Firebase credentials** — see below.

## Local setup

```bash
npm install
cp .env.local.example .env.local
# fill in .env.local, then:
npm run dev
```

### Environment variables (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Firebase service account (Admin SDK), used server-side only to write/read the `leads` collection in Firestore. Generate from Firebase Console → Project Settings → Service Accounts → Generate new private key. |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Basic Auth credentials gating `/admin`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used for sitemap generation and JSON-LD `url` fields. |

Firestore is used purely as a lead datastore — no security rules need to
allow public reads/writes, since all access goes through the Admin SDK on
the server (Server Action for writes, the `/admin` page for reads).

## How content is structured

- All project facts live in `src/data/projects.ts` as a plain array — there
  is **no CMS or database read at request time** for project/marketing
  pages. To add a new project, append an entry there and redeploy.
- Every project/marketing page is statically generated at build time
  (`generateStaticParams` for `/projects/[slug]`). Only `/admin` is dynamic,
  since it reads live lead data.
- `/admin` is protected by Basic Auth via `src/proxy.ts` (Next.js 16's
  renamed `middleware` convention), gated on `ADMIN_USERNAME`/`ADMIN_PASSWORD`.

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build + sitemap/robots generation (postbuild)
npm run start   # serve the production build
npm run lint    # eslint
```

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket and import it in Vercel, or run
   `vercel` from the CLI.
2. Add the environment variables above in the Vercel project settings
   (Production + Preview as needed).
3. Vercel runs `next build` automatically, which also runs the
   `next-sitemap` postbuild step — no extra configuration needed.
