# cloudservs Playbook Index

The playbooks hold detailed procedures that used to make `AGENTS.md` and `SKILLS.md` difficult to scan. `AGENTS.md` remains the always-applicable contract, while `SKILLS.md` routes each task to the required playbooks.

## Required use

Before changing the project:

1. Read `AGENTS.md`.
2. Use the routing table in `SKILLS.md`.
3. Read every playbook marked required for the task.
4. Announce the selected playbooks before their instructions cause an action or pause.
5. Follow the strictest applicable rule when multiple playbooks apply.

## Playbooks

| Playbook                                                         | Primary responsibility                                                                                       |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`lesson-authoring.md`](./lesson-authoring.md)                   | Beginner pedagogy, lesson structure, interactions, search metadata, code explanations, and content metadata  |
| [`cloud-fact-checking.md`](./cloud-fact-checking.md)             | Primary-source research, provider comparisons, mapping confidence, and verification dates                    |
| [`diagrams-and-ui.md`](./diagrams-and-ui.md)                     | Visual selection, diagrams, icons, themes, responsive design, and learner-interface invariants               |
| [`syllabus-and-audits.md`](./syllabus-and-audits.md)             | Ordered curriculum, durable ledger, continuation, completion gates, and milestone audits                     |
| [`testing-and-accessibility.md`](./testing-and-accessibility.md) | Architecture, dependencies, testing, accessibility, search validation, performance, and deployment           |
| [`privacy.md`](./privacy.md)                                     | Zero analytics, local storage, telemetry, hosting boundaries, and privacy regression checks                  |
| [`releases-and-changelog.md`](./releases-and-changelog.md)       | Evidence-based status, implementation confirmation, versions, changelog triggers, and documentation closeout |
| [`repository-safety.md`](./repository-safety.md)                 | Git hygiene, shell safety, accidental-file recovery, secrets, and safe filesystem work                       |

## Traceability from the former `AGENTS.md`

| Former section                             | New authoritative location                                     |
| ------------------------------------------ | -------------------------------------------------------------- |
| Purpose                                    | `AGENTS.md` core contract                                      |
| Current project status                     | `AGENTS.md` verified boundary                                  |
| Release and changelog governance           | `releases-and-changelog.md`                                    |
| Implementation-claim verification protocol | `AGENTS.md` summary plus `releases-and-changelog.md`           |
| Non-negotiable requirements                | `AGENTS.md` core contract                                      |
| Privacy and zero-analytics policy          | `AGENTS.md` prohibition plus `privacy.md`                      |
| Teaching model                             | `lesson-authoring.md`                                          |
| Diagram standard                           | `diagrams-and-ui.md`                                           |
| Accuracy and fact-checking                 | `cloud-fact-checking.md`                                       |
| Proposed technical foundation              | `testing-and-accessibility.md`                                 |
| Search requirements                        | `lesson-authoring.md` and `testing-and-accessibility.md`       |
| Learner experience                         | `lesson-authoring.md` and `diagrams-and-ui.md`                 |
| Curriculum-first structure                 | `AGENTS.md` summary plus `syllabus-and-audits.md`              |
| Durable syllabus tracking                  | `syllabus-and-audits.md`                                       |
| Interface and visual design                | `diagrams-and-ui.md`                                           |
| Logo and icon rules                        | `diagrams-and-ui.md`                                           |
| Code documentation standard                | `lesson-authoring.md`                                          |
| Content structure and metadata             | `lesson-authoring.md`                                          |
| Curriculum scope                           | `syllabus-and-audits.md`                                       |
| Incremental delivery                       | `syllabus-and-audits.md`                                       |
| Quality gates                              | `testing-and-accessibility.md` and `releases-and-changelog.md` |
| Repository hygiene                         | `repository-safety.md`                                         |

## Traceability from the former `SKILLS.md`

| Former workflow                                   | New authoritative location                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| 1. Author a beginner-friendly lesson              | `lesson-authoring.md`                                                           |
| 2. Fact-check a cloud comparison                  | `cloud-fact-checking.md`                                                        |
| 3. Design a diagram-rich lesson                   | `diagrams-and-ui.md`                                                            |
| 4. Build an interactive mind map                  | `diagrams-and-ui.md`                                                            |
| 5. Build a provider comparison                    | `cloud-fact-checking.md`                                                        |
| 6. Create a learning interaction                  | `lesson-authoring.md`                                                           |
| 7. Implement search and terminology translation   | `lesson-authoring.md` and `testing-and-accessibility.md`                        |
| 8. Create and manage icons                        | `diagrams-and-ui.md`                                                            |
| 9. Document beginner-oriented code                | `lesson-authoring.md`                                                           |
| 10. Review learner experience                     | `lesson-authoring.md`, `diagrams-and-ui.md`, and `testing-and-accessibility.md` |
| 11. Validate a release chunk                      | `testing-and-accessibility.md` and `releases-and-changelog.md`                  |
| 12. Continue the syllabus reliably                | `syllabus-and-audits.md`                                                        |
| 13. Deploy to GitHub Pages                        | `testing-and-accessibility.md`                                                  |
| 14. Record a lesson learned                       | `releases-and-changelog.md`                                                     |
| 15. Prepare a feature release and changelog       | `releases-and-changelog.md`                                                     |
| 16. Audit privacy and enforce zero analytics      | `privacy.md`                                                                    |
| 17. Recover from an accidental shell-created file | `repository-safety.md`                                                          |

## Preservation rule

Do not remove a former requirement merely to shorten a document. Move it to the correct playbook, update this traceability table, and run `npm run guidance:validate`. If two rules conflict, preserve both during the refactor and resolve the conflict explicitly in `lessons_learned.md`.
