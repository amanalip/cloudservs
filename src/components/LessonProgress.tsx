/**
 * This Preact island lets a learner mark one lesson complete.
 * Nano Stores persists the choice locally and synchronizes it across browser tabs.
 */
import { CheckCircle2, Circle } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';
import { getCompletedLessonsStore, toggleLessonCompletion } from '../stores/progress';

export interface LessonProgressProps {
  slug: string;
}

/** Subscription cleanup prevents a stale listener when the learner changes pages. */
export default function LessonProgress({ slug }: LessonProgressProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};

    void getCompletedLessonsStore().then((completedLessons) => {
      unsubscribe = completedLessons.subscribe((currentLessons) => {
        setIsComplete(currentLessons.includes(slug));
      });
    });

    return () => unsubscribe();
  }, [slug]);

  return (
    <section class="progress-card" aria-label="Lesson progress">
      <small>Your progress is stored only in this browser.</small>
      <button
        class="progress-button"
        type="button"
        data-complete={String(isComplete)}
        onClick={() => void toggleLessonCompletion(slug)}
      >
        {isComplete ? (
          <CheckCircle2 size={19} aria-hidden="true" />
        ) : (
          <Circle size={19} aria-hidden="true" />
        )}
        {isComplete ? ' Lesson complete' : ' Mark this lesson complete'}
      </button>
    </section>
  );
}
