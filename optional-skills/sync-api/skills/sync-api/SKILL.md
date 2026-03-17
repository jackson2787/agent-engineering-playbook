---
name: sync-api
description: Use this skill only when the user explicitly asks to sync a TypeScript frontend client to an OpenAPI contract, refactor the API sync workflow, or generate/update contract-driven client code. Supports manual contract refresh, sliced incremental generation, and contract-drift review.
metadata:
  author: uber-ai-workflow
  version: "0.1.0"
---

# Client-Side Sync Workflow (API is God)

Use this skill only for explicit API sync or contract-alignment requests. Do
not invoke it for ordinary frontend feature work.

## Purpose

- Keep the client strictly contract-driven (API is authoritative).
- Detect contract drift early.
- Prevent client-side patching around missing or ambiguous API behaviour.

## Scope

- Operates in the client repository only
- Assumes the repo already has the required scripts, config, and local
  `.agent/skills/sync-api/` installation in place
- Does not authorize backend, schema, or OpenAPI spec changes
- If the API contract is insufficient, halt and report the gap

## Operating Rule (API is God)

- The client must not infer, guess, widen, default, or hallucinate
  request/response shapes.
- Mutations must be observable:
  - Prefer returning the updated model (typed) and using it to update caches, or
  - Explicitly handle 204 No Content.
- Errors must be typed and handled via stable codes, not string matching.

## Inputs

- OpenAPI spec (source of truth):
  - Either checked into this repo, or fetched during generation.
- Generated types/client output directory:
  - Do not hand-edit generated output.

## Step-by-Step Workflow

### 0) Refresh the Contract (Spec)

Fetch the latest OpenAPI spec from the canonical source:

```bash
npm run api:sync
```

Hard rule:

- Do not manually "fix" generated outputs. Fix the contract inputs
  (`src/lib/api-schema.json`) or the callsites.

### 1) Slice and Checksum

Slice the full spec by tag into `src/lib/api/slices/` and compute checksums so
you can identify which functional domains have changed:

```bash
npm run api:slice
```

Artifacts produced:

- `src/lib/api/slices/*.json`: tag-specific mini-specs
- `src/lib/api/slices/.checksums.json`: record of last-known states

### 2) Incremental Code Generation (Orval)

Run the orchestrated generator. It should only run Orval on dirty slices where
checksums changed:

```bash
npm run api:gen
```

Expected outcome:

- Only files in `src/lib/api/${dirty_tag}/` and
  `src/lib/api/zod/${dirty_tag}/` are updated.
- `index.schemas.ts` and `index.ts` remain stable across incremental runs.

Manual full regeneration escape hatch:

```bash
npm run api:gen:full
```

Use that only when things are out of sync or global types changed unexpectedly.

## Contract Discipline

- Do not hand-edit generated files
- Do not use `as any`, `as unknown as X`, fake defaults, or widened shapes to
  suppress contract mismatches
- Treat compile or test failures after generation as contract-alignment work,
  not permission to weaken typing

### 3) Compile Gate (Contract Alignment)

```bash
npx tsc --noEmit
```

If this fails:

- Treat it as a contract mismatch at a callsite.
- Fix the client code to match the generated contract.

Prohibited fixes:

- `as any`
- `as unknown as X`
- widening types
- adding fake defaults

### 4) Lint / Format Gate (Consistency)

```bash
npm run lint
```

```bash
npm run format:check || true
```

Use the repo's actual lint and format commands if they differ.

### 5) Test Gate (Behaviour Alignment)

```bash
npm test
```

If this fails:

- Investigate whether the API contract changed.
- Check response shape, status code, and error schema differences.
- Update tests and callsites to match the new contract.

## Contract Discipline Gates

These checks prevent semantic drift where types might technically pass but
intent fails.

### 6) Drift Prevention Review

Use `git diff` to verify:

1. Observability: mutations must return models or handle 204s explicitly. No
   void or `any` returns.
2. Error handling: errors must rely on stable codes, not string messages.
3. Zero inference: no defaulting or guessing on partial payloads.

### 7) Generated Contract Diff Review Gate

```bash
git diff
```

Review specifically:

- nullable vs optional flips
- enum changes
- response models added or removed
- error schema changes

Hard rule:

- If the diff implies a behaviour change, the client must be updated
  accordingly.

## Installation Boundary

This is the operational skill only.

If the repository has not been set up yet, follow the source package's
installation guide to install:

- `scripts/slice-openapi.js`
- `scripts/generate-api.js`
- `orval.config.ts`
- `.agent/skills/sync-api/`

## Reporting Contract Gaps (Halt, Don't Patch)

If the client cannot implement a feature safely because the API does not
provide enough information:

- Stop.
- Create a short "Contract Gap" note in the client repo containing:
  - endpoint and method
  - what is missing
  - why the client cannot proceed without guessing
  - the minimal contract change needed

Do not:

- invent client-side assumptions
- add fake defaults
- loosen types

Any API or spec change requires explicit authorization and happens outside this
workflow.

## Completion Checklist

A sync is only done when:

- the OpenAPI contract is up to date in the client
- types and client output regenerated successfully
- `tsc --noEmit` passes
- tests pass
- Drift Prevention Review passes
- generated diff review passes
- contract gaps are logged if discovered
