---
description: >
  Dynamic script to generate a project-specific Frontend Architecture skill.
  Run this script on a new repository to analyze the stack and initiate a chat
  with the user to define strict non-negotiables for data fetching, state 
  management, and backend APIs.
---

# Dynamic Skill Generator: Frontend Architecture

**Purpose:** This script instructs the AI agent to analyze the current repository, explicitly engage the user in a conversation about architectural non-negotiables, and then generate a hyper-specific frontend architecture SKILL tailored to this project's unique tech stack.

## Phase 1: Stack Discovery 🔍
Agent, before generating any rules, you must run the following checks on the target repository:
1. **Frontend Framework:** Read `package.json` to determine the framework (Next.js, Vite, Expo, etc.).
2. **Global State:** Check for `zustand`, `redux`, `jotai`, or Context patterns.
3. **API / Fetching:** Check for `openapi-fetch`, `@tanstack/react-query`, `trpc`, `swr`, or pure Server Actions.
4. **Database Client:** Check for `@supabase/supabase-js`.

## Phase 2: Dynamic Negotiation (Chat with the User) 💬
Once you have analyzed the repo, you MUST use the `notify_user` pattern to start a conversation. Do not generate the final rules immediately.

**Present your analysis and propose this baseline set of non-negotiables to the user (tailor these based on what you found in Phase 1):**

> "I have analyzed the repository and see we are using [Framework] with [Fetching Library] and [State Manager]. To ensure our frontend architecture remains pristine, I propose the following strict non-negotiables for this project:
> 
> 1.  **Backend Integration:** [If OpenAPI/Hono: All data fetching MUST occur via the OpenAPI client hitting the backend. Direct Supabase DB queries from the frontend are strictly forbidden.] 
> 2.  **Fetching Methodology:** [e.g., Forbidden to fetch inside `useEffect`. All queries must use `useQuery` / Server Actions.]
> 3.  **Global vs Local State:** [e.g., Use Zustand purely for ephemeral UI state (like sidebar toggles). All server state MUST strictly remain in the React Query / Router cache.]
> 4.  **Supabase Client Exceptions:** The Supabase client is only permitted on the frontend for Authentication (`supabase.auth`) and Storage Uploads/Downloads (`supabase.storage`).
> 
> Hey, what do you think are some great non-negotiables for this project? Are there any others you would like to add or modify before I write these rules in stone for us?"

*Proceed to Phase 3 ONLY after the user has responded, negotiated, and explicitly approved the final non-negotiables.*

## Phase 3: Skill Generation ⚙️
Using the agreed-upon constraints from Phase 2, generate a highly specific constraint document tailored to this repository. This document will become a new AI skill.

**Critical Formatting Constraints:**
*   You must generate a valid `SKILL.md` format, including YAML frontmatter with a `name: project-frontend-architecture` and a `description:` that starts with "Use when..."
*   The skill must be highly concise, bulleted, and no longer than necessary to prevent LLM context bloat. Avoid verbose explanations.
*   You MUST include an explicit meta-rule stating: *"This skill defers to `react-best-practices`, `composition-patterns`, and `backend-architect` as the ultimate sources of truth. This skill ONLY defines our specific project wiring and choices."*

The generated skill MUST define:
1. **The Core Iron Law:** Explicitly forbid any unauthorized data access patterns for this specific project (e.g., rogue `useEffect` fetches or direct DB calls from the UI).
2. **Approved Fetching Pattern:** Document exactly how the frontend should call the API within this project's chosen stack (including required Suspense/Error boundaries).
3. **State Boundaries:** Explicitly define what goes in local `useState`, what goes in the Global store, and what stays in the fetch cache.
4. **Red Flags (Rationalizations):** List the specific excuses the AI is forbidden to use for this stack (e.g., "I'll just query Supabase directly this one time to save time").

## Phase 4: Output and Delivery 💾
You MUST adhere to the `AGENTS.md` state machine (PLAN -> BUILD -> DIFF -> QA -> APPROVAL -> APPLY).

1. Generate a proposed `DIFF` containing the new `SKILL.md` file layout.
2. The destination path for this new skill must be `.agent/skills/project-frontend-architecture/SKILL.md` within the target repository.
3. Present the `DIFF` to the user and ask for explicit `APPROVAL`.
4. Once approved, write the generated, agreed-upon `SKILL.md` directly into the target project. 
**Do NOT** write the project-specific skill back into the generic `uber-ai-workflow` repository. 
Notify the user with a brief summary of the exact constraints that were immortalized as a skill.
