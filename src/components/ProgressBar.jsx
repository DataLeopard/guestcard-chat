import { steps } from '../data/chatFlow';

// Steps the user actively progresses through (excluding terminal states)
const progressSteps = steps.filter(s => s.type !== 'matching' && s.type !== 'review' && s.type !== 'sent');
const TOTAL = progressSteps.length;

export default function ProgressBar({ currentStepId }) {
  const idx = progressSteps.findIndex(s => s.id === currentStepId);
  // If we're on matching/review/sent, show full progress
  const current = idx === -1 ? TOTAL : idx + 1;
  const pct = Math.round((current / TOTAL) * 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-label">Step {current} of {TOTAL}</span>
    </div>
  );
}
