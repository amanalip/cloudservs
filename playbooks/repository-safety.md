# Repository and Shell Safety Playbook

Use this playbook for Git work, filesystem changes, shell commands with special characters, dependency installation, secrets review, accidental files, deletion, or recovery.

## Repository hygiene

- Preserve user changes and avoid unrelated rewrites.
- Inspect the working tree before and after work.
- Do not commit generated output unless deployment explicitly requires it.
- Keep dependencies justified and documented.
- Keep assets optimized and attribution recorded.
- Never place secrets or credentials in client code, lessons, examples, or history.
- Remember that GitHub Pages code and browser-delivered data are public.
- Use non-interactive Git commands where possible.
- Do not use destructive commands such as `git reset --hard` or broad recursive deletion without explicit authorization.

## Shell safety

- Prefer `rg` and `rg --files` for text and file searches.
- Keep commands small and separately testable.
- Quote regular expressions and special characters so `<`, `>`, `|`, brackets, wildcards, and substitutions reach the intended program.
- Avoid dense expressions with fragile nested quoting.
- Do not chain commands merely to add decorative output separators.
- Avoid unresolved variables, broad globs, or command substitutions when identifying destructive targets.
- Never repurpose `HOME`, `home`, or `CODEX_HOME` as task variables.

## After a command error

A failed command can still mutate the filesystem. After a quoting, redirection, parse, or path error:

1. Stop additional write operations.
2. Run `git status --short` immediately.
3. Inspect unusual paths with `stat`, `file`, `git ls-files`, and `git log -- <path>`.
4. Compare timestamps with the failed command.
5. Explain the evidence to the owner.
6. Do not delete until authorization is clear.
7. Delete only the exact confirmed path.
8. Validate the repository and record the reusable lesson.

```text
Command error
     |
     v
Inspect Git status
     |
     +--> clean: continue carefully
     |
     +--> unexpected path: inspect, explain, authorize, remove, validate
```

The July 22, 2026 `]+` incident is the reference example: malformed regular-expression quoting allowed the shell to interpret output redirection, creating a zero-byte tracked file. The file was inspected and removed only after owner authorization.

## File editing and deletion

- Use `apply_patch` for human-authored file edits and exact-path deletion.
- Preserve dirty-worktree changes unless they are part of the approved task.
- Resolve exact targets with read-only checks before deletion.
- Never target a home directory, workspace root, `/`, or another broad directory recursively.
- Prefer recoverable operations when practical.
- After material deletion, report what was removed and whether recovery is possible.

## Git interpretation

- A merge commit is not automatically a mistake. Inspect its parents and resulting tree.
- Compare local and remote commit graphs before explaining divergence.
- Do not overwrite remote or local work to create a visually simple history.
- Confirm staging, commits, pushes, and pull requests with actual Git evidence before reporting success.

## Dependency and public-code safety

- Review package purpose, compatibility, maintenance, bundle impact, license, privacy, and security before installation.
- Pin exact versions in the lockfile.
- Do not force incompatible peer dependencies merely to include a feature.
- Treat every client-side secret as public and compromised.
- Run privacy and production-build checks after dependency or configuration changes.

Repository-only cleanup does not create a changelog release unless it also resolves a verified learner-facing website bug.
