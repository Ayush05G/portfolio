// ============================================================================
//  YOUR CONTENT LIVES HERE  (Netflix-style portfolio)
//  Edit this file to make the whole site yours. Nothing else needs to change.
// ============================================================================

export const profile = {
  name: 'Ayush Gupta',
  // Shown on the billboard hero under the name.
  tagline:
    'A student developer who loves turning ideas into things people can click, use, and enjoy. Currently leveling up in full-stack web development and open to internships.',
  // Fun Netflix-style metadata for the billboard.
  match: '98% Match',
  year: '2026',
  rating: 'CS · B.Tech',
  genres: ['Full-Stack', 'React', 'Problem Solving', 'Open Source'],
  email: 'ayush.gupta2@bachatt.app',
  resumeUrl: '', // e.g. '/resume.pdf' — drop a PDF in /public and link it here
}

// The "Who's watching?" profiles. Each is a doorway into the same site,
// but you can tailor the vibe. `color` is the avatar gradient.
export const profiles = [
  { id: 'recruiter', name: 'Recruiter', color: 'linear-gradient(135deg,#e50914,#b81d24)' },
  { id: 'developer', name: 'Developer', color: 'linear-gradient(135deg,#0071eb,#00c6ff)' },
  { id: 'friend', name: 'Friend', color: 'linear-gradient(135deg,#f5c518,#ff8a00)' },
  { id: 'stalker', name: 'Curious', color: 'linear-gradient(135deg,#8a2be2,#e50914)' },
]

export const socials = [
  { label: 'GitHub', url: 'https://github.com/', handle: '@yourhandle' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/', handle: '/in/you' },
  { label: 'Twitter / X', url: 'https://x.com/', handle: '@yourhandle' },
  { label: 'Email', url: 'mailto:ayush.gupta2@bachatt.app', handle: 'ayush.gupta2@bachatt.app' },
]

export const about = {
  paragraphs: [
    "I'm an early-career developer fascinated by how good software feels effortless. I spend my time learning by building — shipping small projects, breaking things, and figuring out why they broke.",
    "I care about clean code, thoughtful design, and the little details that make an interface delightful. I'm currently looking for internships and opportunities where I can grow and contribute.",
  ],
  facts: [
    { label: 'Focus', value: 'Full-stack web' },
    { label: 'Learning', value: 'React · TypeScript' },
    { label: 'Status', value: 'Open to internships' },
    { label: 'Based in', value: 'India' },
  ],
}

// Each skill becomes a card in the "Skills & Technologies" row.
// `level` (0–100) drives the little progress bar. `tag` is the small label.
export const skills = [
  { name: 'JavaScript', level: 85, tag: 'Language' },
  { name: 'React', level: 82, tag: 'Framework' },
  { name: 'HTML & CSS', level: 90, tag: 'Language' },
  { name: 'Python', level: 78, tag: 'Language' },
  { name: 'TypeScript', level: 70, tag: 'Language' },
  { name: 'Node.js', level: 72, tag: 'Runtime' },
  { name: 'Git & GitHub', level: 80, tag: 'Tooling' },
  { name: 'Data Structures', level: 75, tag: 'Foundations' },
  { name: 'Databases', level: 62, tag: 'Foundations' },
  { name: 'UI / UX Design', level: 65, tag: 'Design' },
]

// Projects become the "Featured Projects" row. Click a card → detail modal.
export const projects = [
  {
    title: 'Realtime Chat App',
    blurb:
      'A full-stack chat application with rooms, typing indicators, and presence — built to learn WebSockets end to end.',
    longDescription:
      'Built to understand realtime systems from the ground up. Users can join rooms, see who is online, and watch typing indicators update live. The backend uses Socket.IO over Node.js; the frontend is React with optimistic UI updates.',
    tags: ['React', 'Node.js', 'Socket.IO'],
    match: '97% Match',
    year: '2025',
    link: '',
    repo: 'https://github.com/',
    accent: '#e50914',
  },
  {
    title: 'Study Planner',
    blurb:
      'A productivity app that breaks big goals into daily tasks with streaks and reminders. My take on beating procrastination.',
    longDescription:
      'A planner that turns overwhelming goals into small daily wins. Tracks streaks, sends reminders, and works offline as a PWA. Data persists in the browser so it works with zero setup.',
    tags: ['React', 'LocalStorage', 'PWA'],
    match: '95% Match',
    year: '2025',
    link: '',
    repo: 'https://github.com/',
    accent: '#0071eb',
  },
  {
    title: 'Weather Dashboard',
    blurb:
      'A clean dashboard that visualizes forecasts and air quality using public APIs, with location search and saved cities.',
    longDescription:
      'Pulls live forecast and air-quality data from public APIs and visualizes it with clean charts. Search any city, save your favorites, and get an at-a-glance read on the day ahead.',
    tags: ['JavaScript', 'REST API', 'Charts'],
    match: '92% Match',
    year: '2024',
    link: '',
    repo: 'https://github.com/',
    accent: '#f5c518',
  },
  {
    title: 'Portfolio (this site)',
    blurb:
      'The site you are looking at — an interactive, Netflix-inspired portfolio built from scratch with React and Framer Motion.',
    longDescription:
      'A Netflix-inspired take on the personal portfolio: a profile gate, a billboard hero, and browsable rows of "titles". Built from scratch with React, Vite, and Framer Motion.',
    tags: ['React', 'Vite', 'Framer Motion'],
    match: '100% Match',
    year: '2026',
    link: '',
    repo: 'https://github.com/',
    accent: '#8a2be2',
  },
]

// Timeline becomes the "My Journey" row.
export const timeline = [
  {
    when: '2024 — Present',
    title: 'B.Tech in Computer Science',
    place: 'Your University',
    detail: 'Coursework in data structures, web development, and systems.',
  },
  {
    when: '2025',
    title: 'Open Source Contributor',
    place: 'Various projects',
    detail: 'Merged pull requests fixing bugs and improving docs on community projects.',
  },
  {
    when: '2023',
    title: 'Started Coding',
    place: 'Self-taught',
    detail: 'Fell in love with building for the web after my first "Hello, World".',
  },
]
