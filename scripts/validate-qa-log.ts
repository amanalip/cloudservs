/** The production build runs this check so required QA history cannot drift from the ledger. */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateQaLog } from '../src/data/qa-validation.ts';
import { syllabusModules } from '../src/data/syllabus.ts';

const qaLogPath = resolve('QAlogs.md');
const errors = existsSync(qaLogPath)
  ? validateQaLog(readFileSync(qaLogPath, 'utf8'), syllabusModules)
  : ['QAlogs.md does not exist'];

if (errors.length > 0) {
  console.error(`QA log validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('QA log valid: completed module checkpoints and detailed QA entries are recorded.');
}
