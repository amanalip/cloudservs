/** Tests prove that QA history cannot silently lose milestone or entry evidence. */
import { describe, expect, it } from 'vitest';
import { qaMilestoneMarker, validateQaLog } from './qa-validation';
import { syllabusModules } from './syllabus';

/** A minimal complete entry isolates validation behavior from the full human-readable log. */
function completeEntry(marker: string): string {
  return `${marker}
## Example QA entry

- Recorded at: \`2026-07-22T17:37:32-04:00\`
- Trigger: Explicit QA request
- Outcome: Pass

### Scope
Scope evidence.

### Result
Result evidence.

### Findings
Finding evidence.

### Actions
Action evidence.

### Evidence
Source evidence.

### Validation results
Validation evidence.

### Remaining risks and next action
Risk evidence.
`;
}

describe('QA log validation', () => {
  it('accepts one complete entry for the completed Module 1 checkpoint', () => {
    const log = completeEntry(qaMilestoneMarker(1, 25));
    expect(validateQaLog(log, syllabusModules)).toEqual([]);
  });

  it('rejects a log that omits a completed module checkpoint', () => {
    expect(validateQaLog('', syllabusModules)).toContain(
      'module 1 25% audit is missing from QAlogs.md',
    );
  });

  it('rejects duplicate QA markers', () => {
    const entry = completeEntry(qaMilestoneMarker(1, 25));
    expect(validateQaLog(`${entry}\n${entry}`, syllabusModules)).toContain(
      'QA marker module-1:25 appears more than once',
    );
  });
});
