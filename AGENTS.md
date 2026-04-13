# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

CherryStim is a Next.js 15 (App Router) premium immersive live-streaming entertainment platform with 20 routes. Feature branches hold all code (`main` only has a README). The active development branch is `cursor/fortune500-portals-5a6d`.

### Key commands

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (default port 3000) |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Seed users | `npx tsx scripts/seed-users.ts` |

### Routes (20 total)

| Route | Description |
|-------|-------------|
| `/` | Landing page — mode selection, ecosystem cards |
| `/login` | Auth — sign in / sign up with role selection |
| `/browse` | Discover Cherries — performer cards with search/filter |
| `/stream/[dancerId]` | Live stream — 2D/3D/VR/Immersive modes |
| `/dashboard` | Client Vault — holographic widgets, charts, academy, finance |
| `/dancer/dashboard` | Dancer Hub — earnings, leaderboards, academy, finance |
| `/dancer/stream-setup` | Stream configuration — mode, revenue split, haptics |
| `/dancer/dream-wish` | Dream Wish campaigns |
| `/admin` | Admin Control Center — overview, users, finance, academy tabs |
| `/admin/executive` | Executive Dashboard — CherryCoin economy, P&L |
| `/admin/payroll` | Payroll — printable pay stubs, money in/out |
| `/admin/compliance` | Compliance — CA AB5, GDPR, CPRA, POPIA |
| `/cherry-competition` | Cherry Rankings — global leaderboard, 5 geo tiers |
| `/cherry-elite` | Cherry Elite — empire pipeline (Magazine → TV → Casino) |
| `/cherry-rewards` | Rewards (39), Tokens (38), Emojis (68) |
| `/studios` | CherryStim Studios — 14 global warehouse locations |
| `/sponsor` | Cherry Ecosystem — client-facing explainer + sponsorship |
| `/shop` | Gear Shop — eyewear, VR, haptics, audio, bundles (14 products) |

### Environment variables

Copy `.env.example` to `.env.local`. Required external services:

- **Supabase** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) — auth and database
- **LiveKit** (`LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `NEXT_PUBLIC_LIVEKIT_URL`) — streaming
- **Solana** (`NEXT_PUBLIC_SOLANA_RPC_URL`, `NEXT_PUBLIC_CHERRYSTIM_COIN_MINT`) — optional

### Local development services

1. **Docker**: Required for local Supabase. Start daemon: `sudo dockerd &`
2. **Supabase**: `sudo supabase start` — then get creds with `sudo supabase status -o json`
3. **LiveKit**: `livekit-server --dev --bind 0.0.0.0` — default keys `devkey`/`secret` on port 7880
4. After changing `.env.local`, delete `.next/` and restart dev server

### Non-obvious caveats

- No automated test suite — validation is lint + build + manual testing
- Supabase client falls back to empty strings for missing env vars; dev server boots without real credentials
- `@react-three/fiber` v8 SSR issue fixed via `StreamViewerLoader.tsx` (useEffect-based lazy loader)
- Always delete `.next/` after `npm run build` before restarting `npm run dev`
- Two migrations: `001_schema.sql` (tables) + `002_add_admin_role.sql` (admin role)
- 7 seeded users via `scripts/seed-users.ts` (4 original + 3 Supersonic 3rd Edition)
- Logo at `public/logo/cherrystim-logo.svg` — transparent background for merchandise
- Deployment guide at `docs/CherryStim_Deployment_Guide.html` (Vercel + GoDaddy)
- Global tax module covers 52 jurisdictions (`lib/global-tax.ts`)
- Competition financing: 10% coin purchases, 5% app splits, 15.5% gifts, 2% dancer income
