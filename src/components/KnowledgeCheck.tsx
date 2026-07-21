/**
 * This Preact island provides immediate, respectful feedback for one knowledge check.
 * Every option includes an explanation so a wrong choice still moves learning forward.
 */
import { CheckCircle2, Lightbulb, RotateCcw } from 'lucide-preact';
import { useState } from 'preact/hooks';

export interface QuizOption {
  label: string;
  explanation: string;
  correct: boolean;
}

export interface KnowledgeCheckProps {
  question: string;
  hint: string;
  options: QuizOption[];
}

/** The component starts unanswered and reveals feedback only after a deliberate choice. */
export default function KnowledgeCheck({ question, hint, options }: KnowledgeCheckProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const selectedOption = selectedIndex === null ? null : options[selectedIndex];

  return (
    <section class="quiz-card" aria-labelledby="knowledge-check-question">
      <small>Knowledge check</small>
      <h3 id="knowledge-check-question">{question}</h3>

      <div class="quiz-options">
        {options.map((option, index) => (
          <button
            class="quiz-option"
            type="button"
            key={option.label}
            onClick={() => setSelectedIndex(index)}
            aria-pressed={selectedIndex === index}
          >
            {option.label}
          </button>
        ))}
      </div>

      {selectedOption ? (
        <div class="quiz-feedback" role="status">
          <strong>
            {selectedOption.correct ? <CheckCircle2 size={18} aria-hidden="true" /> : null}
            {selectedOption.correct ? ' You have it.' : ' Not quite yet.'}
          </strong>
          <p>{selectedOption.explanation}</p>
          <button type="button" onClick={() => setSelectedIndex(null)}>
            <RotateCcw size={16} aria-hidden="true" /> Try again
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setShowHint((currentValue) => !currentValue)}>
          <Lightbulb size={16} aria-hidden="true" /> {showHint ? 'Hide hint' : 'Show hint'}
        </button>
      )}

      {showHint && !selectedOption ? <p class="quiz-feedback">{hint}</p> : null}
    </section>
  );
}
