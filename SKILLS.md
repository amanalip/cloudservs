# cloudservs Workflow Router

Last documentation sync: `2026-07-22T17:30:22-04:00`

This file routes project tasks to detailed procedures in [`playbooks/`](./playbooks/README.md). It is not an installable Codex skill package.

## Required routing procedure

For every task:

1. Read `AGENTS.md`.
2. Evaluate the requested approach instead of assuming it is correct because it was requested.
3. Raise evidence-based concerns and recommend a safer or simpler alternative before execution when meaningful risk exists.
4. Find every matching row below.
5. Read all required playbooks before acting.
6. Announce which playbooks are being used and why.
7. Apply every matching workflow, not only the first row.
8. Run `npm run guidance:validate` before closeout.

## Critical evaluation before execution

Ask:

- Does the request match the project's approved purpose and current architecture?
- Is its factual assumption supported by the repository or primary sources?
- Does it conflict with privacy, accessibility, accuracy, safety, or the single-curriculum rule?
- Will it create unnecessary dependencies, duplicated content, maintenance work, performance cost, or documentation growth?
- Is the proposed method proportionate to the learner benefit?
- Is there a simpler approach that preserves the user's real goal?

If a meaningful concern exists, state it plainly, show evidence, recommend an alternative, and wait only when the choice materially changes scope or risk. Do not challenge harmless preferences merely to appear independent.

## When no existing playbook fits

Do not automatically create a playbook for every new request. First ask whether the procedure is distinct, likely to recur, and too detailed for the always-read contract. Prefer extending the closest existing playbook when it already owns the subject.

Create a new playbook only when all three conditions are true:

1. No current playbook has a clear responsibility for the workflow.
2. The workflow is expected to recur or contains enough safety and quality steps to justify a durable procedure.
3. Adding it to an existing playbook would mix unrelated responsibilities.

After creation, add it to `playbooks/README.md`, add every relevant trigger to this router, update traceability when old guidance moved, and run `npm run guidance:validate`. The validator discovers Markdown playbooks, so an unindexed or unrouted file must fail validation.

## Task router

| Trigger                                                                     | Required playbooks                                                                                                                                           |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Write, revise, or complete a lesson                                         | `lesson-authoring.md`, `cloud-fact-checking.md`, `diagrams-and-ui.md`, `syllabus-and-audits.md`                                                              |
| Compare AWS, Azure, and Google Cloud                                        | `cloud-fact-checking.md`, `lesson-authoring.md`                                                                                                              |
| Add diagrams, icons, themes, layout, or interactions                        | `diagrams-and-ui.md`, `testing-and-accessibility.md`, `privacy.md`                                                                                           |
| Continue the syllabus                                                       | `syllabus-and-audits.md`, `lesson-authoring.md`, `cloud-fact-checking.md`, `diagrams-and-ui.md`, `testing-and-accessibility.md`, `releases-and-changelog.md` |
| Reach a 25%, 50%, 75%, or 100% module threshold                             | `syllabus-and-audits.md`, `testing-and-accessibility.md`, `cloud-fact-checking.md`, `releases-and-changelog.md`                                              |
| Add or change search                                                        | `lesson-authoring.md`, `testing-and-accessibility.md`, `privacy.md`                                                                                          |
| Add a dependency, browser API, storage key, remote asset, or hosting change | `privacy.md`, `testing-and-accessibility.md`, `repository-safety.md`                                                                                         |
| Fix a website bug                                                           | `testing-and-accessibility.md`, `releases-and-changelog.md`, plus the domain playbook                                                                        |
| Confirm whether something is implemented or fixed                           | `releases-and-changelog.md`                                                                                                                                  |
| Prepare a version or edit `changelog.md`                                    | `releases-and-changelog.md`, `testing-and-accessibility.md`                                                                                                  |
| Deploy to GitHub Pages                                                      | `testing-and-accessibility.md`, `privacy.md`, `releases-and-changelog.md`                                                                                    |
| Use Git, delete files, recover an accident, or run fragile shell commands   | `repository-safety.md`                                                                                                                                       |
| Close any work session                                                      | `releases-and-changelog.md`, plus every playbook used during the session                                                                                     |

All paths are relative to `playbooks/`.

## Common workflow bundles

### Continue syllabus

Read:

1. `playbooks/syllabus-and-audits.md`
2. `playbooks/lesson-authoring.md`
3. `playbooks/cloud-fact-checking.md`
4. `playbooks/diagrams-and-ui.md`
5. `playbooks/testing-and-accessibility.md`
6. `playbooks/releases-and-changelog.md`

Start with:

```text
npm run syllabus:validate
npm run syllabus:status
```

Resume the reported lesson and `nextStep`. Stop for a due module audit. Update the changelog when validated learner-facing syllabus content is added.

### Resolve a website bug

1. Reproduce the defect.
2. Read the domain playbook and testing playbook.
3. Fix the shared cause rather than patching one page.
4. Add a focused regression or documented reproducible check.
5. Run the full relevant quality gate.
6. Record the fix under `Fixed` in the next changelog version.

### Confirm implementation status

1. Inspect `git status --short`.
2. Locate implementation evidence with `rg` and open the code.
3. Prove product reachability.
4. Run or locate relevant behavior evidence.
5. State a defined status and its coverage boundary.
6. Use `not yet verified` when evidence is insufficient.

### Add a dependency or browser capability

1. Read privacy, testing, and repository-safety playbooks.
2. Review purpose, compatibility, license, maintenance, bundle cost, and privacy.
3. Distinguish installation from active product use.
4. Add focused tests and run privacy validation.
5. Do not claim a learner feature until a real page uses it and behavior is verified.

## Command reference

```text
npm run dev                 Start local development
npm run test                Run unit tests
npm run test:e2e            Build and run browser regressions
npm run syllabus:validate   Validate curriculum and audits
npm run syllabus:status     Report progress and next work
npm run docs:validate       Validate living-document synchronization
npm run guidance:validate   Validate routing and critical guidance
npm run privacy:validate    Validate zero-analytics boundaries
npm run check               Check Astro, MDX, and TypeScript
npm run build               Create and validate production output
npm run preview             Serve production output
npm run format:check        Check formatting
```

## Closeout checklist

- Re-read the acceptance criteria.
- Verify every completion claim against current evidence.
- Run checks proportionate to risk.
- Update the syllabus ledger and audits when applicable.
- Update `changelog.md` for syllabus additions, features, and verified website fixes.
- Update any playbook whose procedure changed.
- Synchronize the four living documents.
- Append an honest `lessons_learned.md` entry.
- Preserve limitations, unfinished work, and the next action.
