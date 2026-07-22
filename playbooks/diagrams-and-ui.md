# Diagrams and User Interface Playbook

Use this playbook for diagrams, mind maps, ASCII, charts, icons, page layout, themes, responsive behavior, visual defects, and learner-facing interaction design.

## Diagram selection

Choose the visual that teaches the relationship best:

| Learning need                  | Preferred visual           |
| ------------------------------ | -------------------------- |
| Ordered steps                  | Flow or sequence diagram   |
| Categories and branches        | Mind map                   |
| Relationships and dependencies | Concept or service graph   |
| Network traffic                | Network or request path    |
| Responsibility                 | Boundary diagram           |
| State change                   | Lifecycle or state diagram |
| Recovery behavior              | Failure and recovery flow  |
| Service equivalence            | Provider comparison        |
| Architecture context           | Architecture diagram       |
| Choice under conditions        | Decision tree              |
| Before and after               | Side-by-side comparison    |
| Interview recall               | Compact mental model       |

Supported visual types include Markdown-formatted ASCII, mind maps, concept maps, flow diagrams, sequence diagrams, decision trees, request and data flows, responsibility boundaries, network paths, service maps, lifecycles, failure recovery, provider mappings, architectures, and interview mental models.

Every visual must teach something specific. Decorative visuals do not satisfy the diagram requirement.

## Visual workflow

1. Write the teaching point before drawing.
2. Select the smallest visual type that explains it clearly.
3. Give it a descriptive title and caption.
4. Add a text explanation or structured-list equivalent.
5. Avoid communicating meaning by color alone.
6. Verify keyboard access where interaction exists.
7. Test contrast in light and dark themes.
8. Respect `prefers-reduced-motion`.
9. Test narrow mobile screens and horizontal overflow.
10. Add zoom, pan, expansion, or a larger view when density requires it.
11. Test every supported zoom level.
12. Provide an accessible fallback rather than an empty frame after rendering failure.

## Interactive diagrams

- Dense Mermaid and Markmap visuals provide visible zoom out, zoom in, reset, and full-screen controls.
- Zoom scales labels, nodes, arrows, and spacing as one unit.
- Text never escapes or clips inside a node at any supported zoom level.
- Diagram controls use equal rendered height and centered SVG strokes, not font-dependent plus or minus glyphs.
- The viewport contains oversized diagrams and provides scrolling without allowing content to damage the surrounding page.
- Markmap HTML labels use theme variables with readable contrast in both themes.
- Expensive libraries load only on pages that need them.

### Markmap workflow

1. Create a clear hierarchy with one root idea.
2. Keep branch labels concise while preserving nearby detailed text.
3. Provide zoom and pan controls.
4. Support keyboard access to controls.
5. Add a structured text outline below the map.
6. Test light, dark, mobile, reduced-motion, and default-zoom readability.
7. Avoid using a mind map when ordered steps require a flow diagram.

## ASCII diagrams and copying

- Use JetBrains Mono or another suitable monospace font.
- Preserve left alignment inside the drawing.
- Center the complete drawing block within its card.
- Allow horizontal scrolling when necessary.
- Provide a copy control where useful.
- Clipboard actions work on initial load and after client-side navigation.
- Report success or failure visibly and to assistive technology.
- Include a restricted-browser fallback.
- Copy only after learner activation and never read unrelated clipboard contents.

## Interface and visual design

- Use a distinctive custom `cloudservs` visual system rather than an unmodified documentation theme.
- Use spacious layouts, strong hierarchy, readable typography, calm surfaces, consistent diagram cards, and comfortable line lengths.
- Bundle Atkinson Hyperlegible for lesson text, Manrope for headings, and JetBrains Mono for code and ASCII.
- Provide polished light and dark themes.
- Respect the system theme initially and persist explicit choices.
- Maintain visible focus and large touch targets.
- Respect reduced motion, forced colors, browser zoom, and keyboard-only use.
- Avoid layout shifts, excessive animation, and unnecessary client JavaScript.
- Target WCAG 2.2 AA with manual review in addition to automated checks.

## Shared geometry invariants

- Cards in the same collection have consistent width, height, and internal spacing.
- Toolkit cards in separate rows use the same explicit rendered height.
- Provider comparison cards share identical top and bottom alignment.
- Diagram controls share one baseline and equal height.
- Diagram content remains bounded during zoom.
- Desktop readers can move the contents pane left or right and resize it with pointer or keyboard.
- Contents-pane position and width persist locally.
- Mobile contents remain compact.

Fix repeated defects in the shared component or design token, then add a browser regression test. Do not patch each page independently.

## Logo and icons

- Use the original vendor-neutral `cloudservs` SVG logo combining connected cloud providers with learning or an open-book idea.
- Ensure the logo works for favicon, navigation, social card, light theme, and dark theme.
- Use official AWS, Azure, and Google Cloud architecture icons only under their published guidelines.
- Never redraw, recolor, distort, or invent trademarked provider service logos.
- Use a consistent custom family for vendor-neutral compute, networking, storage, identity, databases, security, and observability concepts.
- Pair unfamiliar icons with text labels.
- Record source, license, and provider guideline references when adding official assets.
