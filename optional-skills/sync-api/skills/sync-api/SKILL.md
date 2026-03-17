---
name: sync-api
description: Use this skill only when the user explicitly asks to sync a TypeScript frontend client to an OpenAPI contract, refactor the API sync workflow, or generate/update contract-driven client code. Supports manual contract refresh, sliced incremental generation, and contract-drift review.
metadata:
  author: uber-ai-workflow
  version: "0.1.0"
---

# Sync API

Use this skill only for explicit API sync or contract-alignment requests. Do
not invoke it for ordinary frontend feature work.

## Purpose

- Keep the client strictly contract-driven
- Detect contract drift early
- Prevent client-side patching around missing or ambiguous API behavior

## Scope

- Operates in the client repository only
- Assumes the repo already has the required scripts, config, and local
  `skills/sync-api/` installation in place
- Does not authorize backend, schema, or OpenAPI spec changes
- If the API contract is insufficient, halt and report the gap

## Core Workflow

1. Refresh the OpenAPI spec using the target repo's `api:sync` command.
2. Slice the spec and detect dirty tags.
3. Regenerate only the changed client surfaces unless a full regen is needed.
4. Run compile, lint, and test gates.
5. Review generated diffs for semantic drift.
6. Stop and report contract gaps rather than guessing.

## Contract Discipline

- Do not hand-edit generated files
- Do not use `as any`, `as unknown as X`, fake defaults, or widened shapes to
  suppress contract mismatches
- Treat compile or test failures after generation as contract-alignment work,
  not permission to weaken typing

## Installation Boundary

This is the operational skill only.

If the repository has not been set up yet, follow the source package's
installation guide to install:

- `scripts/slice-openapi.js`
- `scripts/generate-api.js`
- `orval.config.ts`
- `skills/sync-api/`

## Completion Checklist

A sync is only done when:

- the OpenAPI contract is up to date in the client
- generation completed successfully
- `tsc --noEmit` passes
- tests pass
- generated diff review passes
- contract gaps are logged if discovered
