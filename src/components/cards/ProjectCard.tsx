import type { CSSProperties } from 'react'
import type { Project } from '../../data.ts'
interface Props {
  item: Project
  index: number
  onOpen: (item: Project) => void
}
export default function ProjectCard({ item, index, onOpen }: Props) {
  const shot = item.screenshot
  return (
    <button
      className="work-card"
      style={{ '--card-accent': item.accent } as CSSProperties}
      onClick={() => onOpen(item)}
    >
      <span className="work-card__visual">
        {shot ? (
          <img src={shot} alt={`${item.title} interface`} loading="lazy" />
        ) : (
          <span className="work-card__cover">
            <span className="eyebrow">{item.status || 'Project'}</span>
            <strong>{item.title.split(' — ')[0]}</strong>
            <span>{item.outcome || item.blurb}</span>
          </span>
        )}
        <span className="work-card__number">{String(index + 1).padStart(2, '0')}</span>
      </span>
      <span className="work-card__body">
        <span className="work-card__status">
          {item.status || 'Project'} · {item.year}
        </span>
        <strong className="work-card__title">{item.title}</strong>
        <span className="work-card__outcome">{item.outcome || item.blurb}</span>
        <span className="work-card__role">{item.role || 'Design & engineering'}</span>
        <span className="work-card__tags">{item.tags.slice(0, 3).join(' · ')}</span>
        <span className="work-card__cta">
          Explore case study <span aria-hidden>↗</span>
        </span>
      </span>
    </button>
  )
}
