interface NetworkInformation {
  saveData?: boolean
  effectiveType?: string
}

export type TrailerMode = 'video' | 'poster' | 'typewriter'

/**
 * The decision ladder for what the billboard trailer slot should show.
 * Computed once per mount — it decides whether a video is downloaded at all,
 * so it should not flip mid-session.
 */
export function pickTrailerMode(hasTrailer: boolean): TrailerMode {
  if (!hasTrailer || typeof window === 'undefined') return 'typewriter'
  // Reduced motion: even the typewriter animates, so show the still poster.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'poster'
  // Small screens / data-saver / slow networks never auto-download video.
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (conn?.saveData || conn?.effectiveType?.includes('2g')) return 'typewriter'
  if (window.innerWidth < 760) return 'typewriter'
  return 'video'
}
