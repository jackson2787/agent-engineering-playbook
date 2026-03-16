# Holistic Ecosystem Audit: Universal Skills & AGENTS.md

## Executive Summary
This audit evaluates the AI orchestration framework (`AGENTS.md` + `.agent/skills/*`) holistically. The focus is on macro-level cohesion: identifying cross-skill contradictions, blind spots in the state machine, and areas where an AI agent could logically bypass constraints by exploiting conflicting rules or vague boundaries.

---

## 1. Cross-Skill Contradictions (Tripping Hazards)

### A. The "Alongside" vs. "Before" Loophole
- **Conflict Point:** `executing-plans` (the `BUILD` state guide) instructs the AI to "Add tests alongside implementation" (Step 5 of Actions).
- **The Trip-Up:** `test-driven-development` strictly mandates the Iron Law: "NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST," and explicitly red-flags "Code before test." The vague instruction "alongside" in the executing plan gives a lazy AI permission to draft the code first and backfill tests, neutralizing the TDD skill entirely.
- **Recommendation:** `executing-plans` must be synchronized with TDD sequence. Action 5 should read: "Write failing tests FIRST, then implement minimal changes per TDD protocol."

### B. Systematic Debugging and The Missing TDD Bridge
- **Conflict Point:** `systematic-debugging` is heavily focused on rigorous root-cause analysis. Its Phase 4 simply states "Implementation (of the fix)."
- **The Trip-Up:** The skill does not explicitly force the agent to encode the discovered bug into a failing automated test *before* implementing the fix. The AI may achieve a brilliant root cause analysis but bypass the TDD mandate because the debugging skill acts as a localized override to fix the symptom.
- **Recommendation:** Phase 4 of `systematic-debugging` should explicitly trigger the TDD cycle: "Phase 4: Encode bug as failing test -> Implement fix -> Verify test passes."

### C. The Test-Driven Development (TDD) Catch-22
- **Conflict Point:** `test-driven-development` mandates "NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST," and explicitly lists "Refactoring" as a trigger.
- **The Trip-Up:** A pure refactor, by definition, does not change external system behavior and therefore cannot yield a failing test if the system originally passed. This places the AI in a paradox: it must either hallucinate a failing test to satisfy the TDD Iron Law, or break the law (triggering a self-correction loop and stalling the state machine).
- **Recommendation:** `test-driven-development` must explicitly outline a "Refactoring Bypass Protocol" where the gating factor is "NO PRODUCTION CODE CHANGES WITHOUT EXISTING PASSING TESTS."

---

## 2. Structural Blind Spots & Safety Nets

### A. The Plan Review "Trust Fall"
- **Vulnerability:** `writing-plans` meticulously guides the AI to create a Task Contract and output an implementation plan for user approval. However, there is no AI self-audit step against `backend-architect`, `react-best-practices`, or `legal-compliance-checker` *before* presenting the plan.
- **The Execution Risk:** A well-formatted plan could structurally violate core architectural or security principles (e.g., proposing a direct DB query from a React component). The architecture relies entirely on the human to catch structural flaws during the `PLAN -> BUILD` handoff.
- **Recommendation:** Insert an explicit "Self-Audit Phase" into `writing-plans` where the AI must validate its proposed strategy against specific architecture/security skills before asking the user for `APPROVAL`.

### B. Database Migrations in the `APPLY` Sandbox
- **Vulnerability:** `AGENTS.md` mandates executing work in a "branch/temp clone" and reverting via rollback if the `APPLY` state fails. For backend work relying on `backend-architect` and `supabase-postgres-best-practices`, the workflow is entirely silent on schema migrations.
- **The Execution Risk:** You cannot cleanly "sandbox" or git-revert a Postgres schema migration executed against a live/staging environment. If an agent applies a migration and fails `QA`, reverting the code leaves the database schema in an altered state (a "dirty" state).
- **Recommendation:** Add a specific "State Operations" skill or clause in `backend-architect` defining the protocol for UP/DOWN schema migrations, forcing the AI to test `DOWN` migrations in a local Postgres target before ever declaring `QA` success.

### C. The Missing "docs" Skill
- **Vulnerability:** We have `brainstorming-features`, `writing-plans`, and `executing-plans` mapped exactly to the `PLAN -> BUILD -> QA -> APPROVAL -> APPLY` cycle. But `AGENTS.md` concludes with a critical `DOCS` state where `memory-bank` updates are written.
- **The Execution Risk:** Without a dedicated `writing-docs` or `memory-bank-maintenance` skill, the AI is likely to hallucinate the documentation format (despite `AGENTS.md` templates) or lazily summarize the work. This will inevitably lead to rapid "context rot" in the `memory-bank`.
- **Recommendation:** Create an explicit `.agent/skills/writing-docs/SKILL.md` that strictly enforces the fidelity, cross-linking, and `memory-bank` update procedures for the `DOCS` phase, ensuring the agent doesn't take shortcuts at the finish line.

### D. Silent Performance Degradation
- **Vulnerability:** Skills like `react-best-practices` and `react-native-skills` care deeply about high-precision UI and avoiding rendering waterfalls. However, the `QA` state in `executing-plans` only explicitly requires "Tests | Linter | Coverage | Build".
- **The Execution Risk:** A lazy AI will pass the QA checks with 100% test coverage but introduce massive component re-rendering waterfalls or unoptimized bundles because the overarching state machine does not demand a performance or profiling check.
- **Recommendation:** The QA phase in `executing-plans` needs an explicit "Performance Metrics" or "Client State" verification step, tying it directly to the performance principles laid out in the architecture skills.

---

## Conclusion
The orchestration framework (`AGENTS.md` + universal skills) is extremely robust and forms a phenomenal defense-in-depth strategy against LLM laziness. `verification-before-completion`, `systematic-debugging`, and `test-driven-development` form an excellent triad of rigour.

However, the framework currently suffers from minor phase friction. The AI can easily rationalize breaking core laws (like TDD) by exploiting semantic voids in overlapping skills (like `executing-plans` vs `test-driven-development`). Synchronizing these touchpoints and adding a `writing-docs` skill will fully crystallize the ecosystem.
