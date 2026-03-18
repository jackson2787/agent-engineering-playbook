# API Standards (Hono + Zod + Deno)

> **Role**: The "Router". It creates a pipe from HTTP to SQL. It does NOT think.
> **Philosophy**: "Boring is better." Predictability > Cleverness.

## 1. Deno & Dependency Management

We use **Deno** with **NPM** packages for Hono to ensure type compatibility
between Hono and Zod-OpenAPI.

### `deno.json` (The Hard Rules)

You **MUST** explicitly map Hono sub-modules in `deno.json` to avoid Deno
resolution errors. Do NOT rely on implicit resolution.

```json
{
  "imports": {
    "hono": "npm:hono@^4.0.0",
    "hono/cors": "npm:hono@^4.0.0/cors",
    "hono/logger": "npm:hono@^4.0.0/logger",
    "hono/secure-headers": "npm:hono@^4.0.0/secure-headers",
    "hono/http-exception": "npm:hono@^4.0.0/http-exception",
    "hono/factory": "npm:hono@^4.0.0/factory",
    "@hono/swagger-ui": "npm:@hono/swagger-ui@^0.2.0",
    "@hono/zod-openapi": "npm:@hono/zod-openapi@^0.9.0",
    "@supabase/supabase-js": "npm:@supabase/supabase-js@^2.0.0",
    "zod": "npm:zod@^3.22.0"
  }
}
```

## 2. App & Middleware Structure

### `lib/app.ts` (Type Safety)

Always use the `createHono` factory. It enforces the `Variables` type
definition, ensuring `c.get('jwt')` and `c.get('actorId')` are typed.

```typescript
export type Variables = {
  jwt: string;
  actorId: string;
  correlationId?: string;
};

export function createHono() {
  return new OpenAPIHono<{ Variables: Variables }>({
    // ... validation hook
  });
}
```

### Middleware Order

Order is critical.

1. **Secure Headers** (First defense)
2. **CORS** (Must be early to handle OPTIONS)
3. **Logger** (If dev)
4. **Correlation ID** (Traceability)
5. **Error Handler** (Catch-all)
6. **Health Check** (Unauthenticated)
7. **Swagger UI** (Docs)
8. **Auth Middleware** (Protected Routes)
9. **Idempotency** (Post-Auth)

## 3. Route Definition

### `lib/routing.ts` (Generics are Mandatory)

Use `createAppRoute` to inject common headers (API Key). **CRITICAL**:
`createAppRoute` must be generic to preserve Zod inference.

- **Path Syntax**: ALWAYS use `{param}` (OpenAPI standard), NOT `:param` (Hono
  standard). The library handles conversion.

```typescript
// Wrapper must be generic <R extends RouteConfig>
export const createAppRoute = <R extends RouteConfig>(routeConfig: R) => {
  // ... merges headers
  return createRoute(newConfig as any);
};
```

### Documentation Standards (OpenAPI)

When defining a route, you **MUST** provide rich documentation.

- **Summary**: Concise action (e.g., "Create User").
- **Description**: Rich markdown. Explain permissions (Lock 2), logic, and
  side-effects.
  - _Rule_: "Rich but Honest". Describe exactly what happens. Do not hallucinate
    fields.
- **Tags**: Group by domain (e.g., `['Identity']`).

### Route Pattern

```typescript
// supabase/functions/api/routes/feature.ts
import { createAppRoute, createHono } from "../lib/routing.ts";
import { callDb } from "../lib/db.ts";
import { MySchema } as "../schemas/feature.ts";

const app = createHono();

const route = createAppRoute({
  method: "post",
  // ... specs
});

app.openapi(route, async (c) => {
  const body = c.req.valid("json"); // Typed via Zod!
  const jwt = c.get("jwt");         // Typed via Variables!
  
  // Logic
  const result = await callDb("rpc_name", { arg: body.val }, jwt);
  
  return c.json(result, 200);
});
```

## 4. The `callDb` Bridge

**MANDATORY**: Supabase is infrastructure, NOT an app framework.

- **NO** `supabase.from(...)`
- **NO** direct client usage in routes.
- **ONLY** `callDb`.

`callDb` automatically:

1. Injects `_gateway_context` (`_ts`, `_sig`) for Triple Lock verification.
2. Maps Postgres errors (42501 -> 403, 23505 -> 409).
3. Handles Auth context.

## 5. Zod Schemas

1. **Strictness**: API Responses **MUST** match the Zod schema exactly.
   `OpenAPIHono` removes extra fields. If your RPC returns `{ id: "..." }` but
   schema expects full profile, the API will return `{}`.
2. **Location**: `supabase/functions/api/schemas/`.
3. **Separation**: Keep Request and Response schemas distinct.
4. **Named Components**: You **MUST** use `.openapi("SchemaName")` on all exported schemas to ensure they appear in Swagger UI components. Hidden schemas are contract violations.

## 6. Deployment

Your `index.ts` must end with this block to be deployable via Deno:

```typescript
if (import.meta.main) {
  Deno.serve(app.fetch);
}

## 7. Response Contracts (Zero-Inference)

**The API is the source of truth.** The client is **Zero-Inference**—it is never allowed to guess what happened.

### Mutation Rules
When we mutate data, we must enable deterministic cache updates.

1.  **Full Model (200/201)**: Return the **full, updated model**. This allows the client to replace its local cache reference immediately and legally.
2.  **No Content (204)**: Explicitly return nothing. This tells the client "you must invalidate/refetch" or "this action had no data side-effect".
3.  **PROHIBITED**: Never return generic `{ success: true }` payloads. They are useless for cache coherency and force the client to guess or over-fetch.
```
