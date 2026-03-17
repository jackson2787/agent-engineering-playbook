# Install Optional Skills

Use this guide after the base repository bootstrap in
`docs/install-into-existing-repo.md` is already complete.

Optional skills are manually invoked, task-specific add-ons for Codex-style
clients. They are intentionally separate from the always-on workflow packs in
`.agent/skills/` so they do not become part of the default execution surface
for normal coding work.

## What Optional Skills Are For

Install an optional skill when a target repository needs a repeatable workflow
that should be available on demand, but should not be loaded by default in
every session.

Examples in this repo:

- `sync-api` for strict OpenAPI-driven frontend client syncing
- `best-practices-audit` for manual repository audits and drift reviews

## Install Order

1. Install the base operating model and universal/domain skill packs first by
   following `docs/install-into-existing-repo.md`.
2. Choose only the optional skill packages the target repo actually needs.
3. Copy the installable skill payload into the target repo's manual skill
   directory, typically `skills/<skill-name>/`.
4. Copy any supporting scripts, templates, or references required by that
   package.
5. Keep optional skills manually invoked. Do not fold them into the default
   always-on `.agent/skills/` surface unless you explicitly want that behavior.

Recommended target layout:

```text
target-repo/
├── AGENTS.md
├── .agent/
│   └── skills/
│       └── ...
└── skills/
    ├── best-practices-audit/
    │   ├── SKILL.md
    │   ├── agents/
    │   ├── assets/
    │   └── references/
    └── sync-api/
        ├── SKILL.md
        └── agents/
```

## Package Rules

- Prefer the package-local `installation.md` when it exists.
- Preserve relative paths inside each installed skill so `SKILL.md`,
  `agents/openai.yaml`, and any bundled references keep working.
- If a package includes extra project resources outside the installable skill
  directory, copy those too.
- If a package does not yet include `installation.md`, copy the package payload
  as-is and preserve its internal directory structure.

## Current Optional Skills

### `sync-api`

Use for TypeScript frontend repos that sync a generated client from an OpenAPI
contract.

Follow the package-local guide at
`optional-skills/sync-api/installation.md`.

Current install payload:

- `optional-skills/sync-api/skills/sync-api/` -> `skills/sync-api/`
- `optional-skills/sync-api/resources/scripts/slice-openapi.js` ->
  `scripts/slice-openapi.js`
- `optional-skills/sync-api/resources/scripts/generate-api.js` ->
  `scripts/generate-api.js`
- `optional-skills/sync-api/resources/assets/orval.config.template.ts` ->
  `orval.config.ts`

Also add the package scripts and dependencies described in the package-local
installation guide.

### `best-practices-audit`

Use for manual baseline audits or periodic drift audits in `Next.js`, `Expo`,
or backend repositories.

This package does not currently ship with a package-local `installation.md`.
For now, install it by copying the package contents into the target repo as:

- `optional-skills/best-practices-audit/` -> `skills/best-practices-audit/`

Preserve these bundled paths:

- `skills/best-practices-audit/SKILL.md`
- `skills/best-practices-audit/agents/openai.yaml`
- `skills/best-practices-audit/assets/audit-report-template.md`
- `skills/best-practices-audit/references/branches.md`

The installed skill writes audit reports to:

```text
docs/audits/YYYY-MM-DD-<branch>-best-practices-audit.md
```

## Invocation Guidance

- Install optional skills only when the repo needs that exact workflow.
- Invoke them explicitly for focused tasks.
- Do not treat them as ordinary bootstrap inputs for every session.
- Keep `AGENTS.md` plus `.agent/skills/` as the main operating model.

## References

- Base install guide: `docs/install-into-existing-repo.md`
- Optional skill package overview: `optional-skills/README.md`
- `sync-api` package install details: `optional-skills/sync-api/installation.md`
