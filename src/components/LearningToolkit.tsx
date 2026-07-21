/**
 * This Preact component summarizes the learning tools available across cloudservs.
 * Lucide icons remain decorative because the adjacent text carries the full meaning.
 */
import { BookOpen, Brain, Network, Search, ShieldCheck, Waypoints } from 'lucide-preact';

/** Each item connects a visual symbol to a concrete learner benefit. */
const tools = [
  {
    icon: BookOpen,
    title: 'Concept first',
    description: 'Learn the underlying idea before meeting vendor product names.',
  },
  {
    icon: Waypoints,
    title: 'Visual explanations',
    description: 'Use mental models, flows, maps, and architectures to see relationships.',
  },
  {
    icon: Network,
    title: 'Three-cloud comparison',
    description: 'Compare AWS, Azure, and Google Cloud without pretending they are identical.',
  },
  {
    icon: Brain,
    title: 'Active recall',
    description: 'Practice with quizzes, scenarios, flashcards, and helpful explanations.',
  },
  {
    icon: Search,
    title: 'Search every lesson',
    description: 'Find concepts, abbreviations, glossary terms, and provider services.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified sources',
    description: 'See official sources, mapping confidence, and the latest review date.',
  },
];

/** Static rendering keeps this visual grid fast because it needs no browser JavaScript. */
export default function LearningToolkit() {
  return (
    <div class="learning-toolkit">
      {tools.map(({ icon: Icon, title, description }) => (
        <article class="learning-card" key={title}>
          <Icon aria-hidden="true" />
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}
