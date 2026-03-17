# best-practices-audit

`best-practices-audit` is an optional workflow package for auditing an existing
repository against the best-practice skill packs already provided by this
playbook.

It is designed for two common situations:

- onboarding an older repo that has just had `agent-engineering-playbook`
  installed
- running periodic drift checks to see whether a repo is still aligned with the
  installed guidance

This package is intentionally separate from the core skill packs. It does not
replace the skills. It wraps them in a reusable workflow that performs a
structured audit and writes the results to a document in the target repo's
`docs/` folder for later planning and implementation work.

Recommended usage: run this workflow in a fresh chat in the target repository so
the context stays focused on the audit.

If the target repository uses `AGENTS.md`, this workflow should still operate
within that contract. This workflow complements the repo's operating model; it
does not replace approval gates, QA expectations, or documentation rules unless
the user explicitly chooses to work outside them.

---

## Package Layout

```text
optional-workflows/best-practices-audit/
├── README.md
├── workflow/
│   └── best-practices-audit.md
└── resources/
    └── templates/
        └── audit-report-template.md
```

---

## What This Package Installs

Copy these files into the target repository:

| Source in this repo | Destination in target repo |
| --- | --- |
| `optional-workflows/best-practices-audit/workflow/best-practices-audit.md` | `.agent/workflows/best-practices-audit.md` |

The workflow file is the installable IDE-facing entrypoint.

The template in `resources/templates/` is a support resource for humans and AI.
It does not need to be copied into the target repository unless the user wants
to keep a local reusable template.

---

## What This Workflow Does

This workflow performs a read-first, findings-first audit of a target
repository, then writes an audit document into the target repo's `docs/`
directory.

It supports three branches:

- `nextjs` for web frontend audits
- `expo` for Expo / React Native frontend audits
- `backend` for backend API, service, and data-layer audits

The output is an audit document that can be used as input to a follow-up
brainstorming or planning step.

This workflow is intended to produce an assessment artifact, not to make code
changes.

---

## Installation Steps

### 1. Copy the workflow file

Copy:

```text
optional-workflows/best-practices-audit/workflow/best-practices-audit.md
```

to:

```text
.agent/workflows/best-practices-audit.md
```

### 2. Optional: copy the template resource

If you want a local template file in the target repo for future manual use, copy:

```text
optional-workflows/best-practices-audit/resources/templates/audit-report-template.md
```

to somewhere under the target repo's `docs/` area, for example:

```text
docs/templates/audit-report-template.md
```

This step is optional. The workflow can generate the audit report without
copying the template file.

---

## Audit Output

The workflow should write the audit result into the target repository under:

```text
docs/audits/
```

Recommended filename pattern:

```text
docs/audits/YYYY-MM-DD-<branch>-best-practices-audit.md
```

Examples:

```text
docs/audits/2026-03-17-nextjs-best-practices-audit.md
docs/audits/2026-03-17-expo-best-practices-audit.md
docs/audits/2026-03-17-backend-best-practices-audit.md
```

The resulting audit document is meant to be consumed later by:

- `skills/brainstorming-features/`
- `skills/writing-plans/`

as a separate step.

---

## Branches And Skill Mapping

### `nextjs`

Use the web frontend skill packs as the audit basis:

- `frontend-web-skills/react-best-practices/`
- `frontend-web-skills/accessible-ui/`
- `frontend-web-skills/composition-patterns/`
- `frontend-web-skills/api-feature-request/` when API integration quality is in scope

Audit areas:

- rendering and performance patterns
- accessibility
- component composition and architecture
- data fetching and API boundaries
- repo drift from installed frontend playbook patterns

### `expo`

Use the mobile frontend skill packs as the audit basis:

- `frontend-mobile-skills/react-native-skills/`
- `frontend-mobile-skills/expo-native-data-fetching/`
- `frontend-mobile-skills/accessible-ui/`
- `frontend-mobile-skills/composition-patterns/`
- `frontend-mobile-skills/api-feature-request/` when API integration quality is in scope

Audit areas:

- list and rendering performance
- platform-aware UI patterns
- accessibility
- navigation and app structure
- data fetching and API boundaries
- repo drift from installed mobile playbook patterns

### `backend`

Use the backend skill packs as the audit basis:

- `backend-skills/backend-architect/`
- `backend-skills/supabase-postgres-best-practices/` when the repo uses Postgres or Supabase

Audit areas:

- API and service boundaries
- authentication, authorization, validation, and rate limiting
- data access patterns and schema practices
- Postgres and Supabase performance posture where relevant
- observability, resilience, and operational drift

---

## Recommended Workflow Behavior

After installation, the human should trigger the workflow from the IDE using:

```text
.agent/workflows/best-practices-audit.md
```

The workflow should:

1. Ask which branch to audit: `nextjs`, `expo`, `backend`, or auto-detect with confirmation.
2. Inspect the repository directly rather than treating prose docs as the primary source.
3. Load the relevant skill packs for the selected branch.
4. Perform a read-only audit with findings prioritized by severity.
5. Cite findings with `file:line` references.
6. Write the audit report into `docs/audits/`.
7. End by suggesting that the user use the audit document as input to a planning step.

---

## Audit Document Expectations

The audit report should include:

1. Scope
2. Branch selected or detected
3. Skill packs used
4. Summary assessment
5. Findings ordered by severity with `file:line` citations
6. Drift from installed playbook patterns
7. Quick wins
8. Strategic follow-up opportunities
9. Suggested next prompt for brainstorming or planning

Use the template in `resources/templates/audit-report-template.md` as the
starting structure.

---

## Important Rules

- This workflow is audit-first and read-only by default.
- It should not silently fix code during the audit step.
- The audit artifact is the deliverable.
- Actual changes should happen in a separate follow-up planning and execution
  step.

---

## Summary

Each optional workflow package in `optional-workflows/` should work like this:

- the package README is the install contract
- `workflow/` contains the IDE workflow entrypoint
- `resources/` contains support files for that workflow

`best-practices-audit` is the package for producing reusable audit documents
that can feed a later planning workflow.
