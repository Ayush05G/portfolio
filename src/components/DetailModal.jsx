import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Close, External, Github } from '../icons.jsx'

/**
 * Netflix-style "title" modal that opens when a project card is clicked.
 * `item` is a project object (or null when closed).
 */
export default function DetailModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <motion.div
      className="modal__backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{ '--card-accent': item.accent }}
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className={`modal__hero ${item.image ? 'modal__hero--has-image' : ''}`}>
          {item.image && <img className="modal__shot" src={item.image} alt="" />}
          <button className="modal__close" onClick={onClose} aria-label="Close">
            {Close}
          </button>
          <h2 className="modal__htitle">{item.title}</h2>
        </div>

        <div className="modal__body">
          <div className="modal__actions">
            {item.link && (
              <a className="nf-btn nf-btn--play" href={item.link} target="_blank" rel="noreferrer">
                {Play} Live Demo
              </a>
            )}
            {item.repo && (
              <a className="nf-btn nf-btn--info" href={item.repo} target="_blank" rel="noreferrer">
                {Github} View Code
              </a>
            )}
          </div>

          <div className="modal__meta">
            <span className="billboard__match">{item.match}</span>
            <span>{item.year}</span>
            <span className="billboard__badge">Project</span>
          </div>

          <p className="modal__desc">{item.longDescription || item.blurb}</p>

          <div className="modal__tags">
            {item.tags.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
