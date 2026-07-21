/** Tests protect progress calculations and prevent incomplete lessons from claiming completion. */
import { describe, expect, it } from 'vitest';
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

  it('resumes the earliest unfinished and unblocked lesson', () => {
    expect(getNextSyllabusLesson()?.id).toBe('m1-01-what-is-cloud-computing');
  });

  it('keeps the completion checklist broad enough for the teaching model', () => {
    expect(lessonRequirements.length).toBeGreaterThanOrEqual(25);
    expect(lessonRequirements).toContain('primary-sources');
    expect(lessonRequirements).toContain('browser-regression-review');
  });
});
