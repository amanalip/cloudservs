/** Pure validation keeps ledger rules reusable from unit tests and command-line reporting. */
import { curriculumModules } from './curriculum.ts';
import {
  lessonRequirements,
  moduleAuditRequirements,
  moduleAuditThresholds,
  syllabusLessons,
  syllabusModules,
  type ModuleAudit,
  type LessonStatus,
  type SyllabusLesson,
  type SyllabusModule,
} from './syllabus.ts';

/** Validation errors identify the exact record and rule that needs attention. */
export interface SyllabusValidationError {
  lessonId?: string;
  message: string;
}

/** Allowed transitions preserve review history while permitting corrections and maintenance. */
const allowedTransitions: Record<LessonStatus, LessonStatus[]> = {
  planned: ['researching', 'blocked'],
  researching: ['drafting', 'blocked'],
  drafting: ['fact-checking', 'blocked'],
  'fact-checking': ['drafting', 'visual-review', 'blocked'],
  'visual-review': ['drafting', 'fact-checking', 'complete', 'blocked'],
  complete: ['fact-checking', 'blocked'],
  blocked: ['planned', 'researching', 'drafting', 'fact-checking', 'visual-review'],
};

/** ISO calendar dates remain easy to compare, display, and audit in version control. */
function isIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

/** Validate one lesson's internal evidence before checking relationships between lessons. */
function validateLesson(lesson: SyllabusLesson): SyllabusValidationError[] {
  const errors: SyllabusValidationError[] = [];
  const report = (message: string) => errors.push({ lessonId: lesson.id, message });

  if (!/^m\d+-\d{2}-[a-z0-9-]+$/.test(lesson.id)) report('has an invalid stable ID');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lesson.slug)) report('has an invalid slug');
  if (lesson.topics.length === 0) report('must define at least one topic');
  if (new Set(lesson.topics).size !== lesson.topics.length) report('contains duplicate topics');
  if (new Set(lesson.coveredTopics).size !== lesson.coveredTopics.length) {
    report('contains duplicate covered topics');
  }

  lesson.coveredTopics.forEach((topic) => {
    if (!lesson.topics.includes(topic)) report(`marks unknown topic "${topic}" as covered`);
  });

  if (new Set(lesson.completedRequirements).size !== lesson.completedRequirements.length) {
    report('contains duplicate completion requirements');
  }

  lesson.completedRequirements.forEach((requirement) => {
    if (!lessonRequirements.includes(requirement)) {
      report(`contains unknown completion requirement "${requirement}"`);
    }
  });

  if (lesson.history.length === 0) {
    report('must contain status history');
  } else {
    const finalEvent = lesson.history.at(-1);
    if (finalEvent?.status !== lesson.status)
      report('status does not match the latest history event');

    lesson.history.forEach((event, index) => {
      if (!isIsoDate(event.date)) report(`contains invalid history date "${event.date}"`);
      if (!event.note.trim()) report('contains a history event without a note');

      const previous = lesson.history[index - 1];
      if (previous && event.date < previous.date) report('contains history dates out of order');
      if (previous && !allowedTransitions[previous.status].includes(event.status)) {
        report(`contains invalid status transition ${previous.status} -> ${event.status}`);
      }
    });
  }

  if (!lesson.nextStep.trim()) report('must record a concrete next step');
  if (lesson.status === 'blocked' && !lesson.blocker?.trim())
    report('is blocked without a blocker');
  if (lesson.lastVerified && !isIsoDate(lesson.lastVerified))
    report('has an invalid last-verified date');

  if (lesson.status === 'complete') {
    const missingRequirements = lessonRequirements.filter(
      (requirement) => !lesson.completedRequirements.includes(requirement),
    );
    if (missingRequirements.length > 0) {
      report(`is complete but misses requirements: ${missingRequirements.join(', ')}`);
    }
    if (lesson.coveredTopics.length !== lesson.topics.length) {
      report('is complete but does not cover every assigned topic');
    }
    if (!lesson.sourcePath) report('is complete without a lesson source path');
    if (!lesson.lastVerified) report('is complete without a last-verified date');
  }

  return errors;
}

/** Validate a milestone review and prevent unresolved findings from being signed off. */
function validateModuleAudit(
  module: SyllabusModule,
  audit: ModuleAudit,
  topicCoveragePercent: number,
): SyllabusValidationError[] {
  const errors: SyllabusValidationError[] = [];
  const report = (message: string) =>
    errors.push({ message: `module ${module.number} ${audit.threshold}% audit ${message}` });

  if (topicCoveragePercent >= audit.threshold && audit.status === 'planned') {
    report('is due and must be completed before validation can pass');
  }
  if (topicCoveragePercent < audit.threshold && audit.status !== 'planned') {
    report('started before its topic-coverage threshold was reached');
  }
  if (new Set(audit.completedRequirements).size !== audit.completedRequirements.length) {
    report('contains duplicate requirements');
  }
  audit.completedRequirements.forEach((requirement) => {
    if (!moduleAuditRequirements.includes(requirement)) {
      report(`contains unknown requirement "${requirement}"`);
    }
  });

  if (audit.status === 'complete') {
    const missingRequirements = moduleAuditRequirements.filter(
      (requirement) => !audit.completedRequirements.includes(requirement),
    );
    if (missingRequirements.length > 0) {
      report(`misses requirements: ${missingRequirements.join(', ')}`);
    }
    if (!audit.startedAt || !isIsoDate(audit.startedAt)) report('has an invalid start date');
    if (!audit.completedAt || !isIsoDate(audit.completedAt))
      report('has an invalid completion date');
    if (audit.startedAt && audit.completedAt && audit.completedAt < audit.startedAt) {
      report('finishes before it starts');
    }
    if (!audit.summary.trim()) report('must include an outcome summary');
    if (audit.evidence.length === 0) report('must include review evidence');
    if (audit.findings.some((finding) => finding.disposition === 'open')) {
      report('cannot complete while a finding remains open');
    }
    audit.findings.forEach((finding) => {
      if (!finding.id.trim() || !finding.summary.trim() || !finding.resolution.trim()) {
        report('contains an incomplete finding record');
      }
    });
  } else if (audit.status === 'in-progress') {
    if (!audit.startedAt || !isIsoDate(audit.startedAt)) {
      report('is in progress without a valid start date');
    }
    if (audit.completedAt) report('is in progress but already has a completion date');
  }

  return errors;
}

/** Validate the complete ledger, including order, uniqueness, prerequisites, and module parity. */
export function validateSyllabus(): SyllabusValidationError[] {
  const errors: SyllabusValidationError[] = [];
  const lessonIds = new Set<string>();
  const slugs = new Set<string>();
  const globalOrder = new Map<string, number>();

  if (syllabusModules.length !== curriculumModules.length) {
    errors.push({ message: 'syllabus module count does not match the curriculum module count' });
  }

  syllabusModules.forEach((module, moduleIndex) => {
    const curriculumModule = curriculumModules[moduleIndex];
    if (module.number !== moduleIndex + 1) {
      errors.push({ message: `module ${module.number} is outside the contiguous module order` });
    }
    if (!curriculumModule || curriculumModule.title !== module.title) {
      errors.push({ message: `module ${module.number} title does not match curriculum.ts` });
    }

    const totalTopics = module.lessons.reduce((total, lesson) => total + lesson.topics.length, 0);
    const coveredTopics = module.lessons.reduce(
      (total, lesson) => total + lesson.coveredTopics.length,
      0,
    );
    const topicCoveragePercent =
      totalTopics === 0 ? 0 : Math.round((coveredTopics / totalTopics) * 100);
    if (module.audits.length !== moduleAuditThresholds.length) {
      errors.push({ message: `module ${module.number} must define four milestone audits` });
    }
    module.audits.forEach((audit, auditIndex) => {
      if (audit.threshold !== moduleAuditThresholds[auditIndex]) {
        errors.push({ message: `module ${module.number} audit thresholds are out of order` });
      }
      errors.push(...validateModuleAudit(module, audit, topicCoveragePercent));
    });

    module.lessons.forEach((lesson, lessonIndex) => {
      globalOrder.set(lesson.id, globalOrder.size);
      if (lesson.module !== module.number) {
        errors.push({
          lessonId: lesson.id,
          message: 'module number does not match its parent module',
        });
      }
      if (lesson.order !== lessonIndex + 1) {
        errors.push({
          lessonId: lesson.id,
          message: 'lesson order is not contiguous inside its module',
        });
      }
      if (lessonIds.has(lesson.id)) {
        errors.push({ lessonId: lesson.id, message: 'duplicates another stable lesson ID' });
      }
      if (slugs.has(lesson.slug)) {
        errors.push({ lessonId: lesson.id, message: 'duplicates another lesson slug' });
      }
      lessonIds.add(lesson.id);
      slugs.add(lesson.slug);
      errors.push(...validateLesson(lesson));
    });
  });

  syllabusLessons.forEach((lesson) => {
    lesson.prerequisites.forEach((prerequisite) => {
      if (!lessonIds.has(prerequisite)) {
        errors.push({
          lessonId: lesson.id,
          message: `references unknown prerequisite ${prerequisite}`,
        });
      } else if (
        (globalOrder.get(prerequisite) ?? Infinity) >= (globalOrder.get(lesson.id) ?? -1)
      ) {
        errors.push({
          lessonId: lesson.id,
          message: `prerequisite ${prerequisite} is not earlier`,
        });
      }
    });
  });

  return errors;
}
