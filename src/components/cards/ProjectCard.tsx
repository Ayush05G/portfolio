import type { CSSProperties } from 'react'
import type { Project } from '../../data.ts'
import { Play } from '../../icons.tsx'

interface Props {
  item: Project
  index: number
  onOpen: (item: Project) => void
}

export default function ProjectCard({ item, index, onOpen }: Props) {
  return (
    <button
      className={`card ${item.image ? 'card--has-image' : ''}`}
      style={{ '--card-accent': item.accent } as CSSProperties}
      onClick={() => onOpen(item)}
    >
      {item.image && <img className="card__shot" src={item.image} alt={`${item.title} preview`} loading="lazy" />}
      <div className="card__art">
        <span className="card__num">{String(index + 1).padStart(2, '0')}</span>
        <span className="card__tag">Project</span>
        <span className="card__label">{item.title}</span>
        <span className="card__sub">{item.tags.join(' · ')}</span>
      </div>
      <div className="card__hover">
        <span className="card__play">{Play}</span>
        <span className="card__hovertext">{item.match} · Click for details</span>
      </div>
    </button>
  )
}
