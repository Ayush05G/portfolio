import { useEffect } from 'react'

const isCard = (el) => el?.classList?.contains('card') || el?.classList?.contains('top10')

/**
 * Netflix-style keyboard navigation for the browse rows: arrow keys move
 * focus between cards (left/right within a row, up/down across rows,
 * landing on the nearest horizontal match), Home/End jump to row edges.
 * Only active while focus is already on a card (doesn't hijack the page).
 */
export default function useRowNav() {
  useEffect(() => {
    function onKeyDown(e) {
      const active = document.activeElement
      if (!isCard(active)) return
      const track = active.closest('.row__track')
      if (!track) return

      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const cards = [...track.children]
        const next = cards[cards.indexOf(active) + (e.key === 'ArrowRight' ? 1 : -1)]
        next?.focus()
        next?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const tracks = [...document.querySelectorAll('.row__track')]
        const targetTrack = tracks[tracks.indexOf(track) + (e.key === 'ArrowDown' ? 1 : -1)]
        if (!targetTrack || !targetTrack.children.length) return
        const activeLeft = active.getBoundingClientRect().left
        let best = targetTrack.children[0]
        let bestDist = Infinity
        for (const c of targetTrack.children) {
          const dist = Math.abs(c.getBoundingClientRect().left - activeLeft)
          if (dist < bestDist) {
            bestDist = dist
            best = c
          }
        }
        best.focus()
        best.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
      } else if (e.key === 'Home') {
        e.preventDefault()
        const first = track.children[0]
        first?.focus()
        first?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
      } else if (e.key === 'End') {
        e.preventDefault()
        const last = track.children[track.children.length - 1]
        last?.focus()
        last?.scrollIntoView({ behavior: 'smooth', inline: 'end' })
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])
}
