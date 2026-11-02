import { flushSync } from 'react-dom'
import { Close } from '../icons.tsx'
import useDialog from '../useDialog.ts'
import useSound from '../useSound.ts'

interface Props {
  onClose: () => void
  onSearch: () => void
  onProfiles: () => void
  onIntro: () => void
}

export default function MoreMenu({ onClose, onSearch, onProfiles, onIntro }: Props) {
  const { dialogRef, titleId } = useDialog({ open: true, onClose })
  const { enabled, toggle } = useSound()

  function closeAndRun(action: () => void) {
    flushSync(onClose)
    action()
  }

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="more-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId}>More</h2>
        <button
          className="more-menu__close"
          onClick={onClose}
          aria-label="Close more menu"
          data-dialog-initial-focus
        >
          {Close}
        </button>
        <a href="#about" onClick={onClose}>
          About
        </a>
        <a href="#journey" onClick={onClose}>
          Experience
        </a>
        <a href="#skills" onClick={onClose}>
          Skills
        </a>
        <button onClick={() => closeAndRun(onSearch)}>Search</button>
        <button onClick={() => closeAndRun(onProfiles)}>Choose profile</button>
        <button onClick={() => closeAndRun(onIntro)}>Play intro</button>
        <button onClick={toggle} aria-pressed={enabled}>
          Sound {enabled ? 'on' : 'off'}
        </button>
      </div>
    </div>
  )
}
