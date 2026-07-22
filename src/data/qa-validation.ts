/**
 * QA log validation keeps detailed quality records aligned with formal module checkpoints.
 * The functions remain pure so unit tests can exercise missing and malformed records safely.
 */
import type { SyllabusModule } from './syllabus';

/** Stable milestone markers connect a completed ledger audit to one readable QA entry. */
export function qaMilestoneMarker(moduleNumber: number, threshold: number): string {
  return `<!-- qa:module-${moduleNumber}:${threshold} -->`;
}

/** Every QA entry uses a stable marker so headings can remain readable and editable. */
const qaMarkerPattern = /^<!-- qa:([^\n]+) -->$/gm;

/** ISO timestamps include seconds and a numeric timezone for unambiguous ordering. */
function isIsoTimestamp(value: string): boolean {
  const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;
  return pattern.test(value) && !Number.isNaN(Date.parse(value));
}

/** Required sections make each entry useful for a future beginner, not merely machine-matchable. */
const requiredEntrySections = [
  '### Scope',
  '### Result',
  '### Findings',
  '### Actions',
  '### Evidence',
  '### Validation results',
  '### Remaining risks and next action',
] as const;

/** Validate milestone coverage, marker uniqueness, timestamps, and entry completeness. */
export function validateQaLog(qaLog: string, modules: SyllabusModule[]): string[] {
  const errors: string[] = [];
  const markerMatches = [...qaLog.matchAll(qaMarkerPattern)];
  const markerNames = markerMatches.map((match) => match[1]);

  markerNames.forEach((markerName, index) => {
    if (markerNames.indexOf(markerName) !== index) {
      errors.push(`QA marker ${markerName} appears more than once`);
    }
  });

  modules.forEach((module) => {
    module.audits
      .filter((audit) => audit.status === 'complete')
      .forEach((audit) => {
        const marker = qaMilestoneMarker(module.number, audit.threshold);
        if (!qaLog.includes(marker)) {
          errors.push(
            `module ${module.number} ${audit.threshold}% audit is missing from QAlogs.md`,
          );
        }
      });
  });

  markerMatches.forEach((markerMatch, index) => {
    const entryStart = markerMatch.index ?? 0;
    const entryEnd = markerMatches[index + 1]?.index ?? qaLog.length;
    const entry = qaLog.slice(entryStart, entryEnd);
    const recordedAt = entry.match(/^- Recorded at: `([^`]+)`$/m)?.[1];

    if (!recordedAt || !isIsoTimestamp(recordedAt)) {
      errors.push(`QA marker ${markerMatch[1]} has no valid Recorded at timestamp`);
    }
    if (!/^- Trigger: .+$/m.test(entry)) {
      errors.push(`QA marker ${markerMatch[1]} has no trigger`);
    }
    if (!/^- Outcome: (Pass|Conditional pass|Fail)$/m.test(entry)) {
      errors.push(`QA marker ${markerMatch[1]} has no valid outcome`);
    }
    requiredEntrySections.forEach((heading) => {
      if (!entry.includes(heading)) {
        errors.push(`QA marker ${markerMatch[1]} is missing ${heading}`);
      }
    });
  });

  return [...new Set(errors)];
}
