/** This report is the first command to run when the user asks to continue the syllabus. */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateAuditLog } from '../src/data/audit-validation.ts';
import { getNextSyllabusLesson, summarizeModule, syllabusModules } from '../src/data/syllabus.ts';
import { validateSyllabus } from '../src/data/syllabus-validation.ts';

const errors = validateSyllabus();
const auditLogPath = resolve('audit.md');
const auditLog = existsSync(auditLogPath) ? readFileSync(auditLogPath, 'utf8') : '';
validateAuditLog(auditLog, syllabusModules).forEach((message) => errors.push({ message }));

if (errors.length > 0) {
  console.error('The syllabus ledger or audit log is invalid. Run npm run syllabus:validate.');
  process.exitCode = 1;
} else {
  const completedAuditCount = syllabusModules
    .flatMap((module) => module.audits)
    .filter((audit) => audit.status === 'complete').length;
  console.log('cloudservs syllabus status');
  console.log(`Audit log: valid | ${completedAuditCount} completed checkpoint recorded`);
  console.log('');
  console.log('Module  Topic coverage  Requirements  Complete  In progress  Planned');

  syllabusModules.forEach((module) => {
    const summary = summarizeModule(module);
    const inProgress =
      summary.statuses.researching +
      summary.statuses.drafting +
      summary.statuses['fact-checking'] +
      summary.statuses['visual-review'];
    const moduleLabel = String(summary.module).padEnd(7);
    const coverage = `${summary.topicCoveragePercent}%`.padEnd(16);
    const requirements = `${summary.requirementProgressPercent}%`.padEnd(14);
    const complete = String(summary.completeLessons).padEnd(10);
    const active = String(inProgress).padEnd(13);
    console.log(
      `${moduleLabel}${coverage}${requirements}${complete}${active}${summary.statuses.planned}`,
    );
    const audits = module.audits
      .map((audit) => {
        const completedDate = audit.completedAt ? ` (${audit.completedAt})` : '';
        return `${audit.threshold}%:${audit.status}${completedDate}`;
      })
      .join(' | ');
    console.log(`       Audits: ${audits}`);
  });

  const nextLesson = getNextSyllabusLesson();
  console.log('');
  if (nextLesson) {
    console.log(`Next lesson: ${nextLesson.id} | ${nextLesson.title}`);
    console.log(`Status: ${nextLesson.status}`);
    console.log(`Next step: ${nextLesson.nextStep}`);
  } else {
    console.log('No unblocked lesson is ready. Review blockers or celebrate completion.');
  }
}
