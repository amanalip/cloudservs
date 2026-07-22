/** This report is the first command to run when the user asks to continue the syllabus. */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateAuditLog } from '../src/data/audit-validation.ts';
import { validateQaLog } from '../src/data/qa-validation.ts';
import {
  getBlockingModuleAudit,
  getNextSyllabusLesson,
  summarizeModule,
  syllabusModules,
} from '../src/data/syllabus.ts';
import { validateSyllabus } from '../src/data/syllabus-validation.ts';

const errors = validateSyllabus();
const auditLogPath = resolve('audit.md');
const auditLog = existsSync(auditLogPath) ? readFileSync(auditLogPath, 'utf8') : '';
validateAuditLog(auditLog, syllabusModules).forEach((message) => errors.push({ message }));
const qaLogPath = resolve('QAlogs.md');
const qaLog = existsSync(qaLogPath) ? readFileSync(qaLogPath, 'utf8') : '';
validateQaLog(qaLog, syllabusModules).forEach((message) => errors.push({ message }));

if (errors.length > 0) {
  console.error(
    'The syllabus ledger, audit log, or QA log is invalid. Run npm run syllabus:validate.',
  );
  process.exitCode = 1;
} else {
  const completedAuditCount = syllabusModules
    .flatMap((module) => module.audits)
    .filter((audit) => audit.status === 'complete').length;
  console.log('cloudservs syllabus status');
  console.log(`Audit log: valid | ${completedAuditCount} completed checkpoint recorded`);
  const qaEntryCount = qaLog.match(/^<!-- qa:/gm)?.length ?? 0;
  console.log(`QA log: valid | ${qaEntryCount} detailed entries recorded`);
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

  const blockingAudit = getBlockingModuleAudit();
  const nextLesson = getNextSyllabusLesson();
  console.log('');
  if (blockingAudit) {
    console.log(
      `Next action: complete Module ${blockingAudit.module.number} ${blockingAudit.audit.threshold}% audit`,
    );
    console.log(`Audit status: ${blockingAudit.audit.status}`);
    console.log(`Topic coverage: ${blockingAudit.topicCoveragePercent}%`);
    console.log('Lesson continuation is paused until this audit is complete.');
  } else if (nextLesson) {
    console.log(`Next lesson: ${nextLesson.id} | ${nextLesson.title}`);
    console.log(`Status: ${nextLesson.status}`);
    console.log(`Next step: ${nextLesson.nextStep}`);
  } else {
    console.log('No unblocked lesson is ready. Review blockers or celebrate completion.');
  }
}
