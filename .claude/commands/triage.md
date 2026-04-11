# Triage Agent Reports

Model tier: **sonnet** — Sonnet 4.6 (1M context) session.

Process all overnight agent reports. Discovers every report using timestamp-based discovery, checks for agent failures, synthesizes findings, proposes an action plan, and implements all fixes. Reports are never committed -- they stay on disk as local operational history (Rule #70).

## Input

If `$ARGUMENTS` is provided, process only the specified report path(s). Otherwise, auto-discover all new/modified reports in `docs/agents/`. If no reports found and no agent failures detected, report "all clear" and **STOP.**

## Step 1: Discovery

1. Check for `.last-triage` marker: `ls -la docs/agents/.last-triage 2>/dev/null`
2. If marker exists: `find docs/agents/ -name "*-report.md" -newer docs/agents/.last-triage`
3. If no marker (first run): process ALL reports via `Glob docs/agents/*-report.md`
4. Check `logs/` for recent error logs: `find logs/ -name "*.error.log" -mtime -1 2>/dev/null`

## Step 2: Analyze

Read-only. Read every report completely. Extract status, findings, metrics, action items. Cross-reference across reports. Draft action plan. **STOP and wait for user approval.**

## Step 3: Execute

Implement all action items following TDD. Run verification: `npm run test 2>&1; npm run typecheck 2>&1; npm run lint 2>&1`

## Step 4: Commit & Push

Only commit code fixes. Never commit reports (Rule #70). Touch `.last-triage` after completion. Monitor CI.

## Step 5: Report

Generate report at `docs/agents/triage-report.md`. Present summary.

## Rules

- **Exhaustive discovery.** Use timestamp-based scan.
- **Never commit reports.** Only code fixes enter version control.
- **Fix everything (Rule #58).** 100% of action items.
- Run verification commands sequentially, never as parallel Bash calls.
