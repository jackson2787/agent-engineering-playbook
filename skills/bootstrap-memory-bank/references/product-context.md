# `productContext.md`

## Purpose

Capture the human and product context around the repository.

This file should explain users, jobs to be done, important flows, product
priorities, and non-technical context that helps future sessions make sensible
tradeoffs.

## Strong Evidence Sources

- explicit human explanation
- route and screen flows that suggest user journeys
- analytics, billing, auth, or onboarding flows present in code
- domain models that reveal actors and resources

## Human Input Is Required

This file is more human-driven than repo-driven.

Code can suggest behavior, but it rarely reveals:

- user segments
- pain points
- business priorities
- customer value
- acceptable UX tradeoffs

## Ask The Human

Before finalizing, confirm:

1. Who are the primary users or operators?
2. What are they trying to accomplish?
3. What outcomes matter most to them?
4. What product priorities or tradeoffs matter in this repo?
5. Are there important secondary users, admin users, or internal operators?

## Suggested Structure

```markdown
# Product Context

## Primary Users

## User Problems / Jobs To Be Done

## Critical User Flows

## Product Priorities

## Important Constraints Or Tradeoffs
```

## Red Flags

- Filling this file with generic product-manager language
- Treating route names as proof of user value
- Repeating `projectbrief.md` instead of adding user and product context
