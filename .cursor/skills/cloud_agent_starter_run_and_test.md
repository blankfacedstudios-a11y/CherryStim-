# Cloud Agent Starter Skill: Run and Test This Codebase

## When to use this skill
- Use this at the start of any Cloud-agent task to bootstrap setup and testing fast.
- This repository is currently minimal (only `README.md`), so this skill is intentionally bootstrap-first and ready to extend as code is added.

## Area 1: Repository bootstrap (`/workspace`)

### Setup workflow
1. Confirm branch and workspace state:
   - `git status -sb`
   - `rg --files`
2. Detect the project stack by checking for common manifests:
   - Node: `package.json`, `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`
   - Python: `pyproject.toml`, `requirements.txt`
   - Go: `go.mod`
   - Rust: `Cargo.toml`
3. If no runtime manifests exist (current state), skip app startup and focus on docs/workflow tasks.

### Testing workflow
1. Validate text changes:
   - `git diff --check`
2. Verify expected files exist:
   - `rg --files .cursor/skills`
3. Confirm clean commit scope:
   - `git status -sb`

## Area 2: Web/UI app surfaces (future `frontend/`, `web/`, or root UI app)

### Setup and start workflow
1. Install dependencies using detected package manager:
   - npm: `npm install`
   - pnpm: `pnpm install`
   - yarn: `yarn install`
2. Start the app:
   - `npm run dev` (or equivalent script from `package.json`)
3. If auth blocks manual testing, prefer a local mock mode:
   - Check for `.env.example` and copy to `.env.local`
   - Set auth bypass values in `.env.local` (example convention: `AUTH_MODE=mock`)

### Login workflow
1. First try documented test credentials from project docs.
2. If credentials are unavailable, use the local mock auth mode and note it in task output.
3. Never hardcode real credentials into tracked files.

### Testing workflow
1. Run targeted checks:
   - `npm run lint`
   - `npm test -- --watch=false` (or nearest equivalent)
2. Manual smoke test in browser:
   - Load app
   - Complete login path (real or mock)
   - Exercise changed UI flow
3. Capture a short walkthrough artifact (video preferred for UI changes).

## Area 3: Backend/API services (future `backend/`, `api/`, `server/`)

### Setup and start workflow
1. Install dependencies from project manifest.
2. Configure local env:
   - Copy `.env.example` to `.env.local` if present
   - Fill non-secret defaults
3. Start service with project command (examples: `npm run dev`, `python -m <module>`, `go run ./cmd/...`).

### Feature flag workflow
1. Look for flags in `.env*`, `config/`, and startup logs.
2. For local testing, set flag values in `.env.local` only.
3. If a required flag is missing, document the assumption in your PR/task summary.

### Testing workflow
1. Run focused automated tests for touched code.
2. Run a basic service smoke check (health or representative endpoint).
3. Validate at least one flag-on/flag-off path when feature-flagged behavior changes.

## Area 4: Shared config, feature flags, and workflows (`.env*`, `config/`, `scripts/`)

### Setup workflow
1. Review existing config examples:
   - `.env.example`
   - `config/*`
   - helper scripts under `scripts/`
2. Keep local-only overrides in non-tracked env files.

### Testing workflow
1. Verify config parsing at startup (no missing-required-config crashes).
2. Confirm flag values are applied by checking logs or behavior.
3. Re-run the exact command flow used by the changed feature.

## How to update this skill when new runbook knowledge is discovered
1. Add new commands under the correct area section above (do not create generic dump sections).
2. For each new trick, record:
   - Prerequisite (what must already be running/configured)
   - Exact command(s)
   - Expected success signal
3. Remove or replace obsolete steps so this stays minimal and reliable.
4. If a new subsystem is added (for example worker, mobile, or data pipeline), add a new "Area" section with setup + testing workflows.
