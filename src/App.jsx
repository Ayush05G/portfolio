import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  profile,
  profileConfig,
  profiles,
  projects,
  skills,
  timeline,
  achievements,
  about,
  socials,
} from './data.js'
import ProfileGate from './components/ProfileGate.jsx'
import NetflixNav from './components/NetflixNav.jsx'
import Billboard from './components/Billboard.jsx'
import Row from './components/Row.jsx'
import DetailModal from './components/DetailModal.jsx'
import { Play } from './icons.jsx'

/* Netflix-style intro flash — the little logo "sting" before the gate.
   Clicking or pressing a key skips straight to the gate. */
function Intro({ onDone, onSkip }) {
  return (
    <motion.div
      className="intro"
      role="button"
      tabIndex={0}
      onClick={onSkip}
      onKeyDown={onSkip}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="intro__logo"
        initial={{ scale: 1.4, opacity: 0, letterSpacing: '0.4em' }}
        animate={{ scale: 1, opacity: 1, letterSpacing: '0.12em' }}
        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        onAnimationComplete={onDone}
      >
        {profile.name.split(' ')[0].toUpperCase()}
      </motion.span>
    </motion.div>
  )
}

/* Project card */
function ProjectCard({ item, index, onOpen }) {
  return (
    <button
      className={`card ${item.image ? 'card--has-image' : ''}`}
      style={{ '--card-accent': item.accent }}
      onClick={() => onOpen(item)}
    >
      {item.image && <img className="card__shot" src={item.image} alt={`${item.title} preview`} loading="lazy" />}
      <div className="card__art">
        <span className="card__num">{String(index + 1).padStart(2, '0')}</span>
        <span className="card__tag">Project</span>
        <span className="card__label">{item.title}</span>
        <span className="card__sub">{item.tags.join(' · ')}</span>
      </div>
      <div className="card__hover">
        <span className="card__play">{Play}</span>
        <span className="card__hovertext">{item.match} · Click for details</span>
      </div>
    </button>
  )
}

/* Skill card */
function SkillCard({ item }) {
  return (
    <div className="card" style={{ '--card-accent': '#1f1f1f' }}>
      <div className="card__art">
        <span className="card__tag">{item.tag}</span>
        {item.logo && <img className="skill-logo" src={item.logo} alt={`${item.name} logo`} loading="lazy" />}
        <span className="card__label">{item.name}</span>
        <div className="card__bar">
          <motion.div
            className="card__fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${item.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
        <span className="card__sub" style={{ marginTop: 6 }}>
          {item.level}% fluency
        </span>
      </div>
    </div>
  )
}

/* Achievement card */
function AchievementCard({ item }) {
  return (
    <div className="card card--tall" style={{ '--card-accent': '#3a1a1a' }}>
      <div className="card__art">
        <span className="card__eyebrow">{item.tag}</span>
        <span className="card__label">{item.title}</span>
        <span className="card__sub card__sub--clamp" style={{ marginTop: 6 }}>
          {item.detail}
        </span>
      </div>
    </div>
  )
}

/* Journey card */
function JourneyCard({ item }) {
  return (
    <div className="card card--tall" style={{ '--card-accent': '#242424' }}>
      <div className="card__art">
        <span className="card__eyebrow">{item.when}</span>
        <span className="card__label">{item.title}</span>
        <span className="card__sub">{item.place}</span>
        <span className="card__sub card__sub--clamp" style={{ marginTop: 6, color: 'var(--text-faint)' }}>
          {item.detail}
        </span>
      </div>
    </div>
  )
}

/* Top 10 card — the iconic Netflix ranked row, with a giant background rank
   numeral behind a compact skill "poster". */
function Top10Card({ item, rank }) {
  return (
    <div className="top10">
      <span className="top10__rank" aria-hidden>{rank}</span>
      <div className="top10__poster" style={{ '--card-accent': '#1a1a1a' }}>
        {item.logo && <img className="top10__logo" src={item.logo} alt={`${item.name} logo`} loading="lazy" />}
        <span className="top10__name">{item.name}</span>
        <span className="top10__level">{item.level}%</span>
      </div>
    </div>
  )
}

const firstName = profile.name.split(' ')[0]
// Top 10 = the highest-fluency skills, ranked.
const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 10)
const DEFAULT_ORDER = ['projects', 'top10', 'skills', 'achievements', 'journey']

// A ?profile=<id> URL param jumps straight into a tailored view — handy for
// sharing a recruiter-specific link, and it skips the intro + gate.
const initialProfile = (() => {
  if (typeof window === 'undefined') return null
  const id = new URLSearchParams(window.location.search).get('profile')
  return profiles.find((p) => p.id === id) || null
})()

export default function App() {
  const [phase, setPhase] = useState(initialProfile ? 'app' : 'intro') // 'intro' | 'gate' | 'app'
  const [activeProfile, setActiveProfile] = useState(initialProfile)
  const [modalItem, setModalItem] = useState(null)

  // Fallback: guarantee the intro never hangs (e.g. if loaded in a background
  // tab where the animation's rAF is throttled and onAnimationComplete stalls).
  useEffect(() => {
    if (phase !== 'intro') return
    const t = setTimeout(() => setPhase('gate'), 2600)
    return () => clearTimeout(t)
  }, [phase])

  function scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const config = activeProfile ? profileConfig[activeProfile.id] : null

  // Row definitions, keyed by id so profiles can reorder them freely.
  const rowDefs = {
    projects: {
      title: 'Featured Projects',
      children: projects.map((p, i) => (
        <ProjectCard key={p.title} item={p} index={i} onOpen={setModalItem} />
      )),
    },
    top10: {
      title: `Top 10 in ${firstName}'s Stack Today`,
      className: 'row--top10',
      children: topSkills.map((s, i) => <Top10Card key={s.name} item={s} rank={i + 1} />),
    },
    skills: {
      title: 'Skills & Technologies',
      children: skills.map((s) => <SkillCard key={s.name} item={s} />),
    },
    achievements: {
      title: 'Achievements & Certifications',
      children: achievements.map((a) => <AchievementCard key={a.title} item={a} />),
    },
    journey: {
      title: 'Experience & Education',
      children: timeline.map((t) => <JourneyCard key={t.title} item={t} />),
    },
  }

  const order = config?.order || DEFAULT_ORDER

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <Intro
            key="intro"
            onDone={() => setTimeout(() => setPhase('gate'), 550)}
            onSkip={() => setPhase('gate')}
          />
        )}

        {phase === 'gate' && (
          <ProfileGate
            key="gate"
            onSelect={(p) => {
              setActiveProfile(p)
              setPhase('app')
              window.scrollTo(0, 0)
            }}
          />
        )}
      </AnimatePresence>

      {phase === 'app' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <NetflixNav activeProfile={activeProfile} onSwitchProfile={() => setPhase('gate')} />

          <Billboard config={config} onMoreInfo={scrollToAbout} />

          <div className="rows">
            {order.map((id, idx) => {
              const def = rowDefs[id]
              if (!def) return null
              const title =
                idx === 0 && activeProfile
                  ? `Today's Top Picks for ${activeProfile.name}`
                  : def.title
              return (
                <Row key={id} id={id} title={title} className={def.className || ''}>
                  {def.children}
                </Row>
              )
            })}
          </div>

          {/* About panel */}
          <section className="panel" id="about">
            <h2 className="panel__title">About {profile.name.split(' ')[0]}</h2>
            <div className="about-grid">
              <div>
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="facts">
                {about.facts.map((f) => (
                  <div className="fact" key={f.label}>
                    <div className="fact__label">{f.label}</div>
                    <div className="fact__value">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact panel */}
          <section className="panel" id="contact">
            <h2 className="panel__title">Let's Connect</h2>
            <div className="social-row">
              {socials.map((s) => (
                <a
                  className="social-card"
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="social-card__label">{s.label}</div>
                  <div className="social-card__handle">{s.handle}</div>
                </a>
              ))}
            </div>
          </section>

          <footer className="footer">
            Designed & built by <strong>{profile.name}</strong> · © {new Date().getFullYear()} ·
            Netflix-inspired, not affiliated with Netflix.
          </footer>
        </motion.div>
      )}

      <AnimatePresence>
        {modalItem && <DetailModal item={modalItem} onClose={() => setModalItem(null)} />}
      </AnimatePresence>
    </>
  )
}
