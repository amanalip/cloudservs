/**
 * This validator protects the compact guidance architecture from silent information loss.
 * It checks file presence, size limits, routing, critical rules, traceability, links, and prose style.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

/**
 * Root guides use byte ceilings because Codex documents project-instruction loading in bytes.
 * The limits are conservative repository policies, not guarantees of model recall.
 */
const rootGuides = [
  { path: 'AGENTS.md', maximumBytes: 16 * 1024 },
  { path: 'SKILLS.md', maximumBytes: 12 * 1024 },
] as const;

/** Every routed playbook is mandatory because each owns requirements moved from the root guides. */
const corePlaybookPaths = [
  'playbooks/README.md',
  'playbooks/lesson-authoring.md',
  'playbooks/cloud-fact-checking.md',
  'playbooks/diagrams-and-ui.md',
  'playbooks/syllabus-and-audits.md',
  'playbooks/testing-and-accessibility.md',
  'playbooks/privacy.md',
  'playbooks/releases-and-changelog.md',
  'playbooks/repository-safety.md',
] as const;

/** Discovery prevents a newly created Markdown playbook from bypassing indexing and routing. */
const discoveredPlaybookPaths = existsSync(resolve('playbooks'))
  ? readdirSync(resolve('playbooks'))
      .filter((fileName) => fileName.endsWith('.md') && fileName !== 'README.md')
      .map((fileName) => `playbooks/${fileName}`)
      .sort()
  : [];

/** Core files cannot disappear, while newly discovered files automatically join every check. */
const corePlaybookPathSet = new Set<string>(corePlaybookPaths);
const playbookPaths = [
  ...corePlaybookPaths,
  ...discoveredPlaybookPaths.filter((path) => !corePlaybookPathSet.has(path)),
];

/** Stable identifiers ensure that shortening prose cannot erase the most important policies. */
const criticalRuleIds = [
  'CORE-01',
  'CORE-02',
  'CORE-04',
  'CORE-06',
  'JUDGE-01',
  'JUDGE-03',
  'JUDGE-05',
  'PRIV-01',
  'PRIV-03',
  'FACT-01',
  'FACT-03',
  'CURR-01',
  'CURR-04',
  'STAT-01',
  'STAT-05',
  'CHANGE-01',
  'CHANGE-03',
  'DOCS-01',
  'DOCS-04',
  'QA-01',
  'SAFE-02',
] as const;

/** These former headings must remain represented in the migration traceability table. */
const formerAgentSections = [
  'Purpose',
  'Current project status',
  'Release and changelog governance',
  'Implementation-claim verification protocol',
  'Non-negotiable requirements',
  'Privacy and zero-analytics policy',
  'Teaching model',
  'Diagram standard',
  'Accuracy and fact-checking',
  'Proposed technical foundation',
  'Search requirements',
  'Learner experience',
  'Curriculum-first structure',
  'Durable syllabus tracking',
  'Interface and visual design',
  'Logo and icon rules',
  'Code documentation standard',
  'Content structure and metadata',
  'Curriculum scope',
  'Incremental delivery',
  'Quality gates',
  'Repository hygiene',
] as const;

/** High-risk details are checked across the modular set so a move cannot silently erase them. */
const preservedConcepts = [
  { label: 'single ordered curriculum', needle: 'one ordered curriculum' },
  { label: 'lesson analogy', needle: 'day-to-day analogy' },
  { label: 'analogy boundary', needle: 'analogy boundary' },
  { label: 'three cloud providers', needle: 'AWS, Azure, and Google Cloud' },
  { label: 'mapping confidence', needle: 'no direct equivalent' },
  { label: 'primary source review', needle: 'primary source' },
  { label: 'last verified metadata', needle: 'lastVerified' },
  { label: 'ASCII diagrams', needle: 'ASCII' },
  { label: 'Mermaid diagrams', needle: 'Mermaid' },
  { label: 'Markmap diagrams', needle: 'Markmap' },
  { label: 'diagram full screen', needle: 'full-screen' },
  { label: 'diagram containment', needle: 'Text never escapes or clips' },
  { label: 'clipboard fallback', needle: 'restricted-browser fallback' },
  { label: 'heading URL copying', needle: 'copy the complete absolute URL' },
  { label: 'movable contents pane', needle: 'move the contents pane left or right' },
  { label: 'local reading fonts', needle: 'Atkinson Hyperlegible' },
  { label: 'theme requirements', needle: 'light and dark themes' },
  { label: 'reduced motion', needle: 'reduced motion' },
  { label: 'WCAG target', needle: 'WCAG 2.2 AA' },
  { label: 'search synonyms', needle: 'Azure Virtual Machines' },
  { label: 'static search', needle: 'Pagefind' },
  { label: 'syllabus source of truth', needle: 'src/data/syllabus.ts' },
  { label: 'audit thresholds', needle: '25%, 50%, 75%, and 100%' },
  { label: 'audit record', needle: 'audit.md' },
  { label: 'QA execution record', needle: 'QAlogs.md' },
  {
    label: 'zero analytics',
    needle: 'Never collect, transmit, sell, profile, or analyze learner data',
  },
  { label: 'GitHub hosting boundary', needle: 'GitHub Pages logs visitor IP addresses' },
  { label: 'Astro telemetry opt-out', needle: 'ASTRO_TELEMETRY_DISABLED=1' },
  { label: 'local storage API inventory', needle: 'localStorage' },
  { label: 'session storage API inventory', needle: 'sessionStorage' },
  { label: 'PWA compatibility', needle: 'does not declare Astro 7 compatibility' },
  { label: 'code documentation', needle: 'Document every meaningful line' },
  { label: 'copyright', needle: '© 2026 Aman Ali Pogaku' },
  { label: 'em dash policy', needle: 'Avoid em dashes' },
  { label: 'changelog trigger', needle: 'validated learner-facing syllabus content' },
  { label: 'evidence fallback', needle: 'not yet verified' },
  { label: 'independent judgment', needle: 'Treat every request as input to evaluate' },
  { label: 'recommended alternative', needle: 'concrete recommended alternative' },
  { label: 'playbook creation test', needle: 'Create a new playbook only when all three' },
  { label: 'syllabus evidence pass', needle: 'Requirement evidence pass' },
  { label: 'documented instruction ceiling', needle: 'project_doc_max_bytes' },
  { label: 'size-limit uncertainty', needle: 'not fact-checked recall thresholds' },
  { label: 'shell recovery', needle: 'git status --short' },
] as const;

/** All seventeen former workflows must have an explicit destination. */
const formerSkillNumbers = Array.from({ length: 17 }, (_, index) => `${index + 1}.`);

/** Read a UTF-8 guidance file from the repository root. */
function readGuidance(path: string): string {
  return readFileSync(resolve(path), 'utf8');
}

/** UTF-8 bytes match the unit used by Codex's documented project instruction ceiling. */
function countBytes(source: string): number {
  return Buffer.byteLength(source, 'utf8');
}

const errors: string[] = [];

/** Confirm that every required guidance file exists before reading any of them. */
for (const path of [...rootGuides.map(({ path }) => path), ...playbookPaths]) {
  if (!existsSync(resolve(path))) errors.push(`Missing required guidance file: ${path}`);
}

/** Stop deeper checks when a required file is missing so the error report remains readable. */
if (errors.length === 0) {
  const agents = readGuidance('AGENTS.md');
  const skills = readGuidance('SKILLS.md');
  const index = readGuidance('playbooks/README.md');
  const allGuidance = [...rootGuides.map(({ path }) => path), ...playbookPaths]
    .map(readGuidance)
    .join('\n');

  /** Keep the two always-read files compact enough that individual rules remain prominent. */
  for (const { path, maximumBytes } of rootGuides) {
    const bytes = countBytes(readGuidance(path));
    if (bytes > maximumBytes) {
      errors.push(`${path} has ${bytes} bytes; repository maximum is ${maximumBytes}`);
    }
  }

  /** Require every critical rule identifier exactly where the agent automatically sees it. */
  for (const ruleId of criticalRuleIds) {
    const occurrences = agents.match(new RegExp(`\\b${ruleId}\\b`, 'g'))?.length ?? 0;
    if (occurrences !== 1) errors.push(`AGENTS.md must contain ${ruleId} exactly once`);
  }

  /** Require the router and index to mention every detailed playbook. */
  for (const path of playbookPaths.slice(1)) {
    const fileName = path.replace('playbooks/', '');
    if (!skills.includes(fileName)) errors.push(`SKILLS.md does not route to ${fileName}`);
    if (!index.includes(fileName)) errors.push(`playbooks/README.md does not index ${fileName}`);
  }

  /** Preserve a reviewable destination for every former top-level agent section. */
  for (const heading of formerAgentSections) {
    if (!index.includes(heading)) {
      errors.push(`Traceability index is missing former AGENTS.md section: ${heading}`);
    }
  }

  /** Count numbered workflow rows in the traceability table without depending on old prose. */
  for (const numberPrefix of formerSkillNumbers) {
    if (!index.includes(`| ${numberPrefix}`)) {
      errors.push(`Traceability index is missing former SKILLS.md workflow ${numberPrefix}`);
    }
  }

  /** Protect detailed concepts that are easy to lose when root prose becomes shorter. */
  for (const { label, needle } of preservedConcepts) {
    if (!allGuidance.includes(needle)) errors.push(`Guidance lost preserved concept: ${label}`);
  }

  /** Check relative Markdown links across every guidance document. */
  for (const path of [...rootGuides.map(({ path }) => path), ...playbookPaths]) {
    const source = readGuidance(path);
    const linkPattern = /\[[^\]]+\]\((\.\.?\/[^)#]+)(?:#[^)]+)?\)/g;
    for (const match of source.matchAll(linkPattern)) {
      const target = resolve(dirname(path), match[1]);
      if (!existsSync(target)) errors.push(`${path} links to missing file ${match[1]}`);
    }
  }

  /** The project's human-language style rule applies to the modular guidance too. */
  for (const path of [...rootGuides.map(({ path }) => path), ...playbookPaths]) {
    if (readGuidance(path).includes('\u2014')) errors.push(`${path} contains a forbidden em dash`);
  }
}

if (errors.length > 0) {
  console.error(`Guidance validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const agentBytes = countBytes(readGuidance('AGENTS.md'));
  const skillBytes = countBytes(readGuidance('SKILLS.md'));
  console.log(
    `Guidance valid: ${playbookPaths.length - 1} playbooks routed; AGENTS.md ${agentBytes}/16384 bytes; SKILLS.md ${skillBytes}/12288 bytes.`,
  );
}
