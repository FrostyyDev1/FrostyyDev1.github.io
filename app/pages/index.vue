<script setup lang="ts">
import { siteUrl, person, contactEmail } from '~/data/site'

const { t } = useI18n()

useSeo({
  title: t('seo.title'),
  description: t('seo.description'),
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            'name': 'Jacob Wiseman',
            'url': siteUrl,
            'description': t('seo.description'),
            'inLanguage': 'en-US',
            'publisher': { '@id': `${siteUrl}/#person` },
          },
          {
            '@type': 'Person',
            '@id': `${siteUrl}/#person`,
            'name': person.name,
            'url': siteUrl,
            'jobTitle': 'IT support',
            'description': t('seo.description'),
            'email': contactEmail,
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Elkview',
              'addressRegion': 'WV',
              'addressCountry': 'US',
            },
            'sameAs': [
              person.linkedin,
              person.businessUrl,
            ],
            'alumniOf': {
              '@type': 'CollegeOrUniversity',
              'name': 'CSU Global',
            },
            'knowsAbout': [
              'Desktop support',
              'Networking',
              'Epic',
              'Troubleshooting',
              'Windows',
              'Hardware',
            ],
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeAbout />
    <LazyHomeServices />
    <LazyHomeSkills />
    <HomeProjects />
    <section id="shell" class="relative pb-10 pt-6 lg:pb-16">
      <div class="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <span class="section-label">{{ t('shell.label') }}</span>
        <h2 class="section-title mt-4">
          jacob@northstar:~$
        </h2>
        <p class="mt-4 mb-8 max-w-xl text-base text-muted-foreground">
          {{ t('shell.intro') }}
        </p>
        <TerminalShell />
      </div>
    </section>
    <LazyHomeClients />
    <LazyAppContact />
  </div>
</template>
