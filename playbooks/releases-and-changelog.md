# Releases, Status Evidence, and Documentation Playbook

Use this playbook before confirming implementation status, resolving a website bug, adding learner-facing syllabus content, preparing a release, editing the changelog, or closing a work session.

## Request evaluation gate

Before implementing a requested approach:

1. Separate the user's underlying goal from the proposed method.
2. Check the method against repository evidence and current architecture.
3. Identify false assumptions, conflicts, duplicated systems, avoidable dependencies, maintenance burden, performance cost, or privacy, accessibility, accuracy, safety, and trust risks.
4. When risk is meaningful, explain it before acting and recommend a concrete alternative.
5. Let safe aesthetic and product preferences remain the owner's choice.
6. Do not claim certainty that evidence cannot support, including promises that something can never fail or be missed.
7. Record a reusable lesson when respectful challenge changes the project direction or exposes a limitation.

The agent is a collaborative technical partner, not a command repeater and not an unaccountable veto. Evidence, proportionality, and the project's approved goals determine when to challenge.

## Evidence-based status

Before saying that a feature, fix, test, library integration, content requirement, accessibility behavior, or deployment capability is implemented, complete, working, protected, verified, or released:

1. Re-read the exact request or acceptance criterion.
2. Inspect the current working tree.
3. Locate the implementation file, import, component, configuration, or content.
4. Trace how a real page or workflow reaches it.
5. Locate a relevant test or run a focused verification.
6. Use a real browser for visual or interactive behavior.
7. Test operating system, browser, viewport, theme, storage, and base-path branches that affect the claim.
8. State the evidence-supported status and coverage boundary.

```text
planned
  Requested, but implementation evidence is absent

present but inactive
  Code or dependency exists, but the product does not use it

implemented but unverified
  Reachable implementation exists without behavior evidence

verified
  Current implementation and relevant behavior have fresh evidence

released
  Verified behavior belongs to a named public release

not yet verified
  Evidence is insufficient for a positive answer
```

Conversation memory, a previous response, a requirement, a package installation, a filename, unrelated tests, or intended CSS never proves implementation.

Platform-aware behavior additionally requires detection or a reliable platform signal, expectations for each branch, automated branch coverage, and rendered browser evidence. The Command K adaptation remains planned until those conditions exist.

## Changelog triggers

Update `changelog.md` in the same change whenever:

- validated learner-facing syllabus content is added
- a feature is added
- a website bug is resolved and verified

Group related work in one coherent push into one version. Syllabus bookkeeping alone does not qualify. Require the real lesson, diagram, exercise, or curriculum capability. A bug does not qualify as resolved without a focused regression test or documented reproducible check.

Documentation clarification, planning, audit-only work, post-mortem maintenance, internal validation tooling, and repository hygiene do not create a release unless they change learner-facing behavior or historical release evidence.

Use whole-number public versions `v1`, `v2`, `v3`, and onward. Keep v1 until a qualifying post-v1 product change is implemented and validated.

## Release workflow

1. Inspect the working tree and preserve user changes.
2. Read the current changelog version.
3. List candidate syllabus additions, features, and bug fixes from source and history.
4. Verify product reachability and behavior.
5. Verify fixes with focused regression evidence.
6. Separate learner features from developer tooling and documentation.
7. Separate active dependencies from installed-only dependencies.
8. Compare claims with `readme.md`, `AGENTS.md`, `SKILLS.md`, playbooks, the syllabus ledger, tests, and content.
9. Record Added, Improved, Fixed, Quality, Content, Dependencies, and Known limits as applicable.
10. State topic coverage separately from quality-gated completion.
11. State planned and deferred capabilities explicitly.
12. Run the complete validation workflow.
13. Update living-document timestamps and append the session reflection.
14. Add the next version only after the qualifying change and evidence exist.

## Changelog sanity checks

- Search for every claimed import, component, route, store, configuration, and content page.
- Review browser-test names and configured projects before claiming coverage.
- Review the syllabus status before claiming completion.
- Review Git history and dates.
- Verify GitHub Pages base-path behavior.
- Preserve known limitations.
- Record every new learner-facing lesson under Content or Added.
- Record every resolved website defect under Fixed with regression evidence.

## Lessons learned workflow

After every work session:

1. Investigate before concluding.
2. Gather evidence from files, tests, screenshots, browser behavior, sources, or history.
3. Decide whether the result belongs in `audit.md`, `lessons_learned.md`, or both.
4. Append a timestamped `lessons_learned.md` entry.
5. Separate lessons learned by Aman and Codex.
6. Explain the prompt, meaning, cause, impact, evidence, limitations, future practice, validation, and open risk.
7. Use diagrams or tables when they improve understanding.
8. Record successes and good ideas, not only defects.
9. Record shortcomings fairly and specifically. This is a non-blaming improvement record, not a defense of Codex or criticism of Aman.
10. Add regression coverage when a reproducible defect produced the lesson.
11. If no reusable lesson emerged, record that the review occurred.
12. Preserve prior entries and add dated amendments rather than rewriting history.

`audit.md` records formal checkpoint results. `src/data/syllabus.ts` records exact curriculum state. `lessons_learned.md` records reflection and changed practice. `changelog.md` records public product history.

## Documentation closeout

- Synchronize `AGENTS.md`, `SKILLS.md`, `readme.md`, and `lessons_learned.md` timestamps after reviewing them.
- Update a playbook when its workflow materially changes.
- Update `playbooks/README.md` whenever routing or traceability changes.
- Update `changelog.md` only when its product or historical-evidence triggers apply.
- Update `audit.md` only for a formal module audit or dated amendment.
- Run `npm run docs:validate`, `npm run guidance:validate`, formatting, and relevant project checks.
