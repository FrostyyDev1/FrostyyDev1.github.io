<script setup lang="ts">
import { projects } from '~/data/projects'

const { t } = useI18n()
const route = useRoute()
const project = computed(() =>
  projects.find(p => p.slug === route.params.slug)
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Record not found' })
}

const coverSrc = project.value.images.find(i => i.cover)?.src || project.value.images[0]?.src

useSeo({
  title: t(`projects.items.${project.value.slug}.seoTitle`),
  description: t(`projects.items.${project.value.slug}.seoDescription`),
  image: coverSrc,
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CreativeWork',
            'name': project.value.title,
            'description': t(`projects.items.${project.value.slug}.description`),
            'image': coverSrc ? `https://frostyydev1.github.io${coverSrc}` : undefined,
            'url': `https://frostyydev1.github.io/projets/${project.value.slug}`,
            'author': {
              '@type': 'Person',
              '@id': 'https://frostyydev1.github.io/#person',
              'name': 'Jacob Wiseman',
              'url': 'https://frostyydev1.github.io',
            },
            'keywords': project.value.technologies.join(', '),
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://frostyydev1.github.io',
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Work',
                'item': 'https://frostyydev1.github.io/projets',
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': project.value.title,
                'item': `https://frostyydev1.github.io/projets/${project.value.slug}`,
              },
            ],
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div v-if="project">
    <ProjectDetail :project="project" />
    <div class="mt-20 lg:mt-32" />
    <AppContact />
  </div>
</template>
