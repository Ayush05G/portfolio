import { type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { track } from '@vercel/analytics'
import { Play, Close, Github } from '../icons.tsx'
import type { Project } from '../data.ts'
import useDialog from '../useDialog.ts'

interface Props {
  item: Project | null
  onClose: () => void
}

function Paragraphs({ text }: { text: string }) {
  return text
    .trim()
    .split(/\n\s*\n|\n/)
    .filter(Boolean)
    .map((paragraph, index) => (
      <p className="modal__desc" key={index}>
        {paragraph}
      </p>
    ))
}

/** Project overview, evidence, and optional external case study. */
export default function DetailModal({ item, onClose }: Props) {
  const { dialogRef, titleId } = useDialog({ open: !!item, onClose })

  if (!item) return null

  const image = item.screenshot || item.image
  const study = item.caseStudy
  const description = item.longDescription?.trim()
  const hasTechnicalDetails =
    description && description !== item.blurb.trim() && (study || description.length > 600)

  return (
    <motion.div
      className="modal__backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{ '--card-accent': item.accent } as CSSProperties}
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="dialog__header modal__header">
          <span className="modal__header-title" aria-hidden="true">
            {item.title}
          </span>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close project details"
            data-dialog-initial-focus
          >
            {Close}
          </button>
        </div>
        <div className={`modal__hero ${image ? 'modal__hero--has-image' : ''}`}>
          {image && (
            <img
              className="modal__shot"
              src={image}
              alt={item.screenshot ? `${item.title} screenshot` : ''}
            />
          )}
          <h2 className="modal__htitle" id={titleId}>
            {item.title}
          </h2>
        </div>

        <div className="modal__body">
          {(item.link || item.repo || item.caseStudyUrl) && (
            <div className="modal__actions">
              {item.link && (
                <a
                  className="nf-btn nf-btn--play"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('demo_clicked', { project: item.slug })}
                >
                  {Play} {item.accessNote ? 'Open app' : 'Live demo'}
                </a>
              )}
              {item.repo && (
                <a
                  className="nf-btn nf-btn--info"
                  href={item.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('code_clicked', { project: item.slug })}
                >
                  {Github} View Code
                </a>
              )}
              {item.caseStudyUrl && (
                <a
                  className="nf-btn nf-btn--info"
                  href={item.caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('case_study_opened', { project: item.slug })}
                >
                  Read Case Study
                </a>
              )}
            </div>
          )}

          {item.accessNote && <p className="modal__access-note">{item.accessNote}</p>}

          <div className="modal__meta">
            <span>{item.year}</span>
            <span className="billboard__badge">Project</span>
            {item.status && <span className="modal__status">{item.status}</span>}
          </div>

          <Paragraphs text={study || hasTechnicalDetails ? item.blurb : description || item.blurb} />

          {item.role && !study && (
            <section className="modal__section">
              <h3>My role</h3>
              <Paragraphs text={item.role} />
            </section>
          )}
          {item.outcome && (
            <section className="modal__section">
              <h3>Outcome</h3>
              <Paragraphs text={item.outcome} />
            </section>
          )}
          {study && (
            <div className="modal__case-study">
              {[
                ['Problem', study.problem],
                ['My role', study.role || item.role],
                ['Key decision', study.decision],
              ].map(
                ([heading, text]) =>
                  text && (
                    <section className="modal__section" key={heading}>
                      <h3>{heading}</h3>
                      <Paragraphs text={text} />
                    </section>
                  ),
              )}
              {study.evidence.length > 0 && (
                <section className="modal__section">
                  <h3>Evidence</h3>
                  <ul className="modal__evidence">
                    {study.evidence.map((evidence, index) => (
                      <li key={index}>{evidence}</li>
                    ))}
                  </ul>
                </section>
              )}
              {study.limitations && (
                <section className="modal__section">
                  <h3>Limitations</h3>
                  <Paragraphs text={study.limitations} />
                </section>
              )}
            </div>
          )}

          {hasTechnicalDetails && (
            <details className="modal__technical">
              <summary>Technical details</summary>
              <Paragraphs text={description} />
            </details>
          )}

          <div className="modal__tags">
            {item.tags.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
