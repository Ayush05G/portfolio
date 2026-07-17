import { useEffect, useState } from 'react'
import { statsConfig, statsFallback, type LiveStats } from './data.ts'

const CACHE_KEY = 'nf_stats_v1'

export type StatsSource = 'live' | 'cache' | 'fallback'

interface CacheEntry {
  data: LiveStats
  savedAt: number
}

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CacheEntry
  } catch {
    return null
  }
}

function readFreshCache(): CacheEntry | null {
  const cached = readCache()
  if (cached && Date.now() - cached.savedAt < statsConfig.cacheTtlMs) return cached
  return null
}

function writeCache(data: LiveStats) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, savedAt: Date.now() } satisfies CacheEntry))
  } catch {
    // localStorage may be unavailable (private mode, quota) — fine to skip
  }
}

/**
 * Fallback ladder: fresh localStorage cache -> live fetch -> stale
 * localStorage cache of any age -> hardcoded statsFallback. Never blocks
 * on a slow/failed network — the UI always has *something* to show.
 *
 * A fresh cache is read as the initial state (a render-time computation,
 * not an effect) so the fast path never touches the network or fires a
 * state update from inside an effect body.
 */
export default function useLiveStats() {
  const [fresh] = useState(readFreshCache)
  const [stats, setStats] = useState<LiveStats>(fresh?.data ?? statsFallback)
  const [source, setSource] = useState<StatsSource>(fresh ? 'cache' : 'fallback')
  const [loading, setLoading] = useState(!fresh)

  useEffect(() => {
    if (fresh) return // already have good-enough data — no need to refetch
    let cancelled = false

    fetch('/api/stats')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`status ${res.status}`))))
      .then((data: LiveStats) => {
        if (cancelled) return
        setStats(data)
        setSource('live')
        writeCache(data)
      })
      .catch(() => {
        if (cancelled) return
        // Fetch failed (offline, dev server with no /api, LeetCode blocked
        // upstream, etc.) — fall back to any cache we have, however old.
        const stale = readCache()
        if (stale) {
          setStats(stale.data)
          setSource('cache')
        } else {
          setStats(statsFallback)
          setSource('fallback')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [fresh])

  return { stats, source, loading }
}
