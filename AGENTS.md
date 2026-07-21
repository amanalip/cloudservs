# cloudservs Agent Guide

## Purpose

`cloudservs` is a visual, beginner-friendly cloud learning website that teaches a concept once and then explains how AWS, Microsoft Azure, and Google Cloud implement it.

The primary learner is a student, recent graduate, career changer, or new employee preparing for an entry-level cloud role. Never assume that the learner already understands cloud terminology, networking, security, operating systems, or distributed systems.

## Current project status

Development began after the owner approved the plan. The first working chunk includes the Astro and Starlight foundation, a custom responsive interface, locally bundled reading fonts, persisted light and dark themes, static full-text search, curriculum metadata, local lesson progress, interactive quizzes, reusable diagram components with zoom and full-screen viewing, and the first two fact-checked foundation lessons.

Build the remaining curriculum in coherent, verified chunks. A chunk is complete only when its lessons, visuals, interactions, source review, browser checks, and documentation are complete.

## Non-negotiable requirements

- The site name is `cloudservs`.
- The site must be deployable as a static website on GitHub Pages.
- The site must include a polished light theme and dark theme.
- The initial theme must respect the operating system preference.
- A learner's selected theme must persist between visits.
- The interface must be responsive, accessible, visually calm, and encouraging.
- Explanations must be beginner-friendly without becoming shallow or incomplete.
- The curriculum must be broad enough to support serious learning and job preparation.
- Lessons must contain many useful visuals, not a single decorative diagram.
- Avoid em dashes in all interface copy, lessons, documentation, comments, and examples.
- The footer must display `© 2026 Aman Ali Pogaku`.
- Keep `AGENTS.md`, `SKILLS.md`, and `readme.md` current as the project changes.

## Teaching model

Every substantial lesson should follow this sequence unless the subject requires a justified variation:

1. State what the learner will understand.
2. Explain the concept in plain language.
3. Explain why the concept exists.
4. Introduce required vocabulary before using it heavily.
5. Provide a simple day-to-day analogy.
6. State where the analogy stops being technically accurate.
7. Provide a visual mental model.
8. Explain the technical mechanism in sufficient depth.
9. Show the AWS implementation.
10. Show the Azure implementation.
11. Show the Google Cloud implementation.
12. Compare the providers side by side.
13. Label mappings as direct, approximate, or absent.
14. Show the concept inside a realistic architecture.
15. Cover common mistakes and troubleshooting clues.
16. Connect the topic to workplace tasks and interviews.
17. Provide a recap, glossary, flashcards, and quiz.
18. Cite primary sources and show a last-verified date.

Do not shorten an explanation merely to make a page look clean. Use progressive disclosure, good headings, visual grouping, expandable details, summaries, and navigation to manage depth.

## Diagram standard

Lessons should use the diagram types that best fit the idea:

- Markdown-formatted ASCII diagrams
- Mind maps
- Concept maps
- Flow diagrams
- Sequence diagrams
- Decision trees
- Request and data-flow diagrams
- Responsibility boundaries
- Network paths
- Service relationship maps
- Lifecycle diagrams
- Failure and recovery flows
- Before-and-after comparisons
- Side-by-side provider mappings
- Architecture diagrams
- Interview mental models

Every visual must teach something specific. Decorative visuals do not count toward the diagram requirement.

For every complex or interactive visual:

- Provide a descriptive title and caption.
- Provide a text explanation or equivalent structured list.
- Do not communicate meaning by color alone.
- Support keyboard navigation where interaction exists.
- Ensure readable contrast in light and dark themes.
- Respect `prefers-reduced-motion`.
- Make the visual usable on narrow mobile screens.
- Offer zoom, pan, expansion, or a larger view when density requires it.
- Dense Mermaid and Markmap visuals must provide visible zoom out, zoom in, reset, and full-screen controls.
- Diagram zoom must scale labels, nodes, arrows, and spacing as one unit. Text must never escape or clip inside its node at any supported zoom level.
- Never leave an empty diagram frame after a rendering failure. Show an accessible fallback that points to the equivalent text explanation.

ASCII diagrams must remain readable as text, use a suitable monospace font, support horizontal scrolling when necessary, and include a copy control where helpful.

Center an ASCII drawing as a complete block while preserving left alignment inside the drawing. Clipboard actions must work on initial load and after client-side navigation, report success or failure, and include a restricted-browser fallback.

## Accuracy and fact-checking

Technical correctness is a release requirement.

- Use official AWS documentation, Microsoft Learn and Azure documentation, and Google Cloud documentation as primary sources.
- Use standards bodies or original project documentation for vendor-neutral technologies.
- Do not use search-result summaries as evidence.
- Verify service names, scope, behavior, limits, availability, terminology, and prerequisites.
- Treat pricing, quotas, regional availability, product names, and certification details as time-sensitive.
- Prefer stable conceptual comparisons over temporary marketing language.
- Never describe two services as exact equivalents solely because they occupy similar categories.
- Classify provider mappings as `direct`, `approximate`, or `no direct equivalent`.
- Explain the important differences behind every approximate mapping.
- Attach source links and a `lastVerified` date to each technical lesson.
- Clearly label simplifications and analogy boundaries.
- Do not publish an unsupported claim as fact.
- If reliable sources disagree or remain ambiguous, state the uncertainty.
- Recheck links and time-sensitive facts during scheduled content maintenance.

Automated checks can support fact-checking but cannot replace manual comparison against primary sources.

## Proposed technical foundation

Use a static-first architecture based on:

- Astro for static generation
- Starlight for accessible learning and documentation structure
- Markdown and MDX for lesson content
- Preact for focused interactive learning components
- Pagefind for static full-text search and filtering
- Mermaid for flow, sequence, state, architecture, timeline, and related diagrams
- Markmap for interactive Markdown mind maps
- Cytoscape.js for interactive service and prerequisite graphs
- Lucide for consistent generic interface icons
- Nano Stores and Nano Stores Persistent for local progress, bookmarks, and preferences
- Vite PWA integration for offline learning and update prompts when an adapter supports the project's Astro version
- Chart.js for selective data visualizations with accessible table alternatives
- Driver.js for an optional first-visit tour when it adds real value
- Expressive Code for code examples and styled ASCII blocks
- TypeScript for interactive code
- Vitest for unit and component tests
- Playwright for browser and responsive-flow tests
- axe-core with Playwright for automated accessibility checks

Use libraries generously when they materially improve learning, clarity, accessibility, or maintainability. Do not add overlapping libraries merely to increase the dependency count. Load expensive visualization libraries only on pages that need them. Pin exact dependency versions in the lockfile and review them during upgrades.

The current Vite PWA Astro adapter does not declare compatibility with Astro 7. Do not force an incompatible peer dependency. Reevaluate PWA support during dependency upgrades and add it only after compatibility and GitHub Pages behavior are verified.

## Search requirements

Search is a core feature, not a later enhancement.

- Index lesson titles, headings, body text, glossary terms, analogies, and provider service names.
- Return matches for sections within long lessons.
- Support filters for provider, curriculum module, topic, and difficulty.
- Support abbreviations, common synonyms, and cross-provider terminology.
- Examples include `VM`, `virtual machine`, `EC2`, `Azure Virtual Machines`, and `Compute Engine`.
- Provide helpful empty states and suggested alternative terms.
- Ensure the search dialog works with a keyboard and screen reader.
- Keep search entirely static and compatible with GitHub Pages.
- Generate the search index automatically during deployment.

## Learner experience

The site should encourage continued learning through clarity and achievable progress.

- Show prerequisites before a lesson begins.
- Show estimated depth or difficulty without pressuring the learner.
- Break long lessons into visible stages while preserving full detail.
- Celebrate completed lessons subtly.
- Save progress locally without requiring an account.
- Provide bookmarks, recently viewed lessons, and a continue-learning action.
- Explain incorrect quiz answers without shaming the learner.
- Provide hints before revealing answers where appropriate.
- Use encouraging, direct, human language.
- Avoid excessive animation, gamification pressure, streak anxiety, and visual noise.
- Make the next useful action obvious.

## Curriculum-first structure

`cloudservs` has one ordered curriculum. Do not build separate role-based learning paths, role dashboards, duplicated lesson sequences, or independent progress systems.

- Give every lesson one clear position in the main curriculum.
- Use prerequisites and previous and next lesson links to guide progression.
- Track progress against the single curriculum.
- Allow learners to search or filter the curriculum without creating alternate course structures.
- Workplace relevance may be shown as lightweight lesson context, but it must not become a separate navigation or progress system.
- Reuse the same lesson wherever another page references it. Never duplicate lesson content for a job role.
- Treat any future curated role view as an optional index over the existing curriculum, not as a separate curriculum.

## Interface and visual design

- Create a distinctive custom visual system for `cloudservs` rather than shipping an unmodified documentation theme.
- Use spacious layouts, strong hierarchy, readable typography, calm surfaces, and consistent diagram cards.
- Bundle project fonts locally so typography remains consistent without third-party requests.
- Use Atkinson Hyperlegible for lesson text, Manrope for headings, and JetBrains Mono for code and ASCII.
- Cards in the same visual collection must have consistent dimensions and internal spacing.
- Keep line lengths comfortable for learning.
- Use provider colors carefully and never as the only identifier.
- Maintain clear focus states and large touch targets.
- Avoid layout shifts and unnecessary client-side JavaScript.
- Test common phone, tablet, laptop, and wide-screen layouts.
- Respect system theme initially and persist explicit theme choices.
- Respect reduced motion, forced colors, zoom, and keyboard-only use.
- Maintain a minimum WCAG 2.2 AA target, with manual review in addition to automated checks.

## Logo and icon rules

- Create an original, vendor-neutral SVG logo for `cloudservs`.
- The brand concept should combine connected cloud providers with learning or an open-book idea.
- The logo must work at favicon, navigation, social-card, light-theme, and dark-theme sizes.
- Use official AWS, Azure, and Google Cloud architecture icons only where their published guidelines allow.
- Do not redraw, recolor, distort, or invent trademarked provider service logos.
- Create a consistent custom icon family for vendor-neutral concepts such as compute, networking, storage, identity, databases, security, and observability.
- Always pair unfamiliar service icons with text labels.

## Code documentation standard

All human-authored code must be unusually well documented for a beginner audience.

- Document every meaningful line when doing so remains syntactically valid and readable.
- When line-by-line comments are not practical, document every logical block immediately before it.
- Explain intent, data flow, inputs, outputs, assumptions, and important browser behavior.
- Explain why a library or pattern is used, not only what the syntax does.
- Add beginner-oriented file headers that describe the file's role.
- Document component properties, state, events, accessibility behavior, and persistence behavior.
- Comment non-obvious CSS calculations, theme tokens, responsive rules, and motion behavior.
- Keep examples correct and runnable.
- Do not add comments that merely repeat the code without improving understanding.
- Do not place comments where the file format forbids them, such as JSON. Document those files in a nearby Markdown file or through adjacent source configuration.
- Generated files, lockfiles, build output, third-party code, and vendored official assets are exempt from line-by-line comments.

The documentation requirement must not be used to justify convoluted code. Prefer small components, descriptive names, simple control flow, and typed interfaces.

## Content structure and metadata

Each lesson should include structured metadata for at least:

- Title
- Summary
- Domain
- Difficulty
- Prerequisites
- Learning objectives
- Providers covered
- Workplace relevance
- Estimated reading or study time
- Mapping confidence where comparisons exist
- Primary sources
- Last verified date
- Review status

Build-time validation must reject missing required metadata, invalid dates, broken internal references, and malformed lesson structures.

## Curriculum scope

The curriculum should grow in reviewed chunks and include:

- Cloud and computing foundations
- Identity and access management
- Global infrastructure
- Compute and virtualization
- Containers and Kubernetes
- Serverless computing
- Storage
- Relational and non-relational databases
- Networking fundamentals and cloud networking
- Application delivery
- Messaging and integration
- Security
- Observability and operations
- Reliability and disaster recovery
- DevOps and delivery
- Infrastructure as code
- Cost management and FinOps
- Governance and organizations
- Data engineering and analytics
- AI and machine learning foundations
- Migration and modernization
- Architecture patterns
- Hands-on job skills
- Troubleshooting
- Interview and career preparation

Do not create shallow placeholder lessons to make the curriculum appear complete.

## Incremental delivery

Build in quality-controlled chunks:

1. Foundation, design system, content schema, search, deployment, and reusable learning components.
2. Pilot curriculum covering cloud fundamentals, global infrastructure, shared responsibility, compute, storage, networking, and identity.
3. Core technical curriculum.
4. Remaining curriculum modules and cross-topic architecture practice.
5. Job preparation, quizzes, scenarios, and revision tools.
6. Advanced curriculum and maintenance automation.

Complete content, visual, factual, accessibility, and responsive review for a chunk before expanding it.

## Quality gates

Before calling a change complete:

- Run formatting, linting, type checking, unit tests, and a production build.
- Run browser tests at representative desktop and mobile sizes.
- Test light mode, dark mode, system theme, and saved theme behavior.
- Test keyboard navigation and visible focus.
- Run automated accessibility checks and perform manual accessibility review.
- Check internal and external links.
- Verify GitHub Pages base-path behavior.
- Check search indexing and common synonym searches.
- Inspect diagrams on mobile and in both themes.
- Check that reduced-motion preferences are respected.
- Verify that new claims have primary sources and review dates.
- Scan authored text for em dashes and replace them.
- Confirm that copyright text is correct.
- Update project documentation when architecture, commands, conventions, or workflows change.

## Repository hygiene

- Preserve user changes and avoid unrelated rewrites.
- Do not commit generated build output unless the deployment design explicitly requires it.
- Keep dependencies justified and documented.
- Keep assets optimized and source attribution recorded where required.
- Never place secrets or private credentials in client code, lesson content, examples, or repository history.
- Remember that all GitHub Pages code and data delivered to the browser are public.
