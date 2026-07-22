/** The build calls this script so an invalid progress ledger blocks deployment. */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateAuditLog } from '../src/data/audit-validation.ts';
import { validateQaLog } from '../src/data/qa-validation.ts';
import { syllabusLessons, syllabusModules } from '../src/data/syllabus.ts';
import { validateSyllabus, type SyllabusValidationError } from '../src/data/syllabus-validation.ts';

const errors: SyllabusValidationError[] = validateSyllabus();

/** A completed checkpoint is invalid until its readable, timestamped audit record exists. */
const auditLogPath = resolve('audit.md');
if (!existsSync(auditLogPath)) {
  errors.push({ message: 'audit.md does not exist' });
} else {
  const auditLog = readFileSync(auditLogPath, 'utf8');
  validateAuditLog(auditLog, syllabusModules).forEach((message) => errors.push({ message }));
}

/** A completed module checkpoint also requires its detailed QA execution record. */
const qaLogPath = resolve('QAlogs.md');
if (!existsSync(qaLogPath)) {
  errors.push({ message: 'QAlogs.md does not exist' });
} else {
  const qaLog = readFileSync(qaLogPath, 'utf8');
  validateQaLog(qaLog, syllabusModules).forEach((message) => errors.push({ message }));
}

/** Source-backed records must point to real lesson files with matching core metadata. */
syllabusLessons.forEach((lesson) => {
  if (!lesson.sourcePath) return;

  const absolutePath = resolve(lesson.sourcePath);
  if (!existsSync(absolutePath)) {
    errors.push({
      lessonId: lesson.id,
      message: `source file does not exist: ${lesson.sourcePath}`,
    });
    return;
  }

  const source = readFileSync(absolutePath, 'utf8');
  const sourceReviewStatus = source.match(/^reviewStatus:\s*(draft|reviewed|verified)\s*$/m)?.[1];
  if (!source.includes(`module: ${lesson.module}`)) {
    errors.push({
      lessonId: lesson.id,
      message: 'source frontmatter has a different module number',
    });
  }
  if (lesson.lastVerified && !source.includes(`lastVerified: ${lesson.lastVerified}`)) {
    errors.push({
      lessonId: lesson.id,
      message: 'source frontmatter has a different verification date',
    });
  }
  if (!sourceReviewStatus) {
    errors.push({ lessonId: lesson.id, message: 'source has no explicit valid review status' });
  } else if (lesson.status === 'complete' && sourceReviewStatus !== 'verified') {
    errors.push({ lessonId: lesson.id, message: 'complete source is not marked verified' });
  } else if (lesson.status !== 'complete' && sourceReviewStatus === 'verified') {
    errors.push({
      lessonId: lesson.id,
      message: 'unfinished lesson source must not claim verified review status',
    });
  }
});

if (errors.length > 0) {
  console.error(`Syllabus validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => {
    console.error(`- ${error.lessonId ? `${error.lessonId}: ` : ''}${error.message}`);
  });
  process.exitCode = 1;
} else {
  console.log(`Syllabus ledger valid: ${syllabusLessons.length} ordered lessons across 9 modules.`);
}
