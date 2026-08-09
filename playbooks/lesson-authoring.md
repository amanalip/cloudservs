# Lesson Authoring Playbook

Use this playbook whenever creating or revising lesson prose, interactions, code examples, search metadata, or learner-facing content structure. Also read `cloud-fact-checking.md` for technical content and `diagrams-and-ui.md` for visuals.

## Learner and depth standard

The primary learner is a student, recent graduate, career changer, or new employee preparing for an entry-level cloud role. Never assume prior understanding of cloud terminology, networking, security, operating systems, or distributed systems.

Explanations must be beginner-friendly without becoming shallow. Do not shorten an explanation merely to make a page look clean. Manage depth with progressive disclosure, headings, visual grouping, expandable details, summaries, and navigation.

## Complete lesson sequence

Every substantial lesson follows this sequence unless the subject requires a documented variation:

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

## Authoring workflow

1. Identify prerequisites and write measurable learning objectives.
2. Define every essential term before relying on it.
3. Explain the problem the concept solves and why the concept exists.
4. Add a familiar analogy and an explicit analogy boundary.
5. Add an overview mental model plus the complementary visuals required by the subject.
6. Explain the mechanism step by step.
7. Cover AWS, Azure, and Google Cloud separately, then compare them with mapping confidence.
8. Add a realistic architecture and operational path.
9. Add common mistakes, failure clues, and troubleshooting guidance.
10. Add workplace and interview relevance without creating a separate role path.
11. Add a recap, glossary, flashcards, and an accessible knowledge check.
12. Add primary sources, `lastVerified`, and honest review status.
13. Perform factual, editorial, visual, accessibility, search, and metadata review.

## Completion criteria

- A beginner can explain the concept in their own words.
- The explanation remains useful for job preparation.
- New terminology is defined before use.
- The analogy is separated from the technical model.
- Provider differences and uncertainty are visible.
- Every technical claim is supported or qualified.
- Several purposeful visuals are included when appropriate.
- Incorrect quiz answers receive helpful explanations without shaming.
- Every requirement assigned in `src/data/syllabus.ts` is evidenced before the lesson is marked complete.

## Learning interactions

Suitable interactions include:

- quizzes with explanations
- flashcards
- decision exercises
- matching exercises
- architecture builders
- service-selection scenarios
- request-path tracing
- failure diagnosis
- cost trade-off exercises
- interview questions

Rules:

- Every interaction must reinforce a stated objective.
- Provide keyboard access, visible focus, and screen-reader labels.
- Never use color as the only feedback signal.
- Explain incorrect choices in a respectful, useful way.
- Offer hints before answers where appropriate.
- Avoid timers, streak pressure, punitive scoring, and unnecessary animation.
- Save progress locally only when useful and only under the privacy playbook.
- Provide a non-interactive equivalent when an interaction is not accessible.

## Search and terminology translation

Search is a core feature, not a later enhancement.

- Index lesson titles, headings, body text, glossary terms, analogies, and provider service names.
- Return section-level matches for long lessons.
- Support filters for provider, curriculum module, topic, and difficulty.
- Add abbreviations, synonyms, and cross-provider terminology.
- Examples include `VM`, `virtual machine`, `EC2`, `Azure Virtual Machines`, and `Compute Engine`.
- Explain provider-specific meanings instead of treating every synonym as exact.
- Provide helpful empty states and suggested alternatives.
- Keep search static, keyboard-accessible, screen-reader usable, and compatible with GitHub Pages.
- Generate the Pagefind index automatically during deployment.

```text
Learner term
    |
    +-- Vendor-neutral concept
    +-- Common abbreviation
    +-- AWS name
    +-- Azure name
    +-- Google Cloud name
    +-- Glossary definition
```

## Learner experience

- Show prerequisites before a lesson begins.
- Show estimated depth or difficulty without pressure.
- Break long lessons into visible stages while preserving detail.
- Celebrate completion subtly.
- Save progress locally without requiring an account.
- Provide bookmarks, recently viewed lessons, and a continue-learning action when those features are implemented.
- Use encouraging, direct, human language.
- Avoid excessive gamification, streak anxiety, and visual noise.
- Make the next useful action obvious.
- Treat lesson-to-lesson navigation as base-path-sensitive behavior. A relative link to a sibling lesson must leave the current lesson directory, such as `../next-lesson/`, and a browser regression must click the forward and backward links under `/cloudservs/`.
- Generated heading chain icons must navigate to the section, copy the complete absolute URL, and provide visible and screen-reader confirmation with a restricted-browser fallback.

## Required lesson metadata

Each lesson includes structured metadata for at least:

- title
- summary
- domain
- difficulty
- prerequisites
- learning objectives
- providers covered
- workplace relevance
- estimated reading or study time
- mapping confidence where comparisons exist
- primary sources
- last verified date
- review status

Build-time validation must reject missing required metadata, invalid dates, broken internal references, and malformed lesson structures.

## Beginner-oriented code documentation

All human-authored code must be unusually well documented for a beginner audience.

- Add a file header explaining the file's role.
- Document every meaningful line when syntactically valid and readable.
- When line-by-line comments would harm readability, document every logical block immediately before it.
- Explain intent, inputs, outputs, data flow, assumptions, and important browser behavior.
- Explain why a library or pattern is used, not only what syntax does.
- Document component properties, state, events, accessibility behavior, and persistence.
- Comment non-obvious CSS calculations, theme tokens, responsive rules, and motion behavior.
- Keep examples correct and runnable.
- Do not add comments that merely repeat the code.
- Do not place comments where a format forbids them, such as JSON. Explain those files in nearby Markdown or adjacent configuration.
- Generated files, lockfiles, build output, third-party code, and vendored official assets are exempt.

Prefer small components, descriptive names, typed interfaces, and simple control flow. Documentation is not a reason to create convoluted code.
