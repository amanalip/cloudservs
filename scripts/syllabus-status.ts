/** This report is the first command to run when the user asks to continue the syllabus. */
import { getNextSyllabusLesson, summarizeModule, syllabusModules } from '../src/data/syllabus.ts';
import { validateSyllabus } from '../src/data/syllabus-validation.ts';

const errors = validateSyllabus();
if (errors.length > 0) {
  console.error('The syllabus ledger is invalid. Run npm run syllabus:validate for details.');
  process.exitCode = 1;
} else {
  console.log('cloudservs syllabus status');
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
