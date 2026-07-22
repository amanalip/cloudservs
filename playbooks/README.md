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

## Playbook lifecycle and anti-bloat rule

Playbooks are created deliberately, not automatically for every request.

```text
New procedure appears
        |
        v
Does an existing playbook own the subject?
   | yes                         | no
   v                             v
Update that playbook       Is it recurring or safety-critical?
                                 | no              | yes
                                 v                 v
                         Keep it task-local   Would merging mix unrelated duties?
                                                   | no          | yes
                                                   v             v
                                          Extend closest     Create playbook
                                            playbook              |
                                                                  v
                                                  Index + route + validate
```

When creating a playbook:

1. Give it one clear responsibility and a descriptive lowercase filename.
2. Move the complete task-specific procedure into it instead of duplicating that procedure in `AGENTS.md` or `SKILLS.md`.
3. Keep only the always-applicable invariant in `AGENTS.md`.
4. Keep only triggers, routes, and a compact workflow summary in `SKILLS.md`.
5. Add the playbook to the index table and every applicable router row.
6. Update migration traceability when existing guidance moved.
7. Run `npm run guidance:validate`, which discovers every Markdown playbook and rejects unindexed or unrouted additions.

## Guidance size budgets

OpenAI documents a default `project_doc_max_bytes` ceiling of 32 KiB for the combined project instruction chain. That is a loading limit, not a promise that every instruction below the limit will receive equal attention. OpenAI recommends keeping `AGENTS.md` short, accurate, and practical, and moving task-specific detail to referenced files.

The repository therefore uses conservative local budgets:

| File        | Project ceiling | Reasoning                                                                                                            |
| ----------- | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| `AGENTS.md` | 16 KiB          | Half of the documented 32 KiB default leaves room for possible nested project guidance and keeps the root practical. |
| `SKILLS.md` | 12 KiB          | This is a custom scan-first router, not a native Codex skill, so it should remain smaller than the root contract.    |

These ceilings are engineering guardrails, not fact-checked recall thresholds. There is no documented word count that guarantees Codex will never overlook an instruction. Byte size is used because Codex documents its project-instruction loading limit in bytes, while word length varies by formatting and language.

At 75% of either project ceiling, review the file before adding more material. Remove duplication, move procedures to the owning playbook, and replace prose-only rules with tests or validators where possible. Do not raise a ceiling merely to make validation pass.

Native Codex skills use progressive disclosure: their names and descriptions are initially visible, while the full selected `SKILL.md` is loaded only when used. This repository's uppercase `SKILLS.md` is not that native format. It remains reliable because `AGENTS.md` explicitly requires reading it, and guidance validation checks all of its playbook routes.

Official references:

- [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Build skills](https://learn.chatgpt.com/docs/build-skills)
