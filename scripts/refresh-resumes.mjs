// Render the two public resumes using the portal's current profile and layout.
// Usage: node scripts/refresh-resumes.mjs [path/to/resume-maker/portal]
// The portal is read-only. No model calls, private contact data, or job data
// are copied into the portfolio. Requires the portal's installed dependencies.
import { readFileSync, writeFileSync, mkdtempSync, rmSync, copyFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'

const root = fileURLToPath(new URL('../', import.meta.url))
const portal = path.resolve(process.argv[2] ?? path.join(root, '../resume-maker/portal'))
const resolve = createRequire(path.join(portal, 'package.json')).resolve
const source = JSON.parse(readFileSync(path.join(portal, 'data/master-profile.json'), 'utf8'))
const profile = {
  identity: {
    name: source.identity.name,
    phone: '',
    emails: { personal: source.identity.emails.personal },
    location: source.identity.location,
  },
  links: source.links,
  education: source.education,
  experience: source.experience,
  projects: source.projects.map((p) => ({
    ...p,
    bullets: p.bullets.map((b) =>
      b.id === 'b-fd-evaluation'
        ? {
            ...b,
            core: 'Designed a 60-question AI benchmark using fixed synthetic financial-data snapshots to evaluate tool selection, evidence handling and latency; retained quota and service failures in the results.',
          }
        : b.id === 'b-ae-mesh'
          ? {
              ...b,
              core: 'Implemented libp2p transport with mDNS discovery, gossipsub broadcast and anti-entropy catch-up. In single-machine multi-node tests, three nodes converged in about 2 seconds from cold start; partitioned nodes diverged, then reconverged in about 1 second after healing.',
            }
          : b,
    ),
    ...(p.id === 'proj-aether'
      ? {
          subtitle: 'Offline Disaster Mesh',
          stack: ['Python', 'FastAPI', 'libp2p', 'React'],
        }
      : p.id === 'proj-scrum'
        ? {
            subtitle: 'Sprint Health on Plane',
            stack: ['Next.js', 'TypeScript', 'Prisma/Postgres'],
          }
        : {}),
    // A private repository must not produce a broken public source link.
    repo:
      p.id === 'proj-aether'
        ? 'https://github.com/Ayush05G/disaster-mesh'
        : p.repoVisibility?.includes('private')
          ? undefined
          : p.repo,
  })),
  achievements: source.achievements.map((a) =>
    a.id === 'ach-dsa'
      ? {
          ...a,
          // The site already records 619 solved. The profile's old Top 100K claim
          // is unsupported, so keep the verified lower bound and omit the rank.
          core: 'Solved 600+ data-structures and algorithms problems on LeetCode; Pupil on Codeforces.',
          facts: ['600+', 'LeetCode', 'Pupil', 'Codeforces'],
        }
      : a,
  ),
}

const variants = [
  {
    filename: 'resume.pdf',
    track: 'non-tech',
    ids: [
      'b-zet-launch',
      'b-scrum',
      'b-cc-journey',
      'b-landing-experiments',
      'b-funnel-convert',
      'b-fd-surfaces',
      'b-fd-assistant',
      'b-fd-evaluation',
      'b-fd-evidence-guards',
      'b-pa-casestudy',
      'b-pa-power',
      'b-pmclub-cases',
      'ach-paper',
      'ach-nptel',
      'ach-dsa',
      'b-moksha-ops',
    ],
    skills: [
      {
        label: 'Product',
        items: [
          'PRDs & roadmapping',
          '0-to-1 launches & GTM',
          'RICE prioritization',
          'A/B testing & experiment design',
          'Agile/Scrum & sprint planning',
        ],
      },
      {
        label: 'Analytics & AI',
        items: [
          'SQL/Postgres',
          'BigQuery',
          'Python (pandas, NumPy, statsmodels)',
          'GA4 & CleverTap event instrumentation',
          'LLM function/tool calling',
          'fixed-snapshot AI evaluation & model benchmarking',
        ],
      },
    ],
  },
  {
    filename: 'resume-developer.pdf',
    track: 'tech',
    ids: [
      'b-infra',
      'b-upload-guardrails',
      'b-card-funnel',
      'b-fork-features',
      'b-fd-surfaces',
      'b-fd-assistant',
      'b-fd-evidence-guards',
      'b-ae-crdt',
      'b-ae-mesh',
      'b-ae-chaos',
      'b-sc-auth',
      'b-sc-cron',
      'ach-paper',
      'ach-dsa',
      'ach-nptel',
    ],
    skills: [
      {
        label: 'Engineering',
        items: [
          'TypeScript/JavaScript',
          'Python',
          'C++',
          'Next.js',
          'React',
          'Node.js',
          'FastAPI',
          'Prisma/Postgres',
          'REST APIs',
        ],
      },
      {
        label: 'AI & Systems',
        items: [
          'LLM function/tool calling',
          'fixed-snapshot AI evaluation & model benchmarking',
          'CRDTs (grow-only sets, merge semantics)',
          'libp2p (mDNS, gossipsub, anti-entropy)',
          'partition tolerance & chaos testing',
        ],
      },
      {
        label: 'Infrastructure',
        items: ['Docker', 'Kubernetes (Azure AKS)', 'Helm', 'Jenkins CI/CD', 'Git', 'Supabase'],
      },
    ],
  },
]

const knownSkills = new Set(Object.values(source.skills).flat())
for (const variant of variants) {
  for (const group of variant.skills) {
    for (const skill of group.items) {
      if (!knownSkills.has(skill)) throw new Error(`Skill missing from profile: ${skill}`)
    }
  }
}

const stage = mkdtempSync(path.join(tmpdir(), 'portfolio-resumes-'))
try {
  const react = pathToFileURL(resolve('react')).href
  const renderer = pathToFileURL(resolve('@react-pdf/renderer')).href
  let layout = readFileSync(path.join(portal, 'lib/render/modern.tsx'), 'utf8')
    .replace('from "react"', `from ${JSON.stringify(react)}`)
    .replace('from "@react-pdf/renderer"', `from ${JSON.stringify(renderer)}`)
    .replace('from "../profile"', 'from "./profile"')
    .replace('from "../track"', 'from "./track"')
  const contact = '{profile.identity.phone} • {profile.identity.emails.personal}'
  if (!layout.includes(contact))
    throw new Error('Portal contact layout changed; review redaction before exporting')
  layout = layout.replace(contact, '{profile.identity.emails.personal}')
  writeFileSync(path.join(stage, 'modern.tsx'), layout)
  writeFileSync(
    path.join(stage, 'profile.ts'),
    `export const profile = ${JSON.stringify(profile)};
export function certificateForTrack(e, track) { return e.certificateUrls?.[track] ?? e.certificateUrl; }`,
  )
  writeFileSync(path.join(stage, 'track.ts'), readFileSync(path.join(portal, 'lib/track.ts')))
  writeFileSync(
    path.join(stage, 'tsconfig.json'),
    JSON.stringify({ compilerOptions: { jsx: 'react', module: 'ESNext', target: 'ES2022' } }),
  )
  writeFileSync(
    path.join(stage, 'generate.mts'),
    `
import React from ${JSON.stringify(react)};
import { renderToBuffer } from ${JSON.stringify(renderer)};
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { ResumeDoc } from './modern.tsx';
import { profile } from './profile.ts';
const variants = ${JSON.stringify(variants)};
const bullets = new Map([
  ...profile.experience.flatMap(e => e.bullets),
  ...profile.projects.flatMap(p => p.bullets), ...profile.achievements
].map(b => [b.id, b]));
for (const v of variants) {
  for (const id of v.ids) if (!bullets.has(id)) throw new Error('Unknown bullet: ' + id);
  const draft = { track: v.track, positioning: '',
    sectionOrder: ['education','experience','projects','responsibility','achievements','skills'],
    selected: v.ids.map(id => ({bulletId:id, text:bullets.get(id).core, rationale:'editorial selection'})),
    skillGroups:v.skills, dropped:[], suggestions:[] };
  const trimmed = [];
  let buffer;
  while (true) {
    buffer = await renderToBuffer(React.createElement(ResumeDoc, {draft, useAltRoles:v.track==='tech'}));
    const pages = (buffer.toString('latin1').match(/\\/Type\\s*\\/Page(?![s])/g) || []).length;
    if (pages === 1) break;
    if (draft.selected.length <= 10) throw new Error('Resume does not fit: ' + v.filename);
    trimmed.push(draft.selected.pop().bulletId);
  }
  writeFileSync(path.join(${JSON.stringify(stage)}, v.filename), buffer);
  console.log(v.filename + ': 1 page, ' + draft.selected.length + ' bullets; trimmed: ' + (trimmed.join(', ') || 'none'));
}`,
  )
  execFileSync(
    process.execPath,
    [resolve('tsx/cli'), '--tsconfig', path.join(stage, 'tsconfig.json'), path.join(stage, 'generate.mts')],
    { stdio: 'inherit', cwd: root },
  )
  // Do not replace either public copy until both renders have succeeded.
  for (const { filename } of variants) {
    copyFileSync(path.join(stage, filename), path.join(root, 'public', filename))
  }
} finally {
  rmSync(stage, { recursive: true, force: true })
}
