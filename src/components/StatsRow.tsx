import Row from './Row.tsx'
import StatCard from './cards/StatCard.tsx'
import ContributionCard from './cards/ContributionCard.tsx'
import useLiveStats from '../useLiveStats.ts'

interface Props {
  title: string
}

/**
 * Live GitHub + LeetCode numbers. Falls back gracefully through
 * cache -> hardcoded snapshot (see useLiveStats) so this row never looks
 * broken, it just quietly drops the "LIVE" badge.
 */
export default function StatsRow({ title }: Props) {
  const { stats, source, loading } = useLiveStats()
  const { github, leetcode } = stats

  const badge =
    source === 'live' ? (
      <span className="stats-badge stats-badge--live">
        <span className="stats-badge__dot" /> LIVE
      </span>
    ) : (
      <span className="stats-badge">as of {stats.fetchedAt.slice(0, 10)}</span>
    )

  return (
    <Row
      id="stats"
      title={
        <>
          {title} {badge}
        </>
      }
      loading={loading}
      skeletonCount={4}
      skeletonVariant="stat"
    >
      <StatCard
        label="LeetCode Solved"
        value={leetcode.solved}
        breakdown={{ easy: leetcode.easy, medium: leetcode.medium, hard: leetcode.hard }}
      />
      <StatCard label="Global Ranking" value={`#${leetcode.ranking.toLocaleString()}`} sub="LeetCode" />
      <StatCard label="GitHub Stars" value={github.stars} sub={`Across ${github.repos} repos`} />
      <StatCard label="Public Repos" value={github.repos} sub={`${github.followers} followers`} />
      {github.contributions && (
        <ContributionCard total={github.contributions.total} weeks={github.contributions.weeks} />
      )}
    </Row>
  )
}
