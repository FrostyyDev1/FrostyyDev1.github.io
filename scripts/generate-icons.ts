import sharp from 'sharp'
import path from 'node:path'

const OUTPUT_DIR = path.resolve('public')

// Static (non-animated) icon for PNG raster + maskable.
// Uses cyan #06B6D4 — the initial color of the cycle.
function buildSvg(size: number, maskable = false): string {
  // Maskable icons need a safe-zone (~10% padding) inside which the design
  // must fit, since launchers may crop the outer ring on round/squircle masks.
  const inset = maskable ? size * 0.1 : 0
  const radius = maskable ? 0 : size * 0.18 // square-bleed for maskable, rounded for any
  const tileSize = size - inset * 2
  const fontSize = Math.round(tileSize * 0.62)
  const textY = Math.round(inset + tileSize * 0.72)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${maskable ? '#06B6D4' : 'transparent'}"/>
  <rect x="${inset}" y="${inset}" width="${tileSize}" height="${tileSize}" rx="${radius}" fill="#06B6D4"/>
  <text x="${size / 2}" y="${textY}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="${fontSize}" fill="#ffffff">eg</text>
</svg>`
}

async function render(size: number, filename: string, maskable = false) {
  const svg = buildSvg(size, maskable)
  const outPath = path.join(OUTPUT_DIR, filename)
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(outPath)
  console.log(`✓ ${filename} (${size}×${size}${maskable ? ', maskable' : ''})`)
}

async function main() {
  await render(192, 'icon-192.png')
  await render(512, 'icon-512.png')
  await render(512, 'icon-maskable-512.png', true)
  await render(180, 'apple-touch-icon.png')
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
