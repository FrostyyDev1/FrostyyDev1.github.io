import { gsap } from 'gsap'

export function useCustomCursor() {
  const cursorEl = ref<HTMLElement | null>(null)
  const cursorDotEl = ref<HTMLElement | null>(null)
  const cursorLabelEl = ref<HTMLElement | null>(null)
  const isTouch = ref(false)
  const listeners: Array<{ event: string, handler: EventListener }> = []

  function addDocListener(event: string, handler: EventListener) {
    document.addEventListener(event, handler)
    listeners.push({ event, handler })
  }

  function init() {
    if (typeof window === 'undefined') return
    // True touch detection: needs absence of fine pointer / hover capability.
    // Windows desktop Chrome reports 'ontouchstart' truthy by default — false positive.
    const supportsHoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    isTouch.value = !supportsHoverPointer
    if (isTouch.value) return

    // Two-part cursor: ring (halo, slow trail) + dot (precise, tight follow).
    // Both colored with --color-primary so they pick up the site's color cycle.
    const ring = document.createElement('div')
    ring.classList.add('custom-cursor-ring')
    document.body.appendChild(ring)
    cursorEl.value = ring

    const dot = document.createElement('div')
    dot.classList.add('custom-cursor-dot')
    document.body.appendChild(dot)
    cursorDotEl.value = dot

    const label = document.createElement('div')
    label.classList.add('custom-cursor-label')
    document.body.appendChild(label)
    cursorLabelEl.value = label

    // Hide the native cursor — the custom one takes over
    document.documentElement.classList.add('has-custom-cursor')

    // Initial position at viewport center, with -50%/-50% offset baked into transforms
    // (so subsequent gsap.to(x,y) won't lose the centering).
    gsap.set([ring, dot, label], {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    })

    // Follow mouse: dot tight, ring trails, label medium
    addDocListener('mousemove', (e) => {
      const { clientX, clientY } = e as MouseEvent
      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0.06,
        ease: 'power2.out',
        overwrite: true,
      })
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: true,
      })
      gsap.to(label, {
        x: clientX,
        y: clientY,
        duration: 0.22,
        ease: 'power2.out',
        overwrite: true,
      })
    })

    // Set up hover detection
    setupHoverListeners()
  }

  function setupHoverListeners() {
    const interactiveSelectors = 'a, button, [data-cursor-hover]'
    const projectSelectors = '[data-cursor-project]'

    const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'

    addDocListener('mouseover', (e) => {
      const target = (e as MouseEvent).target as HTMLElement

      const projectEl = target.closest(projectSelectors)
      if (projectEl) {
        cursorEl.value?.classList.add('hovering-project')
        cursorEl.value?.classList.remove('hovering')
        cursorDotEl.value?.classList.add('is-hidden')
        if (cursorLabelEl.value) {
          cursorLabelEl.value.innerHTML = ARROW_SVG
          cursorLabelEl.value.classList.add('visible', 'is-arrow')
        }
        return
      }

      const interactiveEl = target.closest(interactiveSelectors)
      if (interactiveEl) {
        cursorEl.value?.classList.add('hovering')
        cursorEl.value?.classList.remove('hovering-project')
        cursorDotEl.value?.classList.remove('is-hidden')
        if (cursorLabelEl.value) {
          cursorLabelEl.value.classList.remove('visible', 'is-arrow')
          cursorLabelEl.value.innerHTML = ''
        }
      }
    })

    addDocListener('mouseout', (e) => {
      const target = (e as MouseEvent).target as HTMLElement
      const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement | null

      if (target.closest(projectSelectors) && !relatedTarget?.closest(projectSelectors)) {
        cursorEl.value?.classList.remove('hovering-project')
        cursorDotEl.value?.classList.remove('is-hidden')
        if (cursorLabelEl.value) {
          cursorLabelEl.value.classList.remove('visible', 'is-arrow')
          cursorLabelEl.value.innerHTML = ''
        }
      }

      if (target.closest(interactiveSelectors) && !relatedTarget?.closest(interactiveSelectors)) {
        cursorEl.value?.classList.remove('hovering')
      }
    })
  }

  // Reset hover state via querySelector — this lets callers from contexts other than
  // the layout setup (e.g. router plugins) trigger a clean state without holding a ref.
  function reset() {
    document.querySelector('.custom-cursor-ring')?.classList.remove('hovering', 'hovering-project')
    document.querySelector('.custom-cursor-dot')?.classList.remove('is-hidden')
    const lbl = document.querySelector('.custom-cursor-label')
    if (lbl) {
      lbl.classList.remove('visible', 'is-arrow')
      lbl.innerHTML = ''
    }
  }

  function destroy() {
    listeners.forEach(({ event, handler }) => document.removeEventListener(event, handler))
    listeners.length = 0
    cursorEl.value?.remove()
    cursorDotEl.value?.remove()
    cursorLabelEl.value?.remove()
    document.documentElement.classList.remove('has-custom-cursor')
  }

  return { init, destroy, reset, isTouch }
}
