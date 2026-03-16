---
description: >
  Dynamic script to generate a project-specific Frontend Architecture skill.
  Run this script on a new repository to analyze the stack and initiate a chat
  with the user to define strict non-negotiables for data fetching, state 
  management, and backend APIs.
---

# Dynamic Rule Generator: Frontend Architecture

**Purpose:** This script instructs the AI agent to analyze the current repository, explicitly engage the user in a conversation about architectural non-negotiables, and then generate a hyper-specific set of data-access and state management rules.

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

## Phase 3: Rule Generation ⚙️
Using the agreed-upon constraints from Phase 2, generate a highly specific constraint document tailored to this repository.

**Critical Formatting Constraints:**
*   Rules must be highly concise, bulleted, and no longer than necessary to prevent LLM context bloat. Avoid verbose explanations.
*   You MUST include a meta-rule stating: *"These project-specific constraints supersede any generic universal skills."*

The generated rules MUST define:
1. **The Core Iron Law:** Explicitly forbid any unauthorized data access patterns (e.g., rogue `useEffect` fetches or direct DB calls from the UI).
2. **Approved Fetching Pattern:** Document exactly how the frontend should call the API (including required Suspense/Error boundaries).
3. **State Boundaries:** Explicitly define what goes in local `useState`, what goes in the Global store, and what stays in the fetch cache.
4. **Red Flags (Rationalizations):** List the specific excuses the AI is forbidden to use for this stack (e.g., "I'll just query Supabase directly this one time to save time").

## Phase 4: Output and Delivery 💾
You MUST adhere to the `AGENTS.md` state machine (PLAN -> BUILD -> DIFF -> QA -> APPROVAL -> APPLY).

1. Generate a proposed `DIFF` containing the new rules.
2. You MUST read the existing `memory-bank/projectRules.md` file first and strictly APPEND your new section titled **`### Frontend Architecture & Data Flow`** to ensure you do not overwrite existing rules.
3. Present the `DIFF` to the user and ask for explicit `APPROVAL`.
4. Once approved, write the generated, agreed-upon ruleset directly into the target project's Memory Bank at `memory-bank/projectRules.md`. 
**Do NOT** write the project-specific rules back into the generic `uber-ai-workflow` skills repository. 
Notify the user with a brief summary of the exact constraints that were written.
