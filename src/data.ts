// ============================================================================
//  YOUR CONTENT LIVES HERE  (Netflix-style portfolio)
//  Edit this file to make the whole site yours. Nothing else needs to change.
// ============================================================================

export type RowId = 'projects' | 'learning' | 'top10' | 'skills' | 'achievements' | 'journey' | 'stats'

export interface Profile {
  name: string
  tagline: string
  match: string
  year: string
  rating: string
  genres: string[]
  email: string
  location: string
  resumeUrl: string
  trailerLines: string[]
  /**
   * Optional real video trailer for the billboard (muted, looping, Netflix
   * style). Remove this to fall back to the typewriter trailer — nothing else
   * needs to change.
   */
  trailer?: { videoSrc: string; webmSrc?: string; poster: string }
}

export interface ProfileSummary {
  id: string
  name: string
  avatar: string
  color: string
  /** Hidden profiles only appear once the Konami code has been entered. */
  hidden?: boolean
}

export interface ProfileConfig {
  tagline: string
  order: RowId[]
  cta: { label: string; target?: string; href?: string }
  resumeUrl?: string
}

export interface Social {
  label: string
  url: string
  handle: string
}

export interface AboutFact {
  label: string
  value: string
}

export interface About {
  paragraphs: string[]
  facts: AboutFact[]
}

export interface Skill {
  name: string
  level: number
  tag: string
  logo?: string
  evidence?: string
}

export interface Project {
  slug: string
  title: string
  blurb: string
  longDescription: string
  tags: string[]
  match: string
  year: string
  link: string
  repo: string
  accent: string
  image?: string
  status?: string
  role?: string
  outcome?: string
  accessNote?: string
  caseStudyUrl?: string
  screenshot?: string
  caseStudy?: {
    problem: string
    role: string
    decision: string
    evidence: string[]
    limitations: string
  }
  /**
   * Optional editorial override for the "Because you watched" row: project
   * slugs and/or exact skill names, in the order you want them shown. Leave it
   * out and the row is scored automatically from shared tags — only set this
   * when you want to hand-pick what a project recommends.
   */
  related?: string[]
}

/**
 * Experience & education, told like a Netflix show: each chapter of life is a
 * Season, each role/milestone within it an Episode.
 * `duration` is optional on purpose — it's only set where a real span is
 * known. Episodes that are workstreams inside a single role share the role's
 * `when` window instead (same window = same season, like a real show).
 */
export interface Episode {
  number: number
  title: string
  place: string
  when: string
  duration?: string
  synopsis: string
  thumbnail?: string
  highlight?: string
}

export interface Season {
  id: string
  number: number
  title: string
  years: string
  synopsis: string
  episodes: Episode[]
}

export interface Achievement {
  title: string
  tag: string
  detail: string
}

export interface LearningItem {
  name: string
  level: number
  note: string
  logo?: string
}

export interface Contact {
  web3formsKey: string
}

/**
 * Live GitHub + LeetCode stats. `contributions` is only populated when the
 * serverless function has a GITHUB_TOKEN configured (contribution calendars
 * need GitHub's GraphQL API, which has no unauthenticated access) — the UI
 * hides the heatmap gracefully when it's null.
 */
export interface LiveStats {
  github: {
    repos: number
    stars: number
    followers: number
    contributions: { total: number; weeks: number[][] } | null
  }
  leetcode: {
    solved: number
    ranking: number
    easy: number
    medium: number
    hard: number
  }
  fetchedAt: string
}

export const statsConfig = {
  githubUser: 'Ayush05G',
  leetcodeUser: 'AG2425',
  cacheTtlMs: 6 * 60 * 60 * 1000,
}

// Last-known-good numbers, shown when the live fetch and the localStorage
// cache both come up empty (e.g. first paint with a cold cache and a slow
// network). Refresh these occasionally so the floor doesn't go stale.
export const statsFallback: LiveStats = {
  github: { repos: 8, stars: 10, followers: 1, contributions: null },
  leetcode: { solved: 619, ranking: 124928, easy: 193, medium: 342, hard: 84 },
  fetchedAt: '2026-07-17',
}

export const profile: Profile = {
  name: 'Ayush Gupta',
  // Default billboard tagline (used as a fallback; each profile below can
  // override it via profileConfig).
  tagline:
    'Associate PM turned builder — I ship products end to end, from the spec and roadmap to the code and the infrastructure it runs on. EE undergrad at NSUT.',
  // Fun Netflix-style metadata for the billboard.
  match: '98% Match',
  year: '2027',
  rating: "EE · NSUT '27",
  genres: ['Product', 'Full-Stack', 'Infrastructure', 'Fintech'],
  email: 'ayush2425.rk@gmail.com',
  location: 'Gurugram, India',
  resumeUrl: '/resume.pdf', // Phone number redacted before publishing — see conversation for details
  // Billboard video trailer, assembled from the real project charts
  // (scripts/make-trailer.mjs). Delete this block to get the typewriter back.
  trailer: {
    videoSrc: '/trailer/trailer.mp4',
    poster: '/trailer/poster.jpg',
  },
  // Real facts that cycle in the billboard "trailer" typewriter (also the
  // fallback when the video can't/shouldn't play — reduced motion, save-data,
  // small screens, or no trailer asset).
  trailerLines: [
    'Led a credit-card product launch at Bachatt × ZET',
    'Sprint completion 40% → 75% as Scrum Manager',
    'Migrated Jira & Confluence → self-hosted on Azure AKS',
    'Built a two-way Plane ↔ Slack bridge over Socket Mode',
    '2.7M real events → a plain-English churn model',
    'SARIMA AQI forecast · MAE 24.7 vs 29.6 baseline',
    '600+ DSA problems solved · Pupil on Codeforces',
    'Peer-reviewed ML paper · Physica Scripta journal',
  ],
}

// The "Who's watching?" profiles. Each is a doorway into the same site.
// `avatar` is a photo/icon in /public/avatars; `color` is the fallback
// background shown behind it (and used for the nav avatar's initial).
export const profiles: ProfileSummary[] = [
  {
    id: 'recruiter',
    name: 'Recruiter',
    avatar: '/avatars/recruiter.webp',
    color: 'linear-gradient(135deg,#e50914,#b81d24)',
  },
  {
    id: 'developer',
    name: 'Developer',
    avatar: '/avatars/developer.webp',
    color: 'linear-gradient(135deg,#0071eb,#00c6ff)',
  },
  {
    id: 'friend',
    name: 'Friend',
    avatar: '/avatars/friend.webp',
    color: 'linear-gradient(135deg,#f5c518,#ff8a00)',
  },
  {
    id: 'stalker',
    name: 'Curious',
    avatar: '/avatars/curious.webp',
    color: 'linear-gradient(135deg,#8a2be2,#e50914)',
  },
  // Unlocked with the Konami code (↑↑↓↓←→←→BA) — see src/useKonami.ts.
  {
    id: 'hacker',
    name: 'Hacker',
    avatar: '',
    color: 'linear-gradient(135deg,#00ff41,#003b00)',
    hidden: true,
  },
]

// ── Per-profile personalization ──────────────────────────────────────────
// Each profile reorders the browse rows and gets its own hero tagline + CTA,
// so picking a profile actually changes the experience (like Netflix tailors
// rows to the viewer). `order` lists row ids top-to-bottom; the FIRST row is
// re-titled "Today's Top Picks for <Profile>". Valid row ids:
//   'projects' · 'learning' · 'top10' · 'skills' · 'achievements' · 'journey'
// `cta` is the primary billboard button: { label, target } where target is a
// row id to scroll to, OR { label, href } to link out.
export const profileConfig: Record<string, ProfileConfig> = {
  recruiter: {
    tagline:
      "Former Associate PM Intern at a fintech who also ships the code and the infra — I launched a credit-card product, ran an Azure AKS migration, and I'm open to full-time roles. Here's the proof.",
    order: ['projects', 'journey', 'skills', 'achievements', 'stats', 'learning', 'top10'],
    cta: { label: 'See Experience', target: 'journey' },
  },
  developer: {
    tagline:
      'Full-stack + infra: Next.js/TypeScript apps, Python data tools, and the Kubernetes (Azure AKS) and CI/CD they run on. Dig into the projects, the stack, and how it fits together.',
    order: ['projects', 'journey', 'skills', 'achievements', 'stats', 'learning', 'top10'],
    cta: { label: 'View Projects', target: 'projects' },
    resumeUrl: '/resume-developer.pdf', // Phone number redacted before publishing — see conversation for details
  },
  friend: {
    tagline:
      "Hey! 👋 This is the fun cut — the products I've launched, the infra I've broken and fixed, and where I'm headed next. Grab a coffee and scroll.",
    order: ['projects', 'journey', 'skills', 'achievements', 'stats', 'learning', 'top10'],
    cta: { label: 'Take a Look', target: 'projects' },
  },
  stalker: {
    tagline:
      "Curious? Good. Everything's here — every project, every skill, the whole story from product to infrastructure. Start anywhere and poke around.",
    order: ['projects', 'journey', 'skills', 'achievements', 'stats', 'learning', 'top10'],
    cta: { label: 'Start Exploring', target: 'projects' },
  },
  hacker: {
    tagline:
      '> access granted. You found the hidden profile — enjoy the terminal cut. Projects first, then the journey, the stack, and everything else.',
    order: ['projects', 'journey', 'skills', 'achievements', 'stats', 'learning', 'top10'],
    cta: { label: 'cat ./stats', target: 'stats' },
  },
}

export const socials: Social[] = [
  { label: 'GitHub', url: 'https://github.com/Ayush05G', handle: '@Ayush05G' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ayush-gupta-17b3112a2/', handle: '/in/ayush-gupta' },
  { label: 'LeetCode', url: 'https://leetcode.com/u/AG2425/', handle: '@AG2425 · 600+ solved' },
  { label: 'Email', url: 'mailto:ayush2425.rk@gmail.com', handle: 'ayush2425.rk@gmail.com' },
]

export const about: About = {
  paragraphs: [
    "I'm an Electrical Engineering undergrad at NSUT who lives where product meets engineering. As an Associate Product Manager Intern at Bachatt, a fintech, I led the launch of a new credit-card product with our partner ZET — owning the spec and roadmap and driving delivery across engineering, design, and the partner team.",
    "But I don't stop at the spec. On the same role I ran Bachatt's Atlassian → self-hosted migration end to end (Jira & Confluence onto Plane + Outline on Azure AKS), built a two-way Plane ↔ Slack bridge, and stood up production infra and a CDN asset pipeline. Alongside that I ship full-stack side projects, solved 600+ DSA problems, and co-authored a peer-reviewed ML paper. Currently open to full-time product and software roles.",
  ],
  facts: [
    { label: 'Focus', value: 'Product · Full-Stack · Infra' },
    { label: 'Stack', value: 'Next.js · Python · Azure AKS' },
    { label: 'Status', value: 'Open for full-time roles' },
    { label: 'Based in', value: 'Gurugram, India' },
  ],
}

// Each skill becomes a card in the "Skills & Technologies" row.
// `level` is retained for compatibility. `evidence` describes specific work,
// not proficiency; omit it where no project-level evidence is documented.
// `tag` is the small label.
// `logo` is an official brand icon in /public/skills (from Simple Icons);
// omit it for skills with no single brand logo (e.g. soft skills).
export const skills: Skill[] = [
  {
    name: 'TypeScript',
    level: 84,
    tag: 'Language',
    logo: '/skills/typescript.svg',
    evidence: 'Findesk research app and server-side assistant tools',
  },
  {
    name: 'JavaScript',
    level: 86,
    tag: 'Language',
    logo: '/skills/javascript.svg',
    evidence: 'Plane ↔ Slack relay with Socket Mode',
  },
  {
    name: 'Python',
    level: 84,
    tag: 'Language',
    logo: '/skills/python.svg',
    evidence: 'RetailRocket funnel analysis and SARIMA air-quality forecasts',
  },
  { name: 'C++', level: 80, tag: 'Language', logo: '/skills/cplusplus.svg' },
  {
    name: 'Next.js',
    level: 80,
    tag: 'Framework',
    logo: '/skills/nextdotjs.svg',
    evidence: 'Findesk and the Plane-backed Scrum Dashboard',
  },
  {
    name: 'React',
    level: 80,
    tag: 'Framework',
    logo: '/skills/react.svg',
    evidence: 'This portfolio’s profile gate and browsable project rows',
  },
  {
    name: 'Node.js',
    level: 78,
    tag: 'Backend',
    logo: '/skills/nodedotjs.svg',
    evidence: 'Plane ↔ Slack relay using Slack Bolt and Express',
  },
  {
    name: 'SQL / Postgres',
    level: 78,
    tag: 'Database',
    logo: '/skills/postgresql.svg',
    evidence: 'BigQuery credit-card journeys and Postgres sprint snapshots',
  },
  { name: 'MongoDB', level: 74, tag: 'Database', logo: '/skills/mongodb.svg' },
  {
    name: 'Docker',
    level: 78,
    tag: 'Infra',
    logo: '/skills/docker.svg',
    evidence: 'Self-hosted Plane and Outline migration',
  },
  {
    name: 'Kubernetes (AKS)',
    level: 72,
    tag: 'Infra',
    logo: '/skills/kubernetes.svg',
    evidence: 'Plane + Outline deployment on Azure AKS',
  },
  {
    name: 'Git & CI/CD',
    level: 82,
    tag: 'Tooling',
    logo: '/skills/git.svg',
    evidence: 'Product Analytics pytest checks on every push',
  },
  {
    name: 'Supabase',
    level: 74,
    tag: 'Backend',
    logo: '/skills/supabase.svg',
    evidence: 'Findesk authentication and row-level security for holdings',
  },
  {
    name: 'Streamlit',
    level: 80,
    tag: 'Data',
    logo: '/skills/streamlit.svg',
    evidence: 'Product Analytics and Delhi-NCR AQI dashboards',
  },
  {
    name: 'pandas',
    level: 80,
    tag: 'Data',
    logo: '/skills/pandas.svg',
    evidence: 'Pure funnel and cohort functions over 2.7M events',
  },
  {
    name: 'Product & GTM',
    level: 85,
    tag: 'Product',
    evidence: 'Credit-card launch spec and roadmap at Bachatt × ZET',
  },
  {
    name: 'Equity Research & Backtesting',
    level: 80,
    tag: 'Markets',
    evidence: 'Findesk value + momentum strategy over a 715-stock universe',
  },
  {
    name: 'Experimentation & Analytics',
    level: 82,
    tag: 'Product',
    evidence: 'RetailRocket experiment sizing: 5% vs 10% relative effects',
  },
  {
    name: 'DSA / Problem Solving',
    level: 84,
    tag: 'Foundations',
    evidence: '600+ LeetCode problems solved; Pupil on Codeforces',
  },
  { name: 'Figma', level: 66, tag: 'Design', logo: '/skills/figma.svg' },
]

// Projects become the "Featured Projects" row. Click a card → detail modal.
export const projects: Project[] = [
  {
    slug: 'findesk',
    title: 'Findesk — Equity Research & Strategy Platform',
    blurb:
      'An Indian equity research and portfolio platform with a tool-using AI assistant, evidence checks, and a 60-question evaluation benchmark — alongside a value + momentum backtest over a 715-stock universe.',
    longDescription:
      'Built stock research, screening, portfolio tracking, paper trading, compare and watchlists on Next.js and Supabase with row-level security. The portfolio-aware assistant uses four server-side tools and session-scoped identity; when model quotas run out, a deterministic fallback answers from the same available data. Added evidence guards for unknown analyst coverage, stale quotes, headline-only news causation and unsupported feed provenance, plus request coalescing and model cooldowns. A 60-question benchmark uses fixed synthetic financial snapshots, retaining service failures rather than hiding them. In one same-prompt model comparison, median attempted-turn latency was 1.62s versus 5.73s; this is a benchmark observation, not production-user latency or proof of comprehensive accuracy. November verification recorded 752 passing automated tests. The strategy work ranks value and momentum across a 715-stock universe, reconstructs membership from nine archived index snapshots, and measures returns after costs and tax with drawdown, Sharpe and regime checks. The 2019–24 snapshot gap remains an explicit limitation. Also shipped company-name search, sign-in return paths, watchlist feedback and guards against treating failed account reads as empty portfolios.',
    tags: ['Next.js 14', 'TypeScript', 'Gemini API', 'Supabase', 'AI Evaluation'],
    match: '96% Match',
    year: '2026',
    link: 'https://equity-research-assistant-eta.vercel.app',
    repo: '',
    accent: '#34d399',
    image: '/projects/equity-research.svg',
    // Signed-out public /home screen, captured 3 November 2026; market figures are a static snapshot.
    screenshot: '/projects/findesk-overview.webp',
    status: 'Live',
    role: 'Product design, full-stack development and AI evaluation',
    outcome:
      'Research and portfolio workflows with evidence guards, a data-only fallback and 752 passing tests recorded in November.',
    accessNote: 'Public research; sign-in required for saved holdings and watchlists.',
    caseStudy: {
      problem:
        'Stock research combines incomplete quotes, thin analyst coverage and personal holdings. An assistant can turn missing data or failed account reads into confident, misleading answers.',
      role: 'Built the Next.js/Supabase research and portfolio app, four server-side assistant tools, evidence checks and the evaluation harness.',
      decision:
        'Scope identity to the session, distinguish unavailable account data from empty holdings, and constrain answers to available evidence. Use a deterministic data-only fallback during model quota failures and retain service failures in benchmark results.',
      evidence: [
        'November evidence-guard verification recorded 752 passing automated tests.',
        'A fixed 60-question benchmark uses synthetic financial snapshots and real model calls, with service failures kept in the denominator.',
        'One same-prompt model comparison recorded median attempted-turn latency of 1.62s versus 5.73s.',
        'The value + momentum backtest covers a 715-stock universe and reconstructs membership from nine archived index snapshots.',
      ],
      limitations:
        'The benchmark tests narrow rules, not comprehensive factual accuracy, production-user latency or actual holdings. No investment-return improvement is established. The strategy has a documented 2019–24 index-snapshot gap; caches and model cooldowns remain per server instance.',
    },
  },
  {
    slug: 'product-analytics',
    title: 'Product Analytics Dashboard',
    blurb:
      'Turns a real 2.7M-event e-commerce clickstream into conversion funnels, cohort retention, and a churn model — every view surfaces a plain-English insight, not just a chart.',
    longDescription:
      'Built on RetailRocket’s real clickstream data — 2.7M events from 1.4M visitors. Finds the funnel’s biggest leak (only 2.45% of viewers add to cart, though 28% of those who do go on to buy — 0.83% end to end), that only ~4.6% of a week’s new visitors return the following week, and trains a churn model (ROC-AUC ≈ 0.69). Pure funnel/cohort functions keep the analysis independent of the UI; a recorded optimization cut peak funnel memory from 173 MB to 66 MB. The companion growth case study sizes an experiment against observed traffic: a 5% relative effect needed about 17 weeks, so the proposal targets a 10% effect over about 4.5 weeks, with the sensitivity trade-off stated. This is an experiment design, not a measured conversion uplift. The write-up also keeps two findings that contradicted its original hypotheses: https://github.com/Ayush05G/product-analytics-dashboard/blob/main/case-study.md',
    tags: ['Python', 'Streamlit', 'pandas', 'scikit-learn'],
    match: '95% Match',
    year: '2026',
    link: 'https://p-analytics-dashboard.streamlit.app',
    repo: 'https://github.com/Ayush05G/product-analytics-dashboard',
    accent: '#0071eb',
    image: '/projects/product-analytics.svg',
    status: 'Live',
    role: 'Analytics development and growth experiment design',
    outcome:
      'Diagnosed funnel and retention gaps; recorded funnel peak memory falling from 173 MB to 66 MB and sized a proposed experiment.',
    accessNote:
      'The public demo may need to wake. Screenshot shows an earlier stage-count funnel; the study uses progression-based rates.',
    caseStudyUrl: 'https://github.com/Ayush05G/product-analytics-dashboard/blob/main/case-study.md',
    // Existing README screenshot: ../product-analytics-dashboard/docs/dashboard.png.
    screenshot: '/projects/product-analytics-dashboard.webp',
    caseStudy: {
      problem:
        'A real 2.7M-event RetailRocket clickstream shows low conversion and repeat engagement, but a chart alone does not identify an actionable intervention or a feasible experiment.',
      role: 'Built the Streamlit dashboard, pure funnel/cohort functions, churn model and companion growth case study.',
      decision:
        'Use progression-based funnel rates to account for tracking gaps. Prioritize cart-to-purchase after demonstrated intent, preserve findings that contradict the original hypotheses, and resize the proposed experiment from a 5% to a 10% relative effect to fit observed traffic.',
      evidence: [
        '2.45% of viewers add to cart; 28.04% of cart-adders purchase; end-to-end conversion is 0.83%.',
        'About 4.6% of a week’s new visitors return the following week; held-out churn ROC-AUC is approximately 0.69.',
        'Recorded optimization reduced peak funnel memory from 173 MB to 66 MB.',
        'At observed traffic, a 5% relative effect needs about 17 weeks; a 10% effect needs about 4.5 weeks.',
      ],
      limitations:
        'This uses the public RetailRocket dataset, not company operational data. The experiment is proposed, with no measured uplift, and can miss smaller effects. Missing events affect funnel interpretation; visitor-day carts approximate sessions because no cart/session ID is available. Correlations do not establish causes.',
    },
  },
  {
    slug: 'aqi-analytics',
    title: 'Delhi-NCR Air Quality Analytics',
    blurb:
      'An analytics dashboard on real CPCB data (2015–2026) that quantifies why and when Delhi’s air gets bad — trends, seasonality, event impact, and a validated SARIMA forecast.',
    longDescription:
      'Analyzes real CPCB air-quality data spanning 2015–2026, stitched from three validated sources, for long-run trends, the seasonal cycle, and event impact (Diwali, stubble burning, the COVID lockdown). Quantifies each with confound-controlled baselines — stubble burning lifts Oct–Nov PM2.5 to 1.8× the rest of the year — and ships a SARIMA forecast that beats naive baselines on a 30-day holdout (MAE 24.7 vs 29.6). Every view surfaces a plain-English insight, not just a chart.',
    tags: ['Python', 'Streamlit', 'statsmodels', 'SARIMA'],
    match: '94% Match',
    year: '2026',
    link: 'https://aqi-analytics-in.streamlit.app',
    repo: 'https://github.com/Ayush05G/aqi-analytics',
    accent: '#e50914',
    image: '/projects/aqi-analytics.svg',
    status: 'Live',
    role: 'Data analysis and forecast development',
    outcome: 'SARIMA achieved MAE 24.7 versus a 29.6 naive baseline on a 30-day holdout.',
    caseStudy: {
      problem:
        'Delhi-NCR air-quality trends mix seasonal patterns and event effects, making simple before/after comparisons difficult to interpret.',
      role: 'Combined three validated CPCB-data sources, built the dashboard and evaluated a SARIMA forecast.',
      decision:
        'Use confound-controlled baselines for event comparisons and evaluate the forecast against naive baselines on a held-out window.',
      evidence: [
        'The analysis spans 2015–2026 and covers seasonality, Diwali, stubble burning and the COVID lockdown.',
        'The 30-day holdout recorded MAE 24.7 for SARIMA versus 29.6 for the naive baseline.',
      ],
      limitations:
        'Forecast evidence is limited to the documented 30-day holdout. Event comparisons are observational and do not establish causal effects.',
    },
  },
  {
    slug: 'disaster-mesh',
    title: 'Project Aether — Offline Disaster Mesh',
    blurb:
      'A disaster-response prototype designed for offline AI and peer-to-peer report sharing: a CRDT ledger reconciles nodes after disconnection, verified with local multi-node and chaos tests.',
    longDescription:
      'Designed around a local quantized-model extraction engine, schema-validated hazard reports, and a libp2p mesh with mDNS discovery, gossipsub broadcast and anti-entropy catch-up. Reports merge into a grow-only-set CRDT; identity is (node_id, seq), with Lamport ordering instead of wall-clock trust. Local single-machine tests show three nodes converging from cold start in about 2s and a healed partition reconverging in about 1s. Property-based and chaos tests surfaced two real defects: an ingest thread-safety race and a missing read timeout. The dashboard distinguishes reports a node authored from reports it carries, without inventing their delivery paths, and its build rejects external URLs. Physical-device networking, real-model extraction quality and Raspberry Pi profiling remain documented hardware-dependent milestones.',
    tags: ['Python', 'libp2p', 'CRDT', 'FastAPI'],
    match: '97% Match',
    year: '2026',
    // Local-first by design, so there is nothing to deploy and no live link.
    link: '',
    repo: 'https://github.com/Ayush05G/disaster-mesh',
    accent: '#f59e0b',
    image: '/projects/disaster-mesh.svg',
    status: 'Prototype',
    role: 'Offline system design and local multi-node verification',
    outcome: 'Local tests recorded three-node convergence in about 2s and partition recovery in about 1s.',
    accessNote: 'Local prototype; no hosted demo.',
    caseStudy: {
      problem:
        'Disconnected disaster-response nodes need to exchange and reconcile hazard reports when connectivity returns.',
      role: 'Designed the extraction pipeline, schema-validated reports, libp2p mesh and CRDT ledger; verified local convergence and failure handling.',
      decision:
        'Use a grow-only-set CRDT keyed by node and sequence, Lamport ordering and anti-entropy catch-up instead of trusting wall clocks. Show authored versus carried reports without inventing delivery paths.',
      evidence: [
        'Single-machine tests recorded three nodes converging from cold start in about 2s and a healed partition reconverging in about 1s.',
        'Property-based and chaos tests exposed an ingest thread-safety race and a missing read timeout.',
      ],
      limitations:
        'These are local single-machine results. Physical-device networking, real-model extraction quality and Raspberry Pi profiling remain hardware-dependent milestones.',
    },
  },
  {
    slug: 'scrum-dashboard',
    title: 'Scrum Dashboard — Sprint Health on Plane',
    blurb:
      'Plane tracks work items well but has no standup runner, burndown, or velocity history. This adds the ceremony layer on top — without replacing the tracker underneath.',
    longDescription:
      'Adds standups, sprint health, workload, blocker history, burndown, velocity and retrospective notes to a self-hosted Plane instance. Plane remains the work-item source of truth; this app records daily cycle snapshots because historical sprint scope cannot be reconstructed from the tracker later. Burndown uses estimate coverage to choose points or item counts, so one estimated completed item cannot make an unfinished sprint look complete. Missing snapshot days remain gaps, and repeat cron runs are idempotent. Company-domain Google SSO establishes identity, while each manager’s validated, encrypted Plane token determines what they can access. Built with Next.js, React and Prisma over Postgres; the API client remains read-only against Plane.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Postgres'],
    match: '93% Match',
    year: '2026',
    // Deployed, but every route is behind Google SSO — the link lands on the
    // sign-in screen rather than a browsable demo.
    link: 'https://scrum-dashboard-sage.vercel.app',
    repo: '',
    accent: '#22d3ee',
    image: '/projects/scrum-dashboard.svg',
    status: 'Internal tool',
    role: 'Sprint workflow design and full-stack development',
    outcome:
      'Implemented standups, sprint snapshots, coverage-aware burndown, velocity and retrospective notes over Plane.',
    accessNote: 'Sign-in required',
    caseStudy: {
      problem:
        'Plane tracks work items but lacks the standup and historical sprint-health views needed for delivery ceremonies.',
      role: 'Built the Next.js/Prisma dashboard, daily cycle snapshots and per-manager Plane-token access.',
      decision:
        'Keep Plane as the read-only work-item source of truth. Store daily snapshots, choose points or item counts from estimate coverage, and preserve missing-day gaps instead of implying observations.',
      evidence: [
        'Implemented burndown, velocity and retrospective notes; repeat snapshot cron runs are idempotent.',
        'Company-domain Google SSO establishes identity; each manager’s validated, encrypted token scopes Plane access.',
      ],
      limitations:
        'The November audit established features in local code, not deployment of every feature. Historical scope depends on recorded snapshots. No measured delivery improvement is attributed to this dashboard.',
    },
  },
  {
    slug: 'portfolio',
    title: 'Portfolio (this site)',
    blurb:
      'The site you are looking at — a Netflix-inspired portfolio built from scratch with React, Vite, and Framer Motion.',
    longDescription:
      'A Netflix-inspired take on the personal portfolio: a profile gate, a billboard hero, and browsable rows of "titles". Built from scratch with React, Vite, and Framer Motion.',
    tags: ['React', 'Vite', 'Framer Motion'],
    match: '100% Match',
    year: '2026',
    link: '',
    repo: 'https://github.com/Ayush05G/portfolio',
    accent: '#8a2be2',
    status: 'Live',
    role: 'Portfolio design and frontend development',
    outcome: 'Built the profile gate, billboard and browsable project rows shown on this site.',
    caseStudy: {
      problem: 'Present product, engineering and infrastructure work in one browsable portfolio.',
      role: 'Designed and built the site with React, Vite and Framer Motion.',
      decision:
        'Use a Netflix-inspired profile gate and rows of projects, with detail views for the supporting work.',
      evidence: ['Implemented profile selection, a billboard hero and browsable project rows.'],
      limitations: 'No measured recruiting or engagement outcome is claimed.',
    },
  },
]

// Experience + education, as Seasons & Episodes (see the Season interface).
// Ordered oldest → newest; the UI opens on the latest season.
export const seasons: Season[] = [
  {
    id: 's1',
    number: 1,
    title: 'Foundations',
    years: '2023 – 2026',
    synopsis:
      'Engineering school, a 100k-footfall fest, and the first taste of product thinking — where the habits came from.',
    episodes: [
      {
        number: 1,
        title: 'Enrollment',
        place: 'B.Tech, Electrical Engineering · NSUT',
        when: '2023 – 2027',
        duration: '4 years',
        synopsis:
          'CGPA 7.73 — building products and full-stack + infra skills alongside coursework at Netaji Subhas University of Technology.',
        thumbnail: '/seasons/ep-nsut.svg',
        highlight: 'CGPA 7.73',
      },
      {
        number: 2,
        title: 'Fest Logistics',
        place: 'Logistics Coordinator · Moksha & Resonanz, NSUT',
        when: 'Mar 2024 – Present',
        duration: '2+ years',
        synopsis:
          "Ran logistics for 50+ events across 6 venues at North India's largest college fest, leading 20+ volunteers with zero escalations.",
        thumbnail: '/seasons/ep-fest.svg',
        highlight: '50+ events · zero escalations',
      },
      {
        number: 3,
        title: 'Learning the Craft',
        place: 'Vice President · PM Club, NSUT',
        when: 'Sep 2025 – Present',
        synopsis:
          'Lead weekly product case sessions for 50+ members across affiliate economics, accessibility and urban mobility, teaching RICE prioritization, North Star metrics and JTBD.',
        thumbnail: '/seasons/ep-pmclub.svg',
        highlight: 'Teaching 50+ members',
      },
    ],
  },
  {
    id: 's2',
    number: 2,
    title: 'The Internship Arc',
    years: '2026',
    synopsis: 'First time taking a funnel from whiteboard to real users — on a real campus.',
    episodes: [
      {
        number: 1,
        title: 'Campus Growth',
        place: 'Brand Marketing Intern · CashKaro',
        when: 'Mar 2026 – Apr 2026',
        duration: '2 months',
        synopsis:
          'Built a campus growth strategy for NSUT — mapped the funnel and unit economics — and drove 40+ students from signup to first transaction within 3 weeks.',
        thumbnail: '/seasons/ep-cashkaro.svg',
        highlight: '40+ signups → first transaction',
      },
    ],
  },
  {
    id: 's3',
    number: 3,
    title: 'The Bachatt Era',
    years: '2026',
    synopsis:
      'Associate PM at a fintech — a credit-card launch, a sprint turnaround, and the infra underneath it all. Eight episodes, one summer.',
    episodes: [
      {
        number: 1,
        title: 'The Card Launch',
        place: 'Associate Product Manager · Bachatt × ZET',
        when: 'May 2026 – Jul 2026',
        synopsis:
          'Led the launch of a new credit-card product with partner ZET — owned the spec and roadmap, and drove delivery across engineering, design, and the partner team.',
        thumbnail: '/seasons/ep-card-launch.svg',
        highlight: 'Owned spec & roadmap end to end',
      },
      {
        number: 2,
        title: 'Sprint Zero',
        place: 'Scrum Manager · Bachatt',
        when: 'May 2026 – Jul 2026',
        synopsis:
          'Took over as Scrum Manager and rebuilt the delivery cadence — lifting sprint completion from 40% to 75%.',
        thumbnail: '/seasons/ep-sprint.svg',
        highlight: 'Sprint completion 40% → 75%',
      },
      {
        number: 3,
        title: 'Leaving Atlassian',
        place: 'Associate Product Manager · Bachatt',
        when: 'May 2026 – Jul 2026',
        synopsis:
          'Ran the Atlassian → self-hosted migration end to end: Jira & Confluence onto Plane + Outline, running on Azure AKS, with production infra and a CDN asset pipeline behind it.',
        thumbnail: '/seasons/ep-aks.svg',
        highlight: 'Jira & Confluence → Plane + Outline on AKS',
      },
      {
        number: 4,
        title: 'The Two-Way Bridge',
        place: 'Associate Product Manager · Bachatt',
        when: 'May 2026 – Jul 2026',
        synopsis:
          'Built a two-way Plane ↔ Slack bridge over Socket Mode, so issue updates and conversations stayed in sync without anyone leaving Slack.',
        thumbnail: '/seasons/ep-slack-bridge.svg',
        highlight: 'Real-time sync over Socket Mode',
      },
      {
        number: 5,
        title: 'The Robot Analyst',
        place: 'Associate Product Manager · Bachatt',
        when: 'May 2026 – Jul 2026',
        synopsis:
          'Replaced a daily manual chore — logging into three registrar portals to pull distributor reports — with a scheduled service: headless browser automation, a layered captcha solver, and a small web app to run and monitor it.',
        thumbnail: '/seasons/ep-orbit.svg',
        highlight: 'Daily reports from 3 registrars, automated',
      },
      {
        number: 6,
        title: 'Two Seconds Back',
        place: 'Associate Product Manager · Bachatt',
        when: 'May 2026 – Jul 2026',
        synopsis:
          'A CDN migration had quietly started serving every image, GIF, and video uncompressed, roughly doubling app load time. Traced it, shipped a compression pipeline, and closed the hole at the source with an upload size gate that auto-compresses.',
        thumbnail: '/seasons/ep-cdn.svg',
        highlight: 'Undid a ~2× load-time regression',
      },
      {
        number: 7,
        title: 'Four Doors In',
        place: 'Associate Product Manager · Bachatt',
        when: 'May 2026 – Jul 2026',
        synopsis:
          'Instrumented the credit-card landing site so its four themes ran as real variants, not just four designs — GA4 and CleverTap events on Apply Now, a scroll-depth event, and the active theme attached as a global parameter so the variants were actually comparable.',
        thumbnail: '/seasons/ep-experiments.svg',
        highlight: 'Made four themes genuinely comparable',
      },
      {
        number: 8,
        title: 'Where People Fall Out',
        place: 'Associate Product Manager · Bachatt',
        when: 'May 2026 – Jul 2026',
        synopsis:
          'Built the per-user credit-card journey view on BigQuery and took it from one partner to four, reworking each partner’s milestones so they read correctly instead of silently dropping — plus a daily funnel report that assembles itself from partner mailboxes.',
        thumbnail: '/seasons/ep-funnel.svg',
        highlight: 'One partner → four, without silent drops',
      },
    ],
  },
]

// Achievements & certifications become their own row of cards.
export const achievements: Achievement[] = [
  {
    title: '600+ DSA Problems',
    tag: 'Problem Solving',
    detail: '600+ problems solved on LeetCode · Pupil on Codeforces.',
  },
  {
    title: 'Published Researcher',
    tag: 'Research',
    detail: 'Peer-reviewed ML paper on Solar PV performance enhancement — Physica Scripta journal.',
  },
  {
    title: 'Gold Medallist',
    tag: 'NPTEL',
    detail: 'Programming in Java (IIT-certified).',
  },
  {
    title: 'Certifications',
    tag: 'Coursework',
    detail: 'SQL Bootcamp (Udemy) · Product Management (Coursera) · Power BI (Microsoft).',
  },
]

// "Continue Watching" row — what you're actively leveling up right now, each
// with a progress bar like Netflix's resume-watching thumbnails. `logo` is
// optional (reuses an icon from /public/skills where one exists).
export const learning: LearningItem[] = [
  {
    name: 'Kubernetes & Helm',
    level: 72,
    note: 'From spinning up pods to writing Helm charts and cluster bootstrap scripts on Azure AKS.',
    logo: '/skills/kubernetes.svg',
  },
  {
    name: 'System Design',
    level: 60,
    note: 'Studying scale patterns after standing up production infra for a live fintech product.',
  },
  {
    name: 'Advanced TypeScript',
    level: 78,
    note: 'Leaning into stricter types and generics after shipping Findesk end to end.',
    logo: '/skills/typescript.svg',
  },
  {
    name: 'Product Analytics & SQL',
    level: 82,
    note: 'Going deeper on cohort and funnel analysis after the 2.7M-event dashboard.',
    logo: '/skills/postgresql.svg',
  },
]

// ── Contact form ─────────────────────────────────────────────────────────
// The "Hire Me / Get in touch" form posts to Web3Forms (free, no backend).
// To make it send real emails: create a free access key at
// https://web3forms.com (takes ~30s, no signup — just enter your email),
// then paste it below. Until a key is set, the form falls back to opening
// the visitor's email client pre-filled (still fully functional).
export const contact: Contact = {
  web3formsKey: '26890515-b887-4c49-82d9-34729f953b42',
}
