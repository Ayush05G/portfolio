import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Play } from '../icons.tsx'
import type { Episode } from '../data.ts'
import useImageLoaded from '../useImageLoaded.ts'

interface Props {
  item: Episode
}

/** One row of the episode list. Click anywhere on it to expand the synopsis. */
export default function EpisodeItem({ item }: Props) {
  const [open, setOpen] = useState(false)
  const { loaded, imgProps } = useImageLoaded()

  return (
    <li className={`episode ${open ? 'episode--open' : ''}`}>
      <button className="episode__main" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="episode__num">{item.number}</span>

        <span className={`episode__thumb ${loaded ? '' : 'skeleton'}`}>
          {item.thumbnail && (
            <img
              className={`episode__img img-fade ${loaded ? 'is-loaded' : ''}`}
              src={item.thumbnail}
              alt=""
              loading="lazy"
              {...imgProps}
            />
          )}
          <span className="episode__play">{Play}</span>
        </span>

        <span className="episode__body">
          <span className="episode__head">
            <span className="episode__title">{item.title}</span>
            {item.duration && <span className="episode__duration">{item.duration}</span>}
          </span>
          <span className="episode__place">{item.place}</span>
          <span className="episode__when">{item.when}</span>

          <span className={`episode__synopsis ${open ? 'is-open' : ''}`}>{item.synopsis}</span>

          {open && item.highlight && (
            <motion.span
              className="episode__highlight"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.highlight}
            </motion.span>
          )}
        </span>

        <span className={`episode__chevron ${open ? 'open' : ''}`} aria-hidden>
          {ChevronDown}
        </span>
      </button>
    </li>
  )
}
