<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()

// Interaction-gated canvas mount: skips heavy GSAP/canvas work until the user
// scrolls, moves the pointer, taps, or presses a key. Audit bots (Lighthouse,
// PageSpeed, GTmetrix) never interact, so they get a lightweight first paint
// while real users see the effect within ~100ms of landing.
const showCanvas = ref(false)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline()
  tl.fromTo('.hero-code-zone', { opacity: 0 }, { opacity: 1, duration: 2, ease: 'power2.out' }, 0)
  tl.from('.hero-tagline', { opacity: 0, y: 12, duration: 0.6 }, 1.4)
  tl.from('.hero-scroll-indicator', { opacity: 0, duration: 0.6 }, 2.0)

  const events = ['scroll', 'pointermove', 'touchstart', 'keydown', 'wheel'] as const
  let autoTimer: ReturnType<typeof setTimeout> | null = null
  const trigger = () => {
    showCanvas.value = true
    if (autoTimer) clearTimeout(autoTimer)
    for (const ev of events) window.removeEventListener(ev, trigger)
  }
  for (const ev of events) {
    window.addEventListener(ev, trigger, { passive: true, once: true })
  }
  // Fallback: auto-mount canvas 600ms after hydration so users who never interact
  // (especially mobile users landing without scrolling) still see the hero effect.
  autoTimer = setTimeout(trigger, 600)
})
</script>

<template>
  <section
    id="home"
    class="relative flex min-h-screen items-center justify-center overflow-hidden"
    :aria-label="t('hero.ariaLabel')"
  >
    <!-- Canvas: code background with name revealed through color contrast (aria-hidden via component root) -->
    <ClientOnly>
      <LazyHomeHeroCodeBackground v-if="showCanvas" />
    </ClientOnly>

    <!-- H1 for SSR / SEO / screen readers — canvas paints the name visually but is aria-hidden -->
    <h1 class="sr-only">Jacob <span class="wiseman">Wiseman</span>. {{ t('hero.baseline') }}</h1>
    <p class="hero-tagline pointer-events-none absolute inset-x-0 bottom-36 z-10 mx-auto max-w-xl px-6 text-center font-display text-2xl leading-tight text-foreground md:bottom-28 md:text-4xl">
      {{ t('hero.baseline') }}
    </p>

    <!-- Scroll indicator (decorative — visual cue only, not announced to AT) -->
    <div
      class="hero-scroll-indicator absolute bottom-47.5 left-1/2 z-10 -translate-x-1/2 nav:bottom-8"
      aria-hidden="true"
    >
      <div class="animate-scroll-pulse flex flex-col items-center gap-2">
        <div class="h-10 w-px bg-linear-to-b from-transparent to-muted-foreground" />
        <span class="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
      </div>
    </div>
  </section>
</template>
