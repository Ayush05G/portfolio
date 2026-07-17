import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { profile, type ProfileConfig } from '../data.ts'
import { Play, Info, VolumeOn, VolumeOff } from '../icons.tsx'
import { playTick, playEntryChime } from '../sound.ts'
import BillboardVideo from './BillboardVideo.tsx'
import { pickTrailerMode } from '../lib/trailerMode.ts'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

interface TrailerProps {
  lines: string[]
  muted: boolean
  onToggleMute: () => void
}

/**
 * The billboard "trailer": a looping typewriter that types out real facts
 * about the work, like a muted preview reel. A round Netflix-style sound
 * toggle turns soft keystroke ticks on/off (starts muted, as trailers do).
 */
function Trailer({ lines, muted, onToggleMute }: TrailerProps) {
  const [text, setText] = useState('')
  const state = useRef({ line: 0, char: 0, deleting: false })
  const mutedRef = useRef(muted)
  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const s = state.current
      const full = lines[s.line % lines.length]
      if (!s.deleting) {
        s.char++
        setText(full.slice(0, s.char))
        if (!mutedRef.current && s.char <= full.length) playTick()
        if (s.char >= full.length) {
          s.deleting = true
          timer = setTimeout(tick, 1900)
          return
        }
        timer = setTimeout(tick, 45 + Math.random() * 45)
      } else {
        s.char -= 3
        if (s.char <= 0) {
          s.char = 0
          s.deleting = false
          s.line++
        }
        setText(full.slice(0, Math.max(0, s.char)))
        timer = setTimeout(tick, s.char <= 0 ? 350 : 18)
      }
    }
    timer = setTimeout(tick, 700)
    return () => clearTimeout(timer)
  }, [lines])

  return (
    <div className="trailer">
      <div className="trailer__screen">
        <span className="trailer__prompt">~/ayush</span>
        <span className="trailer__cmd">
          {text}
          <span className="trailer__caret" />
        </span>
      </div>
      <button
        className="trailer__mute"
        onClick={onToggleMute}
        aria-label={muted ? 'Unmute trailer' : 'Mute trailer'}
        title={muted ? 'Sound off' : 'Sound on'}
      >
        {muted ? VolumeOff : VolumeOn}
      </button>
    </div>
  )
}

interface Props {
  config: ProfileConfig | null
  onMoreInfo: () => void
}

/**
 * The featured "title" hero — you, presented like Netflix's billboard.
 * `config` is the active profile's personalization (tagline + CTA).
 */
export default function Billboard({ config, onMoreInfo }: Props) {
  const [muted, setMuted] = useState(true)
  // Decided once per mount: whether the trailer slot shows the real video,
  // a still poster (reduced motion), or the typewriter (no asset / mobile /
  // data-saver). See pickTrailerMode for the ladder.
  const [trailerMode] = useState(() => pickTrailerMode(Boolean(profile.trailer)))
  const tagline = config?.tagline || profile.tagline
  const cta = config?.cta || { label: 'View Work', target: 'projects' }

  // Tiny egg: click the match badge five times and it concedes a perfect score.
  const [matchClicks, setMatchClicks] = useState(0)
  const matchLabel = matchClicks >= 5 ? '100% Match' : profile.match
  function bumpMatch() {
    setMatchClicks((n) => {
      const next = n + 1
      if (next === 5) playEntryChime()
      return next
    })
  }

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  })

  return (
    <section className="billboard" id="billboard">
      <div className="billboard__bg" aria-hidden>
        <div className="b1" />
        <div className="b2" />
      </div>

      <div className="billboard__content">
        <motion.div className="billboard__kicker" {...fade(0)}>
          <span className="n">A</span> PORTFOLIO
        </motion.div>

        <motion.h1 className="billboard__title" {...fade(0.08)}>
          {profile.name}
        </motion.h1>

        <motion.div className="billboard__meta" {...fade(0.16)}>
          <span
            className="billboard__match billboard__match--clickable"
            onClick={bumpMatch}
            title={matchClicks >= 5 ? 'Told you.' : undefined}
          >
            {matchLabel}
          </span>
          <span>{profile.year}</span>
          <span className="billboard__badge">{profile.rating}</span>
          <span className="billboard__genres">{profile.genres.join(' · ')}</span>
        </motion.div>

        <motion.p className="billboard__desc" {...fade(0.24)}>
          {tagline}
        </motion.p>

        <motion.div className="billboard__actions" {...fade(0.32)}>
          <a
            className="nf-btn nf-btn--play"
            href={cta.href || `#${cta.target}`}
            {...(cta.href
              ? { target: '_blank', rel: 'noreferrer' }
              : {
                  onClick: (e: MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    if (cta.target) scrollTo(cta.target)
                  },
                })}
          >
            {Play} {cta.label}
          </a>
          <button className="nf-btn nf-btn--info" onClick={onMoreInfo}>
            {Info} More Info
          </button>
        </motion.div>
      </div>

      <motion.div className="billboard__trailer-wrap" {...fade(0.45)}>
        {trailerMode === 'video' && profile.trailer ? (
          <BillboardVideo
            videoSrc={profile.trailer.videoSrc}
            webmSrc={profile.trailer.webmSrc}
            poster={profile.trailer.poster}
          />
        ) : trailerMode === 'poster' && profile.trailer ? (
          <img className="bvideo bvideo--still" src={profile.trailer.poster} alt="" aria-hidden />
        ) : (
          <Trailer lines={profile.trailerLines} muted={muted} onToggleMute={() => setMuted((m) => !m)} />
        )}
      </motion.div>
    </section>
  )
}
