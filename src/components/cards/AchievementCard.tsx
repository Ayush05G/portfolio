import type { CSSProperties } from 'react'
import type { Achievement } from '../../data.ts'

interface Props {
  item: Achievement
}

export default function AchievementCard({ item }: Props) {
  return (
    <div
      className="card card--tall"
      style={{ '--card-accent': '#3a1a1a' } as CSSProperties}
      tabIndex={0}
      role="group"
      aria-label={item.title}
    >
      <div className="card__art">
        <span className="card__eyebrow">{item.tag}</span>
        <span className="card__label">{item.title}</span>
        <span className="card__sub card__sub--clamp" style={{ marginTop: 6 }}>
          {item.detail}
        </span>
      </div>
    </div>
  )
}
