# Build Phase — Injected Skills

<!--
  PURPOSE: Pre-populated skill injection reference for the BUILD phase.

  HOW TO USE:
  1. Copy the skills relevant to your project's domain into:
     .agent/skills/state-machine/build-execution/references/injected-skills.md
  2. Remove skills that don't apply to your stack
  3. The agent will load every skill listed there before executing the build loop

  These are behavioural disciplines — they change HOW the agent writes code.
  For framework/library API docs, use Context7 MCP instead.

  INSTALL PATH FOR SKILLS:
  Copy the skill folder from skill-packs/ into .agent/skills/ in your target repo.
  Example: skill-packs/frontend-skills/frontend-shared-skills/accessible-ui/
        → .agent/skills/accessible-ui/

  NOTE ON QA:
  The original mobile and web AGENTS.md variants reloaded domain skills during QA.
  With the injected-skills model, skills loaded at BUILD remain active through QA
  as part of the same working context — no separate QA reload is needed.
-->

---

## Mobile (React Native / Expo)

```
- `.agent/skills/react-native-skills/` — Core React Native and Expo implementation patterns, rendering, navigation, lists, animations, and platform-specific behaviour
- `.agent/skills/expo-native-data-fetching/` — API requests, query caching, offline handling, token flow, retry logic, and network failure paths
- `.agent/skills/accessible-ui/` — Accessibility patterns, ARIA equivalents, keyboard/focus handling, text scaling, and assistive-technology behaviour for all user-facing components
- `.agent/skills/composition-patterns/` — Apply when building reusable component APIs, compound components, or composition-heavy implementations
```

---

## Web (React / Next.js)

```
- `.agent/skills/react-best-practices/` — React rendering, component boundaries, hooks discipline, and performance-sensitive UI patterns
- `.agent/skills/next-best-practices/` — Next.js routing, RSC boundaries, route handlers, metadata, hydration, Suspense, and runtime behaviour
- `.agent/skills/next-cache-components/` — Apply when the task touches Partial Prerendering, use cache, cache invalidation, cacheLife, cacheTag, or updateTag
- `.agent/skills/accessible-ui/` — Accessibility patterns, focus handling, form semantics, contrast, and assistive-technology behaviour for all user-facing components
- `.agent/skills/composition-patterns/` — Apply when building reusable component APIs, compound components, or composition-heavy implementations
```

---

## Backend (Supabase / Hono)

```
- `.agent/skills/backend-architect-supabase-hono/` — Route design, handler rules, schema-first development, database bridge patterns, and edge function delivery
- `.agent/skills/supabase-postgres-best-practices/` — Query optimisation, RLS policy design, migration discipline, and database-level authority models
```
