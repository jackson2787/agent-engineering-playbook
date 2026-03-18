# `projectRules.md`

## Purpose

Capture stable, local laws that the agent should follow in this repository.

This file should contain repo-specific conventions, approved patterns,
forbidden moves, and local engineering preferences that are durable enough to
guide future implementation.

## Strong Evidence Sources

- explicit human instruction
- lint and formatter configuration
- repeated conventions enforced across the codebase
- domain skills already chosen for this repo
- build and deployment constraints that are clearly intentional

## Ask The Human

Before finalizing, confirm:

1. Which conventions are mandatory versus nice-to-have?
2. Which anti-patterns are banned here?
3. Which local stack decisions should the agent always preserve?
4. Which rules are temporary and should not become Memory Bank law?

## Never Put These In `projectRules.md`

- generic best practices already covered by universal skills
- one-off implementation choices
- speculative preferences not confirmed by the user
- team folklore with no visible enforcement or endorsement

## Suggested Structure

```markdown
# Project Rules

## Mandatory Local Conventions

## Approved Patterns

## Forbidden Moves

## Tooling / Workflow Constraints

## Notes On Temporary Exceptions
```

## Red Flags

- Turning broad framework advice into local rule noise
- Writing rules that conflict with `AGENTS.md`
- Documenting transient migration work as a permanent convention
