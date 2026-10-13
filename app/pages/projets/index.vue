<script setup lang="ts">
import { projects } from '~/data/projects'
import ProjectsBento from '~/components/projects/ProjectsBento.vue'

const { t } = useI18n()

useSeo({
  title: t('projectsPage.seoTitle'),
  description: t('projectsPage.seoDescription'),
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': t('projectsPage.seoTitle'),
        'description': t('projectsPage.seoDescription'),
        'url': 'https://frostyydev1.github.io/projets',
        'isPartOf': { '@id': 'https://frostyydev1.github.io/#website' },
        'about': { '@id': 'https://frostyydev1.github.io/#person' },
        'hasPart': projects.map(p => ({
          '@type': 'CreativeWork',
          'name': p.title,
          'url': `https://frostyydev1.github.io/projets/${p.slug}`,
        })),
      }),
    },
  ],
})
</script>

<template>
  <section class="relative pt-32 pb-8 lg:pt-40">
    <div class="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
      <div class="mb-12 max-w-3xl nav:mb-16">
        <span class="section-label">{{ t('projectsPage.label') }}</span>
        <h1 class="section-title mt-4">{{ t('projectsPage.title') }}</h1>
        <p class="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          {{ t('projectsPage.intro') }}
        </p>
      </div>
    </div>
    <ProjectsBento :projects="projects" />
  </section>
</template>
