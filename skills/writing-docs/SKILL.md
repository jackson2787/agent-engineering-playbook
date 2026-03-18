---
name: writing-docs
description: Use when entering the AGENTS.md DOCS state, after BUILD/DIFF/QA are complete, the user has approved the reviewed code, and APPLY has succeeded.
---

# Writing Docs

## Overview

This skill strictly enforces the `AGENTS.md` DOCS state. Code without documentation rots. Context without fidelity leads to AI hallucinations on subsequent tasks. 

**Core Principle:** Do not guess summarizations. Document EXACTLY what was changed, including the final `diff` statistics, the specific files touched, and the exact architectural patterns applied.

**Context:** Triggered ONLY after the user has explicitly approved the changes presented in the `APPROVAL` state and the changes have been successfully committed/applied in the `APPLY` state.

## The DOCS Process

You are responsible for writing or modifying files in the `memory-bank/` directory. 
The DOCS state requires you to produce high-fidelity updates to maintain the project's brain.

### 1. Task Documentation File
Create a new file in `memory-bank/tasks/YYYY-MM/DDMMDD_task-name.md`.
Use the following strict template:

```markdown
# YYMMDD_task-name

## Objective
[Brief description of what was accomplished]

## Outcome
- ✅ Tests: [Number of passing tests, coverage changes]
- ✅ Build: Successful
- ✅ Performance: [Any performance QA metrics validated]
- ✅ Review: Approved by user

## Files Modified
- `file1.ts` - Added [functionality]
- `file2.tsx` - Extended [service]

## Patterns Applied
- [Reference the specific SKILL.md or systemPatterns.md sections used]

## Architectural Decisions
- Decision: [Brief summary]
- Rationale: [Why this approach?]

## Artifacts
- [Execution diff, link, PR, etc.]
```

### 2. Update the Monthly README
Append a summary to `memory-bank/tasks/YYYY-MM/README.md`:
```markdown
### YYYY-MM-DD: [Task Name]
- Implemented [brief description]
- Files: `file1.ext`, `file2.ext`
- See: [DDMMDD_task-name.md](./DDMMDD_task-name.md)
```

### 3. Update Global Memory Bank (If applicable)
- **`projectRules.md`:** If a new persistent project constraint was discovered (e.g., "From now on, use X instead of Y").
- **`decisions.md`:** If a major architectural pivot occurred (e.g., "Switched from REST to GraphQL").
- **`systemPatterns.md`:** If a NEW architectural pattern was introduced or an old one deprecated, update this file.
- **`toc.md`:** If you added any new documents, update the table of contents.

## Red Flags - STOP and Start Over
- **Writing Docs before APPLY:** Do NOT write documentation while still in the BUILD or QA phase. Documentation is the final seal of the task.
- **Hallucinating file names:** Do not write "Updated UI components". Write "Updated `src/components/Button.tsx`".
- **Generic Summaries:** If your summary lacks technical specifics (the exact commands run, the exact tests written), rewrite it to be specific.

## Completion
Once the documentation files are written, explicitly state:
"Documentation is complete. The AGENTS.md workflow for this task is officially finished."
