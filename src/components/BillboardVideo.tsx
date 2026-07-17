import { useEffect, useRef, useState } from 'react'
import { VolumeOn, VolumeOff } from '../icons.tsx'
import { playTick } from '../sound.ts'

interface Props {
  videoSrc: string
  webmSrc?: string
  poster: string
}

/**
 * Netflix-style billboard video: the poster shows instantly, and after a
 * short beat the (muted, looping) video starts and crossfades in. Pauses
 * whenever the tab is hidden or the billboard scrolls out of view.
 */
export default function BillboardVideo({ videoSrc, webmSrc, poster }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // `armed` gates the download (src is only set once true); `playing` drives
  // the poster→video crossfade.
  const [armed, setArmed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  // The Netflix beat: let the poster land before the video starts.
  useEffect(() => {
    const t = setTimeout(() => setArmed(true), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!armed) return
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {
      // Autoplay refused (rare with muted+playsInline) — the poster stays.
    })

    const onVisibility = () => {
      if (document.hidden) video.pause()
      else video.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Don't burn battery once the billboard is scrolled away.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 },
    )
    if (wrapRef.current) io.observe(wrapRef.current)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
    }
  }, [armed])

  function toggleMute() {
    const next = !muted
    setMuted(next)
    if (videoRef.current) videoRef.current.muted = next
    // The track is silent by design; the blip confirms the toggle regardless.
    if (!next) playTick()
  }

  return (
    <div className="bvideo" ref={wrapRef}>
      <img className="bvideo__poster" src={poster} alt="" aria-hidden />
      {armed && (
        <video
          ref={videoRef}
          className={`bvideo__video ${playing ? 'is-playing' : ''}`}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          onPlaying={() => setPlaying(true)}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <button
        className="trailer__mute bvideo__mute"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute trailer' : 'Mute trailer'}
        title={muted ? 'Sound off' : 'Sound on'}
      >
        {muted ? VolumeOff : VolumeOn}
      </button>
    </div>
  )
}
