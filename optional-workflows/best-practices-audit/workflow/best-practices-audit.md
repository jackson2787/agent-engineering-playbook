---
description: Run a best-practices audit for a Next.js, Expo, or backend repository and write the findings to docs/audits/.
---

# Best Practices Audit Workflow

Run this workflow in the target repository.

Recommended usage:

- Start in a fresh chat so the context stays focused on the audit.
- If the target repo uses `AGENTS.md`, operate within that contract unless the
  user explicitly chooses to work outside it.

---

## Purpose

- Audit an existing repository against the installed skill packs.
- Help bootstrap older repos that have just adopted this playbook.
- Help detect drift in repos that were previously aligned.
- Produce a reusable audit document for later planning and implementation.

This workflow is read-only by default. The output is an audit report, not a set
of code edits.

---

## First Step

Ask the user which audit branch to run:

- `nextjs`
- `expo`
- `backend`

If the repository strongly suggests one branch, you may infer it and ask for
confirmation.

Also ask whether the user wants:

- a baseline audit for initial adoption
- a drift audit for periodic re-checking

If the user does not specify, default to a baseline audit.

---

## Core Audit Contract

You must:

1. Inspect the codebase directly. Do not use README files as the primary source
   of truth for the audit.
2. Load the relevant skill packs for the selected branch.
3. Produce findings ordered by severity.
4. Cite concrete `file:line` references for findings.
5. Stay read-only unless the user explicitly changes scope.
6. Write the audit result to:

```text
docs/audits/YYYY-MM-DD-<branch>-best-practices-audit.md
```

7. End by suggesting the audit document be used as input to a separate
   brainstorming or planning step.

---

## Branch Rules

### Branch: `nextjs`

Load and use:

- `frontend-web-skills/react-best-practices/`
- `frontend-web-skills/accessible-ui/`
- `frontend-web-skills/composition-patterns/`

Optionally include:

- `frontend-web-skills/api-feature-request/` if API integration quality,
  request boundaries, or frontend-backend contract shape is materially relevant

Audit for:

- rendering and performance problems
- data-fetching and request-boundary problems
- accessibility issues
- component composition drift
- repo-local drift from the installed frontend playbook

### Branch: `expo`

Load and use:

- `frontend-mobile-skills/react-native-skills/`
- `frontend-mobile-skills/expo-native-data-fetching/`
- `frontend-mobile-skills/accessible-ui/`
- `frontend-mobile-skills/composition-patterns/`

Optionally include:

- `frontend-mobile-skills/api-feature-request/` if API integration quality is in scope

Audit for:

- list and rendering performance problems
- app structure and navigation issues
- platform-aware UI problems
- accessibility issues
- data-fetching and request-boundary problems
- repo-local drift from the installed mobile playbook

### Branch: `backend`

Load and use:

- `backend-skills/backend-architect/`

Also load:

- `backend-skills/supabase-postgres-best-practices/` when the repo uses Postgres
  or Supabase, or when SQL/schema quality is in scope

Audit for:

- API and service boundary issues
- missing or weak auth, authz, validation, or rate limiting
- schema, query, and indexing issues
- resilience and observability issues
- repo-local drift from the installed backend playbook

---

## Output File

Write the audit report to:

```text
docs/audits/YYYY-MM-DD-<branch>-best-practices-audit.md
```

Create `docs/audits/` if needed.

Use this structure:

```markdown
# Best Practices Audit

## Scope
- Repository or app path audited
- Audit mode: baseline | drift
- Branch: nextjs | expo | backend
- Date

## Skill Packs Used
- [list the skill packs used]

## Summary Assessment
[2-4 short paragraphs]

## Findings
### Critical
- [finding with file:line citation]

### High
- [finding with file:line citation]

### Medium
- [finding with file:line citation]

### Low
- [finding with file:line citation]

## Drift From Playbook Patterns
- [where the repo differs from the installed playbook direction]

## Quick Wins
- [small, high-leverage changes]

## Strategic Follow-Up
- [larger refactors or architectural work]

## Suggested Next Prompt
[a prompt the user can use with brainstorming or plan-writing skills]
```

If there are no major findings, say so explicitly and still note residual risks
or areas that were not deeply verified.

---

## Final Step

After writing the audit report:

1. Tell the user where the audit document was written.
2. Summarize the top findings briefly.
3. Suggest using the audit doc as input to:
   - `skills/brainstorming-features/`
   - `skills/writing-plans/`

Do not begin implementation unless the user explicitly asks for a follow-up
planning or build step.
