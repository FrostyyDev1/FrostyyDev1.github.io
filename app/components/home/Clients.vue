<script setup lang="ts">
import { clients } from '~/data/clients'

const { t } = useI18n()
const { letterReveal, wordReveal, staggerReveal } = useScrollAnimation()

// Animations
letterReveal('.clients-label')
wordReveal('.clients-title', 0.2)
staggerReveal('.clients-grid .client-name', 0.03, 0.3)
</script>

<template>
  <section id="clients" class="relative pb-20 lg:pb-32">
    <div class="section-glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-amber" />

    <div class="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
      <span class="section-label clients-label">{{ t('clients.label') }}</span>
      <h2 class="section-title clients-title mt-4 mb-12">
        {{ t('clients.title') }}
      </h2>

      <!-- CSS multi-column auto-balances client names: 2 cols mobile, 3 sm, 5 md+ -->
      <div class="clients-grid columns-2 gap-x-8 sm:columns-3 md:columns-5">
        <span
          v-for="client in clients"
          :key="client"
          class="client-name mb-2 block break-inside-avoid text-sm text-muted-foreground"
        >
          {{ client }}
        </span>
      </div>
    </div>
  </section>
</template>
