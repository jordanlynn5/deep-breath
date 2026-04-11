# Remediate Pre-Launch Findings

Model tier: **sonnet** — Sonnet 4.6 (1M context) session. All subagents: `model: "sonnet"`.

Resolve all findings from the pre-launch audit. Creates GitHub issues, orchestrates parallel TDD agents in worktrees, merges sequentially, verifies CI, and reports.

## Input

If `$ARGUMENTS` is provided, use it as the report path. Otherwise, auto-detect the report at `docs/agents/pre-launch-report.md`. If no report exists, suggest running `/pre-launch` first and **STOP.**

## Step 1: Parse & Plan

1. Read the pre-launch report completely.
2. Extract EVERY finding -- blockers, warnings, AND recommendations.
3. Group related findings into work units (same files = same unit).
4. Present work plan to user. **STOP and wait for approval.**

## Step 2: Create Issues & Launch Agents

1. Create a GitHub issue for each work unit.
2. Spawn worktree agents (parallel, `isolation: "worktree"`, `model: "sonnet"`).
   Each agent: TDD test first → implement fix → verify → `/simplify` → commit locally. Do NOT push.

## Step 3: Integration & Verification

1. Push all agent branches in one burst.
2. Create PRs, merge sequentially, test after each merge.
3. Run `/simplify` on full integrated result.
4. Final verification: `npm run test 2>&1; npm run typecheck 2>&1; npm run lint 2>&1; npm run build 2>&1`
5. Push and monitor CI.

## Step 4: Cleanup

Remove all worktrees and branches. Verify clean state.

## Step 5: Report

Generate report at `docs/agents/remediation-report.md`. Present summary to user.

## Rules

- **100% coverage.** Process EVERY finding.
- **TDD mandatory.** Failing test before implementation.
- **Agents do NOT push.** Only the orchestrator pushes.
- **Sequential merges.** Test after each.
- **File ownership enforced.** No two agents edit the same file.
- **Never weaken a test.**
- Run verification commands sequentially, never as parallel Bash calls.
