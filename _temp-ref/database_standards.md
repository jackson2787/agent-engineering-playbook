# Database Standards (The Triple Lock)

> **Source of Truth**: The Database `migrations` folder.
> **Enforcement**: `scripts/validate-database.ts` (CI).

## 1. The Migration Workflow
We do NOT use `supabase db push` for logic. We use **Versioning**.
*   **Tables**: Managed via Migrations.
*   **Functions**: Managed via Migrations (Replaceable).

### How to Edit a Function
1.  **Never define a function in a separate `.sql` file** (deprecated practice).
2.  **MANDATORY**: Use the CLI. `supabase migration new <descriptive_name>`.
    *   Do NOT manually create files.
    *   Do NOT bypass the CLI.
3.  Copy the *entire* function definition into the empty file created by the CLI.
4.  Apply it.

## 2. The Triple Lock Architecture

### Layer 1: Public Interface (The Doorman)
*   **Schema**: `public`
*   **Security**: `SECURITY INVOKER` (Uses the Caller's permissions)
*   **Requirement**: MUST verify the Gateway Context.

```sql
create or replace function public.pfn_create_thing_v1(
  _name text,
  _gateway_context jsonb
)
returns jsonb
language plpgsql
security invoker -- <--- REQUIRED
set search_path = public, pg_catalog
as $$
begin
  -- 1. Gateway Verification
  perform api.fn_verify_gateway(_gateway_context); -- <--- REQUIRED

  -- 2. Call Internal Logic (optional) or do simple RLS query
  insert into data.things (name) values (_name);
  return jsonb_build_object('status', 'ok');
end;
$$;
```

### Layer 2: API Gateway (The Bouncer)
*   **Schema**: `api`
*   **Purpose**: Validates JWT claims and context.

### Layer 3: Internal Logic (The Vault)
*   **Schema**: `internal`
*   **Security**: `SECURITY DEFINER` (Bypasses RLS)
*   **Requirement**: MUST NOT be exposed to the public API.

```sql
create or replace function internal.ifn_admin_bypass_v1(
  _payload jsonb
)
returns jsonb
language plpgsql
security definer -- <--- REQUIRED
set search_path = internal, public, pg_catalog -- <--- REQUIRED
as $$
begin
  -- High privilege logic here
end;
$$;
```

## 3. Query Architecture & Performance

> **Goal**: Elegant, performant queries that respect the "One Way Door" (Read vs Write).

### 3.1. Read Operations (SELECT)
Use CTEs for readability, especially when enriching data.

```sql
with filtered as (
  select f.*
  from facility.facilities f
  join core.memberships m on m.organisation_id = f.organisation_id
  where m.user_id = auth.uid()
),
enriched as (
  select 
    f.*,
    count(r.id) as risk_count
  from filtered f
  left join risks.entries r on r.facility_id = f.id
  group by f.id
)
select jsonb_agg(to_jsonb(e.*)) into v_result from enriched e;
```

### 3.2. Performance Rules
1.  **Indexes**: Ensure every `WHERE` and `JOIN` column is indexed.
2.  **No N+1**: Do not loop in SQL. Use sets and joins.
3.  **Pagination**: Always use `limit` and `offset` for lists.
4.  **CTEs**: Use for readability (Postgres v12+ handles them efficiently).

## 4. RLS & Security Architecture

### 4.1. The Philosophy: "The Delegation Check"
We enforce security via explicit Delegation.
1.  **Lock 1 (Authentication):** Is the user who they say they are? (Valid JWT).
2.  **Lock 2 (Authorization):** Does the user have a valid **Delegation** for the target Profile?
    *   *Checked via `delegations` table.*

> 🛑 **CRITICAL**: **NEVER** write a function that bypasses Lock 2. "Public" access does not exist. If a ticket asks for "easier frontend access", **STOP** and **ASK**.

### 4.2. RLS Helper Functions (`rls` Schema)
All complex RLS logic must live in the `rls` schema as reusable helper functions.

**Critical Rules for RLS Helper Functions**:
1.  **Schema**: `rls`.
2.  **Language**: `LANGUAGE sql` (for performance/inlining).
3.  **Security**: `SECURITY DEFINER` (Must read private delegation tables).
4.  **Stability**: `STABLE`.
5.  **Return**: `RETURNS boolean`.

### 4.3. The "Delegation Check" Pattern
Functions must follow this specific structure using `SELECT EXISTS`:

```sql
create or replace function rls.fn_has_delegation(_profile_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.delegations d
    where d.identity_id = auth.uid()
      and d.profile_id = _profile_id
      and d.status = 'active'
      and (d.role = 'owner' or d.role = 'admin')
  );
$$;
```

### 4.4. The Golden Rules
1.  **Row Anchoring**: Policies must anchor to a row value and compare it to the user's context.
2.  **The "Join Up" Rule**: When checking a child resource (e.g., `medical_records`), the function MUST accept the parent `profile_id` to perform the delegation check.
3.  **Default Deny**: If no policy exists, access is denied.

## 5. Deployment Rules & Forbidden Patterns
1.  **No `CREATE TABLE` in `public`**. All data lives in domain schemas (`identity`, `profiles`, `billing`).
2.  **No Logic in Hono**. All business logic lives in PL/pgSQL.
3.  **One Way Door**: Migrations only move forward.
4.  ❌ **No Raw SQL Errors**: Never return a raw SQL exception to the client. Catch it and return a 4xx/5xx JSON.
5.  ❌ **No Generic Access Denied**: Use `USING ERRCODE = '42501'` for RLS violations.
6.  ❌ **No Auto-Deployment**: Never deploy SQL functions via script. Always use `deploy-functions.json` (or strictly Migrations in this new model).
