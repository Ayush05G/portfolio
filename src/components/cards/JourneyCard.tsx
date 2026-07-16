import type { CSSProperties } from 'react'
import type { TimelineEntry } from '../../data.ts'

interface Props {
  item: TimelineEntry
}

export default function JourneyCard({ item }: Props) {
  return (
    <div
      className="card card--tall"
      style={{ '--card-accent': '#242424' } as CSSProperties}
      tabIndex={0}
      role="group"
      aria-label={item.title}
    >
      <div className="card__art">
        <span className="card__eyebrow">{item.when}</span>
        <span className="card__label">{item.title}</span>
        <span className="card__sub">{item.place}</span>
        <span className="card__sub card__sub--clamp" style={{ marginTop: 6, color: 'var(--text-faint)' }}>
          {item.detail}
        </span>
      </div>
    </div>
  )
}
