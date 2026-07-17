import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { track } from '@vercel/analytics'
import { projects, skills, type Project } from '../data.ts'
import { getRecommendations } from '../lib/recommend.ts'
import Row from './Row.tsx'
import ProjectCard from './cards/ProjectCard.tsx'
import SkillCard from './cards/SkillCard.tsx'

interface Props {
  watched: Project
  onOpenProject: (p: Project) => void
}

/** "Findesk — AI Equity-Research Assistant" reads better as just "Findesk". */
const shortTitle = (title: string) => title.split('—')[0].trim()

/**
 * The recommendation row that appears once someone has opened a project.
 * Slots in right below the projects row.
 */
export default function BecauseYouWatched({ watched, onOpenProject }: Props) {
  const recs = useMemo(() => getRecommendations(watched, projects, skills), [watched])

  useEffect(() => {
    if (recs.length) track('bcw_shown', { project: watched.slug, count: recs.length })
  }, [watched.slug, recs.length])

  if (!recs.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Row id="bcw" title={`Because you watched ${shortTitle(watched.title)}`}>
        {recs.map((r) =>
          r.kind === 'project' ? (
            <ProjectCard
              key={`p-${r.project.slug}`}
              item={r.project}
              // Keep the card's number matching the Featured Projects row.
              index={projects.findIndex((p) => p.slug === r.project.slug)}
              onOpen={onOpenProject}
            />
          ) : (
            <SkillCard key={`s-${r.skill.name}`} item={r.skill} />
          ),
        )}
      </Row>
    </motion.div>
  )
}
