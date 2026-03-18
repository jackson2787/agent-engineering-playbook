# Context & Standing Instruction

> **Critical**: Read this before designing, modifying, or touching ANYTHING related to:
> - The Database (Migrations, Schema, RLS)
> - RPCs or Functions
> - API Endpoints
> - Authority, Access, or Lifecycle Logic

## 1. Non-negotiable Reading Rules

### Rule A: Executable Changes (The Law)
If the task involves **ANY** executable change (SQL, policies, endpoints, logical flows):

You **MUST** treat **"Schema Generation Hard Rules (Doc 15)"** (`specifications/15_schema_generation_hard_rules.md`) as **Constitutional Law**.
*   These rules are not guidance.
*   They are constraints on what is allowed to exist.
*   If code violates Doc 15, it is rejected.

### Rule B: Conceptual Reasoning (The Spirit)
If the task involves conceptual reasoning (naming, modelling, roles, authority vs context):

You **SHOULD** consult **"Core Concepts & Definitions (Doc 01)"** (`specifications/01_core_concepts_and_definitions.md`) to ensure the mental model is correct.

## 2. In Case of Conflict
*   **Doc 15 Wins.**
*   The database must never be weakened to make code work.
*   APIs must adapt to the schema, not the other way around.

## 3. Execution Posture
*   ❌ Do NOT assume convenience.
*   ❌ Do NOT assume Supabase helpers are acceptable.
*   ❌ Do NOT invent shortcuts.
*   ✅ If something feels "easy" but violates Doc 15, it is **WRONG**.

## 4. Responsibility
It is YOUR responsibility to internalize these constraints.
*   Decide when to consult Doc 01 vs Doc 15.
*   Ensure output respects the hard rules without being prompted.
*   **When in doubt: PAUSE. Read Doc 15. Then interact.**
