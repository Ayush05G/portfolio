import { useEffect, useState } from 'react'
import { profile } from '../data.js'

const links = [
  { id: 'billboard', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function NetflixNav({ activeProfile }) {
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('billboard')

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

  const firstName = profile.name.split(' ')[0].toUpperCase()

  function go(e, id) {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav ${solid ? 'solid' : ''}`}>
      <div className="nav__left">
        <a href="#billboard" className="nav__logo" onClick={(e) => go(e, 'billboard')}>
          {firstName}
        </a>
        <div className="nav__links">
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
        <span
          className="nav__avatar"
          style={{ background: activeProfile?.color || 'var(--nf-red)' }}
          title={activeProfile?.name}
        >
          {(activeProfile?.name || firstName)[0]}
        </span>
      </div>
    </nav>
  )
}
