import { gsap } from 'gsap'

// Module-level singleton — only one curtain exists at a time (it's mounted in the layout)
let curtainEl: HTMLElement | null = null

export function usePageTransition() {
  const transitionColor = useState<string>('page-transition-color', () => 'var(--color-primary)')

  function register(el: HTMLElement | null) {
    curtainEl = el
  }

  function setColor(color: string) {
    transitionColor.value = color
  }

  function enter(color?: string): Promise<void> {
    if (!curtainEl) return Promise.resolve()
    if (color) transitionColor.value = color
    return new Promise<void>((resolve) => {
      gsap.set(curtainEl, { visibility: 'visible' })
      gsap.fromTo(
        curtainEl,
        { yPercent: 101 },
        {
          yPercent: 0,
          duration: 0.55,
          ease: 'expo.inOut',
          onComplete: () => resolve(),
        },
      )
    })
  }

  function exit(): Promise<void> {
    if (!curtainEl) return Promise.resolve()
    return new Promise<void>((resolve) => {
      // Slide DOWN off the bottom — reveals the page TOP-DOWN so the hero appears first.
      // This avoids the brief flash of empty page bg that a top-leave would cause.
      gsap.to(curtainEl, {
        yPercent: 101,
        duration: 0.6,
        ease: 'expo.inOut',
        onComplete: () => {
          gsap.set(curtainEl, { visibility: 'hidden' })
          resolve()
        },
      })
    })
  }

  return { register, setColor, enter, exit, transitionColor }
}
