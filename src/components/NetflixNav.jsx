import { useEffect, useRef, useState } from 'react'
import { profile } from '../data.js'
import { ChevronDown } from '../icons.jsx'

const links = [
  { id: 'billboard', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Awards' },
  { id: 'journey', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function NetflixNav({ activeProfile, onSwitchProfile }) {
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('billboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false) // mobile links drawer
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const firstName = profile.name.split(' ')[0].toUpperCase()

  function go(e, id) {
    e.preventDefault()
    setNavOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const AvatarImg = ({ className }) =>
    activeProfile?.avatar ? (
      <img className={className} src={activeProfile.avatar} alt={activeProfile.name} />
    ) : (
      (activeProfile?.name || firstName)[0]
    )

  return (
    <nav className={`nav ${solid ? 'solid' : ''}`}>
      <div className="nav__left">
        <button
          className={`nav__burger ${navOpen ? 'open' : ''}`}
          onClick={() => setNavOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={navOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <a href="#billboard" className="nav__logo" onClick={(e) => go(e, 'billboard')}>
          {firstName}
        </a>
        <div className={`nav__links ${navOpen ? 'open' : ''}`}>
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              className={`nav__link ${active === l.id ? 'active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="nav__right">
        {profile.resumeUrl && (
          <a className="nav__resume" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            Résumé
          </a>
        )}
        <div className="nav__account" ref={menuRef}>
          <button
            className="nav__account-trigger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <span
              className="nav__avatar"
              style={{ background: activeProfile?.color || 'var(--nf-red)' }}
              title={activeProfile?.name}
            >
              <AvatarImg className="nav__avatar-img" />
            </span>
            <span className={`nav__caret ${menuOpen ? 'open' : ''}`}>{ChevronDown}</span>
          </button>

          {menuOpen && (
            <div className="nav__dropdown">
              <div className="nav__dropdown-current">
                <span
                  className="nav__avatar nav__avatar--sm"
                  style={{ background: activeProfile?.color || 'var(--nf-red)' }}
                >
                  <AvatarImg className="nav__avatar-img" />
                </span>
                <span className="nav__dropdown-name">{activeProfile?.name || 'Guest'}</span>
              </div>
              <button
                className="nav__dropdown-item"
                onClick={() => {
                  setMenuOpen(false)
                  onSwitchProfile?.()
                }}
              >
                Switch profile
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
