import { useSyncExternalStore } from 'react'
import { getSoundEnabled, setSoundEnabled, subscribeSound } from './sound.ts'
export default function useSound() {
  const enabled = useSyncExternalStore(subscribeSound, getSoundEnabled, () => false)
  return { enabled, toggle: () => setSoundEnabled(!enabled) }
}
