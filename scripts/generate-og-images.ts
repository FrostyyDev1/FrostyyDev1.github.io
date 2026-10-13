import { chromium } from '@playwright/test'
import * as path from 'path'
import * as fs from 'fs'

const PORTRAIT_PATH = path.resolve('public/images/portrait-about.jpg')
const OUTPUT_DIR = path.resolve('public/images')

const portrait = `data:image/jpeg;base64,${fs.readFileSync(PORTRAIT_PATH).toString('base64')}`

const configs = [
  {
    lang: 'fr',
    output: 'og-image-fr.jpg',
    label: 'Développeur Fullstack Freelance',
  },
  {
    lang: 'en',
    output: 'og-image-en.jpg',
    label: 'Fullstack Freelance Developer',
  },
]

function buildHtml(config: typeof configs[0]) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preload" as="style" href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap" />
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 1200px;
    height: 630px;
    background: #080d1a;
    display: flex;
    overflow: hidden;
    font-family: 'Clash Display', system-ui, sans-serif;
  }

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 72px 64px;
    gap: 24px;
  }

  .divider {
    width: 48px;
    height: 2px;
    background: #06B6D4;
  }

  .name {
    font-size: 64px;
    font-weight: 700;
    color: #f0f0f0;
    letter-spacing: -1px;
    line-height: 1.1;
  }

  .label {
    font-size: 34px;
    font-weight: 500;
    color: #6b7fa8;
  }

  .right {
    width: 420px;
    position: relative;
    overflow: hidden;
  }

  .right::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, #080d1a 0%, transparent 35%);
    z-index: 1;
  }

  .right img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    filter: grayscale(20%);
  }
</style>
</head>
<body>
  <div class="left">
    <div class="divider"></div>
    <div class="name">Emeric Guyon</div>
    <div class="label">${config.label}</div>
  </div>
  <div class="right">
    <img src="${portrait}" />
  </div>
</body>
</html>`
}

async function generate() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1200, height: 630 })

  for (const config of configs) {
    const html = buildHtml(config)
    await page.setContent(html, { waitUntil: 'networkidle' })

    const outputPath = path.join(OUTPUT_DIR, config.output)
    await page.screenshot({ path: outputPath, type: 'jpeg', quality: 95 })
    console.log(`✓ ${config.output}`)
  }

  await browser.close()
  console.log('Done.')
}

generate()
