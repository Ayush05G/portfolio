import type { CSSProperties } from 'react'

interface Props {
  total: number
  weeks: number[][]
}

function levelFor(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

/** GitHub-style contribution heatmap — only rendered when the calendar is available. */
export default function ContributionCard({ total, weeks }: Props) {
  return (
    <div
      className="card card--tall stat-card contribution-card"
      style={{ '--card-accent': '#16213a' } as CSSProperties}
      tabIndex={0}
      role="group"
      aria-label={`${total} contributions in the last year`}
    >
      <div className="card__art">
        <span className="card__eyebrow">Last 12 Months</span>
        <span className="stat-card__value stat-card__value--sm">{total.toLocaleString()}</span>
        <span className="card__sub">Contributions</span>
        <div className="contribution-grid" aria-hidden>
          {weeks.map((week, wi) => (
            <div className="contribution-grid__col" key={wi}>
              {week.map((count, di) => (
                <span key={di} className={`contribution-grid__day level-${levelFor(count)}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
