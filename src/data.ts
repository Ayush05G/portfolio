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
    '600+ DSA problems solved · LeetCode rank #124,928',
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
      "Associate PM at a fintech who also ships the code and the infra — I launched a credit-card product, ran an Azure AKS migration, and I'm open to full-time roles. Here's the proof.",
    order: ['journey', 'projects', 'achievements', 'stats', 'learning', 'top10', 'skills'],
    cta: { label: 'See Experience', target: 'journey' },
  },
  developer: {
    tagline:
      'Full-stack + infra: Next.js/TypeScript apps, Python data tools, and the Kubernetes (Azure AKS) and CI/CD they run on. Dig into the projects, the stack, and how it fits together.',
    order: ['projects', 'stats', 'learning', 'top10', 'skills', 'achievements', 'journey'],
    cta: { label: 'View Projects', target: 'projects' },
    resumeUrl: '/resume-developer.pdf', // Phone number redacted before publishing — see conversation for details
  },
  friend: {
    tagline:
      "Hey! 👋 This is the fun cut — the products I've launched, the infra I've broken and fixed, and where I'm headed next. Grab a coffee and scroll.",
    order: ['projects', 'learning', 'journey', 'stats', 'top10', 'achievements', 'skills'],
    cta: { label: 'Take a Look', target: 'projects' },
  },
  stalker: {
    tagline:
      "Curious? Good. Everything's here — every project, every skill, the whole story from product to infrastructure. Start anywhere and poke around.",
    order: ['projects', 'stats', 'learning', 'top10', 'achievements', 'journey', 'skills'],
    cta: { label: 'Start Exploring', target: 'projects' },
  },
  hacker: {
    tagline:
      '> access granted. You found the hidden profile — enjoy the terminal cut. Live stats first, then the stack, then everything else.',
    order: ['stats', 'skills', 'top10', 'projects', 'learning', 'achievements', 'journey'],
    cta: { label: 'cat ./stats', target: 'stats' },
  },
}

export const socials: Social[] = [
  { label: 'GitHub', url: 'https://github.com/Ayush05G', handle: '@Ayush05G' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ayush-gupta-17b3112a2/', handle: '/in/ayush-gupta' },
  { label: 'LeetCode', url: 'https://leetcode.com/u/AG2425/', handle: '@AG2425 · Rank #124,928' },
  { label: 'Email', url: 'mailto:ayush2425.rk@gmail.com', handle: 'ayush2425.rk@gmail.com' },
]

export const about: About = {
  paragraphs: [
    "I'm an Electrical Engineering undergrad at NSUT who lives where product meets engineering. Most recently I was an Associate PM at Bachatt, a fintech, where I led the launch of a new credit-card product with our partner ZET — owning the spec and roadmap and driving delivery across engineering, design, and the partner team.",
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
// `level` (0–100) drives the little progress bar. `tag` is the small label.
// `logo` is an official brand icon in /public/skills (from Simple Icons);
// omit it for skills with no single brand logo (e.g. soft skills).
export const skills: Skill[] = [
  { name: 'TypeScript', level: 84, tag: 'Language', logo: '/skills/typescript.svg' },
  { name: 'JavaScript', level: 86, tag: 'Language', logo: '/skills/javascript.svg' },
  { name: 'Python', level: 84, tag: 'Language', logo: '/skills/python.svg' },
  { name: 'C++', level: 80, tag: 'Language', logo: '/skills/cplusplus.svg' },
  { name: 'Next.js', level: 80, tag: 'Framework', logo: '/skills/nextdotjs.svg' },
  { name: 'React', level: 80, tag: 'Framework', logo: '/skills/react.svg' },
  { name: 'Node.js', level: 78, tag: 'Backend', logo: '/skills/nodedotjs.svg' },
  { name: 'SQL / Postgres', level: 78, tag: 'Database', logo: '/skills/postgresql.svg' },
  { name: 'MongoDB', level: 74, tag: 'Database', logo: '/skills/mongodb.svg' },
  { name: 'Docker', level: 78, tag: 'Infra', logo: '/skills/docker.svg' },
  { name: 'Kubernetes (AKS)', level: 72, tag: 'Infra', logo: '/skills/kubernetes.svg' },
  { name: 'Git & CI/CD', level: 82, tag: 'Tooling', logo: '/skills/git.svg' },
  { name: 'Supabase', level: 74, tag: 'Backend', logo: '/skills/supabase.svg' },
  { name: 'Streamlit', level: 80, tag: 'Data', logo: '/skills/streamlit.svg' },
  { name: 'pandas', level: 80, tag: 'Data', logo: '/skills/pandas.svg' },
  { name: 'Product & GTM', level: 85, tag: 'Product' },
  { name: 'DSA / Problem Solving', level: 84, tag: 'Foundations' },
  { name: 'Figma', level: 66, tag: 'Design', logo: '/skills/figma.svg' },
]

// Projects become the "Featured Projects" row. Click a card → detail modal.
export const projects: Project[] = [
  {
    slug: 'findesk',
    title: 'Findesk — AI Equity-Research Assistant',
    blurb:
      'Search any NSE stock for live price, fundamentals & news, plus an AI research brief — Buy/Sell rating, 12-month target, bull/bear/risks — with a portfolio tracker, screener, and paper-trading desk.',
    longDescription:
      'A personal build: search any NSE-listed stock and get its live price, key fundamentals, and recent news, plus an AI-generated research brief — a Buy/Sell rating, a 12-month price target, and bull case / bear case / key risks — produced via the Gemini API with structured JSON output. Around that sits a full research workflow: a Supabase-backed watchlist, a portfolio tracker with an AI health analyzer, a paper-trading desk for testing a thesis without risking money, a mechanical "Stocks to Pick" screen over the NIFTY 500, and a side-by-side compare view for two stocks. Every third-party source is cached with a 15–30 min TTL and graceful fallbacks, and all LLM output is defensively validated so the app never crashes on a malformed response. Built solo on Next.js 14 (App Router) with TypeScript, covered by 53 tests.',
    tags: ['Next.js 14', 'TypeScript', 'Gemini API', 'Supabase'],
    match: '96% Match',
    year: '2026',
    link: 'https://equity-research-assistant-eta.vercel.app',
    repo: '',
    accent: '#34d399',
    image: '/projects/equity-research.svg',
  },
  {
    slug: 'product-analytics',
    title: 'Product Analytics Dashboard',
    blurb:
      'Turns a real 2.7M-event e-commerce clickstream into conversion funnels, cohort retention, and a churn model — every view surfaces a plain-English insight, not just a chart.',
    longDescription:
      'Built on RetailRocket’s real clickstream data — 2.7M events from 1.4M visitors. Finds the funnel’s biggest leak (only 2.45% of viewers add to cart, though 28% of those who do go on to buy — 0.83% end to end), that only ~4.6% of a week’s new visitors return the following week, and trains a churn model (ROC-AUC ≈ 0.69) showing recency drives churn while active days drive return. The funnel/cohort/KPI logic is written as pure, UI-free functions so the same engine generalizes to any event stream. Written up as a full growth case study — including two results that contradicted the original hypotheses and were kept anyway: https://github.com/Ayush05G/product-analytics-dashboard/blob/main/case-study.md',
    tags: ['Python', 'Streamlit', 'pandas', 'scikit-learn'],
    match: '95% Match',
    year: '2026',
    link: 'https://p-analytics-dashboard.streamlit.app',
    repo: 'https://github.com/Ayush05G/product-analytics-dashboard',
    accent: '#0071eb',
    image: '/projects/product-analytics.svg',
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
  },
  {
    slug: 'disaster-mesh',
    title: 'Project Aether — Offline Disaster Mesh',
    blurb:
      'A disaster-response network that works with no internet: local AI turns reports into structured data offline, and a CRDT ledger syncs them phone-to-phone over a peer mesh.',
    longDescription:
      'When infrastructure goes down, so does every app that assumes a server. Aether assumes the opposite: quantized small language models run on the edge device itself, extracting structured hazard reports from local text and images with no network at all. Those reports sync peer-to-peer over a libp2p mesh (mDNS discovery, gossipsub broadcast) into a grow-only-set CRDT ledger, so any two nodes that meet converge on the same state without a coordinator. Ordering trusts no wall clock — only Lamport clocks and a (node_id, seq) identity — because clocks drift and disagree in exactly the conditions this is built for. Verified with property-based tests and four dedicated chaos suites: three nodes cold-start to convergence in ~2s, a killed node catches up via anti-entropy, and a healed network partition reconverges in ~1s on identical event sets. Chaos testing earned its keep by finding two real bugs — a thread-safety race in the AI engine and a missing read timeout on the anti-entropy path.',
    tags: ['Python', 'libp2p', 'CRDT', 'FastAPI'],
    match: '97% Match',
    year: '2026',
    link: '',
    repo: '',
    accent: '#f59e0b',
    image: '/projects/disaster-mesh.svg',
  },
  {
    slug: 'scrum-dashboard',
    title: 'Scrum Dashboard — Sprint Health on Plane',
    blurb:
      'Plane tracks work items well but has no standup runner, burndown, or velocity history. This adds the ceremony layer on top — without replacing the tracker underneath.',
    longDescription:
      'Built after running sprints on a self-hosted Plane instance and hitting the same wall every week: it is a good work-item tracker and a poor ceremony tool — no standup runner, no burndown, no velocity history, and no way to see who has been blocked three days running. The interesting constraint is that Plane has no cycle-analytics endpoint and cannot report retroactively what a cycle’s scope was last Tuesday, so a burndown is impossible unless something records it daily. That is why this app owns a database despite Plane remaining the source of truth for work items: it stores only what Plane structurally cannot give back — daily cycle snapshots, standup sessions, and blocker history. v1 is strictly read-only against Plane; nothing in the API client issues a mutating request. Next.js and React with Prisma over Postgres, Google SSO via NextAuth, and a nightly snapshot cron, covered by 12 test suites.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Postgres'],
    match: '93% Match',
    year: '2026',
    link: '',
    repo: '',
    accent: '#22d3ee',
    image: '/projects/scrum-dashboard.svg',
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
          'CGPA 7.7 — building products and full-stack + infra skills alongside coursework at Netaji Subhas University of Technology.',
        thumbnail: '/seasons/ep-nsut.svg',
        highlight: 'CGPA 7.7',
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
        place: 'Executive Committee · PM Club, NSUT',
        when: 'Sep 2025 – Present',
        duration: '10 months',
        synopsis:
          'Run case-study sessions for 50+ members and teach PM fundamentals — RICE, North Star metrics, and JTBD.',
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
      'Associate PM at a fintech — a credit-card launch, a sprint turnaround, and the infra underneath it all. Six episodes, one summer.',
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
    ],
  },
]

// Achievements & certifications become their own row of cards.
export const achievements: Achievement[] = [
  {
    title: '600+ DSA Problems',
    tag: 'Problem Solving',
    detail: 'LeetCode rank #124,928 · Pupil on Codeforces.',
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
