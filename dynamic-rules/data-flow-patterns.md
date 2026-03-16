---
description: >
  Dynamic script to generate a project-specific Data Flow & State Management skill. 
  Run this script on a new repository to analyze the stack and build strict data 
  fetching constraints tailored exactly to that project.
---

# Dynamic Rule Generator: Data Flow & State Management

**Purpose:** This script instructs the AI agent to analyze the current repository, ask clarifying questions if the stack is ambiguous, and generate a hyper-specific set of data-fetching and state management rules tailored to this exact project stack.

## Phase 1: Stack Discovery 🔍
Agent, before generating any rules, you must run the following checks on the target repository:
1. **Framework:** Read `package.json` to determine the core framework (e.g., Next.js, Vite, React Native, Expo, SvelteKit).
2. **Data Fetching:** Scan `package.json` for primary fetching libraries (e.g., `@tanstack/react-query`, `swr`, `@apollo/client`, or none if relying purely on native `fetch`/Server Actions).
3. **State Management:** Search for global state managers (e.g., `zustand`, `redux`, `jotai`, `recoil`).
4. **Router System:** If Next.js, scan the directory structure (`app/` vs `pages/`) to confirm App Router vs Pages Router. If React Native, check for `expo-router`.

## Phase 2: Clarification ❓
If any core architectural choice is missing or ambiguous (for example, you see both `zustand` and `@reduxjs/toolkit` installed, or there is no clear data fetching library), you MUST use `notify_user` to ask the developer for their intended architecture regarding:
- The Primary Fetching Methodology (e.g., "Are we using React Query, or pure Server Actions?")
- Global State Management (e.g., "Where does global UI state live?")
- Loading and Error State approaches (e.g., "Do you prefer React Suspense or explicit `isLoading` booleans?")

*Proceed to Phase 3 ONLY when the stack is 100% confirmed.*

## Phase 3: Rule Generation ⚙️
Using the confirmed tech stack, generate a highly specific `projectRules.md` or `.agent/skills/project-data-flow.md` document. The generated skill MUST define absolute, non-negotiable constraints for the following four areas:

1. **Fetching Methodology:** Explicitly define where and how fetching occurs. (Example: "Forbidden to fetch inside `useEffect`. All queries must use `useQuery` from React Query.")
2. **Loading & Error States:** Mandate how async boundaries are handled. (Example: "Requires React Suspense and Error Boundaries around all async component trees.")
3. **Backend / Supabase Integration:** Define how the client interacts with the database/API. (Example: "All DB access must happen through `src/actions/` Server Actions. Never execute Supabase queries inline inside UI components.")
4. **Global vs Local State:** Provide explicit boundaries for state. (Example: "Use Zustand *only* for global UI state like sidebar toggles; all server state MUST stay in the React Query cache.")

## Phase 4: Output and Delivery 💾
Write the generated ruleset directly into the target project's `.agent/projectRules.md` (or equivalent location). **Do NOT** write the project-specific rules back into the generic `uber-ai-workflow` skills repository. 
Notify the user with a brief summary of the exact constraints that were generated and enforced.
