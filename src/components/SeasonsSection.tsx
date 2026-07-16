import { useState } from 'react'
import { motion } from 'framer-motion'
import { track } from '@vercel/analytics'
import { seasons, type Season } from '../data.ts'
import SeasonPicker from './SeasonPicker.tsx'
import EpisodeItem from './EpisodeItem.tsx'

interface Props {
  /** The section heading — App personalizes this for the first section. */
  title: string
}

/**
 * Experience & education as a Netflix title page: a season selector over an
 * episode list. Renders full-width (not a card carousel), but keeps
 * id="journey" so the nav link, profile row ordering, and deep links all
 * keep working.
 */
export default function SeasonsSection({ title }: Props) {
  // Open on the most recent season — the newest work matters most here.
  const [activeId, setActiveId] = useState(seasons[seasons.length - 1].id)
  const season = seasons.find((s) => s.id === activeId) ?? seasons[0]

  function selectSeason(s: Season) {
    setActiveId(s.id)
    track('season_selected', { season: s.id })
  }

  return (
    <section className="panel seasons" id="journey">
      <div className="seasons__top">
        <h2 className="panel__title">{title}</h2>
        <SeasonPicker seasons={seasons} activeId={activeId} onSelect={selectSeason} />
      </div>

      {/* Keyed, but deliberately NOT wrapped in AnimatePresence: `mode="wait"`
          would hold the old season on screen until an exit animation finishes,
          so a stalled animation (e.g. a throttled background tab) would leave
          the content stale. Remounting on key change swaps instantly and still
          replays this fade-in. */}
      <motion.div
        key={season.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
      >
        <div className="seasons__meta">
          <span className="seasons__name">{season.title}</span>
          <span className="seasons__dot">·</span>
          <span>{season.years}</span>
          <span className="seasons__dot">·</span>
          <span>
            {season.episodes.length} Episode{season.episodes.length === 1 ? '' : 's'}
          </span>
        </div>
        <p className="seasons__synopsis">{season.synopsis}</p>

        <ol className="seasons__list">
          {season.episodes.map((ep) => (
            <EpisodeItem key={`${season.id}-${ep.number}`} item={ep} />
          ))}
        </ol>
      </motion.div>
    </section>
  )
}
