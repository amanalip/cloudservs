# cloudservs Changelog

Last documentation sync: `2026-08-09T12:10:10-04:00`

This changelog records verified repository release candidates and confirmed public releases of `cloudservs` in beginner-friendly language. It explains what learners receive, what maintainers add, what was verified, what is deployed, and what remains outside each version.

## Versioning policy

`cloudservs` uses simple incremental public release labels:

```text
v1  First feature release, published July 21, 2026
 |
 v
v2  First complete lesson, repository candidate completed August 9, 2026
 |
 v
v3  Lesson sequence navigation correction, repository candidate completed August 9, 2026
 |
 v
v4  Next version after another qualifying learner-facing change
```

- Documentation corrections, post-mortem improvements, and record maintenance do not create a new feature version by themselves.
- The next qualifying change after v3 will be named `v4`.
- A version entry distinguishes locally verified repository evidence from independently checked GitHub Pages deployment.
- The private npm package value `0.1.0` is internal project metadata. Public changelog labels use `v1`, `v2`, and later whole-number releases.
- A version is added only after its qualifying syllabus content, features, or bug fixes exist in the repository and pass the appropriate quality checks.
- Planned capabilities must never be listed as released features.
- Update this changelog in the same change whenever verified learner-facing syllabus content is added, a feature is added, or a website bug is resolved.
- A coherent push containing several related syllabus additions, features, or fixes may share one version entry. Do not create a separate version for every file.
- Syllabus bookkeeping alone does not qualify. The learner-facing lesson, diagram, exercise, curriculum capability, or other content must exist and pass its relevant quality checks.
- A bug qualifies only after its correction is verified by a focused regression test or a documented reproducible check.
- Documentation-only clarification, planning, audits without a product change, and post-mortem maintenance do not create a new version.

## How to read a release entry

```text
Release entry
|
+-- Added ............ New learner or maintainer capability
+-- Improved ......... Existing behavior made clearer or more reliable
+-- Fixed ............ Verified defect correction
+-- Quality .......... Tests, validation, accessibility, and review safeguards
+-- Content .......... Lessons, diagrams, sources, and curriculum changes
+-- Known limits ..... Honest boundaries of what the release does not contain
```

---

## v3 | Correct lesson sequence navigation

- Completion date: `2026-08-09`
- Release state: Verified repository release candidate
- Deployment state: Not yet verified on GitHub Pages
- Curriculum state: 93 lessons across 9 modules
- Module 1 topic coverage: 30%
- Quality-gated complete lessons: 1
- Browser regression tests: 12

### Fixed

- Corrected the **Next: Shared responsibility** link so it reaches the sibling lesson instead of a
  nonexistent child route below **What is cloud computing?**.
- Corrected the **Previous: What is cloud computing?** link so it returns to the sibling lesson
  instead of a nonexistent child route below **Shared responsibility**.
- Changed both links from current-directory syntax to parent-then-sibling syntax, preserving the
  required `/cloudservs/` GitHub Pages base path.

### Quality

- Reproduced the original Next-link failure in Chromium and confirmed that it returned the
  cloudservs 404 page.
- Added a round-trip browser regression that clicks Next, verifies the destination route and lesson
  heading, clicks Previous, and verifies the original route and heading.
- Increased the configured desktop Chromium suite from 11 to 12 regressions.
- Passed the focused navigation regression, the complete CI-equivalent browser suite, production
  build, and repository validation checks.

### Known limits

- GitHub Pages deployment of v3 has not yet been independently verified.
- The configured automated browser project remains Chromium. Dedicated Firefox and WebKit projects
  remain planned.
- The production build continues to report the existing JavaScript chunk-size warning.

---

## v2 | First quality-gated lesson

- Completion date: `2026-08-09`
- Release state: Verified repository release candidate
- Deployment state: Not yet verified on GitHub Pages
- Curriculum state: 93 lessons across 9 modules
- Module 1 topic coverage: 30%
- Module 1 requirement progress: 21%
- Quality-gated complete lessons: 1
- Detailed lesson drafts: 1
- Browser regression tests: 11

### Content

- Completed all 25 requirements for **What is cloud computing?**, making it the curriculum's first quality-gated complete lesson.
- Added direct category mappings for virtual machines and object storage across AWS, Microsoft Azure, and Google Cloud, with explicit warnings that direct does not mean identical.
- Added a realistic vendor-neutral web-application architecture with a request-path walkthrough and a table locating all five essential cloud characteristics in the design.
- Added practical entry-level workplace tasks and a structured interview answer.
- Added a 14-term beginner glossary covering the cloud operating model, service models, resources, virtual machines, object storage, and APIs.
- Added six native disclosure flashcards for active recall without additional client-side JavaScript or learner-data storage.
- Expanded search terminology with provider virtual-machine and object-storage names.
- Refreshed the lesson's NIST, AWS, Microsoft, and Google Cloud primary-source review date to August 9, 2026.

### Quality

- Verified the new architecture in light and dark themes, at desktop and 390-pixel mobile widths, and through 300 percent diagram zoom.
- Verified that architecture labels remain inside their nodes at maximum zoom.
- Verified that flashcards stack into one mobile column and open using the keyboard in dark mode.
- Added two focused browser regressions for the starter architecture and flashcards, increasing the suite from 9 to 11 tests.
- Updated the continuation unit test so it now protects Shared responsibility as the next ledger-selected lesson.
- Passed syllabus, QA-log, documentation, guidance, Astro, production-build, privacy, formatting, and browser checks.
- Generated 7 static pages and a Pagefind search index under the GitHub Pages base path.

### Fixed

- Corrected the flashcard browser regression after GitHub Actions exposed an ambiguous Playwright
  locator. The page correctly opened the answer, but MDX-generated empty paragraphs caused the
  test to address three elements instead of the one visible answer.
- Tightened the assertion to identify exactly one answer by its expected text, then verify that it
  is visible. The focused regression and the complete 11-test CI-equivalent suite pass with two
  workers.

### Known limits

- **Shared responsibility** remains a detailed draft awaiting glossary, flashcards, and documented accessibility review.
- The configured browser project remains Chromium. A focused regression uses a 390-pixel viewport, but dedicated mobile-device, Firefox, and WebKit projects remain planned.
- axe-core remains installed but is not invoked by the browser suite.
- The production build still reports a JavaScript chunk larger than 500 kB. This remains a tracked optimization risk.
- GitHub Pages deployment of v2 has not been independently verified because these repository changes have not been pushed during this session.

---

## v1 | First working learning platform

- Release date: `2026-07-21`
- Release type: Initial public feature release
- Repository: `amanalip/cloudservs`
- Deployment target: GitHub Pages at `/cloudservs/`
- Curriculum state at release: 93 planned lessons across 9 ordered modules
- Module 1 topic coverage: 30%
- Quality-gated complete lessons: 0
- Detailed lesson drafts: 2
- Completed module audits: Module 1 at 25%
- Browser regression tests: 8
- Unit tests after the v1 documentation and audit work: 11

### v1 in one picture

```text
Beginner opens cloudservs
          |
          v
Reads one concept-first curriculum
          |
          +--> Plain-language explanation
          +--> Everyday analogy and boundary
          +--> ASCII, Mermaid, and mind-map visuals
          +--> AWS, Azure, and Google Cloud comparison
          +--> Knowledge check and local progress
          +--> Official sources and verification date
          |
          v
Static Astro build creates searchable pages
          |
          v
Tests and validation run in GitHub Actions
          |
          v
Validated files deploy to GitHub Pages
```

## Added in v1

### 1. Static Astro and Starlight learning foundation

- Added an Astro 7 static-site project that produces browser-ready HTML, CSS, JavaScript, a sitemap, and a Pagefind index.
- Added Starlight as the accessible documentation and curriculum foundation.
- Configured the production site for `https://amanalip.github.io/cloudservs/` with the required `/cloudservs/` base path.
- Added Preact support for focused interactive learning components instead of turning every page into a client-rendered application.
- Added TypeScript configuration for typed components, content data, validation, and tests.
- Added Expressive Code through Starlight for code and text blocks.
- Added source maps for production debugging.

### 2. Original cloudservs brand and ownership

- Added the `cloudservs` project name across the interface and documentation.
- Added an original, vendor-neutral SVG cloudservs logo.
- Added a matching SVG favicon.
- Added a custom footer with the exact copyright statement `© 2026 Aman Ali Pogaku`.
- Added a GitHub repository link in the site navigation and footer.
- Added the public project tagline: `Learn the concept. Compare the clouds. Build with confidence.`
- Added the GNU General Public License version 3 as the repository license.

### 3. Custom light and dark visual system

- Added a custom visual layer above Starlight rather than shipping the default theme unchanged.
- Added calm indigo, cyan, violet, neutral, success, and warning design tokens.
- Added polished light and dark color sets with theme-aware surfaces and borders.
- Preserved Starlight's theme toggle, system-preference behavior, and stored explicit theme choice.
- Added a subtle grid background that supports the architecture-learning theme without carrying information.
- Added shared card surfaces, rounded controls, strong focus states, and responsive spacing.
- Added reduced-motion overrides for learners who request less movement.
- Added forced-color support so boundaries remain visible when operating-system high-contrast colors replace the custom palette.

### 4. Locally bundled learning typography

- Added Atkinson Hyperlegible for lesson text to support comfortable reading.
- Added Manrope for headings and brand hierarchy.
- Added JetBrains Mono for code and ASCII diagrams.
- Bundled fonts locally so the reading experience does not depend on a third-party font request.
- Added comfortable body line height, heading spacing, and responsive text sizing.

### 5. One ordered curriculum

- Added one canonical curriculum rather than separate role-based or question-generated courses.
- Added 9 ordered modules covering foundations through job preparation.
- Added a visible module journey with status labels and one clear available starting point.
- Added a working `Start now` action that opens the first available foundation lesson.
- Added a curriculum landing page, a how-to-learn page, and a complete roadmap page.
- Added a curriculum mind map followed by a complete text outline.
- Added a durable 93-lesson syllabus ledger with stable IDs, prerequisites, status, source paths, covered topics, completed requirements, history, blockers, and next actions.

### 6. Beginner-first teaching model

- Defined the standard lesson journey from objective to source review.
- Required plain-language explanation before heavy terminology.
- Required a day-to-day analogy and an explicit explanation of where the analogy stops matching reality.
- Required several purposeful diagrams where the topic benefits from them.
- Required separate AWS, Azure, and Google Cloud explanations.
- Required provider mappings to be labeled `direct`, `approximate`, or `no direct equivalent`.
- Required realistic architecture, common mistakes, troubleshooting clues, workplace context, interview relevance, recap, glossary, flashcards, quiz explanations, and primary sources before a lesson may be quality-gated as complete.

### 7. First two detailed foundation lesson drafts

#### What is cloud computing?

- Added a plain-language definition of cloud computing.
- Added the electricity-utility analogy and its technical boundaries.
- Added the five essential NIST characteristics.
- Added IaaS, PaaS, and SaaS service-model explanations.
- Added deployment-model context.
- Added a first AWS, Azure, and Google Cloud platform comparison.
- Added an interactive cloud-landscape mind map.
- Added common beginner confusions and corrective explanations.
- Added a knowledge check with explanations.
- Added official NIST, AWS, Microsoft, and Google sources with a July 21, 2026 review date.

#### Shared responsibility

- Added the renting-a-home analogy and its boundaries.
- Added layered responsibility mental models.
- Added IaaS, PaaS, and SaaS responsibility examples.
- Added provider-language comparisons for AWS, Azure, and Google Cloud.
- Added a practical decision flow for investigating responsibility.
- Added common beginner mistakes.
- Added a workplace scenario and knowledge check.
- Added official AWS, Microsoft, and Google sources with a July 21, 2026 review date.

These pages are detailed, source-backed drafts. They are not marked as quality-gated complete because several standard lesson requirements remain unfinished.

### 8. Reusable diagram system

- Added Markdown-formatted ASCII diagram cards.
- Added Mermaid flow-diagram rendering with strict security configuration.
- Added Markmap interactive mind maps generated from Markdown hierarchy.
- Added provider comparison cards for consistent AWS, Azure, and Google Cloud presentation.
- Added descriptive titles and captions to diagram cards.
- Added keyboard-focusable diagram viewports.
- Added accessible fallback messaging for failed mind-map rendering.
- Kept equivalent text outlines near complex visual content.
- Added theme-aware Mermaid colors and higher-contrast Markmap labels.

### 9. Diagram reading controls

- Added visible zoom out, zoom percentage, zoom in, reset, and full-screen controls.
- Added zoom levels from 50% through 300% in 25% increments.
- Used centered SVG strokes for plus and minus icons so font metrics cannot shift their visual baseline.
- Added native full-screen entry and exit behavior.
- Added truthful full-screen button labels after the Escape key exits full screen.
- Scaled Mermaid labels, nodes, arrows, and spacing as one complete visual.
- Added bounded diagram viewports with horizontal and vertical scrolling at high zoom.
- Preserved the reader's focal area when Mermaid zoom changes.
- Added reset and rescale behavior for Markmap visuals.
- Respected reduced-motion preference in Markmap animation.

### 10. Reliable ASCII presentation and copying

- Centered each ASCII drawing as one complete block while preserving left alignment inside the drawing.
- Added horizontal scrolling when a drawing is wider than the viewport.
- Added a copy button with visible `Copied` and `Copy failed` states.
- Used the modern Clipboard API in supported secure contexts.
- Added a selection-based fallback for restricted browsers and local conditions.
- Reinitialized copy controls after Starlight client-side navigation.
- Prevented duplicate event listeners when a page is revisited.

### 11. Equal card and toolbar geometry

- Added six learning-toolkit cards in a three-column by two-row desktop grid.
- Applied explicit shared sizing so both rows remain equal.
- Added three equal AWS, Azure, and Google Cloud comparison cards.
- Reset inherited Markdown sibling margins inside provider cards.
- Aligned provider-card top edges, bottom edges, widths, and heights.
- Aligned diagram-control top positions and heights.
- Added responsive stacking for narrow layouts.

### 12. Reader-controlled contents pane

- Replaced the desktop two-column content layout with a reader-controlled pane.
- Added controls that move the table of contents to the left or right.
- Added pointer dragging to resize the contents pane.
- Added keyboard resizing with arrow keys.
- Added a double-click reset to the default pane width.
- Added accessible separator semantics and current-value announcements.
- Saved the selected side and width in local browser storage.
- Restored the saved layout after page reload.
- Kept the mobile contents experience compact without an unnecessary resize handle.

### 13. Shareable section links

- Enhanced generated heading chain icons without removing their normal anchor behavior.
- Navigated to the selected section.
- Constructed and copied the complete absolute section URL.
- Added visible and screen-reader success or failure confirmation.
- Added a restricted-browser clipboard fallback.
- Reinitialized the enhancement after client-side navigation.

### 14. Interactive knowledge checks

- Added focused Preact knowledge-check islands.
- Added selectable answer options with `aria-pressed` state.
- Added a hint before answer selection.
- Added respectful feedback that avoids shaming incorrect answers.
- Added an explanation for every answer option.
- Added a try-again control.
- Used Lucide icons as decorative support while keeping the meaning in text.

### 15. Local lesson progress

- Added a learner-controlled `Mark this lesson complete` action.
- Stored completion in the learner's own browser without requiring an account.
- Used Nano Stores Persistent for durable local state.
- Loaded the persistent store lazily so static rendering does not import browser storage on the server.
- Synchronized progress across browser tabs through the shared persistent store.
- Added clear text explaining that progress is stored only in the current browser.

### 16. Static full-text search foundation

- Added Starlight and Pagefind search across generated HTML.
- Indexed the production site automatically during the build.
- Added `searchTerms` metadata for curriculum and foundation pages.
- Kept search compatible with a completely static GitHub Pages deployment.
- Included headings and rendered lesson text in the searchable output.

### 17. Structured content metadata

- Added build-time validation for module number, difficulty, estimated study time, providers, prerequisites, objectives, review status, search terms, and last-verified date.
- Added controlled values for beginner, intermediate, and advanced difficulty.
- Added controlled review states for draft, reviewed, and verified content.
- Added visible lesson metadata for module, difficulty, study time, and verification date.

### 18. Durable syllabus progress and continuation

- Added the ordered syllabus ledger as the source of truth for curriculum progress.
- Added separate measurements for topic coverage and completion-requirement progress.
- Added a seven-state lesson workflow: planned, researching, drafting, fact-checking, visual review, complete, and blocked.
- Added append-only status history for every lesson.
- Added exact `nextStep` instructions so a future session can resume without relying on chat memory.
- Added prerequisite validation and stable lesson identifiers.
- Added `npm run syllabus:status` for a readable progress and next-work report.
- Added `npm run syllabus:validate` to reject inconsistent progress.
- Integrated syllabus validation into the production build.

### 19. Module milestone audits

- Added required whole-module audits at 25%, 50%, 75%, and 100% topic coverage.
- Added audit checks for syllabus coverage, facts, primary sources, beginner pedagogy, lesson sequence, provider comparisons, visuals, accessibility, navigation, search, browser regressions, terminology, and consistency.
- Prevented an audit from completing while any finding remains open.
- Added findings with corrected, tracked, accepted, or open dispositions.
- Completed the Module 1 25% audit.
- Added `audit.md` as a timestamped human-readable audit history.
- Added build-time validation that requires every completed ledger audit to have one matching, non-duplicated audit-log entry.

### 20. Project memory and beginner-oriented documentation

- Added detailed `AGENTS.md` requirements for future contributors and Codex sessions.
- Added `SKILLS.md` repeatable workflows for lessons, fact-checking, diagrams, search, icons, testing, curriculum continuation, deployment, and post-mortems.
- Added a comprehensive `readme.md` covering the problem, learning philosophy, architecture, curriculum, design, search, sources, deployment, and quality gates.
- Added `audit.md` for formal module review outcomes.
- Added `lessons_learned.md` for user and Codex reflections.
- Added unusually detailed code comments for beginner maintainers.
- Added an explicit rule that project prose and comments avoid em dashes.

### 21. Automated testing and deployment

- Added Vitest unit tests for curriculum order, progress calculation, syllabus validation, audit records, next-lesson selection, and audit-log consistency.
- Added Playwright browser tests against the static production build.
- Added GitHub Actions deployment on pushes to `main` and manual workflow dispatch.
- Installed Chromium in CI and blocked deployment when unit, build, or browser checks fail.
- Uploaded only the validated `dist` directory to GitHub Pages.
- Added deployment concurrency protection without cancelling an active production deployment.
- Added sitemap generation during the build.

## Improved in v1

### Diagram usability improvements

- Increased Mermaid node sizing so complete labels remain inside their shapes.
- Reworked Mermaid zoom to size the canvas and transformed content together.
- Added maximum-zoom containment regression coverage.
- Increased Markmap label readability in dark mode.
- Prevented empty mind-map frames by revealing a fallback message.
- Kept full-screen diagrams usable with a larger scrollable viewport.

### Reading and layout improvements

- Replaced less suitable typography with locally bundled learning-oriented fonts.
- Equalized toolkit and provider cards after real browser inspection.
- Corrected the toolkit from an unintended layout into a verified three-by-two grid.
- Added consistent internal card spacing and heading margins.
- Preserved comfortable line lengths and responsive layouts.

### Interaction reliability improvements

- Added clipboard fallbacks for ASCII content and heading URLs.
- Added initialization after client-side navigation.
- Added accessible status messages for copied and failed states.
- Used SVG zoom glyphs to avoid platform-dependent text-glyph alignment.

## Fixed in v1

- Fixed blank or failed interactive diagram areas by providing accessible fallback messaging.
- Fixed tiny diagram content by adding zoom and full-screen reading controls.
- Fixed zoomed Mermaid labels escaping their nodes at supported zoom levels.
- Fixed diagram content overflowing without a bounded reading viewport.
- Fixed the zoom-out button appearing on a different baseline from the other controls.
- Fixed inconsistent ASCII alignment by centering the complete drawing block.
- Fixed copy actions that depended only on the modern Clipboard API.
- Fixed unequal learning-toolkit card heights.
- Fixed the toolkit layout so desktop renders three columns and two rows.
- Fixed the AWS provider card appearing larger than Azure and Google Cloud cards.
- Fixed dark-mode Markmap labels that lacked comfortable contrast.
- Fixed the static table of contents by adding move and resize controls.
- Fixed heading chain links so clicking also copies the complete URL.
- Fixed long-term syllabus continuation by replacing chat-only memory with a validated repository ledger.
- Fixed premature completion reporting by separating topic coverage from quality-gated lesson completion.

## v1 quality evidence

### Unit coverage

The v1 unit suite verifies:

- nine ordered curriculum modules
- bounded curriculum progress calculations
- complete syllabus structural validation
- Module 1 topic coverage calculation
- Module 1 25% audit state
- earliest ready lesson selection
- breadth of the lesson completion checklist
- existence of a timestamped audit record
- rejection of missing audit records
- rejection of duplicate audit records

### Browser regression coverage

The eight v1 Playwright tests verify:

1. Six equal toolkit cards in a three-by-two desktop grid.
2. Equal AWS, Azure, and Google Cloud card geometry.
3. One baseline and equal heights for diagram controls.
4. Mermaid label containment at 300% zoom.
5. Centered ASCII rendering and clipboard behavior.
6. Heading navigation and complete URL copying.
7. Contents-pane movement, resizing, and persistence.
8. Markmap dark-theme label contrast.

### Deployment checks

```text
Push to main
     |
     v
Install exact dependencies
     |
     v
Run unit tests
     |
     v
Install Chromium
     |
     v
Build static site and Pagefind index
     |
     v
Run Playwright regressions
     |
     v
Upload dist artifact
     |
     v
Deploy to GitHub Pages
```

## Technology status at v1

### Used in the released implementation

| Technology               | v1 use                                                         |
| ------------------------ | -------------------------------------------------------------- |
| Astro                    | Static generation, content build, and GitHub Pages output      |
| Starlight                | Documentation layout, navigation, theme, and search foundation |
| Markdown and MDX         | Lesson authoring and component composition                     |
| Preact                   | Knowledge checks, progress, and toolkit components             |
| Pagefind                 | Production full-text search index                              |
| Mermaid                  | Flow diagrams                                                  |
| Markmap                  | Interactive curriculum and concept mind maps                   |
| Lucide                   | Generic learner-interface icons                                |
| Nano Stores Persistent   | Local lesson-completion state                                  |
| Atkinson Hyperlegible    | Lesson reading font                                            |
| Manrope                  | Heading and brand font                                         |
| JetBrains Mono           | Code and ASCII font                                            |
| TypeScript               | Typed components, validation, and tests                        |
| Vitest                   | Unit tests                                                     |
| Playwright               | Production browser regression tests                            |
| GitHub Actions and Pages | Validation and static deployment                               |

### Installed or planned, but not active as a v1 learner feature

| Technology or capability               | Honest v1 status                                                      |
| -------------------------------------- | --------------------------------------------------------------------- |
| Chart.js                               | Installed, but no released chart component or lesson use              |
| Cytoscape.js                           | Installed, but no released service or prerequisite graph              |
| Driver.js                              | Installed, but no released first-visit tour                           |
| axe-core                               | Installed, but not yet called by the current Playwright suite         |
| PWA and offline installation           | Deferred because the evaluated adapter does not support Astro 7       |
| Provider and difficulty search filters | Planned, but not implemented in the current Pagefind interface        |
| Curated synonym translation            | Planned beyond the current page metadata                              |
| Bookmarks and recently viewed          | Planned, but only lesson completion persistence exists                |
| Continue-learning automation           | Planned, while `Start now` currently opens the first available lesson |
| Platform-aware Command K label         | Discussed and planned, but no platform-detection code exists in v1    |
| Flashcard component                    | Planned, but not released                                             |
| Cytoscape service icons and graphs     | Planned, but not released                                             |
| Chart visualizations                   | Planned, but not released                                             |
| First-visit Driver.js tour             | Optional and not released                                             |

## Known v1 limitations

### Curriculum limitations

- Only two detailed lesson drafts are published.
- Neither lesson has passed every quality-gated completion requirement.
- Module 1 has 30% topic coverage but zero fully complete lessons.
- Modules 2 through 9 remain planned.
- Glossaries, flashcards, richer workplace practice, and several complete architecture sections remain unfinished in the current drafts.

### Search limitations

- Full-text production search exists.
- Advanced provider, module, topic, domain, and difficulty filters are planned but not implemented.
- A complete cross-provider synonym dictionary is not yet implemented.
- Search empty-state and synonym regression coverage remains future work.

### Accessibility limitations

- The platform includes semantic controls, keyboard support for implemented interactions, focus states, reduced motion, forced colors, and text alternatives.
- The current Playwright suite does not yet invoke axe-core, even though the package is installed.
- The current browser project covers desktop Chromium only.
- Dedicated mobile, Firefox, WebKit, and comprehensive manual assistive-technology audits remain future work.

### Performance limitations

- The production build reports that some minified JavaScript chunks exceed 500 kB.
- Mermaid and Markmap improve learning but require careful selective loading and future bundle review.
- Chart.js, Cytoscape.js, and Driver.js are installed even though they are not active v1 features, so dependency cleanup or deferred installation should be evaluated before expansion.

### Offline limitations

- The site is static and cacheable by the browser, but it is not an installable offline PWA.
- PWA integration remains deferred until an adapter supports the current Astro version and the GitHub Pages base path is verified.

### Collaboration and Git limitations

- Development currently occurs directly on `main`.
- A correct merge commit was created when a license was added on GitHub while feature changes existed locally.
- Pulling with rebase before new local work can reduce avoidable merge commits, but correct published history should not be force-rewritten casually.

## v1 development history

The public release was assembled incrementally on July 21, 2026:

```text
Initial repository and README planning
                 |
                 v
GitHub Pages workflow
                 |
                 v
Astro and Starlight first build
                 |
                 v
Diagram, layout, copy, and theme fixes
                 |
                 v
Syllabus quality checks and milestone audits
                 |
                 v
GPL v3 license plus local audit work merged
                 |
                 v
Lessons-learned record added
```

Important commits include:

- `168e7d7`: Added the GitHub Pages deployment workflow.
- `7844355`: Added the initial working site build.
- `45c3668` through `dada830`: Iteratively corrected interface and diagram behavior.
- `bb7f1f0`: Added syllabus quality checks.
- `cc96672`: Added the GNU General Public License version 3.
- `38086f7`: Added syllabus validation and the audit report.
- `d0d89b1`: Merged the valid remote license and local syllabus histories.
- `f70cfe4`: Added the first lessons-learned document.

## What will qualify as v2

The next changelog entry will be `v2`, but only after at least one learner-facing syllabus addition, new feature, or verified website bug fix is implemented and validated.

Examples that could qualify include:

- completing the remaining requirements for the first foundation lesson
- adding a new complete lesson
- implementing advanced search filters and synonym translation
- releasing bookmarks or continue-learning behavior
- adding a fully tested platform-aware shortcut label
- adding a new accessible visualization type that is used in a lesson

Documentation maintenance, changelog creation, post-mortem corrections, and clarification of existing behavior remain important, but they do not create v2 by themselves.
