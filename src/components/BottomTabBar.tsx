import type { ProfileSummary } from '../data.ts'
import { Home, Document, Search as SearchIcon } from '../icons.tsx'

interface Props {
  activeProfile: ProfileSummary | null
  resumeUrl?: string
  onOpenSearch: () => void
  onOpenResume: () => void
  onOpenProfiles: () => void
}

/**
 * Mobile-only bottom tab bar (see the ≤760px block in index.css). Mirrors the
 * Netflix app: the primary actions live within thumb reach, so the top bar can
 * stay out of the way.
 */
export default function BottomTabBar({
  activeProfile,
  resumeUrl,
  onOpenSearch,
  onOpenResume,
  onOpenProfiles,
}: Props) {
  return (
    <nav className="tabbar" aria-label="Primary">
      <button className="tabbar__item" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="tabbar__icon">{Home}</span>
        <span className="tabbar__label">Home</span>
      </button>

      <button className="tabbar__item" onClick={onOpenSearch}>
        <span className="tabbar__icon">{SearchIcon}</span>
        <span className="tabbar__label">Search</span>
      </button>

      {resumeUrl && (
        <button className="tabbar__item" onClick={onOpenResume}>
          <span className="tabbar__icon">{Document}</span>
          <span className="tabbar__label">Résumé</span>
        </button>
      )}

      <button className="tabbar__item" onClick={onOpenProfiles} aria-haspopup="dialog">
        <span className="tabbar__avatar" style={{ background: activeProfile?.color || 'var(--nf-red)' }}>
          {activeProfile?.avatar ? (
            <img src={activeProfile.avatar} alt="" />
          ) : (
            (activeProfile?.name || 'G')[0]
          )}
        </span>
        <span className="tabbar__label">Profile</span>
      </button>
    </nav>
  )
}
