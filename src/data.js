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
export const profiles = [
  { id: 'recruiter', name: 'Recruiter', color: 'linear-gradient(135deg,#e50914,#b81d24)' },
  { id: 'developer', name: 'Developer', color: 'linear-gradient(135deg,#0071eb,#00c6ff)' },
  { id: 'friend', name: 'Friend', color: 'linear-gradient(135deg,#f5c518,#ff8a00)' },
  { id: 'stalker', name: 'Curious', color: 'linear-gradient(135deg,#8a2be2,#e50914)' },
]

export const socials = [
  { label: 'GitHub', url: 'https://github.com/Ayush05G', handle: '@Ayush05G' },
  // TODO: replace with your real LinkedIn and LeetCode profile URLs.
  { label: 'LinkedIn', url: 'https://linkedin.com/in/', handle: '/in/ayush-gupta' },
  { label: 'LeetCode', url: 'https://leetcode.com/', handle: 'Top 100K · 500+ solved' },
  { label: 'Email', url: 'mailto:ayush2425.rk@gmail.com', handle: 'ayush2425.rk@gmail.com' },
]

export const about = {
  paragraphs: [
    "I'm a product-oriented Electrical Engineering undergrad at NSUT who builds full-stack products end to end. I like living where product thinking meets engineering — writing the spec, designing the flow, and shipping the MVP myself.",
    "Most of my work leans fintech and edtech: a UPI expense tracker, a realtime chat app, and more — always tested with real users and iterated on what they actually do, not just what they say. Outside of shipping, I've solved 500+ DSA problems and co-authored a peer-reviewed ML research paper. Currently open to product and software internships.",
  ],
  facts: [
    { label: 'Focus', value: 'Product + Full-Stack' },
    { label: 'Stack', value: 'MERN · C++ · SQL' },
    { label: 'Status', value: 'Open to internships' },
    { label: 'Based in', value: 'Gurugram, India' },
  ],
}

// Each skill becomes a card in the "Skills & Technologies" row.
// `level` (0–100) drives the little progress bar. `tag` is the small label.
export const skills = [
  { name: 'C++', level: 85, tag: 'Language' },
  { name: 'JavaScript', level: 82, tag: 'Language' },
  { name: 'React', level: 75, tag: 'Framework' },
  { name: 'Node.js', level: 74, tag: 'Backend' },
  { name: 'MongoDB', level: 72, tag: 'Database' },
  { name: 'SQL', level: 76, tag: 'Database' },
  { name: 'HTML & CSS', level: 88, tag: 'Language' },
  { name: 'Tailwind CSS', level: 78, tag: 'Styling' },
  { name: 'Git & GitHub', level: 80, tag: 'Tooling' },
  { name: 'DSA / Problem Solving', level: 85, tag: 'Foundations' },
  { name: 'Product Thinking', level: 82, tag: 'Product' },
  { name: 'Power BI', level: 70, tag: 'Analytics' },
  { name: 'Figma', level: 66, tag: 'Design' },
]

// Projects become the "Featured Projects" row. Click a card → detail modal.
export const projects = [
  {
    title: 'FinSplit — UPI Expense Tracker',
    blurb:
      'A UPI-based group expense tracker for college students — split bills and settle up in a single tap. Spec’d, designed, and built the MVP end to end.',
    longDescription:
      'Spotted how messy group-expense tracking is among college students, so I wrote the spec, designed the flow, and coded the MVP myself. UPI deep-links make settlement a single tap. Beta-tested with 30 batchmates who logged 500+ transactions; I tracked settlement rate and D7 retention and iterated the UI twice based on what testers actually did — not just what they said.',
    tags: ['React', 'Node.js', 'MongoDB', 'Razorpay API'],
    match: '98% Match',
    year: '2026',
    link: '',
    repo: 'https://github.com/Ayush05G',
    accent: '#e50914',
  },
  {
    title: 'Real-Time Chat App',
    blurb:
      'One-to-one realtime chat with presence indicators and JWT auth, built on the MERN stack with sub-200ms message delivery.',
    longDescription:
      'Benchmarked 5 chat apps first — measured their latency and noted UX gaps — then built one-to-one chat with presence indicators and JWT authentication on the MERN stack with Socket.io. Hit under 200ms message delivery and added persistent message history after early testers complained about losing their chats on refresh.',
    tags: ['MERN', 'Socket.io', 'JWT', 'Tailwind CSS'],
    match: '95% Match',
    year: '2025',
    link: '',
    repo: 'https://github.com/Ayush05G',
    accent: '#0071eb',
  },
  {
    title: 'Tuned — Music Streaming App',
    blurb:
      'A responsive music player with play, pause, and seek that works cleanly on both mobile and desktop.',
    longDescription:
      'Built a music streaming player with play, pause, and seek that works on mobile and desktop without breaking. Showed it to 10 people, learned the controls were confusing, and redesigned the layout into something much clearer.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    match: '92% Match',
    year: '2024',
    link: '',
    repo: 'https://github.com/Ayush05G',
    accent: '#f5c518',
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
