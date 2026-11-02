import { useState } from 'react'
import { track } from '@vercel/analytics'
import { projects, type Project } from '../data.ts'
import ProjectCard from './cards/ProjectCard.tsx'

export default function SelectedWork({ onOpen }: { onOpen: (p: Project) => void }) {
  const [all, setAll] = useState(false)
  const featured = ['findesk', 'product-analytics', 'disaster-mesh']
  const ordered = [...projects].sort((a, b) => {
    const rank = (p: Project) =>
      featured.includes(p.slug) ? featured.indexOf(p.slug) : featured.length + projects.indexOf(p)
    return rank(a) - rank(b)
  })
  return (
    <section className="panel selected-work" id="projects" tabIndex={-1} aria-labelledby="selected-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">FEATURED TITLES</span>
          <h2 id="selected-heading">Selected work</h2>
          <p>Products, experiments and the decisions behind them.</p>
        </div>
        <span className="section-count">{projects.length} projects · 2026</span>
      </div>
      <div className="project-grid">
        {(all ? ordered : ordered.slice(0, 3)).map((p, i) => (
          <ProjectCard key={p.slug} item={p} index={i} onOpen={onOpen} />
        ))}
      </div>
      <button
        className="text-button work-toggle"
        aria-expanded={all}
        onClick={() => {
          setAll(!all)
          track('all_projects_toggled', { expanded: !all })
        }}
      >
        {all ? 'Show selected work' : `Explore all ${projects.length} projects`}{' '}
        <span aria-hidden>{all ? '↑' : '↓'}</span>
      </button>
    </section>
  )
}
