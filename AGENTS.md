# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

CherryStim is a Next.js 15 (App Router) premium immersive live-streaming platform with 3D/VR capabilities via `@react-three/fiber` and `@react-three/xr`.

### Key commands

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (default port 3000) |
| Lint | `npm run lint` |
| Build | `npm run build` |

### Environment variables

Copy `.env.example` to `.env.local` and fill in credentials. Required external services:

- **Supabase** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) — auth and database. The app boots with placeholder values but Supabase-dependent features (auth, profiles, wallets) won't work without real credentials.
- **LiveKit** (`LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `NEXT_PUBLIC_LIVEKIT_URL`) — real-time streaming. Token generation fails without valid keys, but the app boots and UI renders.
- **Solana** (`NEXT_PUBLIC_SOLANA_RPC_URL`, `NEXT_PUBLIC_CHERRYSTIM_COIN_MINT`) — optional blockchain integration.

### Non-obvious caveats

- The project has no automated test suite (no test runner or test files). Validation is done through lint, build, and manual testing.
- The Supabase client in `lib/supabase.ts` falls back to empty strings when env vars are missing, so the dev server starts without real credentials.
- The `@react-three/xr` package requires a browser with WebXR support for VR/Immersive modes; 2D and 3D modes work in any modern browser.
- There is a Supabase migration at `supabase/migrations/001_schema.sql` that must be run against a Supabase instance to set up the database schema.
- ESLint config extends `next/core-web-vitals` only (no custom rules).
- **Known issue:** The `/stream/[dancerId]` page crashes in `next dev` with `Cannot read properties of undefined (reading 'ReactCurrentOwner')` because `@react-three/fiber` does not support SSR. The page builds fine in `next build` (static generation). To test this page in dev, the `StreamViewer` component (or its parent) needs a `dynamic(() => import(...), { ssr: false })` wrapper.
