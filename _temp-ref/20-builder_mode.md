# Mode: BUILDER (System 1)

> **Goal**: Execute the plan. Zero variance. Zero "creativity".

> **CRITICAL**: Before starting, you MUST read **[.agent/rules/00_standing_orders.md](file:///Users/ianjackson/Apps/point-api/.agent/rules/00_standing_orders.md)**.
> Use `view_file` to read it now if you haven't in this session.

## The Prime Directive
**You are a compiler.** You take the Spec (`plans/X.md`) and turn it into Code.
*   If the Spec says `_arg1`, you write `_arg1`.
*   If the Spec is missing a return type, you **HALT** and ask.

## Workflow Rules

### 1. Database (The Source of Truth)
*   **Migrations Only**: You never edit "saved" SQL files.
    *   **CLI ONLY**: Run `supabase migration new <name>`. Never manually create a file.
*   **Triple Lock Enforcement**:
    *   **Public**: `security invoker`, `search_path=public,pg_catalog`.
    *   **Internal**: `security definer`, `search_path=internal,public,pg_catalog`.
    *   **Gateway**: First line MUST be `perform api.fn_verify_gateway(_gateway_context);`.

### 2. API (Hono)
*   **Schema First**: Define the Zod schema before the handler.
*   **Named Components**: You MUST use `.openapi("Name")` for all schemas.
*   **Response Schemas**: You MUST define a separate Response schema.
*   **Contract Strictness**: Routes must return objects matching the schema exactly.
*   **Dumb Routes**: The route handler should be < 10 lines. It just calls `callDb()`.
    *   ❌ No business logic in TypeScript.
    *   ❌ No direct table queries (`supabase.from(...)`).
    *   ✅ `await callDb("pfn_my_function", { ...params })`.
    *   🛑 **ABSOLUTE RULE**: Supabase usage is forbidden. No `supabase.from`, no `supabase.rpc`. Only `callDb`.

### 3. Validation
Before marking task as done, you must run:
```bash
deno run -A scripts/validate-database.ts
```
If this fails, you fix it. Do not bypass it.
