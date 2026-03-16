---
description: >
  Dynamic script to generate a project-specific Application Security (AppSec) skill.
  Run this script on a new repository to analyze if it is a frontend or backend
  codebase, and then generate strict, non-negotiable OWASP defenses tailored to the stack.
---

# Dynamic Rule Generator: Secure Coding Practices (AppSec & OWASP)

**Purpose:** This script instructs the AI agent to analyze the current repository to determine its context (Frontend vs Backend), and then generate a hyper-specific set of security rules to prevent OWASP Top 10 vulnerabilities during day-to-day coding.

## Phase 1: Stack & Environment Discovery 🔍
Agent, before generating any rules, you must run the following checks on the target repository:
1. **Repository Context (Crucial):** Determine if this is a Frontend repo (React Native/Expo, Next.js, Vite), a Backend repo (Hono, Express, Database migrations), or an integrated Monorepo. Look at `package.json` dependencies and folder structures (`api/`, `src/app/`, etc.).
2. **Auth Context:** Check for `@supabase/supabase-js`, next-auth, Expo secure store, or HTTP-only cookie implementations.

## Phase 2: Dynamic Negotiation (Chat with the User) 💬
Once you have analyzed the repo, you MUST use the `notify_user` pattern to start a conversation. 

**Present your analysis (e.g., "I see this is a React Native frontend repo...") and propose this baseline set of Ironclad Security Commandments to the user:**

> "I have analyzed the repository and see we are running a [Frontend/Backend/Monorepo] stack. To ensure strict OWASP compliance, I propose these non-negotiable security boundaries for this project:
> 
> 1.  **Injection Prevention:** [IF FRONTEND: `dangerouslySetInnerHTML` is strictly forbidden without using a sanitizer like DOMPurify.] [IF BACKEND: String interpolation in raw SQL queries is strictly forbidden. Always use parameterized queries or the Supabase ORM interface.]
> 2.  **Auth & Session Management:** [IF FRONTEND: JWTs and Auth Tokens must NEVER be stored in basic `localStorage`. Use HTTP-only cookies for web, or SecureStore for mobile.] [IF BACKEND: Every protected route/action MUST explicitly verify the session state before executing logic.]
> 3.  **Data Exposure:** PII (Personally Identifiable Information), JWTs, and full stack-trace error objects are STRICTLY FORBIDDEN from being logged to the client console or third-party crash reporters.
> 4.  **Supabase RLS Safety:** The `service_role` key must ONLY be used in secure backend environments for administrative tasks. It is strictly forbidden to use `service_role` in any client-facing code to bypass RLS lazyly.
> 
> Here are the **Red Flags (Automatic Rejection)** I will watch for:
> * 'I will use `any` to bypass the Auth type error for now.'
> * 'I will just put this token in localStorage for testing.'
> * 'I will log the full user object to debug this network error.'
>
> Hey, what do you think of these commandments? Are there any specific security constraints unique to this project you want me to add before I write these in stone for us?"

*Proceed to Phase 3 ONLY after the user has responded, negotiated, and explicitly approved the final non-negotiables.*

## Phase 3: Rule Generation ⚙️
Using the agreed-upon constraints from Phase 2, generate a highly specific `projectRules.md` or `.agent/skills/secure-coding-practices.md` document for this repository. 

Format the generated skill as a set of non-negotiable "Iron Laws" broken down by the 5 core areas negotiated above.

## Phase 4: Output and Delivery 💾
Write the generated, agreed-upon ruleset directly into the target project's `.agent/projectRules.md` (or equivalent location). **Do NOT** write the project-specific rules back into the generic `uber-ai-workflow` skills repository. 
Notify the user with a brief summary of the exact security constraints that were written.
