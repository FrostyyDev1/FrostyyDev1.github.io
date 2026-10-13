<script setup lang="ts">
import { projects } from '~/data/projects'
import ProjectsBento from '~/components/projects/ProjectsBento.vue'

const { t } = useI18n()

const featuredProjects = computed(() => projects.filter(p => p.featured))
</script>

<template>
  <section id="projects" class="relative">
    <!-- Section header -->
    <div class="projects-content relative z-10 mx-auto max-w-7xl px-4 md:px-8">
      <div class="mb-12 nav:mb-16">
        <span class="section-label projects-label">{{ t('projects.label') }}</span>
        <h2 class="section-title projects-title mt-4">
          {{ t('projects.title') }}<br>
          <span class="block">{{ t('projects.titleSuffix') }}</span>
        </h2>
      </div>
    </div>

    <!-- Bento grid (responsive: 1 col mobile → 6 cols tablet → 12 cols desktop) -->
    <ProjectsBento :projects="featuredProjects" />
  </section>
</template>
