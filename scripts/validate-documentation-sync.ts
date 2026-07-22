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

/**
 * A closeout reflection must be appended at the end of the lessons log.
 * Matching the last entry's local date and time to the shared sync timestamp prevents a patch
 * from silently inserting the newest entry above older repeated text, while preserving history.
 */
const lessonsSource = readFileSync(resolve('lessons_learned.md'), 'utf8');

/** Convert the archive's ASCII headings into the same predictable anchors used by Markdown. */
function headingAnchor(heading: string): string {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s/g, '-');
}

/**
 * The navigation index must cover every second-level section except itself.
 * Markers keep extraction independent from the explanatory text around the index.
 */
const tocStartMarker = '<!-- LESSONS_TOC_START -->';
const tocEndMarker = '<!-- LESSONS_TOC_END -->';
const tocStart = lessonsSource.indexOf(tocStartMarker);
const tocEnd = lessonsSource.indexOf(tocEndMarker);
if (tocStart < 0 || tocEnd < 0 || tocEnd <= tocStart) {
  errors.push('lessons_learned.md has no valid table-of-contents marker block');
} else {
  const tocSource = lessonsSource.slice(tocStart, tocEnd + tocEndMarker.length);
  const actualTocAnchors = [...tocSource.matchAll(/\]\((#[^)]+)\)/g)].map((match) => match[1]);
  const expectedTocAnchors = [...lessonsSource.matchAll(/^## (.+)$/gm)]
    .map((match) => match[1])
    .filter((heading) => heading !== 'Table of contents')
    .map((heading) => `#${headingAnchor(heading)}`);

  expectedTocAnchors.forEach((anchor) => {
    if (!actualTocAnchors.includes(anchor)) {
      errors.push(`lessons_learned.md table of contents is missing ${anchor}`);
    }
  });
  actualTocAnchors.forEach((anchor) => {
    if (!expectedTocAnchors.includes(anchor)) {
      errors.push(`lessons_learned.md table of contents links to unknown section ${anchor}`);
    }
  });
  if (new Set(actualTocAnchors).size !== actualTocAnchors.length) {
    errors.push('lessons_learned.md table of contents contains a duplicate section link');
  }
}

const lessonEntryPattern = /^## (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) [A-Z]{2,5} \|/gm;
const lessonEntryTimes = [...lessonsSource.matchAll(lessonEntryPattern)].map((match) => match[1]);
const duplicateEntryTimes = lessonEntryTimes.filter(
  (entryTime, index) => lessonEntryTimes.indexOf(entryTime) !== index,
);
if (new Set(duplicateEntryTimes).size > 0) {
  errors.push(
    `lessons_learned.md contains duplicate entry timestamps: ${[...new Set(duplicateEntryTimes)].join(', ')}`,
  );
}

const expectedLocalTime = expectedTimestamp?.slice(0, 19).replace('T', ' ');
const finalLessonEntryTime = lessonEntryTimes.at(-1);
if (!finalLessonEntryTime) {
  errors.push('lessons_learned.md contains no timestamped lesson entry');
} else if (expectedLocalTime && finalLessonEntryTime !== expectedLocalTime) {
  errors.push(
    `lessons_learned.md must end with the current closeout entry ${expectedLocalTime}; found ${finalLessonEntryTime}`,
  );
}

if (errors.length > 0) {
  console.error(`Documentation synchronization failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Documentation synchronized: ${synchronizedDocuments.length} files at ${expectedTimestamp}.`,
  );
}
