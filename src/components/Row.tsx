import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from '../icons.jsx'

/**
 * A Netflix-style horizontal carousel. `id` anchors it for the nav.
 * Children are the cards.
 */
export default function Row({ id, title, className = '', children }) {
  const track = useRef(null)

  function scrollBy(dir) {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className={`row ${className}`} id={id}>
      <h2 className="row__title">{title}</h2>
      <div className="row__viewport">
        <button className="row__arrow row__arrow--left" onClick={() => scrollBy(-1)} aria-label="Scroll left">
          {ChevronLeft}
        </button>
        <div className="row__track" ref={track}>
          {children}
        </div>
        <button className="row__arrow row__arrow--right" onClick={() => scrollBy(1)} aria-label="Scroll right">
          {ChevronRight}
        </button>
      </div>
    </section>
  )
}
