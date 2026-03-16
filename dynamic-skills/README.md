# Dynamic Project Skills

Welcome to the **Dynamic Skills** engine. 

While the standard `.agent/skills/` directory contains universally applied behaviors (like Test-Driven Development, Vercel React Best Practices, or Systematic Debugging), this folder contains **Project Initialization Generators**. 

Because every codebase uses a different tech stack (e.g., Next.js vs Expo, Vercel vs AWS, Zustand vs Redux), security and architectural rules cannot be "one size fits all." If you apply Next.js security rules to an Expo app, the app will break.

These scripts solve that. When you start a brand new repository, you instruct your AI agent to run through these numbered scripts. The AI will scan the codebase, analyze the specific tech stack, negotiate the rules with you, and then hardcode absolute constraints directly into your `.agent/skills/project-*/SKILL.md` files. This ensures your project-specific "Local Laws" complement your foundational Vercel/Supabase "Constitution".

## Execution Sequence

To properly lock down a new repository, instruct your AI to execute these scripts in the following order:

### `01-frontend-architecture.md`
* **What it does:** Scans `package.json` to find your routing framework, state manager, and data-fetching methodology.
* **Output:** Generates rigid project rules defining exactly *how* data is fetched, where global state lives, and absolutely forbids the frontend from bypassing your API-first architecture.

### `02-secure-coding-practices.md`
* **What it does:** Analyzes your authentication layer and backend access. 
* **Output:** Generates an Ironclad list of OWASP defenses tailored exactly to your stack. It locks down SQL injection rules, enforces token safety (e.g., HTTP-only cookies vs SecureStore), and kills AI hallucinations where they try to use lazy bypasses.

### `03-deployment-pipeline.md`
* **What it does:** Investigates where the project is hosted (Vercel, EAS, AWS).
* **Output:** Generates unbreakable CI/CD and deployment rules. Instead of the AI hallucinating generic 2021 GitHub Action YAML files, it is strictly bound to use the native CLI tools for your platform and enforces strict environment variable naming conventions (`NEXT_PUBLIC_`, `EXPO_PUBLIC_`, etc.).

---

## How to Trigger

On Day 1 of a new repository, open an AI Chat or Agent and provide the following prompt:

> "I have just initialized this repository. Please run through the dynamic skill generators located in `uber-ai-workflow/dynamic-skills/`. Start with script `01`, scan my stack, and negotiate the non-negotiables with me. We will repeat this for scripts `02` and `03` until the `.agent/skills/project-*` folder is fully populated with our constraints."
