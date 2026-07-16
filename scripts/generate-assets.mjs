// Generates the social share image (og.png) and PWA icons from inline SVG,
// so there's no binary source asset to keep in sync. Run with:
//   node scripts/generate-assets.mjs
import sharp from 'sharp'

const publicDir = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="10" height="630" fill="#e50914"/>
  <text x="90" y="200" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="6" fill="#e50914">A PORTFOLIO</text>
  <text x="90" y="300" font-family="Arial, sans-serif" font-size="92" font-weight="700" fill="#ffffff">AYUSH GUPTA</text>
  <text x="90" y="360" font-family="Arial, sans-serif" font-size="30" font-weight="500" fill="#d2d2d2">98% Match · EE · NSUT &apos;27</text>
  <text x="90" y="420" font-family="Arial, sans-serif" font-size="26" fill="#8c8c8c">Product · Full-Stack · Infrastructure · Fintech</text>
  <g font-family="Arial, sans-serif" font-size="22" fill="#ffffff">
    <rect x="90" y="470" width="150" height="46" rx="4" fill="#e50914"/>
    <text x="115" y="500">▶ View Work</text>
  </g>
</svg>
`.trim()

const iconSvg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#141414"/>
  <text x="50%" y="58%" font-family="Arial, sans-serif" font-size="${size * 0.55}" font-weight="700"
        fill="#e50914" text-anchor="middle" dominant-baseline="middle">A</text>
</svg>
`.trim()

const maskableIconSvg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#141414"/>
  <text x="50%" y="58%" font-family="Arial, sans-serif" font-size="${size * 0.38}" font-weight="700"
        fill="#e50914" text-anchor="middle" dominant-baseline="middle">A</text>
</svg>
`.trim()

await sharp(Buffer.from(ogSvg)).png().toFile(`${publicDir}og.png`)
console.log('og.png written (1200x630)')

await sharp(Buffer.from(iconSvg(192))).png().toFile(`${publicDir}icons/icon-192.png`)
await sharp(Buffer.from(iconSvg(512))).png().toFile(`${publicDir}icons/icon-512.png`)
await sharp(Buffer.from(maskableIconSvg(512))).png().toFile(`${publicDir}icons/icon-512-maskable.png`)
console.log('PWA icons written to public/icons/')
