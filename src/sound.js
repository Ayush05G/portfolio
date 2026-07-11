// A shared AudioContext, created lazily on first real user gesture so we
// never trip the browser's autoplay policy.
let sharedCtx = null
function getCtx() {
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null
  if (!sharedCtx) sharedCtx = new Ctx()
  if (sharedCtx.state === 'suspended') sharedCtx.resume().catch(() => {})
  return sharedCtx
}

// A very short, soft "tick" — used for typewriter keystrokes when the
// billboard trailer's sound is toggled on.
export function playTick() {
  try {
    const ctx = getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 1200 + Math.random() * 400
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.03, now + 0.004)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.06)
  } catch {
    // Sound is a nice-to-have; never let it break anything.
  }
}

// A small synthesized "ta-dum" style entry chime, generated with the Web
// Audio API (no external audio file, no copyrighted Netflix audio).
export function playEntryChime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const now = ctx.currentTime

    const tone = (freq, start, duration, peakGain) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.0001, now + start)
      gain.gain.linearRampToValueAtTime(peakGain, now + start + duration * 0.15)
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + start)
      osc.stop(now + start + duration + 0.05)
    }

    // "ta" — short low note
    tone(146.83, 0, 0.18, 0.22) // D3
    // "dum" — richer sustained chord, arriving just after
    tone(220.0, 0.22, 0.9, 0.24) // A3
    tone(277.18, 0.22, 0.9, 0.15) // C#4

    setTimeout(() => ctx.close().catch(() => {}), 1500)
  } catch {
    // Sound is a nice-to-have; never let it break the entry flow.
  }
}
