---
name: best-practices-audit
description: Use this skill only when the user explicitly asks to run, draft, or update a best-practices audit for a repository. Produces a read-first audit document for a Next.js, Expo, or backend codebase and writes the findings to docs/audits/.
metadata:
  author: uber-ai-workflow
  version: "0.1.0"
---

# Best Practices Audit

Use this skill only for explicit audit requests. Do not invoke it for ordinary
feature work, code review, or implementation tasks.

## Purpose

- Audit an existing repository against the installed skill packs
- Help bootstrap older repos that have just adopted this playbook
- Help detect drift in repos that were previously aligned
- Produce a reusable audit document for later planning and implementation

This skill is read-only by default. The output is an audit report, not a code
change set.

## First Step

Establish:

- branch: `nextjs`, `expo`, or `backend`
- audit mode: `baseline` or `drift`

If the repository strongly suggests a branch, you may infer it and ask for
confirmation. If audit mode is omitted, default to `baseline`.

## Core Contract

You must:

1. Inspect the codebase directly. Do not treat README prose as the primary
   source of truth.
2. Load the relevant skill packs for the selected branch.
3. Produce findings ordered by severity.
4. Cite concrete `file:line` references.
5. Stay read-only unless the user explicitly changes scope.
6. Write the audit result to `docs/audits/YYYY-MM-DD-<branch>-best-practices-audit.md`.
7. End by suggesting the audit document be used as input to a separate planning
   or brainstorming pass.

## Branch-Specific Guidance

Load [references/branches.md](references/branches.md) and use only the section
for the selected branch.

## Output Structure

Use the structure in [assets/audit-report-template.md](assets/audit-report-template.md).

If there are no major findings, say so explicitly and still note residual risks
or areas not deeply verified.

## Final Step

After writing the audit report:

1. Tell the user where the document was written.
2. Summarize the top findings briefly.
3. Suggest using the audit doc as input to:
   - `skills/brainstorming-features/`
   - `skills/writing-plans/`

Do not begin implementation unless the user explicitly asks for a follow-up
planning or build step.
