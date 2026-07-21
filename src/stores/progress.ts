/**
 * This persistent Nano Store keeps lesson completion in the learner's browser.
 * No account, server, or personal information is required for initial progress tracking.
 */
import type { WritableAtom } from 'nanostores';

/** The promise is created lazily so static server rendering never imports browser storage code. */
let browserProgressStore: Promise<WritableAtom<string[]>> | undefined;

/** JSON encoding lets the browser store persist a simple list of completed lesson slugs. */
export async function getCompletedLessonsStore() {
  browserProgressStore ??= import('@nanostores/persistent').then(({ persistentAtom }) => {
    return persistentAtom<string[]>('cloudservs:completed-lessons', [], {
      encode: JSON.stringify,
      decode: JSON.parse,
    });
  });

  return browserProgressStore;
}

/** This helper toggles one lesson without duplicating slugs in browser storage. */
export async function toggleLessonCompletion(slug: string): Promise<void> {
  const completedLessons = await getCompletedLessonsStore();
  const currentLessons = completedLessons.get();
  const lessonIsComplete = currentLessons.includes(slug);
  const nextLessons = lessonIsComplete
    ? currentLessons.filter((currentSlug) => currentSlug !== slug)
    : [...currentLessons, slug];

  completedLessons.set(nextLessons);
}
