<script setup lang="ts">
import { gsap } from 'gsap'

const overlay = ref<HTMLElement | null>(null)
const router = useRouter()

onMounted(() => {
  router.beforeEach((to, from) => {
    if (!overlay.value || to.path === from.path) return true
    return new Promise<boolean>((resolve) => {
      if (!overlay.value) return resolve(true)
      gsap.killTweensOf(overlay.value)
      gsap.set(overlay.value, { scaleX: 0, transformOrigin: 'left center', display: 'block' })
      gsap.to(overlay.value, {
        scaleX: 1,
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => resolve(true),
      })
    })
  })

  router.afterEach(() => {
    if (!overlay.value) return
    // Use nextTick so the new page has mounted before we wipe the overlay out
    nextTick(() => {
      if (!overlay.value) return
      gsap.killTweensOf(overlay.value)
      gsap.set(overlay.value, { transformOrigin: 'right center' })
      gsap.to(overlay.value, {
        scaleX: 0,
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => {
          if (overlay.value) {
            overlay.value.style.display = 'none'
            gsap.set(overlay.value, { scaleX: 0 })
          }
        },
      })
    })
  })
})
</script>

<template>
  <div
    ref="overlay"
    class="pointer-events-none fixed inset-0 z-9999 hidden bg-foreground"
  />
</template>
