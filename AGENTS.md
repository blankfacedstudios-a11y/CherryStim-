# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

CherryStim is a Next.js 15 (App Router) premium live-streaming platform. All application code lives on the `cursor/cherrystim-immersive-platform-bf9b` branch (the `main` branch contains only a README).

### Key commands

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (default port 3000) |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Seed users | `npx tsx scripts/seed-users.ts` |

### Environment variables

Copy `.env.example` to `.env.local` and fill in credentials. Required external services:

- **Supabase** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) — auth and database. The app boots with placeholder values but Supabase-dependent features (auth, profiles, wallets) won't work without real credentials.
- **LiveKit** (`LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `NEXT_PUBLIC_LIVEKIT_URL`) — real-time streaming. Token generation fails without valid keys, but the app boots and UI renders.
- **Solana** (`NEXT_PUBLIC_SOLANA_RPC_URL`, `NEXT_PUBLIC_CHERRYSTIM_COIN_MINT`) — optional blockchain integration.

### Local development services

For full dev functionality (beyond placeholder credentials), start these services:

1. **Local Supabase**: `sudo supabase start` (requires Docker). Provides auth, database, and all Supabase features locally. After starting, get credentials with `sudo supabase status -o json` and update `.env.local`.
2. **Local LiveKit**: `livekit-server --dev --bind 0.0.0.0`. Default dev keys are `devkey`/`secret` on port 7880.
3. After changing `.env.local`, delete `.next/` and restart the dev server so new env vars take effect.

### Non-obvious caveats

- The project has no automated test suite (no test runner or test files). Validation is done through lint, build, and manual testing.
- The Supabase client in `lib/supabase.ts` falls back to empty strings when env vars are missing, so the dev server starts without real credentials.
- The `@react-three/xr` package requires a browser with WebXR support for VR/Immersive modes; 2D and 3D modes work in any modern browser.
- There is a Supabase migration at `supabase/migrations/001_schema.sql` that must be run against a Supabase instance to set up the database schema.
- ESLint config extends `next/core-web-vitals` only (no custom rules).
- `@react-three/fiber` v8 + `react-reconciler@0.27` has a React internals mismatch in Next.js 15 webpack. The `StreamViewer` component uses a `useEffect`-based lazy loader (`StreamViewerLoader.tsx`) that defers the import entirely to client-side runtime, avoiding the SSR and hydration crash.
- After running `npm run build`, always delete `.next/` before restarting `npm run dev` to avoid stale module cache errors.
- The logo at `public/logo/cherrystim-logo.svg` has a transparent background for merchandise/packaging use. A PNG version is also available at `public/logo/cherrystim-logo.png`.
