<script setup lang="ts">
import { projects } from '~/data/projects'

const props = defineProps<{ slug: string }>()
const { t } = useI18n()

const featured = computed(() => projects.filter(p => p.featured))
const currentIdx = computed(() => featured.value.findIndex(p => p.slug === props.slug))

const prev = computed(() => {
  const idx = currentIdx.value
  return idx > 0 ? featured.value[idx - 1] : null
})
const next = computed(() => {
  const idx = currentIdx.value
  return idx >= 0 && idx < featured.value.length - 1 ? featured.value[idx + 1] : null
})
</script>

<template>
  <nav class="project-footer-nav" :aria-label="t('projects.pagination')">
    <div class="project-footer-grid">
      <!-- Previous -->
      <NuxtLink
        v-if="prev"
        :to="`/projets/${prev.slug}`"
        data-cursor-project
        :data-cursor-text="t('projects.previous')"
        class="project-footer-card project-footer-card--prev"
        :style="{ '--accent': prev.accentColor || 'var(--color-primary)' }"
      >
        <span class="project-footer-kicker">
          <span class="project-footer-arrow project-footer-arrow--left" aria-hidden="true">←</span>&nbsp;{{ t('projects.previous') }}
        </span>
        <span class="project-footer-title text-balance">{{ prev.title }}</span>
        <span class="project-footer-tags">
          <span v-for="tech in prev.technologies.slice(0, 3)" :key="tech">{{ tech }}</span>
        </span>
      </NuxtLink>
      <NuxtLink
        v-else
        to="/projets"
        data-cursor-hover
        class="project-footer-card project-footer-card--all"
      >
        <span class="project-footer-kicker">
          <span class="project-footer-arrow project-footer-arrow--left" aria-hidden="true">←</span>
        </span>
        <span class="project-footer-title text-balance">{{ t('projects.allProjects') }}</span>
      </NuxtLink>

      <!-- Next -->
      <NuxtLink
        v-if="next"
        :to="`/projets/${next.slug}`"
        data-cursor-project
        :data-cursor-text="t('projects.next')"
        class="project-footer-card project-footer-card--next"
        :style="{ '--accent': next.accentColor || 'var(--color-primary)' }"
      >
        <span class="project-footer-kicker">
          {{ t('projects.next') }}&nbsp;<span class="project-footer-arrow project-footer-arrow--right" aria-hidden="true">→</span>
        </span>
        <span class="project-footer-title text-balance">{{ next.title }}</span>
        <span class="project-footer-tags">
          <span v-for="tech in next.technologies.slice(0, 3)" :key="tech">{{ tech }}</span>
        </span>
      </NuxtLink>
      <NuxtLink
        v-else
        to="/projets"
        data-cursor-hover
        class="project-footer-card project-footer-card--all project-footer-card--right"
      >
        <span class="project-footer-kicker">
          <span class="project-footer-arrow project-footer-arrow--right" aria-hidden="true">→</span>
        </span>
        <span class="project-footer-title text-balance">{{ t('projects.allProjects') }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>
