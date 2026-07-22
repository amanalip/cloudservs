# Testing, Accessibility, Architecture, and Deployment Playbook

Use this playbook for code changes, dependencies, search behavior, accessibility, performance, release validation, GitHub Pages configuration, or deployment.

## Static-first technical foundation

The approved foundation is:

- Astro for static generation
- Starlight for accessible learning and documentation structure
- Markdown and MDX for lesson content
- Preact for focused interactive components
- Pagefind for static full-text search and filtering
- Mermaid for flow, sequence, state, architecture, and timelines
- Markmap for Markdown mind maps
- Cytoscape.js for interactive service and prerequisite graphs
- Lucide for generic interface icons
- Nano Stores and Nano Stores Persistent for local progress and preferences
- Chart.js for selective charts with accessible table alternatives
- Driver.js for an optional first-visit tour when it adds real value
- Expressive Code for code examples and styled ASCII
- TypeScript for interactive code
- Vitest for unit and component tests
- Playwright for browser and responsive-flow tests
- axe-core with Playwright for automated accessibility checks
- Vite PWA integration only when an adapter supports the installed Astro version

Use libraries generously when they materially improve learning, clarity, accessibility, or maintainability. Do not add overlapping libraries merely to increase the dependency count. Load expensive visualization libraries only on pages that need them. Pin exact versions in the lockfile and review upgrades.

Distinguish installed packages from active features. Do not claim Chart.js, Cytoscape.js, Driver.js, axe-core, or another library behavior until source usage and relevant tests exist.

## PWA compatibility gate

The evaluated Vite PWA Astro adapter does not declare Astro 7 compatibility. Do not force an incompatible peer dependency. Reevaluate during dependency upgrades, then test installation, updates, cached navigation, and the `/cloudservs/` base path before enabling PWA behavior.

## Release-chunk validation

1. Validate lesson metadata, source fields, and syllabus state.
2. Run formatting, type checking, and unit tests.
3. Create a production build.
4. Test the intended GitHub Pages base path.
5. Run Playwright at representative phone, tablet, laptop, desktop, and wide-screen sizes in proportion to risk.
6. Run axe-core when integrated and perform manual accessibility review.
7. Test keyboard navigation, visible focus, zoom, themes, system theme, saved theme, forced colors, and reduced motion.
8. Test Pagefind results, filters, synonyms, section results, and empty states.
9. Inspect diagrams in light, dark, mobile, default zoom, and maximum zoom.
10. Validate internal and external links.
11. Recheck primary sources for changed claims.
12. Scan authored prose and comments for em dashes.
13. Verify `© 2026 Aman Ali Pogaku`.
14. Run syllabus, documentation, guidance, and privacy validators.
15. Run QA-log validation and confirm every completed module audit has matching `audit.md` and `QAlogs.md` entries.
16. Append `QAlogs.md` when the work is a module checkpoint or Aman explicitly requested QA.
17. Update the four living documents and the changelog when its product-change triggers apply.

## Current commands

```text
npm run dev                 Start the local development site
npm run test                Run unit tests
npm run test:e2e            Build and run browser regressions
npm run syllabus:validate   Validate the curriculum ledger and audit links
npm run syllabus:status     Report curriculum progress and next work
npm run qa:validate         Validate milestone and explicit QA history
npm run docs:validate       Validate living-document timestamps
npm run guidance:validate   Validate the guidance router and critical rules
npm run privacy:validate    Reject collection APIs and remote resources
npm run check               Check Astro, MDX, and TypeScript
npm run build               Validate and create the production site
npm run preview             Serve production output locally
npm run format:check        Verify formatting
```

All project Astro commands run through `scripts/run-astro-private.ts`. Automated builds also set `ASTRO_TELEMETRY_DISABLED=1`. Local root-path success does not prove `/cloudservs/` behavior.

## Protected browser regressions

The suite preserves:

- six equal toolkit cards in a three-by-two desktop grid
- equal AWS, Azure, and Google Cloud card geometry
- equal-height diagram controls with centered SVG plus and minus icons
- Mermaid label containment through maximum zoom
- centered ASCII drawings and reliable clipboard behavior
- movable, keyboard-resizable, persisted contents-pane state
- readable dark-mode Markmap labels
- heading chain links that navigate, copy complete URLs, and announce success
- representative learner pages with no third-party requests

Add a focused regression whenever a website defect is resolved. A CSS declaration or implementation intention is not browser evidence.

## QA execution log

Use `QAlogs.md` for detailed quality-execution evidence when a module completes a 25%, 50%, 75%, or 100% checkpoint or when Aman explicitly requests QA.

Each entry records:

- exact timestamp and trigger
- outcome as `Pass`, `Conditional pass`, or `Fail`
- scope and exclusions
- findings with severity and disposition
- corrective actions
- evidence inspected
- exact validation results
- remaining risks and next action

`audit.md` records the formal curriculum-checkpoint conclusion. `QAlogs.md` records the detailed QA execution. One module checkpoint updates both. An explicit QA request updates `QAlogs.md` without creating a module audit unless a coverage threshold is actually reached.

## Accessibility standard

- Target WCAG 2.2 AA.
- Use semantic controls and correct accessible names.
- Maintain keyboard access, logical focus order, and visible focus.
- Use large touch targets.
- Do not communicate state through color alone.
- Provide text alternatives for every complex visual.
- Respect reduced motion and forced colors.
- Check browser zoom and narrow screens.
- Ensure quiz feedback is announced and understandable.
- Keep clipboard and chain-link success or failure available to sighted and screen-reader users.
- Combine automated checks with manual keyboard, screen-reader-oriented, contrast, and readability review.

## Learner-experience review questions

- Is the learner told what they will understand?
- Are prerequisites visible?
- Is the first explanation approachable?
- Can deeper information be reached without hunting?
- Do diagrams clarify rather than decorate?
- Is the next step obvious?
- Does feedback explain mistakes respectfully?
- Can the learner resume where they stopped?
- Does the page work with keyboard, browser zoom, and a screen reader?
- Is motion optional?
- Does the mobile layout preserve the learning sequence?
- Do related cards have equal dimensions at every responsive column count?
- Do toolkit cards in different rows have the same measured height?
- Do AWS, Azure, and Google Cloud cards share top edge, bottom edge, and internal padding?
- Are locally bundled body, heading, and code fonts loaded in both themes?
- Can the desktop contents pane move left and right, resize by pointer and keyboard, and restore its preference?
- Are Markmap labels readable at default zoom in light and dark themes?
- Are SVG plus and minus strokes centered inside equal-height controls?

## Search validation

Confirm that the static Pagefind index is generated during deployment and includes titles, headings, body text, glossary terms, analogies, and service names. Test common synonym groups and filters. Search remains entirely static and must not send query text to a hosted service.

## GitHub Pages deployment

1. Configure Astro `site` and `base` for the repository URL.
2. Generate static output and the Pagefind index.
3. Run all quality gates.
4. Deploy through the official GitHub Pages Actions flow.
5. Test deployed assets, navigation, search, copied section URLs, and base-path routing.
6. Record the deployed version and content verification date.

Do not commit generated `dist/` output unless the deployment design explicitly requires it.

## Performance and maintenance

- Review bundle warnings instead of hiding them.
- Prefer code splitting and selective loading for expensive visualization libraries.
- Avoid unnecessary client-side JavaScript and layout shifts.
- Recheck dependencies, compatibility, accessibility, and privacy during upgrades.
- Treat current chunks larger than 500 kB as a known optimization risk until resolved.
