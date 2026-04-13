# CHERRYSTIM — Deployment Guide

**Local Development, Staging, and Production Deployment**
*Version 1.0 — April 2026*

---

## Introduction

This guide covers the complete deployment lifecycle for the CherryStim platform: local development setup, running tests, configuring external services, deploying to Vercel, and connecting a custom domain. Follow each section in order for a clean deployment from zero to production.

---

## Prerequisites

Before starting, ensure the following tools are installed on your development machine:

| Tool | Minimum Version | Recommended Version | Purpose |
|---|---|---|---|
| **Node.js** | 18.0+ | 22.x (LTS) | JavaScript runtime |
| **npm** | 10.0+ | Latest (bundled with Node) | Package manager |
| **Git** | 2.30+ | Latest | Version control |

**Optional tools:**

| Tool | Purpose |
|---|---|
| VS Code | Recommended code editor with ESLint and Tailwind CSS IntelliSense extensions |
| Supabase CLI | Local Supabase development and migration management |
| Vercel CLI | Command-line deployment (alternative to dashboard deployment) |

---

## Local Development Setup

### Step 1: Clone the Repository

```
git clone https://github.com/your-org/cherrystim.git
cd cherrystim
```

### Step 2: Install Dependencies

```
npm install
```

This installs all 22 production dependencies and 13 dev dependencies defined in `package.json`. Key packages include Next.js 15, React 18, Three.js, Supabase, LiveKit, Zustand, Framer Motion, and the complete Vitest testing suite.

### Step 3: Configure Environment Variables

```
cp .env.example .env.local
```

Open `.env.local` and fill in the required values (see the Environment Variables section below for full details). For initial local development, the app will boot with placeholder values — Supabase-dependent features (auth, profiles, wallets) and LiveKit streaming will not function, but the UI renders fully.

### Step 4: Start the Development Server

```
npm run dev
```

The development server starts at **http://localhost:3000** with hot module replacement enabled. Changes to source files are reflected immediately in the browser.

### Step 5: Run the Linter

```
npm run lint
```

ESLint runs with the `next/core-web-vitals` configuration. The codebase should produce **zero errors and zero warnings**.

### Step 6: Run the Test Suite

```
npm test
```

This executes Vitest with the `run` flag, running all **367 tests** across **40 test files**. Tests use React Testing Library with jsdom for browser environment simulation.

For interactive test development with watch mode:

```
npm run test:watch
```

### Step 7: Production Build

```
npm run build
```

Generates an optimized production build. Most routes are statically generated at build time. The build output is placed in the `.next/` directory.

**Important caveat:** After running `npm run build`, delete the `.next/` directory before returning to `npm run dev`. The build output can interfere with the development server:

```
rm -rf .next
npm run dev
```

---

## Environment Variables

All environment variables are defined in `.env.example`. Copy this file to `.env.local` for local development, or set these in your deployment platform's environment configuration.

### Supabase (Authentication + Database)

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL. Found in the Supabase dashboard under Settings → API. | `https://abcdefghij.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous/public API key. Found in the Supabase dashboard under Settings → API → Project API keys. | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |

**Note:** The Supabase client in `lib/supabase.ts` falls back to empty strings when these variables are missing. The app will boot and render, but authentication, profile creation, wallet operations, and database queries will fail silently.

### LiveKit (Real-Time Streaming)

| Variable | Description | Example |
|---|---|---|
| `LIVEKIT_API_KEY` | Your LiveKit API key. Found in the LiveKit Cloud dashboard. | `APIxxxxxxxxxxxxxxx` |
| `LIVEKIT_API_SECRET` | Your LiveKit API secret. Found in the LiveKit Cloud dashboard. Keep this secret — never expose it to the client. | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `NEXT_PUBLIC_LIVEKIT_URL` | Your LiveKit WebSocket URL. This is the public URL clients connect to for streaming sessions. | `wss://your-project.livekit.cloud` |

**Note:** LiveKit token generation (in `lib/livekit.ts`) will fail without valid credentials. The livekit-server-sdk module requires mocking in tests because its `AccessToken.toJwt()` method fails in the jsdom environment.

### Solana (Blockchain Tipping)

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Solana RPC endpoint for blockchain transactions. Use mainnet-beta for production or devnet for testing. | `https://api.mainnet-beta.solana.com` |
| `NEXT_PUBLIC_CHERRYSTIM_COIN_MINT` | The mint address for the CherryStim coin token on the Solana blockchain. | `CherryStim11111111111111111111` |

**Note:** Solana integration is optional. The platform functions fully without blockchain features — coin tipping will fall back to the internal CherryStim coin system backed by Supabase.

---

## Supabase Setup

### Step 1: Create a Supabase Project

1. Go to **https://supabase.com** and sign in (or create an account)
2. Click **New Project**
3. Choose your organization, set a project name (e.g., "cherrystim"), and select a region
4. Set a strong database password and save it securely
5. Wait for the project to initialize (typically 1–2 minutes)

### Step 2: Get Your API Credentials

1. In the Supabase dashboard, navigate to **Settings → API**
2. Copy the **Project URL** → this is your `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the **anon / public** API key → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Paste both values into your `.env.local` file

### Step 3: Run Database Migrations

Navigate to the **SQL Editor** in the Supabase dashboard and execute the migration file:

**Migration 1: Core Schema** (`supabase/migrations/001_schema.sql`)

This creates the four core tables:

| Table | Purpose |
|---|---|
| `profiles` | User profiles with display name, role (client/dancer), tier, and created timestamp |
| `coin_wallets` | CherryStim coin balances for each user |
| `dancer_profiles` | Extended dancer information (bio, gear ownership status) |
| `transactions` | Coin transaction ledger (from user, to user, amount, type) |

The migration also enables the `uuid-ossp` extension for UUID generation.

**Migration 2: Admin Role** (`supabase/migrations/002_add_admin_role.sql`)

This migration adds the admin role to the profiles table's role check constraint, enabling the admin dashboard route.

### Step 4: Configure Row Level Security

Supabase Row Level Security (RLS) should be enabled on all tables to restrict data access based on authenticated user identity and role. Configure policies for:

- Users can only read/update their own profile
- Users can only read/update their own wallet
- Dancers can only update their own dancer profile
- Transaction inserts validate the sender's balance
- Admin role has read access to all tables

---

## Seed Users

After Supabase is configured, seed the database with initial test accounts:

```
npx tsx scripts/seed-users.ts
```

This script creates the following accounts:

| Email | Role | Purpose |
|---|---|---|
| `timjackson2nd@gmail.com` | Admin | Primary admin account with access to the `/admin` dashboard |

Additional test accounts for dancers and clients can be created through the normal signup flow at `/gate`.

---

## LiveKit Setup

### Step 1: Create a LiveKit Project

1. Go to **https://livekit.io** and sign in (or create an account)
2. Create a new project from the LiveKit Cloud dashboard
3. Select your preferred region

### Step 2: Get Your Credentials

From the LiveKit Cloud project settings, copy:

- **API Key** → this is your `LIVEKIT_API_KEY`
- **API Secret** → this is your `LIVEKIT_API_SECRET`
- **WebSocket URL** → this is your `NEXT_PUBLIC_LIVEKIT_URL` (format: `wss://your-project.livekit.cloud`)

### Step 3: Configure Environment

Paste all three values into your `.env.local` file. The LiveKit server SDK (`livekit-server-sdk`) uses the API key and secret to generate access tokens for streaming sessions. The client SDK (`livekit-client`) connects to the WebSocket URL for real-time audio/video.

---

## Vercel Deployment

### Step 1: Push to GitHub

Ensure your repository is pushed to GitHub:

```
git add .
git commit -m "Initial deployment"
git push origin main
```

### Step 2: Import in Vercel

1. Go to **https://vercel.com** and sign in with your GitHub account
2. Click **Add New → Project**
3. Select the CherryStim repository from the import list
4. Vercel auto-detects the Next.js framework — no configuration changes needed
5. Click **Deploy**

### Step 3: Set Environment Variables

In the Vercel project dashboard, navigate to **Settings → Environment Variables** and add all 7 variables:

| Variable | Scope |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development |
| `LIVEKIT_API_KEY` | Production, Preview |
| `LIVEKIT_API_SECRET` | Production, Preview |
| `NEXT_PUBLIC_LIVEKIT_URL` | Production, Preview, Development |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Production, Preview |
| `NEXT_PUBLIC_CHERRYSTIM_COIN_MINT` | Production, Preview |

After adding environment variables, redeploy the project for them to take effect.

### Step 4: Custom Domain

1. In the Vercel project dashboard, navigate to **Settings → Domains**
2. Enter your custom domain (e.g., `cherrystim.com`)
3. Vercel provides DNS configuration instructions
4. Follow the GoDaddy domain configuration section below

---

## GoDaddy Domain Configuration

### Step 1: Purchase the Domain

If you haven't already, purchase `cherrystim.com` (and recommended defensive domains) from **https://godaddy.com**.

### Step 2: Configure DNS Records

In the GoDaddy DNS management panel, add the following records:

| Type | Name | Value | TTL |
|---|---|---|---|
| **CNAME** | www | `cname.vercel-dns.com` | 600 (or Auto) |
| **A** | @ | `76.76.21.21` | 600 (or Auto) |

**Explanation:**

- The **CNAME** record for `www` points `www.cherrystim.com` to Vercel's DNS
- The **A** record for `@` points the root domain `cherrystim.com` to Vercel's IP address

### Step 3: Verify in Vercel

1. Return to the Vercel project dashboard → **Settings → Domains**
2. Vercel will automatically detect the DNS changes (may take up to 48 hours for propagation, but usually completes within minutes)
3. Once verified, Vercel automatically provisions an SSL certificate via Let's Encrypt
4. Both `cherrystim.com` and `www.cherrystim.com` will serve the application over HTTPS

---

## Post-Deployment Checklist

After deploying to production, verify the following:

### Functionality Checks

- [ ] Landing page loads at your custom domain
- [ ] HTTPS is active (lock icon in browser)
- [ ] Gate page accepts invitation codes
- [ ] User signup flow works (email + password → role selection → profile creation)
- [ ] Admin login works (`timjackson2nd@gmail.com`)
- [ ] Admin dashboard loads with all 6 tabs
- [ ] Client dashboard loads after client login
- [ ] Dancer dashboard loads after dancer login
- [ ] Browse page displays dancer listings
- [ ] AR filters page loads with tier-gated categories
- [ ] Onboarding checkout flow completes end-to-end
- [ ] Card program page displays all 3 card tiers
- [ ] Star Bright Lights casting page loads with opportunities

### Security Checks

- [ ] All 7 security headers present (check with browser dev tools → Network tab)
- [ ] Content-Security-Policy header is set correctly
- [ ] HSTS header present with 1-year max-age
- [ ] CORS policy is correctly configured for your domain
- [ ] Supabase RLS policies are active on all tables
- [ ] Rate limiting is functioning (test with rapid API calls)

### Performance Checks

- [ ] Lighthouse score is 90+ on Performance
- [ ] Static pages load within 1 second on fast connections
- [ ] 3D/VR mode loads without errors on supported browsers
- [ ] Images are optimized through next/image

---

## Known Caveats

### @react-three/fiber SSR Issue

The `@react-three/fiber` package does not support server-side rendering. The `/stream/[dancerId]` page will crash in `next dev` mode with the error:

```
Cannot read properties of undefined (reading 'ReactCurrentOwner')
```

**Workaround:** The `StreamViewer` component (or its parent page) uses a `StreamViewerLoader` pattern with `dynamic(() => import(...), { ssr: false })` to prevent server-side rendering of Three.js components. This is already implemented in the codebase.

The page builds correctly with `next build` because static generation handles the component differently.

### Delete .next/ Between Build and Dev

After running `npm run build`, the `.next/` directory may contain cached build artifacts that interfere with the development server. Always delete it before switching back to dev mode:

```
rm -rf .next
npm run dev
```

### LiveKit Server SDK in Tests

The `livekit-server-sdk` module's `AccessToken.toJwt()` method fails in the jsdom test environment. Tests for `lib/livekit.ts` mock this module. See `__tests__/lib/livekit.test.ts` for the mock pattern. This does not affect production runtime.

### WebXR Browser Requirements

VR Mode and Full Immersive mode require a browser with WebXR support:

- **Supported**: Meta Quest Browser, Chrome on Android (with WebXR flags), Safari on Apple Vision Pro
- **Not supported**: Desktop Chrome, Firefox, Safari (without WebXR emulation extensions)
- **2D and 3D modes** work in any modern browser

---

## Quick Reference — All Commands

| Command | Description |
|---|---|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server (localhost:3000) |
| `npm run lint` | Run ESLint |
| `npm test` | Run all 367 tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run build` | Production build |
| `npm start` | Start production server (requires prior build) |
| `npx tsx scripts/seed-users.ts` | Seed admin and test accounts |

---

## Document Control

| Field | Value |
|---|---|
| **Document** | CherryStim Deployment Guide |
| **Version** | 1.0 |
| **Effective Date** | April 2026 |
| **Owner** | CherryStim Engineering Team |
| **Classification** | Internal — Engineering & DevOps |

---

*CherryStim — Where luxury meets innovation.*
*© 2026 CherryStim. All rights reserved.*
