import { ACCENT_COLORS as COLORS } from '~/lib/colors'

const INTERVAL = 10_000 // 10s
const TRANSITION_DURATION = 2_000 // 2s smooth fade

let currentIndex = 0
let intervalId: ReturnType<typeof setInterval> | null = null
let rafId: number | null = null
let transitionStart: number | null = null
let fromColor: [number, number, number] = hexToRgb(COLORS[0]!)
let toColor: [number, number, number] = hexToRgb(COLORS[0]!)

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function lerpColor(a: [number, number, number], b: [number, number, number], t: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t)
  const g = Math.round(a[1] + (b[1] - a[1]) * t)
  const bl = Math.round(a[2] + (b[2] - a[2]) * t)
  return `rgb(${r},${g},${bl})`
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function updateFavicon(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="${color}"/><text x="16" y="22" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="700" font-size="13" fill="#1a1814">jw</text></svg>`
  const url = `data:image/svg+xml,${encodeURIComponent(svg)}`
  let link = document.querySelector<HTMLLinkElement>('link[rel~="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = url
}

function animateTransition(timestamp: number) {
  if (transitionStart === null) transitionStart = timestamp
  const elapsed = timestamp - transitionStart
  const t = easeInOut(Math.min(elapsed / TRANSITION_DURATION, 1))
  const color = lerpColor(fromColor, toColor, t)
  updateFavicon(color)

  if (elapsed < TRANSITION_DURATION) {
    rafId = requestAnimationFrame(animateTransition)
  }
  else {
    rafId = null
    transitionStart = null
    fromColor = [...toColor] as [number, number, number]
  }
}

function transitionTo(color: string) {
  if (rafId) cancelAnimationFrame(rafId)
  fromColor = [...fromColor] as [number, number, number]
  toColor = hexToRgb(color)
  transitionStart = null
  rafId = requestAnimationFrame(animateTransition)
}

export function useColorCycle() {
  function apply(color: string) {
    document.documentElement.style.setProperty('--color-primary', color)
    transitionTo(color)
  }

  function start() {
    if (import.meta.server || intervalId) return

    // Start with a random color
    currentIndex = Math.floor(Math.random() * COLORS.length)
    fromColor = hexToRgb(COLORS[currentIndex]!)
    apply(COLORS[currentIndex]!)

    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % COLORS.length
      apply(COLORS[currentIndex]!)
    }, INTERVAL)
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  return { start, stop }
}
