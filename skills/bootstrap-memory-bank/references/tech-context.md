# `techContext.md`

## Purpose

Capture factual technical context that future sessions can rely on quickly.

This file should describe the stack, repo shape, tooling, runtime environment,
deployment hints, external services, and the practical commands and systems
that frame implementation work.

## Strong Evidence Sources

- `package.json`, lockfiles, workspace manifests
- TypeScript, lint, and test config
- framework config files
- CI workflows
- deployment and hosting config
- mobile app config, web app config, backend config
- infrastructure directories and service definitions

## Ask The Human Only For What The Repo Cannot Prove

Good questions:

- Which hosting platform is the real production target?
- Which package manager is the team standard if multiple lockfiles exist?
- Are there required local commands or tools not obvious from the repo?
- Are there hidden external services not represented in code yet?

## Suggested Structure

```markdown
# Tech Context

## Languages And Frameworks

## Repository Structure

## Tooling

## Runtime / Hosting

## External Services

## Common Commands
```

## Red Flags

- Guessing hosting from one stale config file
- Listing tools that are not actually in the repo
- Turning temporary experiments into official stack truth
