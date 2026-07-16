import { useEffect, useState, lazy, Suspense, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { track } from '@vercel/analytics'
import {
  profile,
  profileConfig,
  profiles,
  projects,
  skills,
  timeline,
  achievements,
  learning,
  about,
  socials,
  type ProfileSummary,
  type Project,
  type RowId,
} from './data.ts'
import NotFound from './components/NotFound.tsx'
import ProfileGate from './components/ProfileGate.tsx'
import NetflixNav from './components/NetflixNav.tsx'
import Billboard from './components/Billboard.tsx'
import Row from './components/Row.tsx'
import ProjectCard from './components/cards/ProjectCard.tsx'
import SkillCard from './components/cards/SkillCard.tsx'
import AchievementCard from './components/cards/AchievementCard.tsx'
import JourneyCard from './components/cards/JourneyCard.tsx'
import Top10Card from './components/cards/Top10Card.tsx'
import LearningCard from './components/cards/LearningCard.tsx'
import useRowNav from './useRowNav.ts'
import { playHoverTick, playModalOpen } from './sound.ts'

// Interaction-gated / below-the-fold — code-split so first paint doesn't
// pay for them.
const DetailModal = lazy(() => import('./components/DetailModal.tsx'))
const ResumeModal = lazy(() => import('./components/ResumeModal.tsx'))
const Search = lazy(() => import('./components/Search.tsx'))
const ContactForm = lazy(() => import('./components/ContactForm.tsx'))

type Phase = 'intro' | 'gate' | 'app'

interface IntroProps {
  onDone: () => void
  onSkip: () => void
}

/* Netflix-style intro flash — the little logo "sting" before the gate.
   Clicking or pressing a key skips straight to the gate. */
function Intro({ onDone, onSkip }: IntroProps) {
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

const firstName = profile.name.split(' ')[0]
// Top 10 = the highest-fluency skills, ranked.
const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 10)
const DEFAULT_ORDER: RowId[] = ['projects', 'learning', 'top10', 'skills', 'achievements', 'journey']

const STORAGE_KEY = 'nf_profile'
const findProject = (slug: string | null): Project | null => projects.find((p) => p.slug === slug) || null

// Resolve the starting profile from (1) a ?profile=<id> deep-link, or (2) the
// last profile saved on a previous visit — either one skips the intro + gate.
const initial = (() => {
  if (typeof window === 'undefined')
    return { profile: null as ProfileSummary | null, project: null as Project | null }
  const params = new URLSearchParams(window.location.search)
  const urlId = params.get('profile')
  const savedId = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY)
    } catch {
      return null
    }
  })()
  const prof = profiles.find((p) => p.id === (urlId || savedId)) || null
  const proj = prof ? findProject(params.get('project')) : null
  return { profile: prof, project: proj }
})()

interface RowDef {
  title: string
  className?: string
  children: ReactNode
}

export default function App() {
  const [phase, setPhase] = useState<Phase>(initial.profile ? 'app' : 'intro')
  const [activeProfile, setActiveProfile] = useState<ProfileSummary | null>(initial.profile)
  const [modalItem, setModalItem] = useState<Project | null>(initial.project)
  const [searchOpen, setSearchOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  // Netflix-style arrow-key navigation between/within rows.
  useRowNav()

  // A soft blip when the mouse actually enters a new card (not on every
  // mousemove within it), throttled inside playHoverTick itself.
  useEffect(() => {
    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement
      const card = target.closest('.card, .top10')
      if (!card || card.contains(e.relatedTarget as Node)) return
      playHoverTick()
    }
    document.addEventListener('mouseover', onOver)
    return () => document.removeEventListener('mouseover', onOver)
  }, [])

  // Fallback: guarantee the intro never hangs (e.g. if loaded in a background
  // tab where the animation's rAF is throttled and onAnimationComplete stalls).
  useEffect(() => {
    if (phase !== 'intro') return
    const t = setTimeout(() => setPhase('gate'), 2600)
    return () => clearTimeout(t)
  }, [phase])

  // ── URL / history sync for shareable deep-links + working back button ──
  function urlFor(profileId?: string, projectSlug?: string): string {
    const params = new URLSearchParams()
    if (profileId) params.set('profile', profileId)
    if (projectSlug) params.set('project', projectSlug)
    const qs = params.toString()
    return qs ? `?${qs}` : window.location.pathname
  }

  function selectProfile(p: ProfileSummary) {
    setActiveProfile(p)
    setModalItem(null)
    setPhase('app')
    window.scrollTo(0, 0)
    try {
      localStorage.setItem(STORAGE_KEY, p.id)
    } catch {
      /* ignore */
    }
    window.history.replaceState({ profile: p.id }, '', urlFor(p.id))
    track('profile_selected', { profile: p.id })
  }

  function switchProfile() {
    setActiveProfile(null)
    setModalItem(null)
    setPhase('gate')
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    window.history.replaceState({}, '', window.location.pathname)
  }

  function openProject(p: Project) {
    setModalItem(p)
    playModalOpen()
    window.history.pushState(
      { profile: activeProfile?.id, project: p.slug },
      '',
      urlFor(activeProfile?.id, p.slug),
    )
    track('project_opened', { project: p.slug || p.title })
  }

  function closeProject() {
    setModalItem(null)
    // If we pushed a project entry, go back so the back button stays intuitive.
    if ((window.history.state as { project?: string } | null)?.project) window.history.back()
    else window.history.replaceState({ profile: activeProfile?.id }, '', urlFor(activeProfile?.id))
  }

  // Sync modal to browser back/forward.
  useEffect(() => {
    function onPop() {
      const slug = new URLSearchParams(window.location.search).get('project')
      setModalItem(slug ? findProject(slug) : null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }
  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const config = activeProfile ? profileConfig[activeProfile.id] : null
  const resumeUrl = config?.resumeUrl || profile.resumeUrl

  function openResume() {
    setResumeOpen(true)
    playModalOpen()
    track('resume_opened', { profile: activeProfile?.id })
  }

  // Row definitions, keyed by id so profiles can reorder them freely.
  const rowDefs: Partial<Record<RowId, RowDef>> = {
    projects: {
      title: 'Featured Projects',
      children: projects.map((p, i) => <ProjectCard key={p.title} item={p} index={i} onOpen={openProject} />),
    },
    learning: {
      title: 'Continue Watching',
      children: learning.map((l) => <LearningCard key={l.name} item={l} />),
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
  const isNotFound = typeof window !== 'undefined' && window.location.pathname !== '/'

  if (isNotFound) return <NotFound />

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

        {phase === 'gate' && <ProfileGate key="gate" onSelect={selectProfile} />}
      </AnimatePresence>

      {phase === 'app' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <NetflixNav
            activeProfile={activeProfile}
            onSwitchProfile={switchProfile}
            onOpenSearch={() => setSearchOpen(true)}
            resumeUrl={resumeUrl}
            onOpenResume={openResume}
          />

          <Billboard config={config} onMoreInfo={scrollToAbout} />

          <div className="rows">
            {order.map((id, idx) => {
              const def = rowDefs[id]
              if (!def) return null
              const title =
                idx === 0 && activeProfile ? `Today's Top Picks for ${activeProfile.name}` : def.title
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
            <div className="contact-grid">
              <div className="contact-grid__left">
                <p className="contact-lead">
                  Open to full-time product & software roles. Have a role, a question, or just want to say hi?
                  Drop me a line.
                </p>
                <div className="social-row">
                  {socials.map((s) => (
                    <a className="social-card" key={s.label} href={s.url} target="_blank" rel="noreferrer">
                      <div className="social-card__label">{s.label}</div>
                      <div className="social-card__handle">{s.handle}</div>
                    </a>
                  ))}
                </div>
              </div>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </section>

          <footer className="footer">
            Designed & built by <strong>{profile.name}</strong> · © {new Date().getFullYear()} ·
            Netflix-inspired, not affiliated with Netflix.
          </footer>
        </motion.div>
      )}

      <Suspense fallback={null}>
        {searchOpen && (
          <Search
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
            onOpenProject={openProject}
            scrollTo={scrollToId}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        <AnimatePresence>
          {modalItem && <DetailModal item={modalItem} onClose={closeProject} />}
        </AnimatePresence>
      </Suspense>

      <Suspense fallback={null}>
        <AnimatePresence>
          {resumeOpen && <ResumeModal url={resumeUrl} onClose={() => setResumeOpen(false)} />}
        </AnimatePresence>
      </Suspense>
    </>
  )
}
