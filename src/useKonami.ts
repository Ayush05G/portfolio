import { useEffect, useRef, useState } from 'react'
import { playEntryChime } from './sound.ts'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

const KONAMI_KEY = 'nf_konami'

export const isKonamiUnlocked = () => {
  try {
    return localStorage.getItem(KONAMI_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Listens for the Konami code (↑↑↓↓←→←→BA). Returns whether the hidden
 * profile is unlocked; `onUnlock` fires once, from the keydown handler, at
 * the moment it happens — the right place for side effects like a toast.
 */
export default function useKonami(onUnlock?: () => void) {
  const [unlocked, setUnlocked] = useState(isKonamiUnlocked)
  const onUnlockRef = useRef(onUnlock)
  useEffect(() => {
    onUnlockRef.current = onUnlock
  }, [onUnlock])

  useEffect(() => {
    if (unlocked) return
    let progress = 0
    function onKey(e: KeyboardEvent) {
      // Don't eat keystrokes typed into inputs (the search palette).
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === SEQUENCE[progress]) {
        progress++
        if (progress === SEQUENCE.length) {
          try {
            localStorage.setItem(KONAMI_KEY, '1')
          } catch {
            /* ignore */
          }
          playEntryChime()
          setUnlocked(true)
          onUnlockRef.current?.()
        }
      } else {
        // Allow immediately restarting the sequence on a stray ArrowUp.
        progress = key === SEQUENCE[0] ? 1 : 0
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [unlocked])

  return unlocked
}
