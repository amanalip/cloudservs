/** The build calls this script so an invalid progress ledger blocks deployment. */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateAuditLog } from '../src/data/audit-validation.ts';
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
  if (lesson.status === 'complete' && !source.includes('reviewStatus: verified')) {
    errors.push({ lessonId: lesson.id, message: 'complete source is not marked verified' });
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
