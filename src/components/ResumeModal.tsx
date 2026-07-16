import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Close, Download } from '../icons.tsx'

interface Props {
  url?: string
  onClose: () => void
}

/**
 * In-page résumé preview — embeds the PDF via <iframe> so visitors never
 * leave the site. `url` is the active profile's résumé path, or null when
 * closed.
 */
export default function ResumeModal({ url, onClose }: Props) {
  useEffect(() => {
    if (!url) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [url, onClose])

  if (!url) return null

  return (
    <motion.div
      className="modal__backdrop resume-modal__backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="resume-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.97, opacity: 0, y: 10 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="resume-modal__header">
          <span>Résumé</span>
          <div className="resume-modal__actions">
            <a className="resume-modal__link" href={url} download>
              {Download} Download
            </a>
            <button className="resume-modal__close" onClick={onClose} aria-label="Close">
              {Close}
            </button>
          </div>
        </div>
        <iframe className="resume-modal__frame" src={url} title="Résumé" />
      </motion.div>
    </motion.div>
  )
}
