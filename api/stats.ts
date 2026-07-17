import type { VercelRequest, VercelResponse } from '@vercel/node'

const GITHUB_USER = 'Ayush05G'
const LEETCODE_USER = 'AG2425'

interface GithubStats {
  repos: number
  stars: number
  followers: number
  contributions: { total: number; weeks: number[][] } | null
}

interface LeetcodeStats {
  solved: number
  ranking: number
  easy: number
  medium: number
  hard: number
}

async function fetchGithub(): Promise<GithubStats> {
  const result: GithubStats = { repos: 0, stars: 0, followers: 0, contributions: null }

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (res.ok) {
      const user = await res.json()
      result.repos = user.public_repos ?? 0
      result.followers = user.followers ?? 0
    }
  } catch {
    // leave defaults
  }

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (res.ok) {
      const repos = await res.json()
      if (Array.isArray(repos)) {
        result.stars = repos.reduce(
          (sum: number, r: { stargazers_count?: number }) => sum + (r.stargazers_count ?? 0),
          0,
        )
      }
    }
  } catch {
    // leave default (0)
  }

  const token = process.env.GITHUB_TOKEN
  if (token) {
    try {
      const query = `
        query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays { contributionCount }
                }
              }
            }
          }
        }
      `
      const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables: { login: GITHUB_USER } }),
      })
      if (res.ok) {
        const json = await res.json()
        const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar
        if (calendar) {
          result.contributions = {
            total: calendar.totalContributions,
            weeks: calendar.weeks.map((w: { contributionDays: { contributionCount: number }[] }) =>
              w.contributionDays.map((d) => d.contributionCount),
            ),
          }
        }
      }
    } catch {
      // contributions stays null — UI hides the heatmap
    }
  }

  return result
}

async function fetchLeetcode(): Promise<LeetcodeStats> {
  const result: LeetcodeStats = { solved: 0, ranking: 0, easy: 0, medium: 0, hard: 0 }

  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          profile { ranking }
          submitStatsGlobal { acSubmissionNum { difficulty count } }
        }
      }
    `
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify({ query, variables: { username: LEETCODE_USER } }),
    })
    if (res.ok) {
      const json = await res.json()
      const user = json?.data?.matchedUser
      if (user) {
        result.ranking = user.profile?.ranking ?? 0
        const stats: { difficulty: string; count: number }[] = user.submitStatsGlobal?.acSubmissionNum ?? []
        for (const s of stats) {
          if (s.difficulty === 'All') result.solved = s.count
          else if (s.difficulty === 'Easy') result.easy = s.count
          else if (s.difficulty === 'Medium') result.medium = s.count
          else if (s.difficulty === 'Hard') result.hard = s.count
        }
      }
    }
  } catch {
    // leave defaults
  }

  return result
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const [github, leetcode] = await Promise.all([fetchGithub(), fetchLeetcode()])

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  res.status(200).json({
    github,
    leetcode,
    fetchedAt: new Date().toISOString(),
  })
}
