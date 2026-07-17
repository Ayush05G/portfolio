// Converts the profile-gate avatars to webp (smaller, no quality loss users
// would notice at the ~72px display size). Run with: node scripts/optimize-images.mjs
import { readdir, unlink } from 'node:fs/promises'
import { extname, join } from 'node:path'
import sharp from 'sharp'

const dir = new URL('../public/avatars/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

const files = await readdir(dir)
const rasters = files.filter((f) => ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase()))

for (const file of rasters) {
  const src = join(dir, file)
  const dest = join(dir, file.replace(extname(file), '.webp'))
  const before = (await import('node:fs')).statSync(src).size
  await sharp(src).webp({ quality: 82 }).toFile(dest)
  const after = (await import('node:fs')).statSync(dest).size
  console.log(
    `${file} -> ${file.replace(extname(file), '.webp')}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
  )
  await unlink(src)
}

console.log('Done. Update the matching paths in src/data.ts to .webp.')
