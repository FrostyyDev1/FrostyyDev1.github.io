<script setup lang="ts">
import { useI18n } from '#imports'

const { t } = useI18n()
const { init: initCursor, destroy: destroyCursor } = useCustomCursor()
const { init: initTheme } = useTheme()
const { start: startColorCycle, stop: stopColorCycle } = useColorCycle()
const { init: initLenis, destroy: destroyLenis } = useLenis()

onMounted(() => {
  initLenis()
  initTheme()
  initCursor()
  startColorCycle()

  // Remove loading state after a tick so GSAP can set initial states
  nextTick(() => {
    document.documentElement.style.opacity = '1'
    document.documentElement.classList.remove('app-loading')
  })
})

onUnmounted(() => {
  destroyCursor()
  stopColorCycle()
  destroyLenis()
})
</script>

<template>
  <div class="grain min-h-screen bg-background font-sans text-foreground">
    <a href="#main" class="skip-link">{{ t('a11y.skipLink') }}</a>
    <AppNavigation />
    <main id="main">
      <slot />
    </main>
    <AppFooter />
    <TransitionCurtain />
  </div>
</template>
