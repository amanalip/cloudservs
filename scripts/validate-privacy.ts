/**
 * This build-time privacy gate rejects common data-collection mechanisms before deployment.
 * It checks authored browser code, declared packages, and the generated static HTML.
 * A manual review still matters because no keyword scan can understand every future library.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

/** Browser-executable file types are reviewed without scanning educational Markdown prose. */
const executableExtensions = new Set(['.astro', '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx']);

/** These APIs or vendor markers require an explicit privacy review and are currently forbidden. */
const forbiddenSourcePatterns = [
  { label: 'outbound fetch request', pattern: /\bfetch\s*\(/ },
  { label: 'XMLHttpRequest', pattern: /\bXMLHttpRequest\b/ },
  { label: 'Beacon API', pattern: /\bsendBeacon\b/ },
  { label: 'WebSocket', pattern: /\bWebSocket\b/ },
  { label: 'EventSource', pattern: /\bEventSource\b/ },
  { label: 'browser cookie access', pattern: /\bdocument\.cookie\b|\bcookieStore\b/ },
  {
    label: 'known tracking or analytics vendor',
    pattern:
      /google-analytics|googletagmanager|gtag\s*\(|mixpanel|posthog|plausible|matomo|hotjar|clarity\.ms|fullstory|amplitude|segment\.com/i,
  },
] as const;

/** Analytics packages are forbidden even if a package has not yet been imported by a page. */
const forbiddenPackagePattern =
  /(^|[-/@])(analytics|telemetry|tracking|posthog|plausible|matomo|mixpanel|hotjar|fullstory|amplitude|segment|sentry)([-/@]|$)/i;

/** Read source files recursively so new components cannot silently bypass the audit. */
function listExecutableFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory()
      ? listExecutableFiles(path)
      : executableExtensions.has(extname(path))
        ? [path]
        : [];
  });
}

/** Generated HTML receives a separate scan for remotely hosted executable and media resources. */
function listHtmlFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory()
      ? listHtmlFiles(path)
      : extname(path) === '.html'
        ? [path]
        : [];
  });
}

const errors: string[] = [];

/** Inspect authored runtime code for network and tracking capabilities. */
for (const filePath of listExecutableFiles('src')) {
  const source = readFileSync(filePath, 'utf8');
  for (const { label, pattern } of forbiddenSourcePatterns) {
    if (pattern.test(source)) errors.push(`${relative('.', filePath)} contains ${label}`);
  }
}

/** Inspect direct dependencies because build tools may contain their own optional telemetry. */
const packageManifest = JSON.parse(readFileSync('package.json', 'utf8')) as {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};
const declaredPackages = {
  ...packageManifest.dependencies,
  ...packageManifest.devDependencies,
};
for (const packageName of Object.keys(declaredPackages)) {
  if (forbiddenPackagePattern.test(packageName)) {
    errors.push(`package.json declares forbidden package ${packageName}`);
  }
}

/** Inspect deployable pages for remote executable resources and known tracking markers. */
for (const filePath of listHtmlFiles('dist')) {
  const html = readFileSync(filePath, 'utf8');
  const remoteEmbeddedResource =
    /<(?:script|iframe|img|audio|video|source)\b[^>]+\bsrc=["']https?:\/\/|<object\b[^>]+\bdata=["']https?:\/\//i;
  const remoteLoadingLink = [...html.matchAll(/<link\b[^>]*>/gi)].some(
    ([tag]) =>
      /\brel=["'][^"']*(?:stylesheet|preload|modulepreload|icon)[^"']*["']/i.test(tag) &&
      /\bhref=["']https?:\/\//i.test(tag),
  );
  if (remoteEmbeddedResource.test(html) || remoteLoadingLink) {
    errors.push(`${relative('.', filePath)} automatically loads a remote resource`);
  }
  for (const { label, pattern } of forbiddenSourcePatterns.slice(5)) {
    if (pattern.test(html)) errors.push(`${relative('.', filePath)} contains ${label}`);
  }
}

if (errors.length > 0) {
  console.error(`Privacy validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    'Privacy validation passed: no collection API, analytics dependency, or remote embedded resource was found.',
  );
}
