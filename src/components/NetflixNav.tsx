import { type ProfileSummary } from '../data.ts'
import { Search as SearchIcon, VolumeOn, VolumeOff } from '../icons.tsx'
import useSound from '../useSound.ts'
interface Props {
  activeProfile: ProfileSummary | null
  onSwitchProfile: () => void
  onOpenSearch: () => void
  resumeUrl?: string
  onOpenResume: () => void
  onOpenMore: () => void
}
export default function NetflixNav({
  activeProfile,
  onSwitchProfile,
  onOpenSearch,
  onOpenResume,
  onOpenMore,
}: Props) {
  const { enabled, toggle } = useSound()
  return (
    <nav className="nav solid" aria-label="Main navigation">
      <div className="nav__left">
        <a href="#billboard" className="nav__logo">
          AYUSH
        </a>
        <div className="desktop-links">
          <a href="#projects">Work</a>
          <a href="#journey">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div className="nav__right">
        <button className="nav__search-btn" onClick={onOpenSearch} aria-label="Search portfolio">
          {SearchIcon}
        </button>
        <button
          className="sound-toggle"
          onClick={toggle}
          aria-pressed={enabled}
          aria-label={enabled ? 'Turn sound off' : 'Turn sound on'}
        >
          {enabled ? VolumeOn : VolumeOff}
        </button>
        <button className="nav__resume" onClick={onOpenResume}>
          Resume
        </button>
        <button className="view-switch" onClick={onSwitchProfile} aria-label="Choose viewing profile">
          {activeProfile?.name || 'Choose view'} ▾
        </button>
        <button className="nav-more" onClick={onOpenMore} aria-haspopup="dialog" aria-label="More options">
          •••
        </button>
      </div>
    </nav>
  )
}
