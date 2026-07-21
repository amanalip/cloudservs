/** Pure validation keeps ledger rules reusable from unit tests and command-line reporting. */
import { curriculumModules } from './curriculum.ts';
import {
  lessonRequirements,
  syllabusLessons,
  syllabusModules,
  type LessonStatus,
  type SyllabusLesson,
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
