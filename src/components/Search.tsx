import { useEffect, useMemo, useRef, useState } from 'react'
import { projects, skills, timeline, achievements, type Project } from '../data.ts'
import { Search as SearchIcon, Close } from '../icons.tsx'

interface IndexItem {
  type: string
  label: string
  sub: string
  keywords: string
  run: () => void
}

interface ResultItem extends IndexItem {
  score: number
}

// Build a flat, searchable index once.
function buildIndex(onOpenProject: (p: Project) => void, scrollTo: (id: string) => void): IndexItem[] {
  return [
    ...projects.map((p) => ({
      type: 'Project',
      label: p.title,
      sub: p.tags.join(' · '),
      keywords: `${p.title} ${p.tags.join(' ')} ${p.blurb}`,
      run: () => onOpenProject(p),
    })),
    ...skills.map((s) => ({
      type: 'Skill',
      label: s.name,
      sub: `${s.tag} · ${s.level}%`,
      keywords: `${s.name} ${s.tag}`,
      run: () => scrollTo('skills'),
    })),
    ...timeline.map((t) => ({
      type: 'Experience',
      label: t.title,
      sub: t.place,
      keywords: `${t.title} ${t.place} ${t.detail}`,
      run: () => scrollTo('journey'),
    })),
    ...achievements.map((a) => ({
      type: 'Achievement',
      label: a.title,
      sub: a.detail,
      keywords: `${a.title} ${a.detail} ${a.tag}`,
      run: () => scrollTo('achievements'),
    })),
  ]
}

interface Props {
  open: boolean
  onClose: () => void
  onOpenProject: (p: Project) => void
  scrollTo: (id: string) => void
}

export default function Search({ open, onClose, onOpenProject, scrollTo }: Props) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const [prevQ, setPrevQ] = useState(q)
  const [prevOpen, setPrevOpen] = useState(open)
  const inputRef = useRef<HTMLInputElement>(null)
  const index = useMemo(() => buildIndex(onOpenProject, scrollTo), [onOpenProject, scrollTo])

  // Reset the highlighted result whenever the query changes (render-phase
  // state adjustment, not an effect — see https://react.dev/learn/you-might-not-need-an-effect).
  if (q !== prevQ) {
    setPrevQ(q)
    setActive(0)
  }
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) setQ('')
  }

  const results = useMemo<ResultItem[]>(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    return index
      .map((item): ResultItem | null => {
        const hay = `${item.label} ${item.sub} ${item.keywords}`.toLowerCase()
        if (!hay.includes(term)) return null
        // Rank: label starts-with > label includes > body includes.
        let score = 2
        if (item.label.toLowerCase().startsWith(term)) score = 0
        else if (item.label.toLowerCase().includes(term)) score = 1
        return { ...item, score }
      })
      .filter((item): item is ResultItem => item !== null)
      .sort((a, b) => a.score - b.score)
      .slice(0, 8)
  }, [q, index])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((a) => Math.min(a + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((a) => Math.max(a - 1, 0))
      } else if (e.key === 'Enter' && results[active]) {
        pick(results[active])
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, results, active])

  function pick(item: ResultItem) {
    onClose()
    item.run()
  }

  if (!open) return null

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-input">
          <span className="search-input__icon">{SearchIcon}</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects, skills, experience…"
            aria-label="Search"
          />
          <button className="search-input__close" onClick={onClose} aria-label="Close search">
            {Close}
          </button>
        </div>

        {q.trim() && (
          <div className="search-results">
            {results.length === 0 ? (
              <div className="search-empty">No matches for “{q}”.</div>
            ) : (
              results.map((r, i) => (
                <button
                  key={`${r.type}-${r.label}`}
                  className={`search-result ${i === active ? 'active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => pick(r)}
                >
                  <span className="search-result__type">{r.type}</span>
                  <span className="search-result__label">{r.label}</span>
                  <span className="search-result__sub">{r.sub}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
