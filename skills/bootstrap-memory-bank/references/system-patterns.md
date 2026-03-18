# `systemPatterns.md`

## Purpose

Capture repeated, intentional architectural patterns in the repository.

This file should describe how the system is wired, how data flows, what layers
exist, where important boundaries live, and which implementation patterns are
meant to be reused.

## Strong Evidence Sources

- repeated folder and module structure
- repeated handler/service/store/client patterns
- dependency direction
- repeated validation, auth, data-access, and error-handling structure
- tests that reinforce stable architecture
- explicit human confirmation that a pattern is intentional

## Ask The Human

Before finalizing, confirm:

1. Which patterns are intentional and should be preserved?
2. Which visible patterns are legacy and should not be documented as preferred?
3. Are there important architecture constraints not obvious from the code yet?

## Never Promote These Without Confirmation

- one-off implementation details
- dead code or legacy folders
- aspirational architecture not yet implemented
- accidental duplication

## Suggested Structure

```markdown
# System Patterns

## High-Level Architecture

## Primary Boundaries

## Data Flow Patterns

## Integration Patterns

## Reuse Patterns

## Known Legacy Or Transitional Patterns
```

## Red Flags

- Documenting how one file works instead of documenting a reusable pattern
- Calling a pattern "standard" when it appears only once
- Mixing desired future architecture with current system truth
