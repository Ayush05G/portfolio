import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from '../icons.tsx'
import type { Season } from '../data.ts'

interface Props {
  seasons: Season[]
  activeId: string
  onSelect: (season: Season) => void
}

/**
 * The Netflix "Season 3 ▾" dropdown. Deliberately a plain button menu rather
 * than an ARIA listbox — screen readers then get Tab/Enter/Escape semantics
 * that actually match the behaviour implemented here.
 */
export default function SeasonPicker({ seasons, activeId, onSelect }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = seasons.find((s) => s.id === activeId)

  useEffect(() => {
    function onDocClick(e: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="season-picker" ref={ref}>
      <button
        className="season-picker__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Season {active?.number}
        <span className={`season-picker__caret ${open ? 'open' : ''}`}>{ChevronDown}</span>
      </button>

      {open && (
        <div className="season-picker__menu">
          {seasons.map((s) => (
            <button
              key={s.id}
              className={`season-picker__item ${s.id === activeId ? 'active' : ''}`}
              onClick={() => {
                onSelect(s)
                setOpen(false)
              }}
            >
              <span className="season-picker__item-n">Season {s.number}</span>
              <span className="season-picker__item-t">{s.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
