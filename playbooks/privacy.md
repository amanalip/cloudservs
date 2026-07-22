# Privacy and Zero-Analytics Playbook

Use this playbook for every dependency, browser API, storage change, embedded resource, search change, hosting change, telemetry question, or privacy claim.

## Non-negotiable policy

`cloudservs` must not collect, transmit, sell, profile, or analyze learner data.

- No visitor analytics, telemetry, advertising pixels, heatmaps, session replay, fingerprinting, cross-site tracking, visitor identifiers, marketing tags, or transmitting error-reporting services.
- No accounts, profiles, authentication, comments, contact forms, mailing lists, or server-submitted quizzes under the current policy.
- No application cookie reading or writing.
- Never transmit search terms, lesson progress, bookmarks, theme choices, contents-pane preferences, quiz answers, clipboard contents, or accessibility preferences.
- Keep Pagefind search inside the browser.
- Bundle fonts, icons, scripts, styles, and learning assets locally.
- Do not add remote executable or embedded resources.
- Allow local storage only for documented, non-sensitive learner benefit that never syncs to a server.
- Clipboard controls write only after learner activation, never read unrelated clipboard contents, and never transmit clipboard data.

## Current local state

| Key                            | Storage | Purpose                         | Transmitted by cloudservs? |
| ------------------------------ | ------- | ------------------------------- | -------------------------- |
| `starlight-theme`              | Local   | Light, dark, or automatic theme | No                         |
| `cloudservs:completed-lessons` | Local   | Lesson slugs marked complete    | No                         |
| `cloudservs:toc-width`         | Local   | Contents-pane width             | No                         |
| `cloudservs:toc-side`          | Local   | Contents-pane side              | No                         |
| `sl-sidebar-state`             | Session | Temporary sidebar state         | No                         |

Learners can remove these values by clearing site data. They do not create accounts or synchronize between devices.

## Hosting boundary

```text
Learner browser
      |
      +--> local preferences remain in this browser
      +--> Pagefind search runs in this browser
      |
      +--> HTTPS page request to GitHub Pages
                         |
                         v
              GitHub security logging boundary

No cloudservs analytics server, learner database, or owner dashboard exists.
```

GitHub states that Pages logs visitor IP addresses for security. That is GitHub infrastructure processing, not analytics implemented or received by cloudservs. External links lead to sites with their own privacy practices.

## Astro telemetry

Astro includes a transitive CLI telemetry package, but it is not deployed visitor analytics. Every project Astro command must run through `scripts/run-astro-private.ts`, which sets `ASTRO_TELEMETRY_DISABLED=1` without changing machine-wide settings. GitHub Actions sets the same variable at job level.

## Audit workflow

1. Search authored browser code for `fetch`, `XMLHttpRequest`, `sendBeacon`, WebSocket, EventSource, cookie APIs, remote resources, forms, and analytics markers.
2. Inspect direct and transitive dependencies for analytics, telemetry, error reporting, replay, and advertising.
3. Distinguish build tooling from code shipped to learners.
4. Inventory every `localStorage` and `sessionStorage` key, value, purpose, lifetime, and transmission path.
5. Verify clipboard behavior.
6. Build and scan generated HTML for remote scripts, frames, styles, media, tracking markers, forms, and cookies.
7. Use Playwright to record requests from representative pages and reject third-party origins.
8. Verify Pagefind uses same-origin static assets and does not send query text to a search service.
9. Verify Astro telemetry opt-out locally and in CI.
10. Document findings, limitations, hosting boundaries, and next review triggers.

## Required commands

```text
npm run build
npm run privacy:validate
npm run test:e2e
npm run docs:validate
```

## Release blockers

Stop when any of these appear without an explicit owner-approved policy change:

- learner analytics or telemetry
- tracking, advertising, fingerprinting, heatmaps, or replay
- application cookies
- learner searches, answers, progress, preferences, or clipboard data sent off-device
- third-party scripts, frames, media, styles, or unexplained requests
- accounts, forms, profiles, or a learner-information backend
- CLI telemetry without an explicit opt-out

Automated scans support but never replace manual code and browser-network review.
