import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenis: Lenis | null = null
let rafTickerCb: ((time: number) => void) | null = null

export function useLenis() {
  function init() {
    if (import.meta.server || lenis) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    gsap.registerPlugin(ScrollTrigger)
    lenis.on('scroll', ScrollTrigger.update)

    rafTickerCb = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(rafTickerCb)
    gsap.ticker.lagSmoothing(0)
  }

  function destroy() {
    if (rafTickerCb) {
      gsap.ticker.remove(rafTickerCb)
      rafTickerCb = null
    }
    lenis?.destroy()
    lenis = null
  }

  function scrollTo(target: string | number | HTMLElement, opts?: { offset?: number, duration?: number, immediate?: boolean }) {
    if (lenis) {
      lenis.scrollTo(target, opts)
      return
    }
    // Fallback (reduced-motion or SSR): native behavior
    if (typeof target === 'string') {
      const el = document.querySelector<HTMLElement>(target.startsWith('#') ? target : `#${target}`)
      el?.scrollIntoView({ behavior: 'auto' })
    }
    else if (typeof target === 'number') {
      window.scrollTo({ top: target })
    }
    else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'auto' })
    }
  }

  function stop() { lenis?.stop() }
  function start() { lenis?.start() }

  return { init, destroy, scrollTo, stop, start, instance: () => lenis }
}
