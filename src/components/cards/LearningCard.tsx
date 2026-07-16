import type { CSSProperties } from 'react'
import type { LearningItem } from '../../data.ts'

interface Props {
  item: LearningItem
}

/* "Continue Watching" card — a thumbnail with a resume-progress bar, like
   Netflix's continue-watching row. */
export default function LearningCard({ item }: Props) {
  return (
    <div
      className="card card--tall card--learning"
      style={{ '--card-accent': '#1a2a3a' } as CSSProperties}
      tabIndex={0}
      role="group"
      aria-label={`Currently learning ${item.name}, ${item.level}% in`}
    >
      <div className="card__art">
        <span className="card__eyebrow">Currently Learning</span>
        {item.logo && <img className="skill-logo" src={item.logo} alt={`${item.name} logo`} loading="lazy" />}
        <span className="card__label">{item.name}</span>
        <span className="card__sub card__sub--clamp" style={{ marginTop: 6 }}>
          {item.note}
        </span>
      </div>
      <div className="card__progress">
        <div className="card__progress-fill" style={{ width: `${item.level}%` }} />
      </div>
    </div>
  )
}
