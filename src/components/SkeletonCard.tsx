export type SkeletonVariant = 'card' | 'tall' | 'top10' | 'episode' | 'stat'

interface Props {
  variant?: SkeletonVariant
}

/**
 * Shimmer placeholder shown while a row's images or data are still loading.
 * Mirrors the footprint of the real card so nothing shifts when it swaps in.
 */
export default function SkeletonCard({ variant = 'card' }: Props) {
  if (variant === 'top10') {
    return (
      <div className="skel-top10" aria-hidden>
        <div className="skel-top10__rank skeleton" />
        <div className="skel-top10__poster skeleton" />
      </div>
    )
  }

  if (variant === 'episode') {
    return (
      <div className="skel-episode" aria-hidden>
        <div className="skel-episode__num skeleton" />
        <div className="skel-episode__thumb skeleton" />
        <div className="skel-episode__body">
          <div className="skeleton skel-line" style={{ width: '45%' }} />
          <div className="skeleton skel-line" style={{ width: '65%', height: 10 }} />
          <div className="skeleton skel-line" style={{ width: '90%', height: 8 }} />
        </div>
      </div>
    )
  }

  if (variant === 'stat') {
    return (
      <div className="skel-stat" aria-hidden>
        <div className="skeleton skel-line" style={{ width: '40%', height: 8 }} />
        <div className="skeleton skel-line" style={{ width: '60%', height: 28, marginTop: 12 }} />
        <div className="skeleton skel-line" style={{ width: '80%', height: 8, marginTop: 12 }} />
      </div>
    )
  }

  return <div className={`skel-card ${variant === 'tall' ? 'skel-card--tall' : ''} skeleton`} aria-hidden />
}
