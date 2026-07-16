import { useCallback, useState } from 'react'

/**
 * Tracks whether an <img> has finished loading so it can fade in over a
 * skeleton.
 *
 * The ref callback is the important part: an image served from cache can
 * finish before React attaches onLoad, and without the `complete` check it
 * would stay stuck at opacity 0 forever. onError also counts as "done" — a
 * broken image should not leave a skeleton shimmering indefinitely.
 */
export default function useImageLoaded() {
  const [loaded, setLoaded] = useState(false)

  const ref = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setLoaded(true)
  }, [])

  const done = () => setLoaded(true)

  return { loaded, imgProps: { ref, onLoad: done, onError: done } }
}
