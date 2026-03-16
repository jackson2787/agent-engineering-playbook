---
description: >
  Dynamic script to generate a project-specific API-First Architecture skill.
  Run this script on a new repository to analyze the stack and initiate a chat
  with the user to define strict non-negotiables for frontend-backend communication.
---

# Dynamic Rule Generator: API-First Architecture (OpenAPI)

**Purpose:** This script instructs the AI agent to analyze the current repository, explicitly engage the user in a conversation about architectural non-negotiables, and then generate a hyper-specific set of data-access rules tailored strictly to the API-first pattern.

## Phase 1: Stack Discovery 🔍
Agent, before generating any rules, you must run the following checks on the target repository:
1. **Frontend:** Read `package.json` to determine the framework.
2. **Backend / API:** Check for OpenAPI client generation tools (e.g., `openapi-fetch`, `orval`).
3. **Database Client:** Check for `@supabase/supabase-js`.

## Phase 2: Dynamic Negotiation (Chat with the User) 💬
Once you have analyzed the repo, you MUST use the `notify_user` pattern to start a conversation. Do not generate the final rules immediately.

**Present your analysis and propose this baseline set of non-negotiables to the user:**

> "I have analyzed the repository and see we are using an OpenAPI backend. To ensure our architecture remains pristine, I propose the following strict non-negotiables for this project:
> 
> 1.  **Frontend Database Ban:** The frontend is strictly forbidden from querying the Supabase database directly (e.g., `supabase.from('table').select()`). 
> 2.  **API Only:** All data fetching and mutations MUST occur via the OpenAPI generated client hitting the backend.
> 3.  **Supabase Client Exceptions:** The Supabase client is only permitted on the frontend for two things: Authentication (`supabase.auth`) and Storage Uploads/Downloads (`supabase.storage`).
> 
> Hey, what do you think are some great non-negotiables for this project? Are there any others you would like to add or modify before I write these rules in stone for us?"

*Proceed to Phase 3 ONLY after the user has responded, negotiated, and explicitly approved the final non-negotiables.*

## Phase 3: Rule Generation ⚙️
Using the agreed-upon constraints from Phase 2, generate a highly specific `projectRules.md` or `.agent/skills/api-first-architecture.md` document for this repository. 

The generated skill MUST define:
1. **The Core Iron Law:** Explicitly forbid direct DB access from the frontend.
2. **Approved Fetching Pattern:** Document exactly how the frontend should call the OpenAPI client (including any required error-handling boundaries).
3. **Red Flags (Rationalizations):** List the excuses the AI is forbidden to use. (Example: "I'll just query Supabase directly this one time to save time building a new backend route.")

## Phase 4: Output and Delivery 💾
Write the generated, agreed-upon ruleset directly into the target project's `.agent/projectRules.md` (or equivalent location). **Do NOT** write the project-specific rules back into the generic `uber-ai-workflow` skills repository. 
Notify the user with a brief summary of the exact constraints that were written.
