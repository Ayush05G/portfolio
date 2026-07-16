import type { CSSProperties } from 'react'
import type { Skill } from '../../data.ts'

interface Props {
  item: Skill
  rank: number
}

/* The iconic Netflix ranked row, with a giant background rank numeral
   behind a compact skill "poster". */
export default function Top10Card({ item, rank }: Props) {
  return (
    <div className="top10" tabIndex={0} role="group" aria-label={`#${rank} ${item.name}`}>
      <span className="top10__rank" aria-hidden>
        {rank}
      </span>
      <div className="top10__poster" style={{ '--card-accent': '#1a1a1a' } as CSSProperties}>
        {item.logo && (
          <img className="top10__logo" src={item.logo} alt={`${item.name} logo`} loading="lazy" />
        )}
        <span className="top10__name">{item.name}</span>
        <span className="top10__level">{item.level}%</span>
      </div>
    </div>
  )
}
