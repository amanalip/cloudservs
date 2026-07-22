# cloudservs Quality Assurance Log

This append-only log records detailed quality assurance results. It answers a different question from the other project records:

| Record                 | Question answered                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `src/data/syllabus.ts` | What curriculum work is complete, blocked, active, or next?                          |
| `audit.md`             | What was concluded during a formal 25%, 50%, 75%, or 100% module audit?              |
| `QAlogs.md`            | What QA was executed, what passed, what failed, what changed, and what risk remains? |
| `changelog.md`         | What learner-facing content, features, and verified website fixes were released?     |
| `lessons_learned.md`   | What did Aman and Codex learn, and how will future practice change?                  |

## Recording rules

Add an entry when:

1. A module completes its 25%, 50%, 75%, or 100% quality checkpoint.
2. Aman explicitly requests a QA check of content, behavior, readiness, or project quality.

Every entry must include:

- an exact timestamp with timezone
- the trigger and outcome
- scope and exclusions
- findings and severity
- actions taken
- evidence inspected
- validation results
- remaining risks and the next action

Preserve earlier entries. Record later corrections as new dated entries rather than silently rewriting history. Use `Pass` only when every check required by the stated scope passes. Use `Conditional pass` when the scoped work is usable but a documented non-blocking finding remains. Use `Fail` when a release or continuation blocker remains.

```text
QA trigger
   |
   +-- Module reaches 25%, 50%, 75%, or 100%
   |
   +-- Aman explicitly asks for QA
   |
   v
Define scope and evidence
   |
   v
Run checks and inspect results
   |
   +-- blocker found ------> Fail, stop, correct, rerun
   |
   +-- non-blocker found --> Conditional pass, track exact next action
   |
   +-- scope passes -------> Pass
   |
   v
Append QAlogs.md entry and run npm run qa:validate
```

<!-- qa:module-1:25 -->

## 2026-07-21 19:13:51 EDT | Module 1 | 25% quality checkpoint

- Recorded at: `2026-07-21T19:13:51-04:00`
- Trigger: Module 1 reached its 25% topic-coverage quality checkpoint
- Outcome: Pass

### Scope

The QA scope covered the whole available Module 1 learning experience at 30% topic coverage. It included the two detailed lesson drafts, remaining module outline, cloud claims, provider comparisons, lesson sequence, diagrams, responsive behavior, search, navigation, accessibility evidence, and curriculum bookkeeping.

The checkpoint did not claim that Module 1 or either lesson was complete. Quality-gated complete lessons remained 0 of 10.

### Result

The available Module 1 content passed the checkpoint after completion language and progress tracking were corrected. No reviewed factual claim contradicted the primary sources inspected during the audit. The next lesson work was made explicit in the ledger.

### Findings

| Severity | Finding                                                                        | Disposition |
| -------- | ------------------------------------------------------------------------------ | ----------- |
| High     | Existing prose and navigation could be mistaken for complete lessons           | Corrected   |
| High     | Curriculum continuation depended too heavily on conversation memory            | Corrected   |
| Medium   | Missing lesson-standard sections were not represented as exact next actions    | Corrected   |
| Low      | Module quality needed a readable record in addition to structured ledger state | Corrected   |

### Actions

- Kept both lesson records in `drafting`.
- Recorded exact missing sections in each lesson's `nextStep`.
- Established the 93-lesson durable syllabus ledger.
- Added 25%, 50%, 75%, and 100% module checkpoints.
- Added matching human-readable audit history.
- Rechecked covered claims against NIST and official AWS, Microsoft, and Google Cloud sources.

### Evidence

- `src/data/syllabus.ts`
- `audit.md`, Module 1 25% entry
- `what-is-cloud-computing.mdx`
- `shared-responsibility.mdx`
- NIST SP 800-145
- Official AWS cloud and shared-responsibility documentation
- Microsoft Learn cloud and shared-responsibility documentation
- Official Google Cloud overview and shared-fate documentation
- Production build and browser regression output recorded by the checkpoint

### Validation results

- Syllabus ledger: Passed, 93 ordered lessons across nine modules
- Unit tests: Passed, 8 tests at the historical checkpoint
- Browser regression tests: Passed, 8 tests at the historical checkpoint
- Production build: Passed
- Formatting: Passed
- Audit-log linkage: Passed

### Remaining risks and next action

The lessons remained drafts. The immediate next action was to add mapping confidence, a realistic architecture, workplace context, glossary, flashcards, and accessibility review to `m1-01-what-is-cloud-computing`. The 50% checkpoint would become mandatory when Module 1 topic coverage reached 50%.

<!-- qa:explicit-2026-07-22-173732-edt -->

## 2026-07-22 17:37:32 EDT | Explicit QA | Syllabus continuation safeguards

- Recorded at: `2026-07-22T17:37:32-04:00`
- Trigger: Aman explicitly requested correction and QA for review-status truthfulness and in-progress audit blocking
- Outcome: Pass

### Scope

The QA check examined two specific continuation risks:

1. Whether unfinished lesson files could claim `reviewStatus: verified` while the authoritative ledger kept them in `drafting`.
2. Whether a reached module audit marked `in-progress` could still allow the status command to recommend lesson expansion.

The check also reviewed regression coverage, QA-record durability, build integration, documentation routing, and changelog eligibility.

### Result

Both identified inconsistencies were corrected in source and protected with automated checks. The QA log and its validator were added. The complete unit, ledger, QA-log, documentation, guidance, Astro, production, privacy, formatting, and browser workflow passed.

### Findings

| Severity | Finding                                                                                      | Disposition |
| -------- | -------------------------------------------------------------------------------------------- | ----------- |
| Medium   | Two unfinished lesson sources used a review label that could imply whole-lesson verification | Corrected   |
| Medium   | An in-progress reached audit did not suppress the next-lesson recommendation automatically   | Corrected   |
| Medium   | No dedicated chronological QA execution log existed                                          | Corrected   |
| Low      | Milestone audit history did not independently require a matching QA execution entry          | Corrected   |
| Low      | The expanded router came within 8 bytes of its 75% early-review point                        | Corrected   |
| Low      | A read-only search pattern containing a backtick caused a shell-quoting error                | Corrected   |

### Actions

- Changed both unfinished lesson sources to `reviewStatus: draft`.
- Made syllabus validation reject `verified` review status on unfinished lessons.
- Added a blocking-audit selector that pauses lesson selection for reached planned or in-progress audits.
- Updated `syllabus:status` to report the blocking audit as the next action.
- Added regression tests for metadata truthfulness and in-progress audit blocking.
- Created `QAlogs.md`, pure QA validation, a command-line validator, and build integration.
- Backfilled the existing Module 1 25% QA checkpoint from its authoritative audit evidence.
- Removed duplicated workflow prose from `SKILLS.md` while preserving every route and authoritative playbook procedure.
- Stopped writes after the quoting error, inspected `git status --short`, confirmed no unexpected path, and retried with safe quoting.

### Evidence

- `src/content/docs/learn/foundations/what-is-cloud-computing.mdx`
- `src/content/docs/learn/foundations/shared-responsibility.mdx`
- `src/data/syllabus.ts`
- `src/data/syllabus-validation.ts`
- `scripts/syllabus-status.ts`
- `scripts/validate-syllabus.ts`
- `src/data/syllabus.test.ts`
- `src/data/qa-validation.ts`
- `src/data/qa-validation.test.ts`
- `scripts/validate-qa-log.ts`
- `audit.md`

### Validation results

- Focused regression implementation: Passed
- QA log structural validation: Passed
- Unit tests: Passed, 16 tests across 3 files
- Syllabus ledger: Passed, 93 ordered lessons across 9 modules
- Syllabus status: Passed and reported 2 detailed QA entries
- Documentation synchronization: Passed
- Guidance validation: Passed, 8 playbooks routed; `AGENTS.md` 11,037 of 16,384 bytes and `SKILLS.md` 8,083 of 12,288 bytes
- Astro and TypeScript diagnostics: Passed, 34 files with zero errors, warnings, or hints
- Production build: Passed, 7 static pages and Pagefind index generated
- Privacy validation: Passed
- Browser regression suite: Passed, 9 desktop Chromium tests
- Formatting and em dash scan: Passed
- Changelog exclusion check: Passed, `changelog.md` remained unchanged
- Environment note: The first sandboxed browser attempt could not bind `127.0.0.1:4330`; the approved local-server run passed all browser tests
- Shell-safety note: One read-only search failed before execution because of unmatched quoting; immediate worktree inspection found no accidental file

### Remaining risks and next action

The continuation safeguards are ready. The existing JavaScript chunk-size warning remains a separate performance risk and should be reviewed before adding another large client-side library. Dedicated mobile, Firefox, and WebKit browser projects also remain planned.

<!-- qa:explicit-2026-07-22-174822-edt -->

## 2026-07-22 17:48:22 EDT | Explicit QA | SKILLS compression preservation

- Recorded at: `2026-07-22T17:48:22-04:00`
- Trigger: Aman explicitly requested a sanity check that the `SKILLS.md` reduction preserved every route and procedure
- Outcome: Pass

### Scope

The review compared the pre-compression and current `SKILLS.md`, checked every removed workflow step against its routed playbooks, verified router destinations and commands, and reran the documentation guidance checks. It did not retest learner-facing browser behavior because the correction affects only internal workflow documentation.

### Result

All task routes were preserved. Most removed procedures were already present in authoritative playbooks, but the first semantic comparison found two missing bug-resolution requirements. Those requirements were restored in `playbooks/testing-and-accessibility.md`, and the dependency workflow was consolidated there for clearer future traceability. The compact `SKILLS.md` did not need its duplicated workflow block restored.

### Findings

| Severity | Finding                                                                                                      | Disposition |
| -------- | ------------------------------------------------------------------------------------------------------------ | ----------- |
| Medium   | Reproduce-before-edit was absent after compression                                                           | Corrected   |
| Medium   | Fix-the-shared-cause was absent after compression                                                            | Corrected   |
| Low      | Dependency checks existed across two playbooks but lacked one concise authoritative sequence                 | Corrected   |
| None     | All router triggers, playbook destinations, syllabus commands, status categories, and changelog rules remain | Verified    |

### Actions

- Added an authoritative six-step website defect workflow to the testing playbook.
- Added a concise dependency and browser-capability workflow to the same playbook.
- Added guidance-validator invariants for defect reproduction, shared-cause correction, and active dependency use.
- Kept `SKILLS.md` compact and route-focused instead of restoring duplicate procedures.
- Recorded the earlier preservation statement as too broad and adopted semantic mapping as a required review method.

### Evidence

- `git diff HEAD^ HEAD -- SKILLS.md`
- `SKILLS.md`
- `playbooks/syllabus-and-audits.md`
- `playbooks/testing-and-accessibility.md`
- `playbooks/releases-and-changelog.md`
- `playbooks/repository-safety.md`
- `scripts/validate-agent-guidance.ts`
- `AGENTS.md`

### Validation results

- Route-by-route comparison: Passed after correction
- Removed-step semantic mapping: Passed after correction
- Automated critical-procedure preservation: Passed after adding three targeted invariants
- `SKILLS.md` size: 8,083 bytes before timestamp synchronization, below its 12,288-byte hard limit and 9,216-byte early-review point
- Learner-facing behavior retest: Not applicable because no website source changed

### Remaining risks and next action

Automated guidance validation cannot fully judge whether two differently worded instructions have the same meaning. Future refactors must retain the manual semantic mapping step and add validator rules only for concise, objectively testable invariants.
