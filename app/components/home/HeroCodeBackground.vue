<script setup lang="ts">
import { gsap } from 'gsap'
import { heroCodeString } from '~/data/heroCode'

const { isDark } = useTheme()
const textColor = computed(() => isDark.value ? '#ffffff' : '#111111')
const textColorRgb = computed(() => isDark.value ? '255,255,255' : '17,17,17')

const dimCanvasRef = ref<HTMLCanvasElement | null>(null)
const brightCanvasRef = ref<HTMLCanvasElement | null>(null)
const hoverCanvasRef = ref<HTMLCanvasElement | null>(null)
const solidCanvasRef = ref<HTMLCanvasElement | null>(null)
const scrollOffset = ref(0)

// Mobile detection + perf flags
const isMobile = ref(false)
let isHeroVisible = true
let frameSkip = 0

// Perf mode: true on slow machines or prefers-reduced-motion
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isLowEndDevice = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4
const isPerfMode = prefersReducedMotion || isLowEndDevice

// FPS cap: 60fps normal, 24fps perf mode
const FPS_INTERVAL = isPerfMode ? 1000 / 24 : 1000 / 60

// Mouse hover spotlight
const mousePos = { x: -1000, y: -1000 }
const HOVER_RADIUS = 200
const solidOpacity = { value: 1 }
const solidSubOpacity = { value: 1 }
const TEXT_PROXIMITY = 100
const textBounds = { x: 0, y: 0, w: 0, h: 0 }

let cachedLines: string[] = []
let cachedW = 0
let cachedFontSize = 0
let maskDirty = true
let subAnimating = false
let subSplitY = 0 // Y coordinate separating name from subtitle for solid text clipping

// Letter reveal animation state
const NAME_TEXT = 'JACOB WISEMAN'
const ALL_SUB_TEXTS = [
  'IT SUPPORT ENGINEER',
  'IT TECHNICIAN',
  'DESKTOP SUPPORT',
  'SYSTEMS & NETWORKS',
  'ELKVIEW, WV',
  'NORTHSTAR IT',
  'COMPTIA A+',
  'COMPTIA NETWORK+',
  'CSU GLOBAL',
]
let SUB_TEXTS = ALL_SUB_TEXTS
let currentSubIndex = 0
let currentSubText = SUB_TEXTS[0]!

const maxSubLen = Math.max(...SUB_TEXTS.map(s => s.length))
// Per-letter progress for subtitle cycling (y: 0=visible, 1=below, -1=above)
const subLetterProgress = Array.from({ length: maxSubLen }, () => ({ y: 0, opacity: 1 }))

const allLetters = [...NAME_TEXT, ...Array.from({ length: maxSubLen }, () => 'X')]
const letterProgress = allLetters.map(() => ({ y: 1, opacity: 0 }))
let revealDone = false

// Solid text + magnetic repel on hover
let lastMaskCanvas: HTMLCanvasElement | null = null
const MAGNETIC_RADIUS = 200
const MAGNETIC_STRENGTH = 25

// Code reveal: per-token random appear with clip from bottom
let tokenProgress: { clip: number }[] = []
let tokenShuffledIndices: number[] = []
let tokenFlatStartPerLine: number[] = []
let codeRevealDone = false

function wrapText(charWidth: number, text: string, maxWidth: number): string[] {
  const lines: string[] = []
  const charsPerLine = Math.floor(maxWidth / charWidth)
  let i = 0
  while (i < text.length) {
    lines.push(text.slice(i, i + charsPerLine))
    i += charsPerLine
  }
  return lines
}

function buildMaskUrl(cssW: number, cssH: number) {
  const tmp = document.createElement('canvas')
  const dpr = window.devicePixelRatio || 1
  tmp.width = cssW * dpr
  tmp.height = cssH * dpr
  const ctx = tmp.getContext('2d')
  if (!ctx) return

  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, cssW, cssH)

  const isMobileSplit = cssW < 600
  const nameFontSize = Math.max(48, Math.min(cssW * 0.09, 180))
  const subFontSize = nameFontSize * 0.45
  const nameLineGap = isMobileSplit ? nameFontSize * 0.15 : 0
  const nameY = cssH / 2 - (isMobileSplit ? nameFontSize * 1.0 : 0)
  const name2Y = nameY + nameFontSize + nameLineGap
  const subY = (isMobileSplit ? name2Y : nameY) + nameFontSize * 0.55 + (isMobileSplit ? 10 : 0)
  subSplitY = isMobileSplit ? name2Y + nameFontSize * 0.15 : nameY + nameFontSize * 0.15
  const revealHeight = nameFontSize * 1.2

  // Split name into lines for mobile
  const nameLines = isMobileSplit ? ['JACOB', 'WISEMAN'] : [NAME_TEXT]
  const nameLine1 = nameLines[0]!
  const nameLine2 = nameLines[1]

  // Update text bounding box for proximity detection
  ctx.font = `700 ${nameFontSize}px 'Clash Display', sans-serif`
  const _nw1 = ctx.measureText(nameLine1).width
  const _nw2 = nameLine2 ? ctx.measureText(nameLine2).width : 0
  const _nw = Math.max(_nw1, _nw2)
  ctx.font = `700 ${subFontSize}px 'Satoshi', sans-serif`
  ctx.letterSpacing = '0.3em'
  const _sw = ctx.measureText(currentSubText).width
  const totalW = Math.max(_nw, _sw)
  textBounds.x = (cssW - totalW) / 2
  textBounds.y = nameY - nameFontSize
  textBounds.w = totalW
  textBounds.h = (subY + subFontSize) - (nameY - nameFontSize)
  ctx.letterSpacing = '0px'

  ctx.fillStyle = textColor.value
  ctx.textBaseline = 'alphabetic'

  ctx.font = `700 ${nameFontSize}px 'Clash Display', sans-serif`

  // Magnetic repel: compute per-letter offset from cursor
  const applyMagnetic = revealDone && mousePos.x > -999

  // Draw name line(s)
  let globalCharIdx = 0
  for (let lineIdx = 0; lineIdx < nameLines.length; lineIdx++) {
    const line = nameLines[lineIdx]!
    const lineWidth = ctx.measureText(line).width
    let cursorX = (cssW - lineWidth) / 2
    const lineY = lineIdx === 0 ? nameY : name2Y

    for (let i = 0; i < line.length; i++) {
      const lp = letterProgress[globalCharIdx]!
      const char = line[i]!
      const charW = ctx.measureText(char).width

      let ox = 0
      let oy = 0
      if (applyMagnetic) {
        const cx = cursorX + charW / 2
        const cy = lineY - nameFontSize * 0.3
        const dx = cx - mousePos.x
        const dy = cy - mousePos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MAGNETIC_RADIUS && dist > 0) {
          const force = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH
          ox = (dx / dist) * force
          oy = (dy / dist) * force
        }
      }

      ctx.save()
      ctx.beginPath()
      ctx.rect(cursorX - 2 + ox, lineY - nameFontSize + oy, charW + 4, revealHeight)
      ctx.clip()

      ctx.globalAlpha = lp.opacity
      ctx.fillText(char, cursorX + ox, lineY + lp.y * revealHeight + oy)
      ctx.restore()

      cursorX += charW
      globalCharIdx++
    }
    // Account for the space between JACOB and WISEMAN in NAME_TEXT
    if (isMobileSplit && lineIdx === 0) globalCharIdx++ // skip the space
  }

  // Auto-shrink subtitle if it overflows
  const maxSubWidth = cssW * 0.9
  let actualSubFontSize = subFontSize
  ctx.font = `700 ${actualSubFontSize}px 'Satoshi', sans-serif`
  ctx.letterSpacing = '0.3em'
  let subWidth = ctx.measureText(currentSubText).width
  while (subWidth > maxSubWidth && actualSubFontSize > 10) {
    actualSubFontSize -= 1
    ctx.font = `700 ${actualSubFontSize}px 'Satoshi', sans-serif`
    subWidth = ctx.measureText(currentSubText).width
  }
  let cursorX = (cssW - subWidth) / 2
  const subRevealH = actualSubFontSize * 1.4

  for (let i = 0; i < currentSubText.length; i++) {
    const lp = letterProgress[NAME_TEXT.length + i]!
    const slp = subLetterProgress[i]!
    const char = currentSubText[i]!
    const charW = ctx.measureText(char).width

    let ox = 0
    let oy = 0
    if (applyMagnetic) {
      const cx = cursorX + charW / 2
      const cy = subY - subFontSize * 0.3
      const dx = cx - mousePos.x
      const dy = cy - mousePos.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MAGNETIC_RADIUS && dist > 0) {
        const force = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH
        ox = (dx / dist) * force
        oy = (dy / dist) * force
      }
    }

    ctx.save()
    ctx.beginPath()
    ctx.rect(cursorX - 2 + ox, subY - subFontSize + oy, charW + 4, subRevealH)
    ctx.clip()

    const alpha = revealDone ? slp.opacity : lp.opacity
    const yOffset = revealDone ? slp.y * subRevealH : lp.y * subRevealH
    ctx.globalAlpha = alpha
    ctx.fillText(char, cursorX + ox, subY + yOffset + oy)
    ctx.restore()

    cursorX += charW
  }

  lastMaskCanvas = tmp
}

// Draw solid white text with a radial "hole" around cursor that reveals the code underneath
function drawSolidText(canvas: HTMLCanvasElement) {
  if (!lastMaskCanvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const cssW = canvas.clientWidth
  const cssH = canvas.clientHeight
  const pw = Math.round(cssW * dpr)
  const ph = Math.round(cssH * dpr)

  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw
    canvas.height = ph
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, cssW, cssH)

  // Draw name part (above subSplitY) with solidOpacity
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, cssW, subSplitY)
  ctx.clip()
  ctx.globalAlpha = solidOpacity.value
  ctx.drawImage(lastMaskCanvas, 0, 0, cssW, cssH)
  ctx.globalCompositeOperation = 'source-in'
  ctx.fillStyle = textColor.value
  ctx.fillRect(0, 0, cssW, cssH)
  ctx.restore()

  // Draw subtitle part (below subSplitY) with solidOpacity * solidSubOpacity
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, subSplitY, cssW, cssH - subSplitY)
  ctx.clip()
  ctx.globalAlpha = solidOpacity.value * solidSubOpacity.value
  ctx.drawImage(lastMaskCanvas, 0, 0, cssW, cssH)
  ctx.globalCompositeOperation = 'source-in'
  ctx.fillStyle = textColor.value
  ctx.fillRect(0, 0, cssW, cssH)
  ctx.restore()
}

function startLetterReveal() {
  const tl = gsap.timeline({
    onComplete: () => { revealDone = true },
  })

  tl.to(
    letterProgress.slice(0, NAME_TEXT.length),
    {
      y: 0,
      opacity: 1,
      duration: 1.6,
      ease: 'elastic.out(1, 0.4)',
      stagger: 0.04,
    },
    0,
  )

  tl.to(
    letterProgress.slice(NAME_TEXT.length, NAME_TEXT.length + currentSubText.length),
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'elastic.out(1, 0.45)',
      stagger: 0.025,
    },
    0.5,
  )

  tl.call(() => {
    // Sync subLetterProgress with the initial reveal state
    for (let i = 0; i < currentSubText.length; i++) {
      subLetterProgress[i]!.y = 0
      subLetterProgress[i]!.opacity = 1
    }
    startSubtitleCycle()
  }, [], '+=0')
}

function startSubtitleCycle() {
  const INTERVAL = 3000
  const cycleNext = () => {
    const len = currentSubText.length
    subAnimating = true
    // Exit: stagger each letter upward + fade out
    const exitTl = gsap.timeline({
      onComplete: () => {
        // Solid stays opaque during exit, drop it now before new text enters
        solidSubOpacity.value = 0
        // Switch to next text
        currentSubIndex = (currentSubIndex + 1) % SUB_TEXTS.length
        currentSubText = SUB_TEXTS[currentSubIndex]!
        const newLen = currentSubText.length
        // Reset new letters below
        for (let i = 0; i < newLen; i++) {
          subLetterProgress[i]!.y = 1
          subLetterProgress[i]!.opacity = 0
        }
        // Enter: stagger each letter from below + fade solid back in
        gsap.to(subLetterProgress.slice(0, newLen), {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.025,
          onComplete: () => { subAnimating = false },
        })
        gsap.to(solidSubOpacity, { value: 1, duration: 0.6, ease: 'power2.out', delay: 0.3 })
      },
    })
    exitTl.to(subLetterProgress.slice(0, len), {
      y: -1,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      stagger: 0.02,
    })
  }
  subtitleIntervalId = setInterval(cycleNext, INTERVAL)
}

// Syntax highlighting colors (One Dark inspired)
const KEYWORDS = new Set(['import', 'from', 'export', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'async', 'await', 'default', 'interface', 'type', 'class', 'extends', 'new', 'true', 'false', 'null', 'undefined', 'void', 'typeof', 'readonly', 'enum', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'throw', 'finally', 'in', 'of', 'as', 'is'])
const BUILTINS = new Set(['ref', 'computed', 'onMounted', 'onUnmounted', 'watch', 'nextTick', 'defineNuxtConfig', 'useI18n', 'useRoute', 'useSeo', 'gsap', 'ScrollTrigger', 'defineComponent', 'reactive', 'toRef', 'provide', 'inject', 'useRuntimeConfig'])

interface Token { text: string, color: string }

function tokenizeLine(line: string, dim: boolean): Token[] {
  const tokens: Token[] = []
  const alpha = dim ? '90' : 'ff'

  // Catppuccin Mocha (dark) / Latte (light)
  const dark = isDark.value
  const cKeyword  = `${dark ? '#b7c4a8' : '#5f6e52'}${alpha}`
  const cString   = `${dark ? '#f3efe6' : '#3d4a34'}${alpha}`
  const cType     = `${dark ? '#e4d7c4' : '#8a6e45'}${alpha}`
  const cNumber   = `${dark ? '#d7b59a' : '#8c5a3c'}${alpha}`
  const cPunct    = `${dark ? '#8a847a' : '#8a847a'}${alpha}`
  const cBuiltin  = `${dark ? '#d7e4cb' : '#4f5e45'}${alpha}`
  const cDefault  = `${dark ? '#f3efe6' : '#1a1814'}${alpha}`
  const cComment  = `${dark ? '#5c574e' : '#8a847a'}${alpha}`

  let i = 0
  while (i < line.length) {
    if (line[i] === '\'' || line[i] === '"' || line[i] === '`') {
      const quote = line[i]
      let j = i + 1
      while (j < line.length && line[j] !== quote) j++
      tokens.push({ text: line.slice(i, j + 1), color: cString })
      i = j + 1
      continue
    }

    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ text: line.slice(i), color: cComment })
      break
    }

    if (/\d/.test(line[i]) && (i === 0 || /[^a-zA-Z_$]/.test(line[i - 1]))) {
      let j = i
      while (j < line.length && /[\d.]/.test(line[j])) j++
      tokens.push({ text: line.slice(i, j), color: cNumber })
      i = j
      continue
    }

    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++
      const word = line.slice(i, j)
      let color = cDefault
      if (KEYWORDS.has(word)) color = cKeyword
      else if (BUILTINS.has(word)) color = cBuiltin
      else if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) color = cType
      tokens.push({ text: word, color })
      i = j
      continue
    }

    if (/[{}()[\];:.,<>=!&|?+\-*/%@#~^\\]/.test(line[i]!)) {
      let j = i
      while (j < line.length && /[{}()[\];:.,<>=!&|?+\-*/%@#~^\\]/.test(line[j]!)) j++
      tokens.push({ text: line.slice(i, j), color: cPunct })
      i = j
      continue
    }

    let j = i
    while (j < line.length && !/[a-zA-Z_$0-9'"`{}()[\];:.,<>=!&|?+\-*/%@#~^\\/\d]/.test(line[j]!)) j++
    if (j === i) j = i + 1
    tokens.push({ text: line.slice(i, j), color: cDefault })
    i = j
  }

  return tokens
}

let cachedDimTokens: Token[][] = []

function rebuildTokenProgress() {
  let total = 0
  tokenFlatStartPerLine = []
  for (const line of cachedDimTokens) {
    tokenFlatStartPerLine.push(total)
    total += line.length
  }
  if (tokenProgress.length !== total) {
    tokenProgress = Array.from({ length: total }, () => ({ clip: codeRevealDone ? 1 : 0 }))
    tokenShuffledIndices = Array.from({ length: total }, (_, i) => i)
    for (let i = tokenShuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = tokenShuffledIndices[i]!
      tokenShuffledIndices[i] = tokenShuffledIndices[j]!
      tokenShuffledIndices[j] = tmp
    }
  }
}

function startCodeReveal() {
  rebuildTokenProgress()
  if (tokenProgress.length === 0) return

  const shuffledTargets = tokenShuffledIndices.map(i => tokenProgress[i]!)
  const total = shuffledTargets.length
  const totalDuration = 1.5

  const tl = gsap.timeline({
    onComplete: () => {
      codeRevealDone = true
    },
  })

  for (let i = 0; i < total; i++) {
    const delay = (i / total) * totalDuration
    tl.to(shuffledTargets[i]!, { clip: 1, duration: 1, ease: 'power2.out' }, delay)
  }

  tl.call(() => {
    codeRevealDone = true
    startLetterReveal()
  }, [], totalDuration - 0.2)
}

function drawCode(canvas: HTMLCanvasElement, isDim: boolean) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const cssW = canvas.clientWidth
  const cssH = canvas.clientHeight
  const pw = Math.round(cssW * dpr)
  const ph = Math.round(cssH * dpr)

  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw
    canvas.height = ph
    buildMaskUrl(cssW, cssH)
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  // Larger font on mobile = fewer characters to draw = better perf
  const minFontSize = isMobile.value ? 11 : 8
  const fontSize = Math.max(minFontSize, Math.min(cssW * 0.007, 14))
  const lineHeight = fontSize * 1.35
  const charWidth = fontSize * 0.602

  if (cssW !== cachedW || fontSize !== cachedFontSize) {
    ctx.font = `400 ${fontSize}px 'JetBrains Mono', monospace`
    // Use less code text to reduce tokens drawn per frame (mobile: 40%, desktop: 50%)
    const ratio = isMobile.value ? 0.25 : cssW >= 2560 ? 1 : 0.7
    const codeText = heroCodeString.slice(0, Math.floor(heroCodeString.length * ratio))
    cachedLines = wrapText(charWidth, codeText, cssW)
    cachedDimTokens = cachedLines.map(l => tokenizeLine(l, true))
    cachedW = cssW
    cachedFontSize = fontSize
    rebuildTokenProgress()
  }

  ctx.font = `400 ${fontSize}px 'JetBrains Mono', monospace`

  const totalLines = cachedLines.length
  const totalContentH = totalLines * lineHeight
  const scrollY = scrollOffset.value % totalContentH
  // How many lines fit on screen + 1 buffer
  const visibleLines = Math.ceil(cssH / lineHeight) + 2

  ctx.clearRect(0, 0, cssW, cssH)

  // Start index: which line is at the top of the viewport
  const startLine = Math.floor(scrollY / lineHeight)
  const pixelOffset = scrollY - startLine * lineHeight

  for (let v = 0; v < visibleLines; v++) {
    const i = (startLine + v) % totalLines
    const y = v * lineHeight - pixelOffset

    const baseY = y + lineHeight * 0.75

    if (!isDim) {
      if (!codeRevealDone) continue
      ctx.fillStyle = textColor.value
      ctx.fillText(cachedLines[i]!, 0, baseY)
    }
    else {
      let x = 0
      const tokens = cachedDimTokens[i]
      if (!tokens) continue
      const flatStart = tokenFlatStartPerLine[i] ?? 0

      for (let t = 0; t < tokens.length; t++) {
        const tok = tokens[t]!
        const prog = tokenProgress[flatStart + t]
        const clipVal = prog ? prog.clip : 1
        const tokW = tok.text.length * charWidth

        if (clipVal > 0.01) {
          if (clipVal < 0.99) {
            ctx.save()
            ctx.beginPath()
            ctx.rect(x, baseY - lineHeight * clipVal, tokW, lineHeight * clipVal)
            ctx.clip()
            ctx.fillStyle = tok.color
            ctx.fillText(tok.text, x, baseY)
            ctx.restore()
          }
          else {
            ctx.fillStyle = tok.color
            ctx.fillText(tok.text, x, baseY)
          }
        }

        x += tokW
      }
    }
  }
}

function drawHoverLayer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const cssW = canvas.clientWidth
  const cssH = canvas.clientHeight
  const pw = Math.round(cssW * dpr)
  const ph = Math.round(cssH * dpr)

  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw
    canvas.height = ph
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, cssW, cssH)

  if (mousePos.x < 0 || mousePos.y < 0) return

  ctx.save()
  const gradient = ctx.createRadialGradient(
    mousePos.x, mousePos.y, 0,
    mousePos.x, mousePos.y, HOVER_RADIUS,
  )
  gradient.addColorStop(0, `rgba(${textColorRgb.value},1)`)
  gradient.addColorStop(1, `rgba(${textColorRgb.value},0)`)

  ctx.globalCompositeOperation = 'source-over'

  const fontSize = Math.max(8, Math.min(cssW * 0.007, 14))
  const lineHeight = fontSize * 1.35
  const charWidth = fontSize * 0.602
  const totalLines = cachedLines.length
  const totalContentH = totalLines * lineHeight
  const hoverScrollY = scrollOffset.value % totalContentH
  const visibleLines = Math.ceil(cssH / lineHeight) + 2
  const startLine = Math.floor(hoverScrollY / lineHeight)
  const pixelOffset = hoverScrollY - startLine * lineHeight

  ctx.font = `400 ${fontSize}px 'JetBrains Mono', monospace`

  for (let v = 0; v < visibleLines; v++) {
    const i = (startLine + v) % totalLines
    const y = v * lineHeight - pixelOffset

    const baseY = y + lineHeight * 0.75
    let x = 0
    const tokens = cachedDimTokens[i]
    if (!tokens) continue

    for (const tok of tokens) {
      ctx.fillStyle = tok.color.slice(0, 7) + 'ff'
      ctx.fillText(tok.text, x, baseY)
      x += tok.text.length * charWidth
    }
  }

  ctx.globalCompositeOperation = 'destination-in'
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, cssW, cssH)
  ctx.restore()
}

function draw() {
  // Skip rendering when hero is off-screen
  if (!isHeroVisible) return

  // On mobile, render every other frame (30fps instead of 60fps)
  // Skip frame throttling during intro animations
  if (isMobile.value && revealDone) {
    frameSkip++
    if (frameSkip % 2 !== 0) return
  }

  // Rebuild mask only when something affecting it changed:
  // - intro letter reveal in progress
  // - subtitle cycle animating
  // - mouse moved (magnetic repel) → maskDirty set by listeners
  if (dimCanvasRef.value && (maskDirty || !revealDone || subAnimating)) {
    buildMaskUrl(dimCanvasRef.value.clientWidth, dimCanvasRef.value.clientHeight)
    maskDirty = false
  }

  if (dimCanvasRef.value) {
    drawCode(dimCanvasRef.value, true)
  }
  // Skip bright + hover layers on mobile (no cursor, saves 2 full canvas redraws)
  if (!isMobile.value) {
    if (brightCanvasRef.value) {
      drawCode(brightCanvasRef.value, false)
      // Clip bright code to the text mask via canvas compositing (no toDataURL / CSS mask)
      if (codeRevealDone && lastMaskCanvas) {
        const bctx = brightCanvasRef.value.getContext('2d')
        if (bctx) {
          const cw = brightCanvasRef.value.clientWidth
          const ch = brightCanvasRef.value.clientHeight
          bctx.globalCompositeOperation = 'destination-in'
          bctx.drawImage(lastMaskCanvas, 0, 0, cw, ch)
          bctx.globalCompositeOperation = 'source-over'
        }
      }
      brightCanvasRef.value.style.opacity = revealDone ? '0.85' : '0'
    }
    if (hoverCanvasRef.value) drawHoverLayer(hoverCanvasRef.value)
  }

  // Draw solid text (with radial hole around cursor)
  if (solidCanvasRef.value) drawSolidText(solidCanvasRef.value)
}

let rafId: number
let resizeObserver: ResizeObserver | null = null
let scrollTween: gsap.core.Tween | null = null
let heroEl: HTMLElement | null = null
let onMouseMove: ((e: MouseEvent) => void) | null = null
let onMouseLeave: (() => void) | null = null
let subtitleIntervalId: ReturnType<typeof setInterval> | null = null
let visibilityObserver: IntersectionObserver | null = null

onUnmounted(() => {
  if (subtitleIntervalId) clearInterval(subtitleIntervalId)
  visibilityObserver?.disconnect()
})

onMounted(() => {
  // Bail out entirely on Save-Data — CSS hides .hero-code-zone, we skip canvas work
  if (window.matchMedia('(prefers-reduced-data: reduce)').matches) return

  // Detect mobile/touch device
  isMobile.value = 'ontouchstart' in window || window.innerWidth < 768

  // Filter long subtitles on small screens
  if (window.innerWidth < 768) {
    SUB_TEXTS = ALL_SUB_TEXTS.filter(t => t.length <= 20)
    currentSubIndex = 0
    currentSubText = SUB_TEXTS[0]!
  }

  // Hide bright + hover canvas on mobile or perf mode (reduces GPU work)
  if (isMobile.value || isPerfMode) {
    if (brightCanvasRef.value) brightCanvasRef.value.style.display = 'none'
    if (hoverCanvasRef.value) hoverCanvasRef.value.style.display = 'none'
  }

  const proxy = { value: 0 }
  scrollTween = gsap.to(proxy, {
    value: 10000,
    duration: 700,
    ease: 'none',
    repeat: -1,
    onUpdate: () => { scrollOffset.value = proxy.value },
  })

  // Stop rendering + scrolling when hero is off-screen
  const heroSection = dimCanvasRef.value?.closest('section')
  if (heroSection) {
    visibilityObserver = new IntersectionObserver(
      (entries) => {
        isHeroVisible = entries[0]?.isIntersecting ?? true
        if (isHeroVisible) {
          scrollTween?.resume()
        }
        else {
          scrollTween?.pause()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -40% 0px' },
    )
    visibilityObserver.observe(heroSection)
  }

  // Force first draw to build tokens
  draw()

  // Start random code reveal
  startCodeReveal()

  let lastFrameTime = 0
  function loop(timestamp: number) {
    // FPS cap: skip frame if not enough time elapsed
    if (timestamp - lastFrameTime < FPS_INTERVAL) {
      rafId = requestAnimationFrame(loop)
      return
    }
    lastFrameTime = timestamp

    // prefers-reduced-motion: skip canvas redraw entirely, keep letter reveal only
    if (!prefersReducedMotion) {
      draw()
    }
    rafId = requestAnimationFrame(loop)
  }

  // Defer RAF start until browser is idle — avoids blocking main thread during LCP
  const startLoop = () => { rafId = requestAnimationFrame(loop) }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(startLoop, { timeout: 500 })
  }
  else {
    setTimeout(startLoop, 200)
  }

  // Mouse tracking for hover spotlight + solid text toggle (desktop only)
  heroEl = dimCanvasRef.value?.parentElement ?? null
  let nearText = false
  onMouseMove = (e: MouseEvent) => {
    if (!revealDone) return
    const rect = dimCanvasRef.value?.getBoundingClientRect()
    if (!rect) return
    mousePos.x = e.clientX - rect.left
    mousePos.y = e.clientY - rect.top
    maskDirty = true

    // Check proximity to text bounding box
    const dx = Math.max(textBounds.x - mousePos.x, 0, mousePos.x - (textBounds.x + textBounds.w))
    const dy = Math.max(textBounds.y - mousePos.y, 0, mousePos.y - (textBounds.y + textBounds.h))
    const dist = Math.sqrt(dx * dx + dy * dy)
    const isNear = dist < TEXT_PROXIMITY

    if (isNear && !nearText) {
      nearText = true
      gsap.to(solidOpacity, { value: 0, duration: 0.4, ease: 'power2.out' })
    }
    else if (!isNear && nearText) {
      nearText = false
      gsap.to(solidOpacity, { value: 1, duration: 0.4, ease: 'power2.out' })
    }
  }
  onMouseLeave = () => {
    mousePos.x = -1000
    mousePos.y = -1000
    maskDirty = true
    if (nearText) {
      nearText = false
      gsap.to(solidOpacity, { value: 1, duration: 0.4, ease: 'power2.out' })
    }
  }
  heroEl?.addEventListener('mousemove', onMouseMove)
  heroEl?.addEventListener('mouseleave', onMouseLeave)

  // Invalidate token cache on theme change so colors update
  watch(isDark, () => { cachedW = 0 })

  resizeObserver = new ResizeObserver(() => {
    cachedW = 0
    maskDirty = true
  })
  if (dimCanvasRef.value) resizeObserver.observe(dimCanvasRef.value)

})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  scrollTween?.kill()
  resizeObserver?.disconnect()
  if (heroEl && onMouseMove) heroEl.removeEventListener('mousemove', onMouseMove)
  if (heroEl && onMouseLeave) heroEl.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<template>
  <div class="hero-code-zone absolute inset-0" aria-hidden="true">
    <!-- Layer 1: dim code everywhere -->
    <canvas ref="dimCanvasRef" class="hero-code-canvas" style="opacity: 0.4" />
    <!-- Layer 2: bright code, CSS-masked to name shape (visible when solid fades) -->
    <canvas ref="brightCanvasRef" class="hero-code-canvas" style="opacity: 0.85" />
    <!-- Layer 3: hover spotlight - brighter code around cursor -->
    <canvas ref="hoverCanvasRef" class="hero-code-canvas" style="opacity: 0.7; pointer-events: none" />
    <!-- Layer 4: solid white text on top (fades out on hover to reveal code through letters) -->
    <canvas ref="solidCanvasRef" class="hero-code-canvas" style="pointer-events: none" />
  </div>
</template>
