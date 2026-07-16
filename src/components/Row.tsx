import { useRef, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from '../icons.tsx'
import SkeletonCard, { type SkeletonVariant } from './SkeletonCard.tsx'

interface Props {
  id: string
  title: string
  className?: string
  children: ReactNode
  /** Show shimmer placeholders instead of children while data loads. */
  loading?: boolean
  skeletonCount?: number
  skeletonVariant?: SkeletonVariant
}

/**
 * A Netflix-style horizontal carousel. `id` anchors it for the nav.
 * Children are the cards.
 */
export default function Row({
  id,
  title,
  className = '',
  children,
  loading = false,
  skeletonCount = 4,
  skeletonVariant = 'card',
}: Props) {
  const track = useRef<HTMLDivElement>(null)

  function scrollBy(dir: number) {
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
        <div className="row__track" ref={track} aria-busy={loading || undefined}>
          {loading
            ? Array.from({ length: skeletonCount }, (_, i) => (
                <SkeletonCard key={i} variant={skeletonVariant} />
              ))
            : children}
        </div>
        <button
          className="row__arrow row__arrow--right"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
        >
          {ChevronRight}
        </button>
      </div>
    </section>
  )
}
