# Deploying CherryStim to www.cherrystim.com via GoDaddy

## Step-by-Step Deployment Guide

---

### Step 1: Set Up Vercel (Hosting Platform)

Vercel is the recommended hosting platform for Next.js applications.

1. Go to **[https://vercel.com/signup](https://vercel.com/signup)** and create an account (use "Continue with GitHub" for easiest setup)
2. Click **"Add New Project"**
3. Select **"Import Git Repository"** → find `blankfacedstudios-a11y/CherryStim-`
4. Vercel auto-detects Next.js — click **"Deploy"**
5. **Important**: Set the **Root Directory** to `/` and the **Branch** to `cursor/cherrystim-immersive-platform-bf9b` (or whichever branch has the latest merged code)
6. Wait for the build to complete (~2 minutes)

---

### Step 2: Set Up Cloud Supabase (Database & Auth)

1. Go to **[https://supabase.com](https://supabase.com)** → Sign up / Log in
2. Click **"New Project"**
   - Organization: Create or select one
   - Name: `cherrystim-production`
   - Database Password: **Save this securely**
   - Region: Choose closest to your users (e.g., `us-west-1` for California)
3. Wait for the project to provision (~2 minutes)
4. Go to **SQL Editor** (left sidebar) → Click **"New Query"**
5. Paste the contents of `supabase/migrations/001_schema.sql` → Click **Run**
6. Paste the contents of `supabase/migrations/002_add_admin_role.sql` → Click **Run**
7. Go to **Settings → API** (left sidebar)
   - Copy the **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - Copy the **anon/public** key (starts with `eyJ...`)
   - Copy the **service_role** key (for running seed script)

---

### Step 3: Set Up Cloud LiveKit (Streaming Infrastructure)

1. Go to **[https://cloud.livekit.io](https://cloud.livekit.io)** → Sign up
2. Click **"Create Project"**
   - Name: `cherrystim`
   - Region: Choose closest to your users
3. Once created, go to **Settings → Keys**
   - Copy the **API Key**
   - Copy the **API Secret**
   - Copy the **WebSocket URL** (e.g., `wss://cherrystim-xxxx.livekit.cloud`)

---

### Step 4: Configure Environment Variables in Vercel

1. In your Vercel project, go to **Settings → Environment Variables**
2. Add each of these:

| Variable Name | Value | Where to get it |
|---------------|-------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Supabase → Settings → API |
| `LIVEKIT_API_KEY` | Your LiveKit API key | LiveKit Cloud → Settings → Keys |
| `LIVEKIT_API_SECRET` | Your LiveKit API secret | LiveKit Cloud → Settings → Keys |
| `NEXT_PUBLIC_LIVEKIT_URL` | `wss://...livekit.cloud` | LiveKit Cloud → Settings |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | `https://api.devnet.solana.com` | (use devnet for testing) |

3. Click **"Save"** → Click **"Redeploy"** (Deployments tab → three dots → Redeploy)

---

### Step 5: Seed User Accounts on Cloud Supabase

On your local machine (with Node.js installed):

```bash
# Clone the repo if you haven't
git clone https://github.com/blankfacedstudios-a11y/CherryStim-.git
cd CherryStim-

# Set cloud Supabase credentials
export NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="eyJ...your-service-role-key..."

# Run the seed script
npx tsx scripts/seed-users.ts
```

This creates all 7 user accounts with their roles and coin balances.

---

### Step 6: Connect GoDaddy Domain to Vercel

#### In Vercel:
1. Go to your project → **Settings → Domains**
2. Type `cherrystim.com` → Click **Add**
3. Also add `www.cherrystim.com` → Click **Add**
4. Vercel will show you the required DNS records

#### In GoDaddy:
1. Log in to **[https://dcc.godaddy.com](https://dcc.godaddy.com)** (Domain Control Center)
2. Click on `cherrystim.com` → **DNS** → **DNS Records**
3. **Edit the A Record** (or add one):
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`
   - TTL: 600
4. **Add a CNAME Record**:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: 600
5. **Delete any conflicting records** (old A records, old CNAME for www)
6. Click **Save**

#### Back in Vercel:
1. Wait 5–30 minutes for DNS propagation
2. Vercel will automatically provision an SSL certificate
3. Your site will be live at **https://www.cherrystim.com** 🎉

---

### Step 7: Verify Everything Works

1. Visit `https://www.cherrystim.com` — you should see the landing page
2. Visit `https://www.cherrystim.com/login` — try logging in with:
   - `blankfacedstudios@gmail.com` / `CherryAdmin2024!`
3. Check that the admin dashboard loads with user data
4. Test all portals: Client Vault, Dancer Hub, Admin, Executive, Payroll, Compliance

---

## Quick Links Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Vercel Dashboard | [vercel.com/dashboard](https://vercel.com/dashboard) | Hosting & deployments |
| Supabase Dashboard | [supabase.com/dashboard](https://supabase.com/dashboard) | Database, auth, API |
| LiveKit Cloud | [cloud.livekit.io](https://cloud.livekit.io) | Streaming infrastructure |
| GoDaddy DNS | [dcc.godaddy.com](https://dcc.godaddy.com) | Domain management |
| GitHub Repo | [github.com/blankfacedstudios-a11y/CherryStim-](https://github.com/blankfacedstudios-a11y/CherryStim-) | Source code |

---

## Troubleshooting

- **Site shows 404**: Make sure the correct branch is selected in Vercel's project settings
- **Login doesn't work**: Verify Supabase URL and anon key are correct in Vercel env vars, then redeploy
- **Streaming doesn't connect**: Check LiveKit credentials in Vercel env vars
- **Domain not resolving**: DNS propagation can take up to 48 hours (usually 5–30 min). Use [dnschecker.org](https://dnschecker.org) to verify
- **SSL certificate pending**: Vercel auto-provisions SSL once DNS resolves. If stuck, click "Refresh" in Vercel Domains settings
