// ============================================================================
//  YOUR CONTENT LIVES HERE  (Netflix-style portfolio)
//  Edit this file to make the whole site yours. Nothing else needs to change.
// ============================================================================

export const profile = {
  name: 'Ayush Gupta',
  // Shown on the billboard hero under the name.
  tagline:
    'Product-oriented Electrical Engineering undergrad at NSUT and a full-stack builder who loves shipping fintech & edtech products. I take ideas from PRD to a working MVP — spec, design, and code.',
  // Fun Netflix-style metadata for the billboard.
  match: '98% Match',
  year: '2027',
  rating: "EE · NSUT '27",
  genres: ['Product', 'Full-Stack', 'Fintech', 'Edtech'],
  email: 'ayush2425.rk@gmail.com',
  location: 'Gurugram, India',
  resumeUrl: '', // Drop resume.pdf in /public and set '/resume.pdf' to show a Résumé button
}

// The "Who's watching?" profiles. Each is a doorway into the same site.
// `avatar` is a photo/icon in /public/avatars; `color` is the fallback
// background shown behind it (and used for the nav avatar's initial).
export const profiles = [
  { id: 'recruiter', name: 'Recruiter', avatar: '/avatars/recruiter.jpg', color: 'linear-gradient(135deg,#e50914,#b81d24)' },
  { id: 'developer', name: 'Developer', avatar: '/avatars/developer.png', color: 'linear-gradient(135deg,#0071eb,#00c6ff)' },
  { id: 'friend', name: 'Friend', avatar: '/avatars/friend.png', color: 'linear-gradient(135deg,#f5c518,#ff8a00)' },
  { id: 'stalker', name: 'Curious', avatar: '/avatars/curious.png', color: 'linear-gradient(135deg,#8a2be2,#e50914)' },
]

export const socials = [
  { label: 'GitHub', url: 'https://github.com/Ayush05G', handle: '@Ayush05G' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ayush-gupta-17b3112a2/', handle: '/in/ayush-gupta' },
  { label: 'LeetCode', url: 'https://leetcode.com/u/AG2425/', handle: '@AG2425 · Top 100K' },
  { label: 'Email', url: 'mailto:ayush2425.rk@gmail.com', handle: 'ayush2425.rk@gmail.com' },
]

export const about = {
  paragraphs: [
    "I'm a product-oriented Electrical Engineering undergrad at NSUT who builds full-stack products end to end. I like living where product thinking meets engineering — writing the spec, designing the flow, and shipping the MVP myself.",
    "Most of my work leans fintech and edtech: a UPI expense tracker, a realtime chat app, and more — always tested with real users and iterated on what they actually do, not just what they say. Outside of shipping, I've solved 500+ DSA problems and co-authored a peer-reviewed ML research paper. Currently open to full-time product and software roles.",
  ],
  facts: [
    { label: 'Focus', value: 'Product + Full-Stack' },
    { label: 'Stack', value: 'MERN · C++ · SQL' },
    { label: 'Status', value: 'Open for full-time roles' },
    { label: 'Based in', value: 'Gurugram, India' },
  ],
}

// Each skill becomes a card in the "Skills & Technologies" row.
// `level` (0–100) drives the little progress bar. `tag` is the small label.
// `logo` is an official brand icon in /public/skills (from Simple Icons);
// omit it for skills with no single brand logo (e.g. soft skills).
export const skills = [
  { name: 'C++', level: 85, tag: 'Language', logo: '/skills/cplusplus.svg' },
  { name: 'JavaScript', level: 82, tag: 'Language', logo: '/skills/javascript.svg' },
  { name: 'React', level: 75, tag: 'Framework', logo: '/skills/react.svg' },
  { name: 'Node.js', level: 74, tag: 'Backend', logo: '/skills/nodedotjs.svg' },
  { name: 'MongoDB', level: 72, tag: 'Database', logo: '/skills/mongodb.svg' },
  { name: 'SQL', level: 76, tag: 'Database', logo: '/skills/mysql.svg' },
  { name: 'HTML & CSS', level: 88, tag: 'Language', logo: '/skills/html5.svg' },
  { name: 'Tailwind CSS', level: 78, tag: 'Styling', logo: '/skills/tailwindcss.svg' },
  { name: 'Git & GitHub', level: 80, tag: 'Tooling', logo: '/skills/git.svg' },
  { name: 'DSA / Problem Solving', level: 85, tag: 'Foundations' },
  { name: 'Product Thinking', level: 82, tag: 'Product' },
  { name: 'Power BI', level: 70, tag: 'Analytics' },
  { name: 'Figma', level: 66, tag: 'Design', logo: '/skills/figma.svg' },
]

// Projects become the "Featured Projects" row. Click a card → detail modal.
export const projects = [
  {
    title: 'Delhi-NCR Air Quality Analytics',
    blurb:
      'An analytics dashboard on real CPCB data (2015–2026) that quantifies why and when Delhi’s air gets bad — trends, seasonality, event impact, and a validated SARIMA forecast.',
    longDescription:
      'Goes beyond basic EDA on real CPCB air-quality data spanning 2015–2026, stitched from three validated sources. Mean AQI eased from ~254 (2015) to ~200 (2025) with a sharp 2020 lockdown dip; PM2.5 swings ~5× between August and November. Quantifies event impact with confound-controlled baselines — stubble burning lifts Oct–Nov PM2.5 to 1.8× the rest of the year, Diwali adds +85% over the prior fortnight — and ships a SARIMA(1,1,2)(0,1,1,7) forecast that beats naive baselines on a 30-day holdout (MAE 24.7 vs 29.6). Every view surfaces a plain-English insight, not just a chart.',
    tags: ['Python', 'Streamlit', 'pandas', 'SARIMA', 'Time Series'],
    match: '99% Match',
    year: '2026',
    link: 'https://aqi-analytics-in.streamlit.app',
    repo: 'https://github.com/Ayush05G/aqi-analytics',
    accent: '#e50914',
  },
  {
    title: 'Product Analytics Dashboard',
    blurb:
      'Turns a real 2.7M-event e-commerce clickstream into conversion funnels, cohort retention, and a churn model — every section surfaces a plain-English insight, not just a chart.',
    longDescription:
      'Built on RetailRocket’s real clickstream data — 2.7M events from 1.4M visitors. Finds the funnel’s biggest leak (view → add-to-cart converts at just 2.69%), that only ~4.6% of a week’s new visitors return the following week, and trains a churn model (ROC-AUC ≈ 0.69) showing recency drives churn while active days drive return. The funnel/cohort/KPI logic is written as pure, UI-free functions so the same engine generalizes to any event stream, including a fintech app.',
    tags: ['Python', 'Streamlit', 'pandas', 'scikit-learn', 'Plotly'],
    match: '97% Match',
    year: '2026',
    link: 'https://p-analytics-dashboard.streamlit.app',
    repo: 'https://github.com/Ayush05G/product-analytics-dashboard',
    accent: '#0071eb',
  },
  {
    title: 'Equity Research Assistant',
    blurb:
      'An AI-assisted research tool for NSE-listed stocks — live price charts, fundamentals, recent news, and a generated research brief, with a saveable watchlist.',
    longDescription:
      'Search any NSE-listed stock and get a live price chart, key fundamentals, recent news, and an AI-generated research brief (bull case / bear case / key risks) via the Gemini API, plus a saveable watchlist backed by Supabase. Built solo on Next.js 14 (App Router) with TypeScript, pulling live data from Yahoo Finance and Google News with a caching layer for resilience against flaky third-party sources.',
    tags: ['Next.js', 'TypeScript', 'Gemini AI', 'Supabase'],
    match: '94% Match',
    year: '2026',
    link: 'https://equity-research-assistant-eta.vercel.app',
    repo: '',
    accent: '#34d399',
  },
  {
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
export const timeline = [
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
    when: 'Aug 2024 – Oct 2024',
    title: 'Volunteer',
    place: 'Yuva Jan Sangham (NGO)',
    detail: 'Joined education and health awareness drives across 3 Delhi districts, reaching 200+ people.',
  },
  {
    when: '2023 – 2027',
    title: 'B.Tech, Electrical Engineering',
    place: 'Netaji Subhas University of Technology',
    detail: 'CGPA 7.6 — building full-stack products and product skills alongside coursework.',
  },
]

// Achievements & certifications become their own row of cards.
export const achievements = [
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
