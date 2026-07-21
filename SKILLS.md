# cloudservs Project Skills and Workflows

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
- Are the locally bundled body, heading, and code fonts loaded in both themes?

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
14. Update `AGENTS.md`, `SKILLS.md`, and `readme.md`.

### Current project commands

```text
npm run dev           Start the local development site
npm run test          Run curriculum and utility tests
npm run check         Type-check Astro, MDX, and TypeScript
npm run build         Validate and create the production site
npm run preview       Serve the production output locally
npm run format:check  Verify repository formatting
```

Set `ASTRO_TELEMETRY_DISABLED=1` in automated builds. Test production behavior under `/cloudservs/`, because local root-path success does not prove that GitHub Pages base-path routing works.

## 12. Deploy to GitHub Pages

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
