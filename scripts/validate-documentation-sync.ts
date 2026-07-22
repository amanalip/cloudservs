/**
 * This build-time check keeps the four required session documents synchronized.
 * A shared timestamp proves that every file participated in the same closeout review.
 * The release-only changelog is deliberately excluded from routine documentation updates.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** These four living guides must be reviewed after every work session. */
const synchronizedDocuments = [
  'AGENTS.md',
  'SKILLS.md',
  'readme.md',
  'lessons_learned.md',
] as const;

/** ISO timestamps include seconds and a timezone, making reviews unambiguous. */
const isoTimestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;

/** Read each timestamp from its human-readable Markdown label. */
const timestamps = synchronizedDocuments.map((fileName) => {
  const source = readFileSync(resolve(fileName), 'utf8');
  const timestamp = source.match(/Last documentation sync: `([^`]+)`/)?.[1];
  return { fileName, timestamp };
});

/** Collect every problem before failing so a beginner can correct all files in one pass. */
const errors: string[] = [];
timestamps.forEach(({ fileName, timestamp }) => {
  if (!timestamp || !isoTimestampPattern.test(timestamp) || Number.isNaN(Date.parse(timestamp))) {
    errors.push(`${fileName} has no valid Last documentation sync timestamp`);
  }
});

/** The first valid timestamp is the reference value that every other document must share. */
const expectedTimestamp = timestamps[0]?.timestamp;
timestamps.forEach(({ fileName, timestamp }) => {
  if (expectedTimestamp && timestamp && timestamp !== expectedTimestamp) {
    errors.push(`${fileName} is not synchronized with ${synchronizedDocuments[0]}`);
  }
});

if (errors.length > 0) {
  console.error(`Documentation synchronization failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Documentation synchronized: ${synchronizedDocuments.length} files at ${expectedTimestamp}.`,
  );
}
