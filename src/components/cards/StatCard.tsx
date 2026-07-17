import type { CSSProperties } from 'react'

interface Props {
  label: string
  value: string | number
  sub?: string
  breakdown?: { easy: number; medium: number; hard: number }
}

/** A single big-number stat tile — LeetCode solved/ranking, GitHub stars/repos. */
export default function StatCard({ label, value, sub, breakdown }: Props) {
  const total = breakdown ? breakdown.easy + breakdown.medium + breakdown.hard : 0

  return (
    <div
      className="card card--tall stat-card"
      style={{ '--card-accent': '#16213a' } as CSSProperties}
      tabIndex={0}
      role="group"
      aria-label={`${label}: ${value}`}
    >
      <div className="card__art">
        <span className="card__eyebrow">{label}</span>
        <span className="stat-card__value">{value}</span>
        {sub && <span className="card__sub">{sub}</span>}

        {breakdown && total > 0 && (
          <>
            <div className="stat-card__bar">
              <span
                className="stat-card__seg stat-card__seg--easy"
                style={{ width: `${(breakdown.easy / total) * 100}%` }}
              />
              <span
                className="stat-card__seg stat-card__seg--medium"
                style={{ width: `${(breakdown.medium / total) * 100}%` }}
              />
              <span
                className="stat-card__seg stat-card__seg--hard"
                style={{ width: `${(breakdown.hard / total) * 100}%` }}
              />
            </div>
            <div className="stat-card__legend">
              <span className="stat-card__legend-item stat-card__legend-item--easy">
                {breakdown.easy} Easy
              </span>
              <span className="stat-card__legend-item stat-card__legend-item--medium">
                {breakdown.medium} Med
              </span>
              <span className="stat-card__legend-item stat-card__legend-item--hard">
                {breakdown.hard} Hard
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
