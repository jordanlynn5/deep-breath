# Deep Breath

Your Daily Air & Wellbeing Journal — EcoHack 2026

## One-liner

React PWA pairing daily health check-ins with live air quality data, using AI to surface personal patterns. Hackathon deadline: April 23, 2026.

## Stack

Vite + npm · TypeScript · React (PWA) · Tailwind CSS · React Router · Framer Motion · Vitest + RTL · Vercel · localStorage

Key integrations: Claude Haiku 4.5 (via Vercel serverless proxy), OpenAQ v3 API (direct client), Cal-Heatmap, Recharts, OneSignal.

## RPI Workflow

This project follows Research-Plan-Implement (RPI).

1. /research -- Understand the codebase as-is
2. /plan -- Create a phased implementation spec
3. /implement -- Execute one phase at a time with review gates
4. /validate -- Verify implementation against the plan

Each phase is its own conversation. STOP after each phase.
Use /clear between tasks, /compact when context is heavy.

## Key Commands

```bash
npm run dev             # Local dev server
npm run build           # Production build
npm run test            # Run all tests (Vitest)
npm run typecheck       # Check types (tsc --noEmit)
npm run lint            # ESLint
npm run preview         # Preview production build
```

## Git Workflow

**`develop` is the default branch. `main` is production (auto-deploys via Vercel).**

Conventional commits:
`feat|fix|test|refactor|chore|docs(scope): description`

```bash
# Push -- commit before pulling (hook enforced)
git add <files> && git commit -m "msg"
git pull --rebase && git push
```

Run verification sequentially with `;` or `&&`,
never as parallel Bash calls.

## Deployment

Vercel auto-deploys:
- `main` → production (https://deep-breath.vercel.app)
- `develop` → preview
- PRs → preview deployments

Merging to `main` IS deploying to production.

## Agent Behavior

Exhaust tools before asking the user. Production actions need human authorization.
Save operational lessons to auto memory immediately. Don't wait to be asked.

## Project Context

- **API key handling:** Claude API calls go through Vercel serverless function (`/api/insights`). OpenAQ called directly from client.
- **Check-in interaction:** Tap-to-select buttons (1-5 scale), not sliders.
- **Design:** Calm & minimal — soft teal palette, whitespace, rounded elements, gentle transitions.
- **Privacy-first:** All user data in localStorage. No accounts, no server-side storage.
- **Budget:** Near-zero (~EUR 3 for Claude API).

## Project File Locations

Go directly to these paths -- never search for them.

| Topic | Path | Notes |
|-------|------|-------|
| Agent reports | `docs/agents/*-report.md` | Gitignored |
| Research | `docs/research/YYYY-MM-DD-*.md` | |
| Plans | `docs/plans/YYYY-MM-DD-*.md` | `-phases/` |
| ADRs | `docs/decisions/` | |
| Serverless API | `api/` | Vercel functions |
| Components | `src/components/` | |
| Pages/Routes | `src/pages/` | |
| Hooks | `src/hooks/` | |
| Context/State | `src/context/` | |
| Types | `src/types/` | |
| Utils | `src/utils/` | |
| Tests | `src/**/*.test.{ts,tsx}` | Co-located |

Rules load from `.claude/rules/` and `.claude/skills/` automatically.
