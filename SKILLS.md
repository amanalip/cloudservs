# cloudservs Project Skills and Workflows

Last documentation sync: `2026-07-22T15:07:30-04:00`

This file defines reusable project workflows for building and maintaining `cloudservs`. It is a project guide, not an installable Codex skill package.

## 1. Author a beginner-friendly lesson

### Goal

Turn a difficult cloud topic into a complete, visual lesson without removing the technical depth needed for work and interviews.

### Workflow

1. Identify the learner's prerequisites.
2. Write measurable learning objectives.
3. Define every essential term in plain language.
4. Explain the problem the concept solves.
5. Add a day-to-day analogy.
6. Document where the analogy stops matching reality.
7. Create at least one overview mental model.
8. Add flow, relationship, decision, or lifecycle visuals as the subject requires.
9. Explain the technical mechanism step by step.
10. Cover AWS, Azure, and Google Cloud implementations separately.
11. Build a provider comparison with mapping confidence.
12. Add a realistic architecture example.
13. Add common mistakes and troubleshooting guidance.
14. Add workplace and interview relevance.
15. Finish with a recap, glossary, flashcards, and quiz.
16. Add primary sources and a last-verified date.
17. Perform factual, editorial, visual, and accessibility review.

### Completion criteria

- A beginner can explain the concept in their own words.
- The explanation remains useful for job preparation.
- New terminology is defined before being relied upon.
- The analogy is explicitly separated from the technical model.
- Provider differences are not hidden.
- Every technical claim is supported or clearly qualified.
- The page includes several purposeful visuals where appropriate.
- Quiz explanations teach, even when the learner answers incorrectly.

## 2. Fact-check a cloud comparison

### Goal

Publish a current, defensible comparison without inventing equivalence between providers.

### Workflow

1. Break the comparison into individual factual claims.
2. Locate the official AWS source for each AWS claim.
3. Locate the official Microsoft source for each Azure claim.
4. Locate the official Google source for each Google Cloud claim.
5. Use original standards or project documentation for vendor-neutral technology.
6. Check whether every service is global, regional, zonal, or resource-specific.
7. Check service behavior, prerequisites, notable limits, and availability.
8. Classify each mapping as direct, approximate, or no direct equivalent.
9. Explain meaningful differences for approximate mappings.
10. Mark time-sensitive information for more frequent review.
11. Record sources and the verification date in lesson metadata.
12. Perform a second pass that compares the prose directly with the cited source.

### Fact confidence model

```text
Claim
  |
  +-- Supported by a current primary source
  |       |
  |       +-- Publish with citation and review date
  |
  +-- Partially supported or context-dependent
  |       |
  |       +-- Qualify the statement and explain conditions
  |
  +-- Conflicting or unclear
          |
          +-- State the uncertainty or omit the claim
```

## 3. Design a diagram-rich lesson

### Goal

Use multiple complementary visuals so the learner can see structure, sequence, responsibility, and decisions.

### Diagram selection guide

```text
What must the learner understand?
  |
  +-- Hierarchy or prerequisites ........ Mind map or concept tree
  +-- Events over time .................. Sequence or lifecycle diagram
  +-- A decision ........................ Decision tree
  +-- Request or packet movement ........ Flow diagram
  +-- Service relationships ............. Cytoscape graph
  +-- Architecture components ........... Mermaid architecture diagram
  +-- A compact text-first model ......... ASCII diagram
  +-- Quantitative comparison ........... Chart plus accessible table
  +-- Ownership or trust boundaries ...... Responsibility diagram
```

### Workflow

1. Write the learning point before drawing the visual.
2. Select the smallest diagram type that communicates it clearly.
3. Draft the diagram using Markdown-friendly source where possible.
4. Add a title, caption, and surrounding explanation.
5. Add an accessible text equivalent.
6. Style the visual for both themes.
7. Test narrow screens, zoom, keyboard use, and reduced motion.
8. Confirm that the visual remains accurate after simplification.
9. Verify zoom out, zoom in, reset, scrolling, and full-screen controls on dense interactive visuals.
10. At minimum and maximum zoom, confirm that labels remain contained within their nodes and every diagram element scales together.
11. Force or simulate a rendering failure and confirm that a useful text fallback replaces blank space.
12. Confirm diagram toolbars remain on one row or scroll as one unit at narrow widths.
13. Test ASCII copy on the first page load and after client-side navigation.
14. Confirm ASCII drawings are centered as blocks without centering their internal text.

## 4. Build an interactive mind map

### Goal

Help learners explore a topic hierarchy without losing their position.

### Workflow

1. Write the hierarchy in Markdown.
2. Keep the first view small enough to understand quickly.
3. Use Markmap for expandable hierarchical maps.
4. Use Cytoscape.js when relationships are not purely hierarchical.
5. Provide expand-all, collapse-all, reset, and fit-to-view controls where useful.
6. Persist optional view state only when it benefits return visits.
7. Pair the map with a linear text outline.
8. Ensure nodes have readable labels and keyboard-accessible details.

## 5. Build a provider comparison

### Goal

Show similarities and differences without implying false equivalence.

### Required fields

- Vendor-neutral concept
- AWS implementation
- Azure implementation
- Google Cloud implementation
- Mapping confidence
- Important differences
- Scope and responsibility
- Typical use cases
- Common beginner confusion
- Official sources
- Last verified date

### Presentation rules

- Keep provider order consistent throughout the site.
- Use text labels in addition to icons and colors.
- Allow comparison tables to scroll on narrow screens.
- Offer a stacked mobile view when a table becomes unreadable.
- Keep caveats visible rather than hiding them in tooltips.

## 6. Create a learning interaction

### Goal

Add interaction only when it improves understanding or recall.

### Suitable interactions

- Guided reveal of an architecture flow
- Provider comparison filters
- Flashcards
- Knowledge checks
- Scenario-based questions
- Sort-and-match exercises
- Expandable glossary definitions
- Interactive service maps
- Bookmarks and lesson completion

### Rules

- Use Preact islands so static lesson content remains lightweight.
- Use Nano Stores for shared learning state.
- Use Nano Stores Persistent for local progress and preferences.
- Work without an account or backend.
- Explain every answer and provide a recovery path after mistakes.
- Never make core lesson content dependent on animation.
- Support keyboard and screen-reader interaction.
- Respect reduced-motion preferences.

## 7. Implement search and terminology translation

### Goal

Let a learner search by concept, abbreviation, provider term, or job topic.

### Workflow

1. Index generated static lesson content with Pagefind.
2. Add metadata filters for provider, curriculum module, topic, and difficulty.
3. Maintain a reviewed synonym dictionary.
4. Connect vendor terms to their vendor-neutral concept.
5. Return section-level results with useful excerpts.
6. Add keyboard shortcuts and correct focus management.
7. Provide spelling and empty-state guidance where feasible.
8. Test beginner queries and provider-specific queries.

### Search mental model

```text
Learner query
     |
     +-- Concept name
     +-- Abbreviation
     +-- AWS term
     +-- Azure term
     +-- GCP term
     +-- Job task
            |
            v
      Synonym normalization
            |
            v
       Pagefind index
            |
            v
  Filtered lessons and sections
```

## 8. Create and manage icons

### Goal

Use icons to improve recognition while maintaining accuracy and brand compliance.

### Workflow

1. Use the original `cloudservs` SVG identity for project branding.
2. Use approved official provider architecture icons for branded services.
3. Record the official source and any required attribution.
4. Do not alter trademarked icons beyond permitted use.
5. Use Lucide for common interface actions.
6. Create custom SVG icons for vendor-neutral concepts.
7. Pair unfamiliar icons with readable labels.
8. Test icons at favicon, card, navigation, and diagram sizes.
9. Test both themes and high-contrast conditions.

## 9. Document beginner-oriented code

### Goal

Make the codebase itself useful to a beginner reading it.

### Workflow

1. Add a file header describing purpose and data flow.
2. Use descriptive names before relying on comments.
3. Comment every meaningful line where the syntax permits it.
4. Use a block comment when line comments would damage readability.
5. Explain library integration points and browser behavior.
6. Document component inputs, outputs, state, events, and accessibility.
7. Explain persistence keys and data migrations.
8. Explain theme, responsive, and reduced-motion decisions in CSS.
9. Keep comments synchronized with code during every change.
10. Document non-commentable formats in nearby Markdown.

### Exemptions

Generated output, package lockfiles, third-party source, vendor assets, and formats that reject comments do not receive line-by-line comments. Their purpose and important configuration must still be documented elsewhere.

## 10. Review learner experience

### Goal

Ensure the site encourages learning without overwhelming or pressuring the learner.

### Review questions

- Is the learner told what they will understand?
- Are prerequisites visible?
- Is the first explanation approachable?
- Can deeper information be reached without hunting?
- Do diagrams clarify rather than decorate?
- Is the next step obvious?
- Does feedback explain mistakes respectfully?
- Can the learner resume where they stopped?
- Does the page work with keyboard, zoom, and a screen reader?
- Is motion optional?
- Does the mobile layout preserve the learning sequence?
- Do related cards have equal dimensions at every responsive column count?
- Do toolkit cards in different rows have the same measured height?
- Do AWS, Azure, and Google Cloud cards share the same top edge, bottom edge, and internal padding?
- Are the locally bundled body, heading, and code fonts loaded in both themes?
- Can the desktop contents pane move left and right, resize by dragging, resize by keyboard, and retain its preference?
- Are Markmap labels readable at default zoom in both light and dark themes?
- Are SVG plus and minus strokes optically centered inside equal-height zoom controls?

## 11. Validate a release chunk

### Goal

Release a coherent, reviewed slice of the platform rather than a large set of unfinished pages.

### Workflow

1. Validate lesson metadata and source fields.
2. Run formatting, linting, type checking, and unit tests.
3. Create a production build.
4. Test the build using the intended GitHub Pages base path.
5. Run Playwright flows on desktop and mobile viewports.
6. Run axe-core accessibility checks.
7. Perform manual keyboard, zoom, theme, and reduced-motion review.
8. Test Pagefind results, filters, synonyms, and empty states.
9. Check diagrams in light mode, dark mode, and mobile layouts.
10. Validate internal and external links.
11. Recheck primary sources for changed claims.
12. Scan prose and comments for em dashes.
13. Verify the footer copyright.
14. Update `AGENTS.md`, `SKILLS.md`, `readme.md`, and `lessons_learned.md`.
15. Run the privacy validator and verify that browser pages make no third-party requests.

### Current project commands

```text
npm run dev           Start the local development site
npm run test          Run curriculum and utility tests
npm run test:e2e      Build and run Playwright UI regression tests
npm run syllabus:validate  Reject an inconsistent progress ledger
npm run syllabus:status    Report progress and the next curriculum checkpoint
npm run docs:validate      Confirm the four living guides share one timestamp
npm run privacy:validate   Reject common collection APIs and remote embedded resources
npm run check         Type-check Astro, MDX, and TypeScript
npm run build         Validate and create the production site
npm run preview       Serve the production output locally
npm run format:check  Verify repository formatting
```

Set `ASTRO_TELEMETRY_DISABLED=1` in automated builds. Test production behavior under `/cloudservs/`, because local root-path success does not prove that GitHub Pages base-path routing works.

### UI regression coverage

The Playwright suite must preserve the shared fixes before additional curriculum chunks ship:

- six equal toolkit cards in a three-by-two desktop grid
- equal AWS, Azure, and Google Cloud comparison-card geometry
- equal-height diagram controls with centered SVG plus and minus icons
- Mermaid node-label containment through maximum zoom
- centered ASCII drawings and reliable clipboard behavior
- movable, keyboard-resizable, and persisted desktop contents-pane state
- readable Markmap labels in dark mode
- heading chain links that navigate to the section, copy the complete URL, and announce success
- representative learner pages that make no requests to third-party origins

## 12. Continue the syllabus reliably

### Goal

Resume multi-day curriculum work from repository evidence without depending on chat history.

### Workflow

1. Inspect the working tree and preserve unfinished user changes.
2. Run `npm run syllabus:validate`.
3. Run `npm run syllabus:status`.
4. Select the reported next lesson rather than choosing a new topic from memory.
5. Read its topics, prerequisites, status history, completed requirements, and `nextStep`.
6. Complete one coherent research, writing, fact-checking, or review checkpoint.
7. Update covered topics and completed requirements only when evidence exists in the lesson.
8. Append a dated status-history event when the workflow status changes.
9. Record the next concrete action or blocker before ending the development session.
10. Run syllabus validation, unit tests, production build, and relevant browser checks.
11. Report topic coverage and quality-gated completion separately.
12. When coverage crosses 25%, 50%, 75%, or 100%, stop expansion and complete the due whole-module audit.

### Module milestone audit

At each threshold:

1. Review every available lesson and the remaining module outline together.
2. Compare ledger topics with the agreed detailed curriculum.
3. Recheck technical claims against current primary sources.
4. Review beginner clarity, analogy boundaries, technical depth, and lesson order.
5. Review AWS, Azure, and Google Cloud comparisons and mapping confidence.
6. Inspect diagrams, responsive behavior, themes, accessibility, search, and navigation.
7. Run unit, production-build, and browser regression checks.
8. Correct genuine defects immediately.
9. Record unfinished planned work as tracked findings with exact next actions.
10. Keep justified decisions as accepted findings with an explanation.
11. Leave the audit incomplete while any finding remains open.
12. Record evidence, findings, resolutions, summary, and completion date in the module ledger.
13. Append the response-style audit summary to `audit.md` with the exact date, time, and timezone.
14. Include the stable marker, scope, outcome, findings, actions, source links, validation results, and next checkpoint.
15. Preserve previous entries and use a dated amendment when an earlier result needs correction.
16. Run `npm run syllabus:validate` and confirm the log entry matches the completed ledger audit.

### Status model

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

Never mark a lesson complete merely because its file exists or its source claims are verified. Source verification and whole-lesson completion are separate signals.

## 13. Deploy to GitHub Pages

### Goal

Publish a reproducible static build without server-only dependencies.

### Workflow

1. Configure Astro `site` and `base` values for the repository URL.
2. Generate static output.
3. Build the Pagefind index.
4. Generate or update PWA assets only when the selected adapter supports the installed Astro version.
5. Run the complete release validation workflow.
6. Deploy through the official GitHub Pages Actions flow.
7. Test the deployed base path, assets, search, navigation, and offline behavior.
8. Record the deployed version and content verification date.

### PWA compatibility gate

The project currently uses Astro 7 through Starlight. The evaluated Vite PWA Astro adapter does not declare Astro 7 compatibility, so offline installation is deferred. Never bypass the peer dependency check merely to include the feature. Reevaluate the adapter during dependency upgrades, then test installation, updates, cached navigation, and the `/cloudservs/` base path before enabling it.

## 14. Record a lesson learned

### Goal

End every work session with a fair, beginner-friendly record of what the user and Codex learned, including successes, defects, limitations, safeguards, and open risks.

### Workflow

1. Investigate what happened before recording a conclusion.
2. Gather evidence from files, tests, screenshots, browser behavior, sources, or version history as applicable.
3. Decide whether the result belongs in the factual audit log, the reflective lessons log, or both.
4. Append a timestamped entry to `lessons_learned.md` during every session closeout.
5. Record lessons learned by the user and lessons learned by Codex separately.
6. Explain the prompt, meaning, impact, and future practice in language a beginner can follow.
7. Record Codex limitations fairly and connect each limitation to a concrete safeguard.
8. Add ASCII charts, mind maps, tables, or flows when they make the reasoning easier to understand.
9. Record successful ideas and practices worth repeating, not only defects.
10. Add regression coverage when the lesson came from a reproducible defect.
11. Update `AGENTS.md` rules, `SKILLS.md` procedures, and `readme.md` project guidance in the same session.
12. Update the documentation-sync timestamp in the four living documents: `AGENTS.md`, `SKILLS.md`, `readme.md`, and `lessons_learned.md`.
13. If no reusable lesson emerged, append a short entry saying so and list what was reviewed.
14. Run `npm run docs:validate` and correct any missing or mismatched timestamp.
15. Preserve previous entries and append a dated amendment if a conclusion later changes.
16. Avoid duplicating raw audit evidence when a concise reference and explanation are enough.

### Required entry structure

1. Timestamp and scope
2. Prompt for reflection
3. Evidence reviewed
4. Lesson learned by the user
5. Lesson learned by Codex
6. Codex limitation exposed
7. Preventive action
8. Validation performed
9. Open risk or next review trigger

### Recording boundary

`audit.md` answers what was checked and what passed. `src/data/syllabus.ts` answers what curriculum work is done and what comes next. `lessons_learned.md` answers what the team now understands, which limitations were exposed, and what it will do differently. `changelog.md` answers which features were actually released, when they were released, and which limits remained. The first three living guides and `AGENTS.md` are synchronized every session. The changelog is reviewed but edited only when release evidence changes.

## 15. Prepare a feature release and changelog

### Goal

Publish an evidence-based release record that helps beginners understand what changed without confusing plans, installed dependencies, and completed features.

### Version rule

```text
Current public release: v1
          |
          v
Syllabus addition, feature, or website bug fix completed and validated?
          |
      +---+---+
      |       |
     yes      no
      |       |
      v       v
Create v2   Keep changelog at v1
```

Validated learner-facing syllabus additions, new features, and resolved website bugs require a changelog entry. Documentation maintenance, post-mortem corrections, planning, and audit-only work do not increment the version by themselves.

### Workflow

1. Inspect the working tree and preserve unrelated user changes.
2. Read `changelog.md` and identify the current public version.
3. List candidate syllabus additions, features, and bug fixes from source changes and commit history.
4. Verify every syllabus addition and feature in source code, rendered content, or browser behavior.
5. Verify every fix with a focused regression test or documented reproducible check.
6. Separate learner-facing features from developer tooling and documentation maintenance.
7. Separate active dependencies from installed-but-unused dependencies.
8. Compare the release against `readme.md`, `AGENTS.md`, `SKILLS.md`, the syllabus ledger, tests, and current content pages.
9. Record added, improved, fixed, quality, content, dependency, and known-limit sections.
10. State curriculum coverage and quality-gated completion separately.
11. State planned or deferred capabilities explicitly instead of implying that they shipped.
12. Run unit, production-build, browser, documentation, formatting, and relevant accessibility checks.
13. Update the four living-document timestamps. Update the changelog timestamp only when this workflow actually changes its release record.
14. Append the session's honest reflection to `lessons_learned.md`.
15. Add the next version only after a qualifying syllabus addition, feature, or website bug fix and its checks exist.
16. Update `changelog.md` in the same change as the qualifying product work. Group related changes from one coherent push into one version.

### Sanity checklist

- Search the repository for each claimed library import.
- Search for the component, route, or state store behind each claimed interaction.
- Compare planned lists with implemented source files.
- Review browser-test names to avoid overstating coverage.
- Review content metadata and syllabus status before reporting lesson completion.
- Review Git history for dates and parallel changes.
- Verify GitHub Pages base-path configuration.
- Scan for em dashes and formatting problems.
- Preserve known limitations even when the release is successful.
- Confirm that every new learner-facing lesson or curriculum capability is recorded under Content or Added.
- Confirm that every resolved website defect is recorded under Fixed and names its regression evidence.

### Confirmation checklist before answering the user

Use this checklist for every direct question such as “is it implemented?”, “is it fixed?”, “will this work on the next pages?”, or “does the library handle this?” Do not wait for a formal release review.

1. Quote or restate the exact behavior being confirmed.
2. Run `git status --short` so the answer reflects tracked and uncommitted work.
3. Search for the implementation with `rg`, then open the relevant code rather than relying on the search result alone.
4. Confirm that a rendered route, imported component, npm script, or deployment workflow actually reaches the code.
5. Find or run the narrowest relevant test.
6. When behavior is visual or interactive, inspect it in a real browser.
7. When behavior depends on macOS, Windows, Linux, mobile, theme, browser engine, storage, or GitHub Pages routing, test the differing condition instead of extrapolating from one environment.
8. State one of: `planned`, `present but inactive`, `implemented but unverified`, `verified`, `released`, or `not yet verified`.
9. Include the verification boundary in the answer, such as “verified in desktop Chromium at the GitHub Pages base path.”
10. If evidence is missing or contradictory, say so immediately. Do not preserve an earlier positive answer for consistency.

```text
Previous response says yes
          |
          v
Current repository proves yes?
     |                 |
    yes                no
     |                 |
     v                 v
Verify again      Correct the record
     |                 |
     v                 v
Answer with       Mark the real status
evidence and      and record the lesson
boundaries
```

For platform-aware shortcut labels, require all of the following before confirmation:

- platform detection or another reliable platform-specific signal
- separate rendered expectations for macOS and non-macOS behavior
- an automated test covering both branches
- a browser check showing the correct visible label

The current Command K adaptation does not meet these conditions and remains planned.

## 16. Audit privacy and enforce zero analytics

### Goal

Prove that cloudservs does not collect or transmit learner behavior, while explaining the difference between local browser state and GitHub Pages hosting logs.

### Privacy model

```text
Learner action
      |
      +--> theme, progress, and layout preferences
      |          |
      |          v
      |    learner's browser storage only
      |
      +--> search text
      |          |
      |          v
      |    Pagefind search in the browser
      |
      +--> page request --------------------> GitHub Pages hosting
                                                   |
                                                   v
                                      GitHub security logging boundary

No cloudservs analytics server, account database, or tracking service exists.
```

### Workflow

1. Search authored browser code for `fetch`, `XMLHttpRequest`, `sendBeacon`, WebSocket, EventSource, cookie APIs, remote scripts, remote iframes, forms, and known analytics vendor markers.
2. Inspect direct dependencies and the installed dependency tree for analytics, telemetry, error reporting, session replay, and advertising packages.
3. Distinguish a transitive build-tool package from code shipped to learners. Disable build-tool telemetry even when it is not visitor tracking.
4. Inventory every `localStorage` and `sessionStorage` key, its value, purpose, lifetime, and whether any code transmits it.
5. Confirm that clipboard code writes only the learner-requested text and does not read unrelated clipboard contents.
6. Build the production site and inspect generated HTML for remote scripts, frames, styles, media, tracking markers, forms, and cookies.
7. Run representative pages in Playwright and record every request whose origin differs from the local production server.
8. Verify that Pagefind loads its same-origin static index and does not send search terms to a hosted search service.
9. Verify every project Astro command runs through `scripts/run-astro-private.ts`, which sets `ASTRO_TELEMETRY_DISABLED=1` for the child process without changing machine-wide settings. Keep the same variable at the CI job level.
10. Document the hosting boundary accurately. GitHub Pages logs visitor IP addresses for security according to GitHub's documentation, even though cloudservs has no access to an application analytics backend.
11. Update the four living documents with findings, safeguards, storage inventory, limits, and the next review trigger.
12. Do not update `changelog.md` for a privacy question or policy clarification unless a public release record actually changes.

### Required commands

```text
npm run build              Build, then run the privacy validator
npm run privacy:validate   Scan source dependencies and generated HTML
npm run test:e2e           Confirm representative pages have no third-party requests
npm run docs:validate      Confirm the four living privacy records were synchronized
```

### Failure conditions

Stop the release when any of these appear without an explicit owner-approved policy change:

- learner analytics or telemetry
- tracking pixels, advertising tags, fingerprinting, heatmaps, or session replay
- cookies written or read by the application
- search terms, quiz answers, progress, preferences, or clipboard data sent off-device
- third-party scripts, remote iframes, or unexplained external requests
- accounts, profiles, forms, or a backend that receives learner information
- CLI telemetry that is not explicitly disabled in project and deployment commands

Local preference storage is not analytics collection when it remains in the learner's browser, contains no sensitive information, and is never transmitted. It must still be documented and re-audited whenever storage behavior changes.

## 17. Recover from an accidental shell-created file

### Goal

Identify, explain, and safely correct an unexpected repository file without deleting legitimate user work or hiding the cause.

### Why this can happen

Shell characters have meanings beyond ordinary text. An unquoted `>` can redirect output into a file. A malformed command can therefore create an empty file whose name comes from the remaining characters in the command.

```text
Intended search expression
          |
          v
Shell sees an unquoted redirection character
          |
          v
Output is redirected into an unintended filename
          |
          v
Unexpected empty file appears
```

### Workflow

1. Stop after the command error instead of running more write operations.
2. Run `git status --short` to identify unexpected tracked, modified, or untracked paths.
3. Use `stat`, `file`, `git ls-files`, and `git log -- <path>` to determine the file's type, size, timestamps, tracking state, and history.
4. Compare its creation time with the failed command and inspect the command's quoting before attributing a cause.
5. Tell the owner what happened, including whether the file is empty, used by the application, tracked, or already committed.
6. Do not delete it until deletion is clearly authorized.
7. Delete only the exact confirmed path. Do not use a wildcard, unresolved variable, or recursive command.
8. Run `git status --short` and repository validation after deletion.
9. Add the reusable cause and prevention practice to `lessons_learned.md`.
10. Update the changelog only if the cleanup qualifies under its syllabus, feature, or resolved website-bug triggers. Repository-only cleanup does not create a release.

### Prevention checklist

- Keep shell searches short and readable.
- Put regular expressions inside a single, correctly quoted argument.
- Avoid mixing several quote styles when a simpler command can answer the question.
- Treat a shell parse or redirection error as a signal to inspect the working tree immediately.
- Use `apply_patch` for repository file deletion so the exact path is visible in the change.
