<script setup lang="ts">
import { certifications, peopleCertNotice } from '~/data/site'

const { t } = useI18n()

useSeo({
  title: t('certsPage.seoTitle'),
  description: t('certsPage.seoDescription'),
  url: 'https://frostyydev1.github.io/certifications',
})
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 pb-24 pt-28 md:px-8 md:pt-36">
    <span class="section-label">{{ t('certsPage.label') }}</span>
    <h1 class="section-title mt-4">
      {{ t('certsPage.title') }}
    </h1>
    <p class="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
      {{ t('certsPage.intro') }}
    </p>

    <ul class="mt-12 grid gap-6">
      <li
        v-for="cert in certifications"
        :key="cert.id"
        class="grid items-center gap-6 rounded-[22px] border border-border bg-surface p-5 sm:grid-cols-[160px_1fr] md:p-7"
      >
        <img
          :src="cert.image"
          :width="cert.width"
          :height="cert.height"
          :alt="cert.imageAlt"
          class="h-36 w-36 justify-self-center object-contain"
        >
        <div>
          <h2 class="font-display text-2xl font-bold text-foreground">
            {{ cert.name }}
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            {{ cert.issuer }}
          </p>
          <p class="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {{ cert.summary }}
          </p>
          <p class="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-foreground/80">
            {{ t('certsPage.earned') }} {{ cert.earned }}
            <span aria-hidden="true"> · </span>
            <template v-if="cert.expires">
              {{ t('certsPage.expires') }} {{ cert.expires }}
            </template>
            <template v-else>
              {{ t('certsPage.noExpiry') }}
            </template>
          </p>
          <a
            :href="cert.credly"
            class="mt-4 inline-flex text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t('certsPage.viewBadge') }}
          </a>
        </div>
      </li>
    </ul>

    <p class="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">
      {{ peopleCertNotice }}
    </p>
  </div>
</template>
