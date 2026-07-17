import type { Project, Skill } from '../data.ts'

export type Recommendation =
  { kind: 'project'; project: Project; score: number } | { kind: 'skill'; skill: Skill; score: number }

/** So that the tag "Next.js 14" and the skill "Next.js" are the same thing. */
const normalize = (s: string) =>
  s
    .replace(/\s+v?\d+(\.\d+)*$/i, '') // drop a trailing version number
    .trim()
    .toLowerCase()

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Whole-word-ish search that still works for names regex would choke on or
 * that contain punctuation — "C++", "Next.js", "Node.js".
 */
function mentions(text: string, name: string) {
  return new RegExp(`(^|[^a-z0-9])${escapeRe(name)}([^a-z0-9]|$)`, 'i').test(text)
}

const SHARED_TAG = 5 // another project built with the same tech
const UNRELATED_PROJECT = 0.5 // still worth showing, but below every real match
const SKILL_IN_TAGS = 4
const SKILL_IN_DESCRIPTION = 2

/**
 * "Because you watched X" — what else is worth looking at, given the project
 * someone just opened.
 *
 * Projects that share tags rank highest, then skills the project actually
 * uses. Projects with nothing in common are still included as filler (this
 * portfolio only has a handful, so "more of my work" is a fair suggestion),
 * but always below a real match.
 */
export function getRecommendations(
  watched: Project,
  allProjects: Project[],
  allSkills: Skill[],
  limit = 8,
): Recommendation[] {
  // Editorial override: if a project names its own related items in data.ts,
  // trust that completely and skip scoring.
  if (watched.related?.length) {
    const picked: Recommendation[] = []
    for (const name of watched.related) {
      const project = allProjects.find((p) => p.slug === name && p.slug !== watched.slug)
      if (project) {
        picked.push({ kind: 'project', project, score: 100 })
        continue
      }
      const skill = allSkills.find((s) => s.name === name)
      if (skill) picked.push({ kind: 'skill', skill, score: 100 })
    }
    if (picked.length) return picked.slice(0, limit)
  }

  const watchedTags = watched.tags.map(normalize)
  const recs: Recommendation[] = []

  for (const project of allProjects) {
    if (project.slug === watched.slug) continue
    const shared = project.tags.filter((t) => watchedTags.includes(normalize(t))).length
    recs.push({
      kind: 'project',
      project,
      score: shared > 0 ? shared * SHARED_TAG : UNRELATED_PROJECT,
    })
  }

  for (const skill of allSkills) {
    const name = normalize(skill.name)
    let score = 0
    if (watchedTags.some((t) => t === name)) score += SKILL_IN_TAGS
    if (mentions(watched.longDescription, skill.name)) score += SKILL_IN_DESCRIPTION
    if (score > 0) recs.push({ kind: 'skill', skill, score })
  }

  return recs.sort((a, b) => b.score - a.score).slice(0, limit)
}
