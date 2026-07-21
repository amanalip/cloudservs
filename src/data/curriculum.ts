/**
 * This file is the single source of truth for the ordered curriculum modules.
 * Pages and components reuse this data so the learner never sees competing paths.
 */
export interface CurriculumModule {
  number: number;
  title: string;
  summary: string;
  status: 'available' | 'planned';
}

/** The nine modules preserve the detailed syllabus while giving it one clear order. */
export const curriculumModules: CurriculumModule[] = [
  {
    number: 1,
    title: 'Cloud and computing foundations',
    summary: 'Build the vocabulary and mental models used throughout the curriculum.',
    status: 'available',
  },
  {
    number: 2,
    title: 'Identity and core infrastructure',
    summary: 'Understand access, compute, storage, databases, and global infrastructure.',
    status: 'planned',
  },
  {
    number: 3,
    title: 'Networking and application delivery',
    summary: 'Follow packets, requests, DNS answers, and traffic through cloud systems.',
    status: 'planned',
  },
  {
    number: 4,
    title: 'Containers and modern applications',
    summary: 'Learn containers, Kubernetes, serverless, messaging, and integration.',
    status: 'planned',
  },
  {
    number: 5,
    title: 'Security, observability, and reliability',
    summary: 'Protect systems, understand their behavior, and design for failure.',
    status: 'planned',
  },
  {
    number: 6,
    title: 'DevOps, infrastructure, cost, and governance',
    summary: 'Deliver repeatable systems while controlling change, policy, and spending.',
    status: 'planned',
  },
  {
    number: 7,
    title: 'Data, analytics, AI, and migration',
    summary: 'Move, transform, analyze, and apply data across cloud platforms.',
    status: 'planned',
  },
  {
    number: 8,
    title: 'Architecture patterns and scenarios',
    summary: 'Combine services into secure, reliable, and understandable systems.',
    status: 'planned',
  },
  {
    number: 9,
    title: 'Hands-on skills and job preparation',
    summary: 'Practice troubleshooting, interviews, diagrams, and workplace decisions.',
    status: 'planned',
  },
];

/** Progress percentages use the same ordered module count everywhere on the site. */
export function calculateCurriculumProgress(completedModules: number): number {
  const boundedCompletedModules = Math.min(Math.max(completedModules, 0), curriculumModules.length);
  return Math.round((boundedCompletedModules / curriculumModules.length) * 100);
}
