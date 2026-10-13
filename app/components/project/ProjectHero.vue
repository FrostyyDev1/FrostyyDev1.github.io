<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '~/types'

const props = defineProps<{ project: Project }>()
const { t, te } = useI18n()

const heroEl = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const watermarkEl = ref<HTMLElement | null>(null)

const accent = computed(() => props.project.accentColor ?? 'var(--color-primary)')

const roleKey = computed(() => `projects.items.${props.project.slug}.role`)
const roleText = computed(() => (te(roleKey.value) ? t(roleKey.value) : ''))

const watermarkText = computed(() => props.project.year ?? props.project.title.slice(0, 4).toUpperCase())

let triggers: ScrollTrigger[] = []
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!heroEl.value) return
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    // Title pulls up + fades on scroll
    if (titleEl.value) {
      const t1 = gsap.to(titleEl.value, {
        yPercent: -40,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      if (t1.scrollTrigger) triggers.push(t1.scrollTrigger)
    }

    // Watermark drifts opposite for depth
    if (watermarkEl.value) {
      const t2 = gsap.to(watermarkEl.value, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      if (t2.scrollTrigger) triggers.push(t2.scrollTrigger)
    }

  }, heroEl.value)
})

onUnmounted(() => {
  triggers.forEach(t => t.kill())
  triggers = []
  ctx?.revert()
})
</script>

<template>
  <section
    ref="heroEl"
    class="project-hero project-hero--type"
    :style="{ '--project-accent': accent }"
  >
    <div class="project-hero-bg" aria-hidden="true" />
    <div class="project-hero-overlay" aria-hidden="true" />

    <div ref="watermarkEl" class="project-hero-watermark" aria-hidden="true">
      {{ watermarkText }}
    </div>

    <div class="project-hero-content">
      <div class="project-hero-meta-top" aria-hidden="true">
        <span class="project-hero-rule" />
        <span class="project-hero-tag">{{ project.year ?? '' }}</span>
        <span v-if="project.role || roleText" class="project-hero-tag">{{ roleText || project.role }}</span>
      </div>

      <h1 ref="titleEl" class="project-hero-title text-balance">
        {{ project.title }}
      </h1>

      <div class="project-hero-bottom">
        <div class="project-hero-tags">
          <Badge v-for="tech in project.technologies" :key="tech">{{ tech }}</Badge>
        </div>
        <a
          v-if="project.url"
          :href="project.url"
          target="_blank"
          rel="noopener"
          data-cursor-hover
          class="project-hero-cta"
        >
          <span>{{ t('projects.viewSite') }}</span>
          <IconsArrowTopRight aria-hidden="true" class="ml-1 h-3.5 w-3.5 shrink-0" />
        </a>
      </div>
    </div>

    <div class="project-hero-scroll-cue" aria-hidden="true">
      <span class="project-hero-scroll-line" />
    </div>
  </section>
</template>
