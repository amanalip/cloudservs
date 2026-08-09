# Syllabus and Module Audit Playbook

Use this playbook whenever the user says “continue the syllabus,” lesson content changes, curriculum progress changes, a module threshold is reached, or a module audit is performed.

## One ordered curriculum

`cloudservs` has one ordered curriculum. Do not create separate role-based paths, role dashboards, duplicated lesson sequences, or independent progress systems.

- Give every lesson one clear position.
- Use prerequisites and previous and next links to guide progression.
- Track progress against the single curriculum.
- Allow search and filtering without creating alternate courses.
- Workplace relevance may appear as lesson context, but not as another progress system.
- Reuse a lesson wherever another view references it.
- Treat any future role view as an optional index over the same curriculum.

## Source of truth

`src/data/syllabus.ts` is the source of truth for lesson-level progress. Conversation memory, file existence, navigation visibility, and module availability are not completion evidence.

The ledger keeps stable lesson IDs, module order, topics, covered topics, prerequisites, source paths, workflow status, status history, completed requirements, verification dates, blockers, and next steps.

## Continuation workflow

1. Inspect the working tree and preserve unfinished user changes.
2. Run `npm run syllabus:validate`.
3. Run `npm run syllabus:status`.
4. Select the reported next lesson rather than choosing from memory.
5. Read its topics, prerequisites, status history, completed requirements, and `nextStep`.
6. Read `lesson-authoring.md`, `cloud-fact-checking.md`, and any other routed playbook.
7. Plan a coherent delivery batch using the batch-sizing gate below, then complete each selected lesson through its own research, writing, fact-checking, visual, and review checkpoints.
8. Update covered topics and completed requirements only when evidence exists.
9. Append status history instead of rewriting earlier events.
10. Update the ledger in the same change that adds, reviews, blocks, resumes, or completes lesson content.
11. Record a concrete blocker whenever status is `blocked`.
12. Record the next concrete action or blocker before closeout.
13. Run narrow checks during lesson development and the full syllabus, unit, production-build, and browser gate at the batch boundary or earlier risk boundary.
14. Report topic coverage and quality-gated completion separately.
15. Update `changelog.md` in the same change when validated learner-facing syllabus content is added.

## Batch-sizing gate

Use a default planning range of 2 to 4 related lessons. This is a balance point for the current project, not a guarantee that every topic fits the same amount of work and not permission to create shallow lessons.

Before writing, calculate the nearest module checkpoint and choose a batch that will not continue expansion beyond it. Close the batch at the first applicable condition:

1. The coherent concept group is complete.
2. Between 2 and 4 lessons have independently met every assigned requirement.
3. Topic coverage reaches 25%, 50%, 75%, or 100%, which immediately triggers the module audit.
4. A lesson exposes a factual, primary-source, pedagogy, accessibility, architecture, or scope blocker.
5. Shared UI, navigation, dependencies, browser storage, privacy, deployment, or another high-risk system changes.
6. The combined review surface becomes too large to re-read and inspect carefully.

```text
Choose related lessons
         |
         v
Check distance to next module audit
         |
         v
Complete each lesson independently
         |
         +--> new shared risk? --> focused check and early full gate
         |
         +--> audit reached? ----> stop expansion and audit module
         |
         v
Close coherent batch
         |
         v
Run complete quality and release gate once
```

### Work that remains individual to every lesson

- primary-source research and claim verification
- complete lesson-sequence evidence
- provider mapping confidence and differences
- purposeful visuals and text alternatives
- realistic architecture and operational explanation
- glossary, flashcards, quiz feedback, and recap
- search terminology, metadata, and navigation
- theme, responsive, keyboard, zoom, and accessibility checks that apply to the lesson
- ledger requirement evidence and honest status

### Work that can be amortized across a coherent batch

- the complete unit suite
- the complete production build and Pagefind generation
- the complete browser regression suite
- whole-site privacy, link, formatting, documentation, and guidance validation
- one changelog version for the coherent learner-facing delivery
- one closeout reflection and handoff

Focused checks are not postponed when feedback is needed immediately. A new diagram can be inspected before the next lesson starts. A new interaction receives a focused regression when it is introduced. A shared component, privacy boundary, dependency, or navigation change can close the batch early. The efficiency gain comes from avoiding repeated full-project gates after low-risk content increments, never from postponing evidence until mistakes become difficult to isolate.

## Requirement evidence pass

The ledger checklist prevents accidental omission only when completion credit is based on inspected evidence. A requirement name by itself is not proof.

Before adding an entry to `completedRequirements`:

1. Open the current lesson source rather than relying on conversation memory or an earlier report.
2. Locate the exact section, component, source list, metadata field, or test that satisfies the requirement.
3. Check the evidence against the full definition in `lesson-authoring.md`, `cloud-fact-checking.md`, `diagrams-and-ui.md`, and `testing-and-accessibility.md`.
4. Record only requirements supported by the current working tree.
5. Put every missing requirement into `nextStep` or a concrete blocker.
6. Run `npm run syllabus:validate` and review the status report after the ledger edit.

Use two passes for every substantial lesson:

```text
Pass 1: create and explain
Concept + vocabulary + analogy + mechanism + providers + visuals + practice
                              |
                              v
Pass 2: verify independently
Requirement evidence + primary sources + accessibility + browser checks
                              |
                              v
Ledger credit, status update, changelog entry, and next action
```

Automated validation proves structural consistency. It does not prove that prose is factually correct, pedagogically clear, or complete. Those claims require direct content review, primary-source comparison, browser evidence where relevant, and the 25%, 50%, 75%, and 100% module audits.

## Status model

```text
planned
   |
   v
researching
   |
   v
drafting
   |
   v
fact-checking
   |
   v
visual-review
   |
   v
complete

Any active stage can become blocked when a concrete blocker is recorded.
```

Mark a lesson `complete` only when:

- every assigned topic is covered
- every entry in `lessonRequirements` is recorded
- the source file exists
- required metadata is valid
- primary sources and `lastVerified` are present
- visuals, interactions, accessibility, search, navigation, and browser behavior pass their relevant checks
- no unresolved blocker remains

Never mark a lesson complete merely because its file exists or some source claims are verified.

## Module milestone audits

Complete whole-module audits when topic coverage first reaches 25%, 50%, 75%, and 100%. A reached threshold blocks further expansion until the audit is complete.

At each checkpoint:

1. Review available lessons and the remaining module outline together.
2. Compare ledger topics with the agreed detailed curriculum.
3. Recheck factual accuracy and primary sources.
4. Review beginner clarity, analogy boundaries, technical depth, terminology, and lesson order.
5. Review AWS, Azure, and Google Cloud comparisons and mapping confidence.
6. Inspect visuals, themes, accessibility, responsive behavior, search, and navigation.
7. Run unit, production-build, and browser regression checks.
8. Correct genuine defects immediately.
9. Record unfinished planned work with exact next actions.
10. Record accepted findings with a reason.
11. Leave the audit incomplete while any finding is open.
12. Preserve completed findings and resolutions so later checkpoints can detect recurrence.
13. Record evidence, findings, resolutions, summary, and completion date in the ledger.
14. Append a timestamped response-style entry to `audit.md` in the same change.
15. Append a detailed matching `QAlogs.md` entry with the stable module-and-threshold QA marker.
16. Keep stable markers directly above audit and QA entries so validation can match both logs to the ledger.
17. Preserve older entries and add dated amendments instead of silently rewriting history.
18. Run `npm run syllabus:validate` and `npm run qa:validate`, then confirm both logs match the ledger.

## Curriculum scope

The ordered curriculum grows in reviewed chunks and includes:

- cloud and computing foundations
- identity and access management
- global infrastructure
- compute and virtualization
- containers and Kubernetes
- serverless computing
- storage
- relational and non-relational databases
- networking fundamentals and cloud networking
- application delivery
- messaging and integration
- security
- observability and operations
- reliability and disaster recovery
- DevOps and delivery
- infrastructure as code
- cost management and FinOps
- governance and organizations
- data engineering and analytics
- AI and machine learning foundations
- migration and modernization
- architecture patterns
- hands-on job skills
- troubleshooting
- interview and career preparation

Do not create shallow placeholder lessons to make the curriculum appear complete.

## Incremental delivery

1. Foundation, design system, content schema, search, deployment, and reusable learning components.
2. Pilot curriculum covering cloud fundamentals, global infrastructure, shared responsibility, compute, storage, networking, and identity.
3. Core technical curriculum.
4. Remaining curriculum and cross-topic architecture practice.
5. Job preparation, quizzes, scenarios, and revision tools.
6. Advanced curriculum and maintenance automation.

Complete content, visual, factual, accessibility, responsive, search, and browser review for a chunk before expanding it. A chunk should normally contain 2 to 4 comprehensive lessons, but its actual boundary follows coherence, complexity, risk, and the next mandatory module audit.
