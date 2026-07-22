# cloudservs Agent Contract

Last documentation sync: `2026-07-22T17:48:22-04:00`

## Purpose and learner

`cloudservs` is a visual, beginner-friendly cloud learning website that teaches a vendor-neutral concept once, then explains how AWS, Microsoft Azure, and Google Cloud implement it.

The primary learner is a student, recent graduate, career changer, or new employee preparing for an entry-level cloud role. Never assume prior knowledge of cloud terminology, networking, security, operating systems, or distributed systems. Beginner-friendly must never mean shallow or incomplete.

## How to use this contract

This file contains only the always-applicable rules. Detailed procedures live in [`playbooks/`](./playbooks/README.md).

Before acting:

1. Read this file completely.
2. Use the task router in [`SKILLS.md`](./SKILLS.md).
3. Read every playbook required for the task.
4. Announce the selected playbooks before they cause an action or pause.
5. Follow the strictest applicable rule when playbooks overlap.

Do not treat `SKILLS.md` as an automatically activated Codex skill package. It is a project workflow router, so reading the routed playbooks is an explicit required step.

## Independent judgment and respectful challenge

- `JUDGE-01`: Treat every request as input to evaluate, not proof that the proposed method is correct.
- `JUDGE-02`: Before execution, compare the request with repository evidence, approved goals, existing architecture, privacy, accuracy, accessibility, maintainability, performance, safety, scope, and long-term cost.
- `JUDGE-03`: Pause and explain the concern before acting when the requested method rests on a false assumption, conflicts with a non-negotiable rule, creates disproportionate complexity, duplicates existing work, or introduces meaningful risk.
- `JUDGE-04`: Offer a concrete recommended alternative with evidence and tradeoffs. Do not merely object or make Aman discover the solution alone.
- `JUDGE-05`: Distinguish correctness risks from preferences. Respect safe product and aesthetic preferences after explaining any relevant tradeoff.
- `JUDGE-06`: Do not use critical evaluation to stall ordinary reversible work, expand scope, or override the owner's informed decision. Safety and authorization boundaries still apply.

Agreement is not the goal by itself. The goal is a better, evidence-supported project decision. When Aman changes direction after hearing the tradeoff, record the decision. When he keeps the original approach within safe authority, implement it faithfully and preserve the stated limitation.

## Current verified boundary

- Public release: `v1`, developed July 21, 2026.
- Curriculum ledger: 93 planned lessons across 9 ordered modules.
- Module 1: 30% topic coverage, 18% requirement progress, zero quality-gated complete lessons.
- Detailed drafts: `What is cloud computing?` and `Shared responsibility`.
- Active visuals: ASCII, Mermaid, Markmap, and provider comparisons.
- Installed but not released as learner features: Chart.js, Cytoscape.js, and Driver.js.
- axe-core is installed but not invoked by the current browser suite.
- Browser regressions target desktop Chromium. Dedicated mobile, Firefox, and WebKit projects remain planned.
- Advanced search filters, bookmarks, recently viewed lessons, continue-learning automation, and platform-aware Command K remain planned.
- PWA support is deferred because the evaluated adapter does not support Astro 7.

Never copy this status into a new claim without rechecking the repository.

## Non-negotiable rules

- `CORE-01`: The site name is `cloudservs` and the footer displays `© 2026 Aman Ali Pogaku`.
- `CORE-02`: The site remains statically deployable to GitHub Pages at the `/cloudservs/` base path.
- `CORE-03`: Maintain polished, accessible, persisted light and dark themes that initially respect the operating-system preference.
- `CORE-04`: Use one ordered curriculum. Do not create independent role paths, duplicated courses, or competing progress systems.
- `CORE-05`: Preserve technical depth, many purposeful visuals, and job-relevant explanations.
- `CORE-06`: Avoid em dashes in interface copy, lessons, documentation, comments, and examples.
- `CORE-07`: Human-authored code is documented unusually well for beginners. Generated output, lockfiles, and third-party code are exempt.
- `CORE-08`: Preserve user changes and avoid unrelated or destructive work.

## Zero analytics and privacy

- `PRIV-01`: Never collect, transmit, sell, profile, or analyze learner data.
- `PRIV-02`: Do not add visitor analytics, telemetry, advertising, tracking pixels, fingerprinting, heatmaps, session replay, application cookies, accounts, profiles, or data-submission forms.
- `PRIV-03`: Search terms, quiz answers, progress, preferences, clipboard contents, and accessibility choices never leave the learner's browser through cloudservs.
- `PRIV-04`: Local storage is allowed only for documented, non-sensitive learner benefit and must never sync to a server.
- `PRIV-05`: Bundle fonts, scripts, styles, icons, and learning assets locally. Treat unexplained third-party requests as release blockers.
- `PRIV-06`: Run Astro through `scripts/run-astro-private.ts` and keep `ASTRO_TELEMETRY_DISABLED=1` in CI.
- `PRIV-07`: Explain the hosting boundary honestly. GitHub Pages logs visitor IP addresses for security, but cloudservs has no analytics backend, learner database, or access to those logs.

Read [`playbooks/privacy.md`](./playbooks/privacy.md) for every dependency, browser API, storage, search, embedded-resource, hosting, or privacy change.

## Accuracy and curriculum

- `FACT-01`: Use official AWS, Microsoft, and Google Cloud documentation for provider claims and original standards or project documentation for neutral technologies.
- `FACT-02`: Never use search-result summaries as evidence or publish an unsupported claim as fact.
- `FACT-03`: Classify provider mappings as `direct`, `approximate`, or `no direct equivalent`, and explain meaningful differences.
- `FACT-04`: Attach primary sources and a `lastVerified` date to every technical lesson. Treat prices, quotas, availability, names, and certifications as time-sensitive.
- `CURR-01`: `src/data/syllabus.ts` is the source of truth for progress. Conversation memory, file existence, and navigation visibility are not completion evidence.
- `CURR-02`: Run `npm run syllabus:validate` and `npm run syllabus:status` before continuing curriculum work.
- `CURR-03`: Mark a lesson complete only after all assigned topics and requirements, source metadata, verification, visuals, interactions, accessibility, and relevant tests pass.
- `CURR-04`: Stop expansion for whole-module audits at 25%, 50%, 75%, and 100% topic coverage.

## Implementation claims and trust

- `STAT-01`: Before confirming anything as implemented, fixed, working, protected, verified, or released, inspect the current working tree.
- `STAT-02`: Locate the implementation, prove a real page or workflow reaches it, and run the narrowest relevant test or browser check.
- `STAT-03`: State environment limits such as operating system, browser, viewport, theme, storage, and base path.
- `STAT-04`: Use only `planned`, `present but inactive`, `implemented but unverified`, `verified`, `released`, or `not yet verified`.
- `STAT-05`: Conversation memory, previous responses, requirements, installed packages, filenames, unrelated tests, and intended CSS are not implementation evidence.
- `STAT-06`: Platform-aware behavior requires a reliable platform signal, expectations for every branch, automated branch coverage, and rendered browser evidence.

If evidence is incomplete, say `not yet verified`. If current evidence contradicts an earlier response, correct it immediately and record the lesson without defensiveness.

## Changelog and records

- `CHANGE-01`: Update `changelog.md` in the same change as every validated learner-facing syllabus addition, new feature, or verified website bug fix.
- `CHANGE-02`: Syllabus bookkeeping alone does not qualify. Require actual learner-facing content or capability.
- `CHANGE-03`: Do not call a website bug resolved without a focused regression test or documented reproducible check.
- `CHANGE-04`: Group related work from one coherent push into one version. Documentation-only maintenance, planning, audit-only work, and repository hygiene do not create a release.
- `DOCS-01`: Synchronize `AGENTS.md`, `SKILLS.md`, `readme.md`, and `lessons_learned.md` at session closeout.
- `DOCS-02`: Update `audit.md` only for formal module checkpoints or dated amendments.
- `DOCS-03`: Preserve `lessons_learned.md` as append-only decision memory with separate lessons for Aman and Codex.
- `DOCS-04`: Keep `AGENTS.md` at or below the repository's 16 KiB ceiling and `SKILLS.md` at or below its 12 KiB ceiling. These are conservative project budgets, not model-recall guarantees. Put task-specific procedures in an existing playbook. Create a new playbook only for a distinct, recurring workflow with no suitable owner, then index, route, and validate it.
- `QA-01`: Append `QAlogs.md` whenever a module completes a 25%, 50%, 75%, or 100% checkpoint and whenever Aman explicitly requests QA of content, behavior, readiness, or project quality.
- `QA-02`: Every QA entry records its timestamp, trigger, scope, outcome, findings, actions, evidence, validation results, remaining risks, and next action. A completed module audit must have a matching QA marker.

## Quality gate

Before calling a relevant change complete:

- run formatting, type checking, unit tests, and a production build
- run syllabus, QA-log, documentation, guidance, and privacy validators
- run focused and full browser regressions in proportion to risk
- review keyboard access, focus, themes, reduced motion, forced colors, zoom, mobile layout, and text alternatives
- verify Pagefind, internal and external links, GitHub Pages base-path behavior, copyright, and em dash absence
- recheck new technical claims against primary sources
- confirm every reached module audit is complete and logged
- update the changelog when its syllabus, feature, or verified website-fix trigger applies
- append the session reflection and preserve honest limitations

The complete gate is in [`playbooks/testing-and-accessibility.md`](./playbooks/testing-and-accessibility.md).

## Repository safety

- `SAFE-01`: Quote shell expressions and special characters carefully.
- `SAFE-02`: After any quoting, parsing, redirection, or path error, stop writes and inspect `git status --short` immediately.
- `SAFE-03`: Resolve exact targets before deletion and never use broad destructive paths.
- `SAFE-04`: Do not hide accidental changes. Explain, obtain authority where needed, correct safely, validate, and record the lesson.
- `SAFE-05`: Never place secrets in browser code, lessons, examples, or repository history.

Use [`playbooks/repository-safety.md`](./playbooks/repository-safety.md) for Git, filesystem, shell, deletion, dependency, or recovery work.
