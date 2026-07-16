// ============================================================================
//  YOUR CONTENT LIVES HERE  (Netflix-style portfolio)
//  Edit this file to make the whole site yours. Nothing else needs to change.
// ============================================================================

export type RowId = 'projects' | 'learning' | 'top10' | 'skills' | 'achievements' | 'journey'

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
}

export interface ProfileSummary {
  id: string
  name: string
  avatar: string
  color: string
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
}

export interface TimelineEntry {
  when: string
  title: string
  place: string
  detail: string
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
  // Real facts that cycle in the billboard "trailer" typewriter.
  trailerLines: [
    'Led a credit-card product launch at Bachatt × ZET',
    'Sprint completion 40% → 75% as Scrum Manager',
    'Migrated Jira & Confluence → self-hosted on Azure AKS',
    'Built a two-way Plane ↔ Slack bridge over Socket Mode',
    '2.7M real events → a plain-English churn model',
    'SARIMA AQI forecast · MAE 24.7 vs 29.6 baseline',
    '500+ DSA problems · Top 100K on LeetCode',
    'Peer-reviewed ML paper · Physica Scripta journal',
  ],
}

// The "Who's watching?" profiles. Each is a doorway into the same site.
// `avatar` is a photo/icon in /public/avatars; `color` is the fallback
// background shown behind it (and used for the nav avatar's initial).
export const profiles: ProfileSummary[] = [
  { id: 'recruiter', name: 'Recruiter', avatar: '/avatars/recruiter.jpg', color: 'linear-gradient(135deg,#e50914,#b81d24)' },
  { id: 'developer', name: 'Developer', avatar: '/avatars/developer.png', color: 'linear-gradient(135deg,#0071eb,#00c6ff)' },
  { id: 'friend', name: 'Friend', avatar: '/avatars/friend.png', color: 'linear-gradient(135deg,#f5c518,#ff8a00)' },
  { id: 'stalker', name: 'Curious', avatar: '/avatars/curious.png', color: 'linear-gradient(135deg,#8a2be2,#e50914)' },
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
    order: ['journey', 'projects', 'achievements', 'learning', 'top10', 'skills'],
    cta: { label: 'See Experience', target: 'journey' },
  },
  developer: {
    tagline:
      'Full-stack + infra: Next.js/TypeScript apps, Python data tools, and the Kubernetes (Azure AKS) and CI/CD they run on. Dig into the projects, the stack, and how it fits together.',
    order: ['projects', 'learning', 'top10', 'skills', 'achievements', 'journey'],
    cta: { label: 'View Projects', target: 'projects' },
    resumeUrl: '/resume-developer.pdf', // Phone number redacted before publishing — see conversation for details
  },
  friend: {
    tagline:
      "Hey! 👋 This is the fun cut — the products I've launched, the infra I've broken and fixed, and where I'm headed next. Grab a coffee and scroll.",
    order: ['projects', 'learning', 'journey', 'top10', 'achievements', 'skills'],
    cta: { label: 'Take a Look', target: 'projects' },
  },
  stalker: {
    tagline:
      "Curious? Good. Everything's here — every project, every skill, the whole story from product to infrastructure. Start anywhere and poke around.",
    order: ['projects', 'learning', 'top10', 'achievements', 'journey', 'skills'],
    cta: { label: 'Start Exploring', target: 'projects' },
  },
}

export const socials: Social[] = [
  { label: 'GitHub', url: 'https://github.com/Ayush05G', handle: '@Ayush05G' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ayush-gupta-17b3112a2/', handle: '/in/ayush-gupta' },
  { label: 'LeetCode', url: 'https://leetcode.com/u/AG2425/', handle: '@AG2425 · Top 100K' },
  { label: 'Email', url: 'mailto:ayush2425.rk@gmail.com', handle: 'ayush2425.rk@gmail.com' },
]

export const about: About = {
  paragraphs: [
    "I'm an Electrical Engineering undergrad at NSUT who lives where product meets engineering. Most recently I was an Associate PM at Bachatt, a fintech, where I led the launch of a new credit-card product with our partner ZET — owning the spec and roadmap and driving delivery across engineering, design, and the partner team.",
    "But I don't stop at the spec. On the same role I ran Bachatt's Atlassian → self-hosted migration end to end (Jira & Confluence onto Plane + Outline on Azure AKS), built a two-way Plane ↔ Slack bridge, and stood up production infra and a CDN asset pipeline. Alongside that I ship full-stack side projects, solved 500+ DSA problems, and co-authored a peer-reviewed ML paper. Currently open to full-time product and software roles.",
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
      'Search any NSE stock for live price, fundamentals & news, plus an AI research brief — Buy/Sell rating, 12-month target, and bull/bear/risks — with a Supabase-backed watchlist.',
    longDescription:
      'A personal build: search any NSE-listed stock and get its live price, key fundamentals, and recent news, plus an AI-generated research brief — a Buy/Sell rating, a 12-month price target, and bull case / bear case / key risks — produced via the Gemini API with structured JSON output. A Supabase-backed watchlist saves the stocks you follow. Every third-party source is cached with a 15–30 min TTL and graceful fallbacks, and all LLM output is defensively validated so the app never crashes on a malformed response. Built solo on Next.js 14 (App Router) with TypeScript.',
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
      'Built on RetailRocket’s real clickstream data — 2.7M events from 1.4M visitors. Finds the funnel’s biggest leak (view → add-to-cart converts at just 2.69%), that only ~4.6% of a week’s new visitors return the following week, and trains a churn model (ROC-AUC ≈ 0.69) showing recency drives churn while active days drive return. The funnel/cohort/KPI logic is written as pure, UI-free functions so the same engine generalizes to any event stream.',
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

// Experience + education become the "My Journey" row (most recent first).
export const timeline: TimelineEntry[] = [
  {
    when: 'May 2026 – Jul 2026',
    title: 'Associate Product Manager',
    place: 'Bachatt (Fintech)',
    detail:
      'Led the launch of a new credit-card product with partner ZET — owned spec & roadmap. As Scrum Manager lifted sprint completion 40% → 75%. Ran the Atlassian → self-hosted migration (Plane + Outline on Azure AKS) and built a two-way Plane ↔ Slack bridge.',
  },
  {
    when: 'Mar 2026 – Apr 2026',
    title: 'Brand Marketing Intern',
    place: 'CashKaro',
    detail:
      'Built a campus growth strategy for NSUT — mapped the funnel and unit economics — and drove 40+ students from signup to first transaction within 3 weeks.',
  },
  {
    when: 'Sep 2025 – Present',
    title: 'Executive Committee Member',
    place: 'PM Club, NSUT',
    detail:
      'Run case-study sessions for 50+ members and teach PM fundamentals — RICE, North Star metrics, and JTBD.',
  },
  {
    when: 'Mar 2024 – Present',
    title: 'Logistics Coordinator',
    place: 'Moksha & Resonanz, NSUT',
    detail:
      "Ran logistics for 50+ events across 6 venues at North India's largest college fest, leading 20+ volunteers with zero escalations.",
  },
  {
    when: '2023 – 2027',
    title: 'B.Tech, Electrical Engineering',
    place: 'Netaji Subhas University of Technology',
    detail: 'CGPA 7.7 — building products and full-stack + infra skills alongside coursework.',
  },
]

// Achievements & certifications become their own row of cards.
export const achievements: Achievement[] = [
  {
    title: '500+ DSA Problems',
    tag: 'Problem Solving',
    detail: 'Top 100K on LeetCode · Pupil on Codeforces.',
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
