<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const status = computed(() => props.error?.statusCode ?? 404)
const notice = computed(() => {
  const path = props.error?.url || ''
  if (status.value === 404) {
    return `404: ${path || 'that path'} is not on this site. Try help, or go home.`
  }
  return `${status.value}: something went wrong. Try help, or go home.`
})

useHead({
  title: () => `${status.value} · Jacob Wiseman`,
  meta: [
    { name: 'robots', content: 'noindex, follow' },
  ],
})

onMounted(() => {
  nextTick(() => {
    document.documentElement.style.opacity = '1'
    document.documentElement.classList.remove('app-loading')
  })
})
</script>

<template>
  <div class="grain min-h-screen bg-background font-sans text-foreground">
    <main class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16">
      <p class="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
        jacob@northstar:~$
      </p>
      <h1 class="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
        <span class="wiseman">Wiseman</span> is here. This path is not.
      </h1>
      <TerminalShell :notice="notice" />
      <div class="mt-8 flex flex-wrap gap-3">
        <NuxtLink
          to="/"
          class="inline-flex rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-semibold text-foreground"
        >
          Back home
        </NuxtLink>
        <a
          href="mailto:jacob.wiseman345@gmail.com"
          class="inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
        >
          Email Jacob
        </a>
      </div>
    </main>
  </div>
</template>
