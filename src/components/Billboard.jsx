import { motion } from 'framer-motion'
import { profile } from '../data.js'
import { Play, Info } from '../icons.jsx'

/**
 * The featured "title" hero — you, presented like Netflix's billboard.
 */
export default function Billboard({ onMoreInfo }) {
  const fade = (delay) => ({
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
          <span className="n">N</span> PORTFOLIO
        </motion.div>

        <motion.h1 className="billboard__title" {...fade(0.08)}>
          {profile.name}
        </motion.h1>

        <motion.div className="billboard__meta" {...fade(0.16)}>
          <span className="billboard__match">{profile.match}</span>
          <span>{profile.year}</span>
          <span className="billboard__badge">{profile.rating}</span>
          <span className="billboard__genres">{profile.genres.join(' · ')}</span>
        </motion.div>

        <motion.p className="billboard__desc" {...fade(0.24)}>
          {profile.tagline}
        </motion.p>

        <motion.div className="billboard__actions" {...fade(0.32)}>
          <a
            className="nf-btn nf-btn--play"
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {Play} View Work
          </a>
          <button className="nf-btn nf-btn--info" onClick={onMoreInfo}>
            {Info} More Info
          </button>
        </motion.div>
      </div>
    </section>
  )
}
