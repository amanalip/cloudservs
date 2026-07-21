/** Tests protect progress calculations and prevent incomplete lessons from claiming completion. */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { validateAuditLog } from './audit-validation';
import {
  getNextSyllabusLesson,
  lessonRequirements,
  summarizeModule,
  syllabusModules,
} from './syllabus';
import { validateSyllabus } from './syllabus-validation';

describe('syllabus ledger', () => {
  it('passes every structural and completion rule', () => {
    expect(validateSyllabus()).toEqual([]);
  });

  it('calculates Module 1 topic coverage from recorded evidence', () => {
    const summary = summarizeModule(syllabusModules[0]);
    expect(summary.coveredTopics).toBe(6);
    expect(summary.totalTopics).toBe(20);
    expect(summary.topicCoveragePercent).toBe(30);
  });

  it('records the completed Module 1 audit at the first threshold', () => {
    const [firstAudit, secondAudit] = syllabusModules[0].audits;
    expect(firstAudit.threshold).toBe(25);
    expect(firstAudit.status).toBe('complete');
    expect(firstAudit.findings.every((finding) => finding.disposition !== 'open')).toBe(true);
    expect(secondAudit.threshold).toBe(50);
    expect(secondAudit.status).toBe('planned');
  });

  it('keeps a timestamped readable record for every completed audit', () => {
    const auditLog = readFileSync('audit.md', 'utf8');
    expect(validateAuditLog(auditLog, syllabusModules)).toEqual([]);
  });

  it('rejects a completed ledger audit when its readable record is missing', () => {
    expect(validateAuditLog('', syllabusModules)).toContain(
      'module 1 25% audit is missing from audit.md',
    );
  });

  it('rejects duplicate readable records for one completed audit', () => {
    const auditLog = readFileSync('audit.md', 'utf8');
    const duplicatedLog = `${auditLog}\n${auditLog}`;
    expect(validateAuditLog(duplicatedLog, syllabusModules)).toContain(
      'module 1 25% audit appears more than once in audit.md',
    );
  });

  it('resumes the earliest unfinished and unblocked lesson', () => {
    expect(getNextSyllabusLesson()?.id).toBe('m1-01-what-is-cloud-computing');
  });

  it('keeps the completion checklist broad enough for the teaching model', () => {
    expect(lessonRequirements.length).toBeGreaterThanOrEqual(25);
    expect(lessonRequirements).toContain('primary-sources');
    expect(lessonRequirements).toContain('browser-regression-review');
  });
});
