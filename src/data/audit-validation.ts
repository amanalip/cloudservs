/** Audit-log validation keeps readable checkpoint history aligned with the structured ledger. */
import type { SyllabusModule } from './syllabus';

/** Stable comments let validation find an entry without depending on human-facing heading text. */
export function auditLogMarker(moduleNumber: number, threshold: number): string {
  return `<!-- audit:module-${moduleNumber}:${threshold} -->`;
}

/** ISO timestamps include seconds and a numeric timezone so every audit can be ordered reliably. */
function isIsoTimestamp(value: string): boolean {
  const isoTimestamp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;
  return isoTimestamp.test(value) && !Number.isNaN(Date.parse(value));
}

/** Every completed ledger audit must have one complete, timestamped section in audit.md. */
export function validateAuditLog(auditLog: string, modules: SyllabusModule[]): string[] {
  const errors: string[] = [];

  modules.forEach((module) => {
    module.audits
      .filter((audit) => audit.status === 'complete')
      .forEach((audit) => {
        const marker = auditLogMarker(module.number, audit.threshold);
        const markerIndex = auditLog.indexOf(marker);
        if (markerIndex === -1) {
          errors.push(`module ${module.number} ${audit.threshold}% audit is missing from audit.md`);
          return;
        }
        if (auditLog.indexOf(marker, markerIndex + marker.length) !== -1) {
          errors.push(
            `module ${module.number} ${audit.threshold}% audit appears more than once in audit.md`,
          );
        }

        const nextMarkerIndex = auditLog.indexOf('<!-- audit:', markerIndex + marker.length);
        const entry = auditLog.slice(
          markerIndex,
          nextMarkerIndex === -1 ? auditLog.length : nextMarkerIndex,
        );
        const recordedAt = entry.match(/^- Recorded at: `([^`]+)`$/m)?.[1];

        if (!recordedAt || !isIsoTimestamp(recordedAt)) {
          errors.push(
            `module ${module.number} ${audit.threshold}% audit has no valid timestamp in audit.md`,
          );
        }
        if (
          !audit.completedAt ||
          !entry.includes(`- Ledger completion date: \`${audit.completedAt}\``)
        ) {
          errors.push(
            `module ${module.number} ${audit.threshold}% audit completion date does not match audit.md`,
          );
        }
      });
  });

  return errors;
}
