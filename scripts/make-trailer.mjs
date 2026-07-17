// Builds the billboard trailer: composes branded 1280x720 frames from the
// REAL project chart SVGs (extracted from the live apps), then assembles a
// Ken Burns slideshow with ffmpeg. Run: node scripts/make-trailer.mjs
// Requires ffmpeg on PATH.
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, statSync } from 'node:fs'
import sharp from 'sharp'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const tmp = `${root}/.trailer-tmp`
const outDir = `${root}/public/trailer`
const W = 1280
const H = 720

rmSync(tmp, { recursive: true, force: true })
mkdirSync(tmp, { recursive: true })
mkdirSync(outDir, { recursive: true })

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

const frameSvg = ({ kicker, title, sub }) => `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#181818"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="0" y="0" width="8" height="${H}" fill="#e50914"/>
  <text x="72" y="92" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="5" fill="#e50914">${esc(kicker)}</text>
  <text x="72" y="146" font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="#ffffff">${esc(title)}</text>
  <text x="72" y="184" font-family="Arial, sans-serif" font-size="21" fill="#8c8c8c">${esc(sub)}</text>
</svg>`

// Title card doubles as the poster.
const titleCard = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="0" y="0" width="8" height="${H}" fill="#e50914"/>
  <text x="96" y="286" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="7" fill="#e50914">A PORTFOLIO</text>
  <text x="96" y="386" font-family="Arial, sans-serif" font-size="96" font-weight="700" fill="#ffffff">AYUSH GUPTA</text>
  <text x="96" y="446" font-family="Arial, sans-serif" font-size="28" fill="#d2d2d2">Product · Full-Stack · Infrastructure · Fintech</text>
</svg>`

const chartFrames = [
  {
    svg: 'equity-research.svg',
    kicker: 'FEATURED PROJECT',
    title: 'Findesk — AI Equity-Research Assistant',
    sub: 'Next.js 14 · TypeScript · Gemini API · Supabase',
  },
  {
    svg: 'product-analytics.svg',
    kicker: 'FEATURED PROJECT',
    title: 'Product Analytics Dashboard',
    sub: '2.7M real events · funnels, cohorts & a churn model',
  },
  {
    svg: 'aqi-analytics.svg',
    kicker: 'FEATURED PROJECT',
    title: 'Delhi-NCR Air Quality Analytics',
    sub: 'CPCB data 2015–2026 · SARIMA forecast, MAE 24.7 vs 29.6',
  },
]

// Frame 0: title card
await sharp(Buffer.from(titleCard)).png().toFile(`${tmp}/frame0.png`)

// Frames 1..3: header + the real chart, centered in the lower area.
for (let i = 0; i < chartFrames.length; i++) {
  const f = chartFrames[i]
  // Rasterize the chart at 2x for sharpness, target width 1120.
  const chart = await sharp(`${root}/public/projects/${f.svg}`, { density: 220 })
    .resize({ width: 1120 })
    .png()
    .toBuffer()
  const meta = await sharp(chart).metadata()
  const top = Math.max(216, Math.round(216 + (470 - meta.height) / 2))
  await sharp(Buffer.from(frameSvg(f)))
    .composite([{ input: chart, left: Math.round((W - meta.width) / 2), top }])
    .png()
    .toFile(`${tmp}/frame${i + 1}.png`)
}
console.log('frames written')

// Ken Burns per frame: slow zoom-in, 5s @ 24fps, then concat.
// NOTE: the input is a SINGLE still frame (no -loop). zoompan's `d` then
// expands that one frame into d output frames, and `on` (output frame
// number) drives a deterministic zoom ramp. Combining -loop with d is the
// classic footgun: every looped input frame would emit d frames each,
// yielding ~10 minutes of video per segment.
const SECONDS = 5
const FPS = 24
const D = SECONDS * FPS
const segs = []
for (let i = 0; i < 4; i++) {
  const seg = `${tmp}/seg${i}.mp4`
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      `${tmp}/frame${i}.png`,
      '-vf',
      // Upscale first so zoompan's per-frame crop doesn't jitter on subpixels.
      `scale=${W * 2}:${H * 2},zoompan=z='min(1+0.0009*on,1.14)':d=${D}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=${FPS}`,
      '-frames:v',
      String(D),
      '-an',
      '-c:v',
      'libx264',
      '-crf',
      '23',
      '-pix_fmt',
      'yuv420p',
      seg,
    ],
    { stdio: 'pipe' },
  )
  segs.push(seg)
  console.log(`seg${i} done`)
}

const concatList = segs.map((s) => `file '${s.replace(/\\/g, '/')}'`).join('\n')
await import('node:fs').then((fs) => fs.writeFileSync(`${tmp}/list.txt`, concatList))
execFileSync(
  'ffmpeg',
  [
    '-y',
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    `${tmp}/list.txt`,
    '-c:v',
    'libx264',
    '-crf',
    '28',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    `${outDir}/trailer.mp4`,
  ],
  { stdio: 'pipe' },
)

// Poster = the title card as jpg.
await sharp(`${tmp}/frame0.png`).jpeg({ quality: 82 }).toFile(`${outDir}/poster.jpg`)

const size = statSync(`${outDir}/trailer.mp4`).size
console.log(`trailer.mp4: ${(size / 1024 / 1024).toFixed(2)} MB, poster.jpg written`)
rmSync(tmp, { recursive: true, force: true })
