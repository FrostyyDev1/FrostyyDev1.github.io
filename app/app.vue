<script setup lang="ts">
const head = useLocaleHead()
useHead({
  htmlAttrs: { lang: () => head.value.htmlAttrs?.lang ?? 'fr' },
  link: () => head.value.link ?? [],
  meta: () => head.value.meta ?? [],
})
</script>

<template>
  <div class="font-sans text-foreground bg-background">
    <AppPageTransition />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
