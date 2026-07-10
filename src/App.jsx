import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, projects, skills, timeline, about, socials } from './data.js'
import ProfileGate from './components/ProfileGate.jsx'
import NetflixNav from './components/NetflixNav.jsx'
import Billboard from './components/Billboard.jsx'
import Row from './components/Row.jsx'
import DetailModal from './components/DetailModal.jsx'
import { Play } from './icons.jsx'

/* Netflix-style intro flash — the little logo "sting" before the gate. */
function Intro({ onDone }) {
  return (
    <motion.div
      className="intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {}}
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
    <button className="card" style={{ '--card-accent': item.accent }} onClick={() => onOpen(item)}>
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

/* Journey card */
function JourneyCard({ item }) {
  return (
    <div className="card" style={{ '--card-accent': '#242424' }}>
      <div className="card__art">
        <span className="card__tag">{item.when}</span>
        <span className="card__label">{item.title}</span>
        <span className="card__sub">{item.place}</span>
        <span className="card__sub" style={{ marginTop: 6, color: 'var(--text-faint)' }}>
          {item.detail}
        </span>
      </div>
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState('intro') // 'intro' | 'gate' | 'app'
  const [activeProfile, setActiveProfile] = useState(null)
  const [modalItem, setModalItem] = useState(null)

  function scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === 'intro' && <Intro key="intro" onDone={() => setTimeout(() => setPhase('gate'), 550)} />}

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
          <NetflixNav activeProfile={activeProfile} />

          <Billboard onMoreInfo={scrollToAbout} />

          <div className="rows">
            <Row id="projects" title="Featured Projects">
              {projects.map((p, i) => (
                <ProjectCard key={p.title} item={p} index={i} onOpen={setModalItem} />
              ))}
            </Row>

            <Row id="skills" title="Skills & Technologies">
              {skills.map((s) => (
                <SkillCard key={s.name} item={s} />
              ))}
            </Row>

            <Row id="journey" title="My Journey">
              {timeline.map((t) => (
                <JourneyCard key={t.title} item={t} />
              ))}
            </Row>
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
            <button className="footer__switch" onClick={() => setPhase('gate')}>
              Switch profile
            </button>
          </footer>
        </motion.div>
      )}

      <AnimatePresence>
        {modalItem && <DetailModal item={modalItem} onClose={() => setModalItem(null)} />}
      </AnimatePresence>
    </>
  )
}
