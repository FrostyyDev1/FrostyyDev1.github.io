<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '~/types'

const props = defineProps<{ project: Project }>()
const { t, te } = useI18n()

const accent = computed(() => props.project.accentColor ?? 'var(--color-primary)')

const stats = computed(() => props.project.stats ?? [])
function statLabel(label: string): string {
  const key = `projects.items.${props.project.slug}.stats.${label}`
  return te(key) ? t(key) : label
}

const wrapEl = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!wrapEl.value) return
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const items = wrapEl.value!.querySelectorAll('.project-stat')
    if (!items.length) return

    gsap.from(items, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: wrapEl.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, wrapEl.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    v-if="stats.length"
    ref="wrapEl"
    class="project-stats"
    :style="{ '--project-accent': accent }"
    :aria-label="t('projects.statsLabel')"
  >
    <ul class="project-stats-list">
      <li v-for="(s, i) in stats" :key="i" class="project-stat-wrap">
        <div class="project-stat">
          <span class="project-stat-value">{{ s.value }}</span>
          <span class="project-stat-label">{{ statLabel(s.label) }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>
