# Plan Phase — Injected Skills

<!--
  PURPOSE: Pre-populated skill injection reference for the PLAN phase.

  HOW TO USE:
  1. Copy the skills relevant to your project's domain into:
     .agent/skills/state-machine/writing-plans/references/injected-skills.md
  2. Remove skills that don't apply to your stack
  3. The agent will load every skill listed there before planning

  These are behavioural disciplines — they change HOW the agent plans.
  For framework/library API docs, use Context7 MCP instead.

  INSTALL PATH FOR SKILLS:
  Copy the skill folder from skill-packs/ into .agent/skills/ in your target repo.
  Example: skill-packs/frontend-skills/frontend-shared-skills/accessible-ui/
        → .agent/skills/accessible-ui/
-->

---

## Mobile (React Native / Expo)

```
- `.agent/skills/api-feature-request/` — Validate that the API can support the mobile feature before committing to a plan
- `.agent/skills/composition-patterns/` — Apply when the plan involves reusable component APIs, compound components, or significant component architecture
```

---

## Web (React / Next.js)

```
- `.agent/skills/api-feature-request/` — Validate that the API surface can support the frontend feature before committing to a plan
- `.agent/skills/composition-patterns/` — Apply when the plan involves reusable component APIs, compound components, or significant component architecture
```

---

## Shared Frontend (Mobile + Web)

```
- `.agent/skills/accessible-ui/` — All plans involving user-facing UI must account for accessibility from the design stage
```

---

## Backend (Supabase / Hono)

```
- `.agent/skills/backend-architect-supabase-hono/` — Apply when planning any API route, edge function, or database interaction
- `.agent/skills/supabase-postgres-best-practices/` — Apply when planning schema changes, migrations, queries, or RLS policies
```
