import { motion } from 'framer-motion'
import { profiles, type ProfileSummary } from '../data.ts'
import { isKonamiUnlocked } from '../useKonami.ts'
import { Close } from '../icons.tsx'
import useDialog from '../useDialog.ts'

interface Props {
  activeId?: string
  onSelect: (p: ProfileSummary) => void
  onClose: () => void
}

/**
 * Mobile profile switcher as a drag-to-dismiss bottom sheet. The full-screen
 * gate still handles the first visit; this is the quick in-session swap.
 */
export default function ProfileSheet({ activeId, onSelect, onClose }: Props) {
  const { dialogRef, titleId } = useDialog({ open: true, onClose })

  return (
    <motion.div
      className="sheet__backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        ref={dialogRef}
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 34, stiffness: 340 }}
        // The sheet is short and never scrolls internally, so dragging
        // anywhere on it is safe — no conflict with a scrollable child.
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.45 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 90 || info.velocity.y > 500) onClose()
        }}
      >
        <div className="sheet__handle" aria-hidden />
        <div className="dialog__header sheet__header">
          <h3 className="sheet__title" id={titleId}>
            Who's watching?
          </h3>
          <button
            className="sheet__close"
            onClick={onClose}
            aria-label="Close profile switcher"
            data-dialog-initial-focus
          >
            {Close}
          </button>
        </div>

        <div className="sheet__list">
          {profiles
            .filter((p) => !p.hidden || isKonamiUnlocked())
            .map((p) => (
              <button
                key={p.id}
                className={`sheet__profile ${p.id === activeId ? 'active' : ''}`}
                onClick={() => onSelect(p)}
              >
                <span className="sheet__avatar" style={{ background: p.color }}>
                  {p.avatar ? <img src={p.avatar} alt="" /> : p.name[0]}
                </span>
                <span className="sheet__name">{p.name}</span>
                {p.id === activeId && (
                  <span className="sheet__current" aria-label="Current profile">
                    ✓
                  </span>
                )}
              </button>
            ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
