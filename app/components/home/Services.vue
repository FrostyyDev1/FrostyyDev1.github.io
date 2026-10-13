<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, tm, rt } = useI18n()
const { letterReveal, wordReveal } = useScrollAnimation()
const { goToContact } = useContactPrefill()

// Header reveals — match the rest of the site.
letterReveal('.services-label')
wordReveal('.services-title', 0.2)

// Rotating role word in the régie card (echo of the hero). Respects reduced motion.
const roles = computed(() => (tm('services.regie.roles') as unknown[]).map(m => rt(m as never)))
const bullets = computed(() => (tm('services.regie.bullets') as unknown[]).map(m => rt(m as never)))
const steps = computed(() =>
  (tm('services.process.steps') as { title: unknown, desc: unknown }[]).map(s => ({
    title: rt(s.title as never),
    desc: rt(s.desc as never),
  })),
)

const roleIndex = ref(0)
let roleTimer: ReturnType<typeof setInterval> | null = null
const triggers: ScrollTrigger[] = []

// 6 SEO domains — reuse the existing copy, mapped to icon + accent color (independent of the cycling brand accent).
const domains = [
  { key: 'custom', icon: resolveComponent('IconsCode'), color: '#8ea584' },
  { key: 'redesign', icon: resolveComponent('IconsRefresh'), color: '#b7c4a8' },
  { key: 'performance', icon: resolveComponent('IconsBolt'), color: '#c4a574' },
  { key: 'consulting', icon: resolveComponent('IconsBook'), color: '#d7e4cb' },
  { key: 'ai', icon: resolveComponent('IconsUsers'), color: '#9aab8c' },
  { key: 'team', icon: resolveComponent('IconsCheck'), color: '#e4d7c4' },
] as const

const offers = [
  { key: 'support', type: 'support' as const },
  { key: 'desktop', type: 'desktop' as const },
] as const

function track(t: gsap.core.Timeline) {
  if (t.scrollTrigger) triggers.push(t.scrollTrigger as ScrollTrigger)
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Rotating role
  if (!reduce) {
    roleTimer = setInterval(() => {
      roleIndex.value = (roleIndex.value + 1) % roles.value.length
    }, 2600)
  }

  if (reduce) return

  // --- Two tracks: reveal both cards, THEN their inner content staggers ---
  const tracksTl = gsap.timeline({
    defaults: { clearProps: 'transform,opacity,scale' },
    scrollTrigger: { trigger: '.services-tracks', start: 'top 78%', toggleActions: 'play none none none' },
  })
  track(tracksTl)
  tracksTl
    .from('.services-tracks > .svc-card', {
      y: 50, opacity: 0, scale: 0.96, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    })
    .from('.services-tracks .svc-anim', {
      y: 18, opacity: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out',
    }, '-=0.25')

  // --- Domains: cards fade-up, then icons pop in ---
  const domTl = gsap.timeline({
    defaults: { clearProps: 'transform,opacity,scale,rotation' },
    scrollTrigger: { trigger: '.services-grid', start: 'top 82%', toggleActions: 'play none none none' },
  })
  track(domTl)
  domTl
    .from('.services-grid > .svc-domain', {
      y: 40, opacity: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out',
    })
    .from('.services-grid .svc-domain-icon', {
      scale: 0, rotation: -12, duration: 0.5, stagger: 0.08, ease: 'back.out(2.2)',
    }, '-=0.3')
    .from('.services-grid .svc-domain-text', {
      y: 14, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out',
    }, '-=0.35')

  // --- Reassurance pills ---
  const pillsTl = gsap.timeline({
    defaults: { clearProps: 'transform,opacity,scale' },
    scrollTrigger: { trigger: '.services-pills', start: 'top 88%', toggleActions: 'play none none none' },
  })
  track(pillsTl)
  pillsTl.from('.services-pills > *', {
    y: 16, opacity: 0, scale: 0.9, duration: 0.4, stagger: 0.1, ease: 'back.out(1.6)',
  })

  // --- Process steps ---
  const procTl = gsap.timeline({
    defaults: { clearProps: 'transform,opacity,scale' },
    scrollTrigger: { trigger: '.services-process', start: 'top 82%', toggleActions: 'play none none none' },
  })
  track(procTl)
  procTl
    .from('.services-process > .svc-step', {
      y: 40, opacity: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out',
    })
    .from('.services-process .svc-step-num', {
      scale: 0.4, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(2)',
    }, '-=0.4')

  // --- Final CTA ---
  const finalTl = gsap.timeline({
    defaults: { clearProps: 'transform,opacity' },
    scrollTrigger: { trigger: '.services-final', start: 'top 85%', toggleActions: 'play none none none' },
  })
  track(finalTl)
  finalTl.from('.services-final .svc-anim', {
    y: 24, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
  })

  // Recalculate trigger positions once layout/fonts settle (Lenis + lazy content).
  ScrollTrigger.refresh()
})

onUnmounted(() => {
  if (roleTimer) clearInterval(roleTimer)
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section id="services" class="svc-section relative overflow-hidden py-20 lg:py-28">
    <div class="section-glow left-1/3 top-0 bg-primary" />

    <div class="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
      <!-- Header -->
      <header class="mb-14 max-w-2xl">
        <span class="section-label services-label">{{ t('services.label') }}</span>
        <h2 class="section-title services-title mt-4 !text-4xl md:!text-5xl lg:!text-6xl">
          {{ t('services.title') }}
        </h2>
        <p class="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          {{ t('services.subtitle') }}
        </p>
      </header>

      <!-- Two tracks -->
      <div class="services-tracks grid grid-cols-1 gap-5 lg:grid-cols-2">
        <!-- 01 — Régie (highlighted) -->
        <article class="svc-card svc-card--regie">
          <div class="svc-glow" aria-hidden="true" />
          <div class="relative z-10 flex h-full flex-col">
            <div class="svc-anim mb-6 flex items-center gap-3">
              <span class="svc-head-icon svc-head-icon--accent">
                <IconsUsers class="h-5 w-5" />
              </span>
              <span class="svc-tag svc-tag--accent">{{ t('services.regie.tag') }}</span>
            </div>

            <h3 class="svc-anim font-display text-2xl font-bold text-foreground md:text-3xl">
              {{ t('services.regie.title') }}
            </h3>
            <p class="svc-anim mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
              {{ t('services.regie.subtitle') }}
            </p>

            <!-- Rotating role -->
            <div class="svc-anim svc-role-box mt-6">
              <span class="svc-role-label">{{ t('services.regie.availableLabel') }}</span>
              <div class="svc-role-track">
                <Transition name="svc-role" mode="out-in">
                  <span :key="roleIndex" class="svc-role-word">{{ roles[roleIndex] }}</span>
                </Transition>
              </div>
            </div>

            <ul class="mt-6 space-y-3">
              <li v-for="(b, i) in bullets" :key="i" class="svc-anim flex items-start gap-3 text-sm text-foreground/85">
                <span class="svc-check"><IconsCheck class="h-3 w-3" /></span>
                {{ b }}
              </li>
            </ul>

            <p class="svc-anim mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <IconsClock class="h-4 w-4 shrink-0" />
              {{ t('services.regie.meta') }}
            </p>

            <div class="svc-anim mt-7 pt-1">
              <button type="button" class="svc-btn group" @click="goToContact()">
                {{ t('services.regie.cta') }}
                <IconsArrowTopRight class="ml-2 h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </article>

        <!-- 02 — Forfait (neutral) -->
        <article class="svc-card svc-card--forfait">
          <div class="relative z-10 flex h-full flex-col">
            <div class="svc-anim mb-6 flex items-center gap-3">
              <span class="svc-head-icon">
                <IconsPackage class="h-5 w-5" />
              </span>
              <span class="svc-tag">{{ t('services.forfait.tag') }}</span>
            </div>

            <h3 class="svc-anim font-display text-2xl font-bold text-foreground md:text-3xl">
              {{ t('services.forfait.title') }}
            </h3>
            <p class="svc-anim mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
              {{ t('services.forfait.subtitle') }}
            </p>
            <p class="svc-anim mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <IconsMapPin class="mt-px h-4 w-4 shrink-0 text-foreground/50" />
              {{ t('services.forfait.area') }}
            </p>

            <div class="mt-6 space-y-3">
              <button
                v-for="offer in offers"
                :key="offer.key"
                type="button"
                class="svc-anim svc-offer group"
                @click="goToContact(offer.type)"
              >
                <span class="svc-offer-main">
                  <span class="svc-offer-name">{{ t(`services.forfait.offers.${offer.key}.name`) }}</span>
                  <span class="svc-offer-desc">{{ t(`services.forfait.offers.${offer.key}.desc`) }}</span>
                </span>
                <span class="svc-offer-meta">
                  <span class="svc-offer-price">{{ t(`services.forfait.offers.${offer.key}.price`) }}</span>
                  <span class="svc-offer-delay">{{ t(`services.forfait.offers.${offer.key}.included`) }}</span>
                </span>
              </button>
            </div>

            <p class="svc-anim mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <IconsBolt class="h-4 w-4 shrink-0" />
              {{ t('services.forfait.meta') }}
            </p>

            <div class="svc-anim mt-auto pt-7">
              <button type="button" class="svc-btn svc-btn--outline group" @click="goToContact('systems')">
                {{ t('services.forfait.cta') }}
                <IconsArrowTopRight class="ml-2 h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Domains (SEO core) -->
      <div class="mt-20">
        <div class="mb-8 max-w-2xl">
          <span class="section-label">{{ t('services.domains.label') }}</span>
          <p class="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {{ t('services.domains.intro') }}
          </p>
        </div>

        <div class="services-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="d in domains"
            :key="d.key"
            class="svc-domain"
            :style="{ '--c': d.color }"
          >
            <span class="svc-domain-icon">
              <component :is="d.icon" class="h-5 w-5" />
            </span>
            <div class="svc-domain-text">
              <h3 class="mt-5 font-display text-lg font-bold leading-snug text-foreground">
                {{ t(`services.items.${d.key}.title`) }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                {{ t(`services.items.${d.key}.desc`) }}
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- Reassurance -->
      <div class="services-pills mt-20 flex flex-wrap justify-center gap-3">
        <span class="svc-pill"><IconsClock class="h-4 w-4" />{{ t('services.reassurance.response') }}</span>
        <span class="svc-pill"><IconsCheck class="h-4 w-4" />{{ t('services.reassurance.noCommit') }}</span>
        <span class="svc-pill"><IconsUsers class="h-4 w-4" />{{ t('services.reassurance.remote') }}</span>
      </div>

      <!-- Process -->
      <div class="mt-20">
        <div class="mb-8 text-center">
          <span class="section-label">{{ t('services.process.label') }}</span>
        </div>
        <div class="services-process grid grid-cols-1 gap-6 md:grid-cols-3">
          <div v-for="(step, i) in steps" :key="i" class="svc-step">
            <span class="svc-step-num">0{{ i + 1 }}</span>
            <h4 class="mt-3 font-display text-lg font-bold text-foreground">{{ step.title }}</h4>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Final CTA -->
      <div class="services-final svc-final mt-16">
        <div class="svc-final-glow" aria-hidden="true" />
        <div class="relative z-10 mx-auto max-w-2xl text-center">
          <h3 class="svc-anim font-display text-xl font-bold leading-snug text-foreground md:text-2xl">
            {{ t('services.finalCta.title') }}
          </h3>
          <p class="svc-anim mt-3 text-sm text-muted-foreground md:text-base">
            {{ t('services.finalCta.text') }}
          </p>
          <button type="button" class="svc-anim svc-btn group mt-7" @click="goToContact()">
            {{ t('services.finalCta.button') }}
            <IconsArrowTopRight class="ml-2 h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
