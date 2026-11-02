import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile, projects, type Project, type ProfileConfig } from '../data.ts'
import { Play, Document } from '../icons.tsx'
import ContactActions from './ContactActions.tsx'
import BillboardVideo from './BillboardVideo.tsx'
interface Props {
  config: ProfileConfig | null
  onMoreInfo: () => void
  onOpenResume: () => void
  onOpenProject: (p: Project) => void
}
export default function Billboard({ config, onMoreInfo, onOpenResume, onOpenProject }: Props) {
  const [reel, setReel] = useState(false)
  const featured = projects.find((p) => p.slug === 'findesk')!
  const developer = config?.resumeUrl?.includes('developer')
  return (
    <section className="billboard" id="billboard" aria-labelledby="hero-name">
      <div className="billboard__bg" aria-hidden>
        <div className="b1" />
        <div className="b2" />
      </div>
      <motion.div
        className="billboard__content"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="billboard__kicker">
          <span className="n">A</span> PRODUCTS WITH A PLOT
        </div>
        <h1 className="billboard__title" id="hero-name">
          {profile.name}
        </h1>
        <p className="hero-position">Product-minded engineer.</p>
        <p className="hero-context">Former APM Intern at Bachatt · EE, NSUT ’27</p>
        <p className="billboard__desc">
          {developer
            ? 'I build full-stack products, data pipelines and resilient systems — and test the assumptions behind them.'
            : 'I turn product problems into working software — from a fintech launch to an AI research platform and the infrastructure behind it.'}
        </p>
        <div className="billboard__actions">
          <a className="nf-btn nf-btn--play" href="#projects">
            {Play} Explore my work
          </a>
          <button className="nf-btn nf-btn--info" onClick={onOpenResume}>
            {Document} View resume
          </button>
        </div>
        <ContactActions location="hero" />
        <button className="text-button hero-about" onClick={onMoreInfo}>
          About me ↓
        </button>
      </motion.div>
      <div className="hero-feature">
        <button className="hero-feature__card" onClick={() => onOpenProject(featured)}>
          <span className="eyebrow">FEATURED BUILD · FINDESK</span>
          <img
            src={featured.screenshot || featured.image}
            alt="Findesk equity research interface"
            fetchPriority="high"
          />
          <span className="hero-feature__body">
            <strong>Research. Build. Test the evidence.</strong>
            <span>A portfolio-aware AI assistant, with a 60-case synthetic benchmark.</span>
            <span className="text-button">Explore the case study ↗</span>
          </span>
        </button>
        {profile.trailer && (
          <>
            <button className="text-button hero-reel" aria-expanded={reel} onClick={() => setReel(!reel)}>
              {reel ? 'Close trailer' : '▶ Watch the portfolio trailer'}
            </button>
            {reel && <BillboardVideo {...profile.trailer} />}
          </>
        )}
      </div>
    </section>
  )
}
