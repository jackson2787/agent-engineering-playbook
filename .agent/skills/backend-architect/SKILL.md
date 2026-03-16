---
name: backend-architect
description: Use when designing backend architectures, database schemas, APIs, infrastructure decisions, or data/ETL pipelines that require security, scalability, and performance considerations.
---

# Backend Architect

## Overview

Systems fail through technical shortcuts and premature optimization. They succeed through proper architecture, security-first design, and disciplined scalability planning.

**Core Principle:** Security and scalability are not features—they are requirements. Every backend system must implement defense in depth, horizontal scalability, and measurable performance targets from day one.

**Violating the letter of these rules is violating the spirit of scalable system design.**

## The Iron Law

```
NO PUBLIC ENDPOINTS WITHOUT AUTHENTICATION, RATE LIMITING, AND INPUT VALIDATION
NO DATABASE TABLES WITHOUT INDEXES ON FOREIGN KEYS AND SEARCH FIELDS
NO SERVICES WITHOUT MONITORING, ERROR HANDLING, AND GRACEFUL DEGRADATION
```

If your design violates any of these, stop and redesign.

## When to Use

Use for ANY backend engineering decision:
- Planning or designing new microservices, APIs, or server-side systems
- Creating or significantly altering database schemas
- Planning infrastructure or cloud deployments (Docker, Kubernetes, AWS, etc.)
- Addressing scaling bottlenecks, performance issues, or security vulnerabilities
- Designing ETL pipelines or data transformation layers
- Building real-time systems (WebSocket, event streaming)

**Use this ESPECIALLY when:**
- Designing systems expected to handle 100k+ entities or high throughput
- Making architectural decisions that are expensive to reverse (database choice, communication protocol, deployment pattern)
- Working with sensitive data requiring encryption, RLS, or compliance

**Don't skip when:**
- "It's just a CRUD endpoint" (CRUD endpoints need auth, validation, and indexes too)
- "We'll add security later" (security retrofits are 10x more expensive)
- "It's only for internal use" (internal services get compromised too)

## The Three Pillars

You MUST address all three pillars for every backend system.

### Pillar 1: Security-First Architecture

**BEFORE writing any endpoint or schema:**

1. **Defense in Depth**
   - Implement security at every layer: network, application, data
   - Never rely on a single security mechanism
   - Apply principle of least privilege for ALL services and database access

2. **Authentication and Authorization**
   - Every public endpoint requires authentication
   - Implement proper authorization (RBAC, ABAC) beyond just "logged in"
   - Use OAuth 2.0, JWT, or session-based auth with proper token management
   - Rate limit ALL API endpoints

3. **Data Protection**
   - Encrypt data at rest and in transit using current standards
   - Enable **Row-Level Security (RLS)** when using Postgres/Supabase
   - Sanitize and validate ALL incoming API inputs globally
   - Never store plaintext passwords—use bcrypt or argon2

4. **Security Middleware Stack**
   ```javascript
   // Required middleware for Express.js APIs
   app.use(helmet({
     contentSecurityPolicy: {
       directives: {
         defaultSrc: ["'self'"],
         styleSrc: ["'self'", "'unsafe-inline'"],
         scriptSrc: ["'self'"],
         imgSrc: ["'self'", "data:", "https:"],
       },
     },
   }));

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100,
     standardHeaders: true,
     legacyHeaders: false,
   });
   app.use('/api', limiter);
   ```

### Pillar 2: Performance-Conscious Design

**Target metrics:**
- API response times: sub-200ms for 95th percentile
- Database queries: under 100ms average with proper indexing
- System handles 10x normal traffic during peak loads

1. **Horizontal Scalability from Day One**
   - Design stateless services that scale independently
   - Avoid stateful service bottlenecks that inhibit horizontal scaling
   - Use event-driven patterns for decoupled communication

2. **Database Optimization**
   - Index ALL foreign keys and common query permutations
   - Use partial indexes where appropriate (`WHERE is_active = true`)
   - Implement full-text search indexes for search fields (`GIN` indexes)
   - Follow `supabase-postgres-best-practices` skill if using Postgres

3. **Caching Strategy**
   - Use explicit caching (e.g., Redis) for frequently accessed data
   - Define cache invalidation strategy BEFORE implementing caching
   - Never sacrifice data consistency for cache performance

### Pillar 3: System Reliability

1. **Error Handling and Resilience**
   - Implement circuit breakers for external service calls
   - Design graceful degradation—partial service is better than total failure
   - Use proper error codes and structured error responses

2. **Monitoring and Observability**
   - Implement structured logging at all service boundaries
   - Create health check endpoints for every service
   - Set up alerting for error rates, latency spikes, and resource exhaustion

3. **Backup and Recovery**
   - Design backup strategies for all persistent data
   - Document and test disaster recovery procedures
   - Implement data migration strategies that minimize downtime

## Architecture Deliverables

### System Architecture Specification

When outputting architecture decisions, use this structure:

```markdown
## High-Level Architecture
**Architecture Pattern**: [Microservices/Monolith/Serverless/Hybrid]
**Communication Pattern**: [REST/GraphQL/gRPC/Event-driven]
**Data Pattern**: [CQRS/Event Sourcing/Traditional CRUD]
**Deployment Pattern**: [Container/Serverless/Traditional]

## Service Decomposition
**[Service Name]**: [Core responsibilities]
- Database: [Technology + security details, e.g., Postgres with RLS]
- Cache: [Strategy, e.g., Redis for frequently accessed data]
- APIs: [Communication interface]
- Events: [Published/consumed events]
- Constraints: [Scaling/Performance targets]
```

### Database Schema Requirements

Every schema MUST include:

```sql
-- Required patterns for all tables:
-- 1. UUID primary keys
CREATE TABLE example (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- 2. Audit timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE NULL, -- Soft delete

    -- 3. Explicit constraints
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    inventory INTEGER DEFAULT 0 CHECK (inventory >= 0)
);

-- 4. Indexes on foreign keys and search fields
CREATE INDEX idx_example_category ON example(category_id) WHERE deleted_at IS NULL;

-- 5. Full-text search where applicable
CREATE INDEX idx_example_name_search ON example USING gin(to_tsvector('english', name));

-- 6. Row-Level Security (Postgres/Supabase)
ALTER TABLE example ENABLE ROW LEVEL SECURITY;
```

### API Endpoint Requirements

Every endpoint MUST have:
- Authentication middleware
- Input validation and sanitization
- Structured error responses with error codes
- Rate limiting applied at the route or global level

```javascript
app.get('/api/resource/:id',
  authenticate,
  validate(resourceSchema),
  async (req, res, next) => {
    try {
      const resource = await service.findById(req.params.id);
      if (!resource) {
        return res.status(404).json({
          error: 'Resource not found',
          code: 'RESOURCE_NOT_FOUND'
        });
      }
      res.json({
        data: resource,
        meta: { timestamp: new Date().toISOString() }
      });
    } catch (error) {
      next(error);
    }
  }
);
```

## Integration with AGENTS.md

When utilizing this skill within the `AGENTS.md` workflow lifecycle:

- **PLAN State**: Define the macro architecture pattern, communication protocols, and data patterns before writing implementation code. Document decisions in `decisions.md`.
- **BUILD State**: Comply strictly with defined schema specifications. Implement required security middleware and create proper SQL migrations including indexes, constraints, and RLS policies.
- **QA State**: Validate performance metrics and integration tests against the scaling and reliability targets defined during planning.
- **DOCS State**: Update `systemPatterns.md` and related context files with finalized architectural decisions.

## Red Flags - STOP and Redesign

If you catch yourself doing any of these:

| Red Flag | Why It's Wrong |
|----------|---------------|
| Public endpoint without authentication | Every endpoint is an attack surface. No exceptions. |
| Tables with no indexes on foreign keys | Queries degrade from ms to seconds as data grows. |
| Stateful service as a single bottleneck | Kills horizontal scaling. Redesign as stateless. |
| No input validation on API routes | SQL injection, XSS, and command injection vectors. |
| "We'll add security/monitoring later" | Later never comes. Retrofitting costs 10x more. |
| Caching without invalidation strategy | Stale data bugs are harder to find than performance issues. |
| Direct database access from multiple services | Breaks service boundaries. Use APIs or events. |
| Plaintext secrets in code or config | Use environment variables or secret management services. |

**ALL of these mean: STOP. Delete the insecure code and start over.**

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "It's just an internal API" | Internal services get compromised. Apply the same standards. |
| "We don't need indexes yet, data is small" | Data grows. Adding indexes under load causes downtime. |
| "Rate limiting hurts developer experience" | DDoS hurts user experience more. Rate limit everything. |
| "One monolith is simpler" | Monoliths are fine—but still need proper boundaries and security. |
| "We'll optimize when we need to" | Redesigning a live database schema is orders of magnitude harder. |

## Quick Reference

| Pillar | Key Requirements | Success Metric |
|--------|-----------------|----------------|
| **Security** | Auth, RLS, encryption, rate limiting, input validation | Zero critical vulnerabilities in security audit |
| **Performance** | Indexes, caching, stateless services, query optimization | Sub-200ms p95 API response, sub-100ms avg queries |
| **Reliability** | Circuit breakers, monitoring, graceful degradation, backups | 99.9% uptime with proper alerting |

## Related Skills

- **supabase-postgres-best-practices** - For Postgres-specific indexing, RLS, and query optimization
- **systematic-debugging** - When backend systems exhibit unexpected behavior
- **test-driven-development** - For creating integration and API tests
- **verification-before-completion** - Verify architecture meets targets before claiming success
