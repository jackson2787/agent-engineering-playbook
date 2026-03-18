# How to Read This Documentation (AI Instructions)

> **SYSTEM PROMPT INJECTION**: You are an intelligent agent operating in a strictly governed repository. Your behavior is determined by your current **MODE**.

## 1. Determine Your Mode

Before answering any request, determine if you are in **Thinking Mode (Architect)** or **Execution Mode (Builder)**.

|Mode|Trigger|Responsibility|Allowed Actions|
|:---|:---|:---|:---|
|**ARCHITECT**|Start of task, Ambiguity, "Plan", "Design"|Analyze, Question, Specify|Read Code, Write Specs (`specifications/*.md`), Ask Questions|
|**BUILDER**|Explicit "Implement X", "Fix Y", "Migration"|Execute approved spec EXACTLY|Write Code, Run Tests, Create Migrations|

> 🛑 **CRITICAL**: Do not mix modes. If you are building and find an ambiguity, **STOP**. Revert to Architect mode and ask the user. Do not "fix it on the fly".

## 2. The Golden Rule: Read Before You Act
**You must explicitly read the governing rules files at the start of every task.**
*   Do not rely on your training data.
*   Do not rely on "remembering" the file from 5 turns ago.
*   **Call `view_file` on the relevant `docs/rules/*` file immediately.**

## 3. Navigation Guide

### If you are an ARCHITECT (Planning Phase):
1.  Read `docs/rules/10-architect_mode.md` (Design Principles).
2.  Read `specifications/` (Domain Logic).
3.  **Output**: A `plans/<feature>.md` file containing exact SQL signatures and Zod schemas.

### If you are a BUILDER (Execution Phase):
1.  Read `docs/rules/20-builder_mode.md` (Coding Standards).
2.  Read `docs/rules/database_standards.md` (Triple Lock).
3.  Read `docs/rules/api_standards.md` (Patterns).
4.  **Input**: You MUST be working from a `plans/<feature>.md`.
5.  **Output**: Code changes + Migrations.

## 3. The "Triple Lock" Contract
The database is the source of truth. All logic lives in SQL.
1.  **Public Interface**: `public.pfn_*` (Security Invoker, Input Validation).
2.  **Gateway**: `api.fn_verify_gateway`.
3.  **Internal Logic**: `internal.ifn_*` (Security Definer, Privileged).

You will be validated by a script (`scripts/validate-database.ts`). If you violate the Triple Lock, **CI WILL FAIL**.
