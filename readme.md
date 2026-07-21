# cloudservs

> Learn cloud concepts once, then understand how AWS, Microsoft Azure, and Google Cloud implement them.

```text
                         cloudservs
                              |
               Learn the vendor-neutral concept
                              |
          +-------------------+-------------------+
          |                   |                   |
          v                   v                   v
         AWS                Azure                GCP
          |                   |                   |
          +-------------------+-------------------+
                              |
                    Compare the differences
                              |
                              v
               Apply the idea in real systems
```

`cloudservs` is a visual learning platform for beginners who need to understand cloud computing across the three major providers. It is designed for students, recent graduates, career changers, and early-career professionals preparing for cloud-related jobs.

The project is built as a static website for deployment through GitHub Pages.

## Project status

Development is active. The first verified learning chunk is implemented and includes:

- A custom responsive Astro and Starlight interface
- Persisted light, dark, and system theme choices
- Static Pagefind full-text search across rendered lesson text
- One ordered nine-module curriculum model
- Local lesson progress and an encouraging completion control
- Accessible knowledge checks with answer explanations
- Reusable ASCII, Mermaid, Markmap, and provider-comparison components
- Whole-diagram zoom, reset, scrolling, and native full-screen viewing controls
- A working Start now curriculum action that opens the first available lesson
- Locally bundled Atkinson Hyperlegible, Manrope, and JetBrains Mono typography
- Reliable ASCII copying with a restricted-browser fallback
- Centered ASCII drawings and equal-sized learning cards
- Equal-height provider comparison cards with aligned edges
- A persisted desktop contents pane that can move left or right and resize like a split view
- Higher-contrast, larger Markmap labels in light and dark themes
- Two detailed, source-backed foundation lessons
- GitHub Pages base-path configuration and an automated deployment workflow

The first complete lessons are **What is cloud computing?** and **Shared responsibility**. Their technical claims were checked against current NIST, AWS, Microsoft, and Google primary sources on July 21, 2026.

Core repository documents:

- `AGENTS.md` defines the project's non-negotiable requirements and engineering standards.
- `SKILLS.md` defines repeatable workflows for content, diagrams, fact-checking, search, accessibility, testing, and deployment.
- `readme.md` describes the product vision, learning experience, architecture, curriculum, and delivery plan.

## Run the website locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321/cloudservs/`. The repository base path is part of the local URL so navigation behaves like the GitHub Pages deployment.

Before publishing a chunk, run:

```bash
npm test
npm run build
npm run format:check
```

The production build generates static HTML, Pagefind's browser-side search index, a sitemap, and the GitHub Pages artifact in `dist/`.

## Current source structure

```text
cloudservs/
  .github/workflows/static.yml   GitHub Pages build and deployment
  public/                        Static favicon and public assets
  src/assets/                    Brand artwork
  src/components/                Learning and diagram components
  src/content/docs/              Curriculum pages and lessons
  src/data/                      Ordered curriculum data and tests
  src/stores/                    Persisted learner progress
  src/styles/                    Custom visual system
  astro.config.mjs              Site, base path, navigation, and theme setup
  package.json                  Exact development and runtime dependencies
```

## The problem

A beginner entering the workforce is often expected to recognize services from AWS, Azure, and Google Cloud. This is difficult because the learner faces two problems at the same time:

1. They must understand cloud concepts such as compute, storage, networking, identity, databases, observability, and reliability.
2. They must learn three different product vocabularies and understand where the services behave differently.

Learning each provider separately often produces repetition and fragmented knowledge.

```text
Traditional approach

AWS course                 Azure course               GCP course
    |                           |                          |
    v                           v                          v
Learn compute again        Learn compute again       Learn compute again
Learn storage again        Learn storage again       Learn storage again
Learn networking again     Learn networking again    Learn networking again
    |                           |                          |
    +---------------------------+--------------------------+
                                |
                                v
                    Repetition and terminology confusion
```

## The cloudservs approach

`cloudservs` teaches the underlying concept first. It then shows how each provider expresses that concept, where the products are similar, and where they are meaningfully different.

```text
Concept-first approach

                    Learn one cloud concept deeply
                               |
              +----------------+----------------+
              |                |                |
              v                v                v
        AWS expression   Azure expression   GCP expression
              |                |                |
              +----------------+----------------+
                               |
                               v
              Compare behavior, scope, and tradeoffs
                               |
                               v
                   Practice a realistic scenario
```

The guiding principle is:

> Teach the idea once. Compare the providers honestly. Apply the knowledge visually.

## Who this is for

- Beginners learning cloud computing for the first time
- Students and recent graduates preparing to enter the workforce
- Career changers moving into cloud, DevOps, security, data, or software roles
- Professionals who know one provider and need to translate their knowledge to another
- Learners preparing for interviews or entry-level cloud responsibilities
- Anyone who benefits from diagrams, analogies, structured comparisons, and mental models

## Learning philosophy

The website will be beginner-friendly without cutting technical depth. Long explanations will be organized carefully instead of shortened until they lose value.

Every substantial lesson will answer:

- What is this concept?
- Why does it exist?
- What problem does it solve?
- What does it resemble in day-to-day life?
- Where does that analogy stop being accurate?
- How does it work technically?
- How does AWS implement it?
- How does Azure implement it?
- How does Google Cloud implement it?
- Are the provider services direct equivalents?
- How does the concept appear in a real architecture?
- What mistakes do beginners make?
- How could this appear at work or in an interview?
- What should the learner remember?

## Standard lesson journey

```mermaid
flowchart TD
    A[Learning objectives] --> B[Plain-language concept]
    B --> C[Why the concept exists]
    C --> D[Day-to-day analogy]
    D --> E[Analogy boundary]
    E --> F[Visual mental model]
    F --> G[Technical explanation]
    G --> H[AWS implementation]
    G --> I[Azure implementation]
    G --> J[Google Cloud implementation]
    H --> K[Provider comparison]
    I --> K
    J --> K
    K --> L[Real architecture]
    L --> M[Common mistakes]
    M --> N[Workplace and interview context]
    N --> O[Recap and glossary]
    O --> P[Flashcards and quiz]
    P --> Q[Sources and last verified date]
```

## A simple lesson example

A beginner learning load balancing might first see a restaurant analogy:

```text
Customers enter a busy restaurant
              |
              v
        Host at the entrance
       /          |          \
      v           v           v
 Server A      Server B      Server C

The host distributes customers so that one server is not overwhelmed.
```

The technical model follows:

```text
Client requests
      |
      v
Load balancer
   |     |     |
   v     v     v
App 1  App 2  App 3
   \     |     /
    \    |    /
     v   v   v
Shared data services
```

The lesson would then explain routing algorithms, health checks, Layer 4 and Layer 7 behavior, session persistence, scaling, failure handling, and provider implementations. The analogy introduces the idea, but it does not replace the technical explanation.

## Diagram-first learning

The website will use many purposeful visuals throughout the curriculum:

- Markdown-formatted ASCII diagrams
- Interactive mind maps
- Concept maps
- Architecture diagrams
- Flow diagrams
- Sequence diagrams
- Decision trees
- Request and data-flow diagrams
- Network paths
- Responsibility boundaries
- Service relationship graphs
- Failure and recovery flows
- Lifecycle diagrams
- Before-and-after comparisons
- Side-by-side provider mappings
- Interview mental models

```mermaid
mindmap
  root((Cloud learning))
    Understand
      Concepts
      Vocabulary
      Responsibilities
    Compare
      AWS
      Azure
      Google Cloud
    Visualize
      Mind maps
      Flows
      Architectures
      Mental models
    Practice
      Quizzes
      Scenarios
      Troubleshooting
      Interviews
    Verify
      Primary sources
      Mapping confidence
      Review dates
```

Visuals will always include a title, explanation, and accessible text equivalent. Meaning will never depend on color alone. Interactive visuals will support keyboard use, readable focus states, reduced motion, and mobile layouts.

## Provider mapping confidence

Similar service categories do not guarantee identical products. Every comparison will identify the confidence of the mapping.

```text
Provider service comparison
            |
            v
    Is the primary purpose similar?
          /                 \
        No                   Yes
        |                     |
        v                     v
No direct equivalent    Is behavior closely comparable?
                              /              \
                            Yes               No
                             |                 |
                             v                 v
                     Direct mapping     Approximate mapping
                                              |
                                              v
                                 Explain important differences
```

- **Direct mapping:** The services have closely comparable primary purposes and behavior.
- **Approximate mapping:** The services solve a similar problem but have meaningful differences.
- **No direct equivalent:** The provider uses a different service, combination of services, or architecture.

## Planned experience

### Guided learning

- Visible prerequisites
- Beginner, intermediate, and advanced depth indicators
- One clear, ordered curriculum
- Clear lesson objectives
- Continue-learning entry point
- Locally saved progress
- Recently viewed lessons
- Bookmarks
- Subtle completion feedback

### Active learning

- Knowledge checks inside lessons
- Flashcards
- Full quizzes
- Scenario-based questions
- Architecture decision exercises
- Troubleshooting exercises
- Interview questions
- Explanations for correct and incorrect answers
- Hints before answer reveals where appropriate

### Reference tools

- Searchable cloud glossary
- AWS, Azure, and Google Cloud terminology translator
- Side-by-side service comparisons
- Frequently confused concepts
- Architecture pattern library
- Printable revision sheets
- Source links and verification dates

## Search

Search is a core feature and will use Pagefind, which works with static GitHub Pages output.

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
 Reviewed synonym mapping
          |
          v
    Static Pagefind index
          |
          v
Lessons, sections, glossary terms, and comparisons
          |
          v
Provider, curriculum module, topic, and difficulty filters
```

Planned search behavior:

- Full-text search across lesson content
- Section-level results for long lessons
- Highlighted matches and useful excerpts
- Provider, curriculum-module, domain, and difficulty filters
- Support for abbreviations and common synonyms
- Cross-provider terminology discovery
- Keyboard-friendly search dialog
- Accessible focus and announcement behavior
- Helpful empty states
- Automatic indexing during deployment
- No backend or hosted search service required

## User interface and visual design

The interface will be calm, polished, responsive, and optimized for long-form learning.

### Visual principles

- Comfortable reading width
- Clear content hierarchy
- Generous spacing
- Consistent lesson and diagram cards
- Provider identification through text, icon, and color
- Large touch targets
- Strong visible focus states
- Minimal layout shift
- Purposeful motion only
- No visually noisy or pressure-based gamification

### Theme behavior

```text
First visit
    |
    v
Read operating system theme preference
    |
    +-- Light preference --> Use light theme
    |
    +-- Dark preference ---> Use dark theme

Learner uses theme toggle
    |
    v
Save explicit choice locally
    |
    v
Restore it on later visits
```

The site will support light mode, dark mode, system-preference detection, persisted learner choice, accessible contrast, theme-aware diagrams, reduced motion, keyboard navigation, and responsive layouts.

## Planned JavaScript and content stack

The site will use a static-first architecture. Interactive libraries will load only where they improve the learning experience.

| Technology             | Planned responsibility                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| Astro                  | Static site generation and GitHub Pages output                                            |
| Starlight              | Accessible curriculum layout, navigation, search integration, and documentation structure |
| Markdown and MDX       | Lessons with reusable interactive components                                              |
| Preact                 | Quizzes, flashcards, comparison tools, and focused interactions                           |
| Pagefind               | Static full-text search and filtering                                                     |
| Mermaid                | Flow, sequence, state, timeline, and architecture diagrams                                |
| Markmap                | Interactive Markdown mind maps                                                            |
| Cytoscape.js           | Service relationship and prerequisite graphs                                              |
| Lucide                 | Consistent generic interface icons                                                        |
| Nano Stores            | Small shared learning-state stores                                                        |
| Nano Stores Persistent | Local progress, bookmarks, and preferences                                                |
| Vite PWA               | Future offline access after an adapter supports the installed Astro version               |
| Chart.js               | Selective quantitative visuals with table alternatives                                    |
| Driver.js              | Optional first-visit guidance                                                             |
| Expressive Code        | Code examples, command blocks, and styled ASCII visuals                                   |
| TypeScript             | Typed interactive components and content utilities                                        |
| Vitest                 | Unit and component testing                                                                |
| Playwright             | Browser, interaction, responsive, and deployment testing                                  |
| axe-core               | Automated accessibility checks                                                            |

Libraries will be used generously when they add learning value. Overlapping dependencies will be avoided. Heavy libraries will be loaded only on pages that need them so a text lesson does not pay the performance cost of every visualization tool.

## Planned system architecture

```mermaid
flowchart LR
    A[Markdown and MDX lessons] --> B[Astro content validation]
    C[Provider source metadata] --> B
    D[Reusable lesson components] --> E[Astro and Starlight build]
    B --> E
    F[Preact learning islands] --> E
    G[Mermaid, Markmap, and Cytoscape visuals] --> E
    E --> H[Static HTML, CSS, and scoped JavaScript]
    H --> I[Pagefind index]
    I --> K[GitHub Pages artifact]
    K --> L[GitHub Pages]
```

Offline installation is intentionally deferred. The evaluated Vite PWA Astro adapter does not declare compatibility with Astro 7, which is required by the current Starlight release. The project will not force an incompatible peer dependency. PWA support will be reconsidered when the adapter declares compatibility and its GitHub Pages base-path behavior can be verified.

```text
Most lesson content              Interactive learning component
       |                                      |
       v                                      v
Static HTML and CSS                    Focused Preact island
       |                                      |
       +-- Fast first display                 +-- Quiz
       +-- Search readable                    +-- Flashcard
       +-- Works without a server             +-- Mind map
       +-- Minimal JavaScript                 +-- Service graph
                                              +-- Progress control
```

## Branding and icons

`cloudservs` will have an original, vendor-neutral SVG logo.

The proposed visual idea combines three connected provider nodes, a cloud or layered shape, an open-book reference, a lowercase `cloudservs` wordmark, and theme-aware colors.

```text
          Provider
             o
            / \
           /   \
          o-----o
     Provider  Provider
          \     /
           \   /
        [ open book ]
         cloudservs
```

Icon rules:

- Use official provider architecture icons where published guidelines permit.
- Do not invent altered versions of provider trademarks.
- Create original concept icons for compute, storage, networking, identity, security, data, reliability, and other vendor-neutral topics.
- Use Lucide for common interface actions.
- Pair unfamiliar icons with text labels.
- Optimize SVG assets and test them in both themes.

## Fact-checking and source policy

Accuracy is a release requirement.

```mermaid
flowchart TD
    A[Draft a technical claim] --> B[Find a current primary source]
    B --> C{Source fully supports the claim?}
    C -->|Yes| D[Record source and verification date]
    C -->|Partly| E[Qualify the claim and explain conditions]
    C -->|No| F[Revise or remove the claim]
    D --> G[Compare provider behavior]
    E --> G
    G --> H{Mapping confidence}
    H --> I[Direct]
    H --> J[Approximate with differences]
    H --> K[No direct equivalent]
    I --> L[Editorial and technical review]
    J --> L
    K --> L
```

Primary sources will include official AWS documentation, Microsoft Learn and Azure documentation, official Google Cloud documentation, and original documentation for vendor-neutral projects and standards.

Every technical lesson will include source links and a last-verified date. Time-sensitive information such as prices, quotas, availability, product names, and certification details will receive additional review. Search-result snippets, unsourced comparison articles, and assumptions will not be treated as authoritative evidence.

## Curriculum

The curriculum is intended to be broad enough for serious job preparation. It will grow in reviewed chunks rather than through shallow placeholder pages.

| Area                             | Topics                                                                                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Computing and cloud foundations  | Service models, deployment models, control plane, data plane, elasticity, scalability, availability, durability, reliability, economics, and shared responsibility |
| Identity and access              | Users, groups, roles, policies, service identities, authentication, authorization, least privilege, federation, temporary credentials, and workload identity       |
| Global infrastructure            | Regions, zones, edge locations, data residency, latency, multi-zone design, multi-region design, and regional failures                                             |
| Compute                          | Virtualization, virtual machines, images, sizing, autoscaling, placement, spot capacity, dedicated hosts, metadata, patching, and batch computing                  |
| Containers                       | Images, registries, runtimes, networking, storage, configuration, secrets, security, orchestration, and use-case selection                                         |
| Kubernetes                       | Clusters, nodes, pods, deployments, services, namespaces, ingress, storage, health checks, scheduling, scaling, networking, and security                           |
| Serverless                       | Functions, triggers, event sources, cold starts, statelessness, concurrency, retries, idempotency, orchestration, cost, and tradeoffs                              |
| Storage                          | Object, block, and file storage, classes, tiers, replication, versioning, lifecycle, encryption, temporary access, backup, and archival                            |
| Databases                        | Relational, document, key-value, graph, time-series, and wide-column models, transactions, indexes, replication, backups, scaling, and migration                   |
| Networking fundamentals          | IP, CIDR, IPv4, IPv6, ports, TCP, UDP, DNS, routing, NAT, firewalls, proxies, VPNs, packet flow, and troubleshooting                                               |
| Cloud networking                 | Virtual networks, subnets, routes, gateways, firewall rules, private endpoints, peering, transit, hybrid connectivity, load balancing, and flow logs               |
| Application delivery             | Domains, DNS, TLS, reverse proxies, Layer 4, Layer 7, health checks, CDNs, web application firewalls, API gateways, caching, and global traffic                    |
| Messaging and integration        | Queues, publish and subscribe, event buses, streams, consumer groups, dead-letter queues, ordering, delivery guarantees, retries, and workflows                    |
| Security                         | Defense in depth, zero trust, encryption, keys, secrets, certificates, vulnerability scanning, threat detection, audit logs, data protection, and incidents        |
| Observability and operations     | Metrics, logs, traces, dashboards, alerts, performance monitoring, SLI, SLO, SLA, error budgets, on-call work, root cause analysis, and runbooks                   |
| Reliability and recovery         | Fault tolerance, redundancy, RTO, RPO, backups, restore tests, active-active, active-passive, retries, backoff, circuit breakers, and graceful degradation         |
| DevOps and delivery              | Source control, branching, CI/CD, artifacts, environments, configuration, feature flags, release strategies, rollbacks, GitOps, and supply-chain security          |
| Infrastructure as code           | Declarative configuration, state, modules, variables, dependencies, drift, planning, secrets, Terraform, native tools, testing, and safe deployment                |
| Cost management and FinOps       | Pricing models, compute, storage, network, egress, commitments, spot capacity, rightsizing, budgets, allocation, forecasting, and unit economics                   |
| Governance and organization      | Accounts, subscriptions, projects, folders, resource hierarchy, naming, tags, policies, landing zones, centralized services, and compliance                        |
| Data engineering and analytics   | Lakes, warehouses, lakehouses, ETL, ELT, batch, streaming, pipelines, ingestion, catalogs, governance, query engines, and business intelligence                    |
| AI and machine learning          | Training, inference, models, datasets, endpoints, managed AI, generative AI, embeddings, vector search, retrieval, monitoring, privacy, and cost                   |
| Migration and modernization      | Assessment, dependency discovery, migration strategies, database migration, transfer, hybrid operation, cutover, rollback, and optimization                        |
| Architecture patterns            | Three-tier, microservices, events, serverless, static sites, APIs, batch, streams, SaaS, caching, saga, CQRS, and multi-region systems                             |
| Hands-on job skills              | Consoles, command-line tools, logs, permissions, network diagnosis, deployments, databases, monitoring, backups, cost estimation, and incident response            |
| Interview and career preparation | Concept questions, comparisons, troubleshooting, architecture scenarios, security, cost, behavioral questions, whiteboards, resumes, and portfolios                |

## One ordered curriculum

`cloudservs` will use one curriculum, one lesson sequence, and one progress model. It will not duplicate lessons for different professions or maintain separate role-based paths.

Workplace relevance can still be explained inside a lesson. For example, an identity lesson may describe why administrators, developers, security professionals, and architects encounter the topic. That context does not create a separate course.

```text
Start
  |
  v
Module 1: Cloud and computing foundations
  |
  v
Module 2: Identity, infrastructure, compute, storage, and databases
  |
  v
Module 3: Networking and application delivery
  |
  v
Module 4: Containers, Kubernetes, serverless, and messaging
  |
  v
Module 5: Security, observability, reliability, and operations
  |
  v
Module 6: DevOps, infrastructure as code, cost, and governance
  |
  v
Module 7: Data, analytics, AI, migration, and modernization
  |
  v
Module 8: Architecture patterns and integrated scenarios
  |
  v
Module 9: Hands-on job skills and interview preparation
  |
  v
Curriculum completion
```

Learners can search, revisit, or jump to a lesson when needed, but the site will always make the recommended curriculum order and prerequisites clear.

## Code documentation standard

The codebase is intended to be readable by beginners.

- Every meaningful human-authored line will be documented when the language and readability permit it.
- When line-by-line comments are impractical, every logical block will receive an adjacent explanation.
- File headers will explain purpose and data flow.
- Components will document inputs, state, events, persistence, and accessibility behavior.
- CSS will document important theme, responsive, calculation, and motion decisions.
- Comments will explain intent and reasoning, not merely repeat syntax.
- Formats that do not allow comments, such as JSON, will be documented in nearby Markdown or adjacent source configuration.
- Generated files, lockfiles, third-party source, official vendor assets, and build output are exempt.

Clear naming and small components remain the first line of documentation.

## Accessibility target

The project will target WCAG 2.2 AA and combine automated and manual testing.

```text
Accessibility review
       |
       +-- Semantic HTML
       +-- Keyboard navigation
       +-- Visible focus
       +-- Screen-reader names and announcements
       +-- Color contrast
       +-- Text zoom and reflow
       +-- Reduced motion
       +-- Touch target size
       +-- Diagram alternatives
       +-- Light and dark themes
       |
       v
Automated checks + manual review + browser testing
```

## Incremental delivery plan

Quality will be protected by delivering complete chunks.

### Chunk 1: Platform foundation

- Astro and Starlight project structure
- Custom `cloudservs` design system
- Original logo, favicon, and concept-icon foundation
- Responsive navigation
- Light and dark themes
- Content schema and validation
- Pagefind search
- Progress and bookmark storage
- Reusable lesson and diagram components
- GitHub Pages workflow
- Test and accessibility foundation

### Chunk 2: Pilot curriculum

- Cloud fundamentals
- Global infrastructure
- Shared responsibility
- Compute
- Storage
- Networking
- Identity and access management

Every pilot lesson will establish the full explanation, diagram, comparison, sourcing, review, and quiz standard.

### Chunk 3: Core technical curriculum

- Databases
- Containers
- Kubernetes
- Serverless
- Load balancing and DNS
- Messaging
- Observability
- Security
- Scaling, reliability, and cost

### Chunk 4: Curriculum completion and integration

- Complete the remaining detailed curriculum areas
- Connect concepts through cross-topic architecture scenarios
- Add prerequisite and previous and next lesson relationships
- Strengthen curriculum progress and continue-learning behavior
- Review the complete curriculum for gaps and unnecessary repetition

### Chunk 5: Job preparation

- Interview questions
- Architecture scenarios
- Troubleshooting exercises
- Flashcards
- Revision tools
- Portfolio project guidance

### Chunk 6: Advanced curriculum

- Governance
- Migration
- Disaster recovery
- Infrastructure as code
- Data engineering
- AI services
- Multi-cloud architecture patterns
- Ongoing content-review automation

## Quality gates

A chunk is complete only after:

- Content metadata validation
- Primary-source fact-checking
- Mapping-confidence review
- Editorial review
- Diagram review in both themes
- Mobile and desktop visual review
- Formatting, linting, and type checking
- Unit and component tests
- Production build
- Search indexing tests
- Playwright browser tests
- axe-core accessibility checks
- Manual keyboard review
- Reduced-motion review
- Internal and external link checks
- GitHub Pages base-path testing
- Copyright verification
- Em dash scan
- Documentation update

## GitHub Pages deployment model

```mermaid
sequenceDiagram
    participant Author
    participant GitHub
    participant Actions
    participant Tests
    participant Pages

    Author->>GitHub: Push reviewed source and lessons
    GitHub->>Actions: Start static build workflow
    Actions->>Tests: Run validation and quality gates
    Tests-->>Actions: Report results
    alt Checks pass
        Actions->>Actions: Build Astro and Pagefind output
        Actions->>Pages: Deploy static artifact
        Pages-->>Author: Publish cloudservs
    else Checks fail
        Actions-->>Author: Stop deployment and report failures
    end
```

The deployed site will not require a private server, database, or server-side runtime. Learning progress will initially remain in the learner's browser.

## Copyright

© 2026 Aman Ali Pogaku
