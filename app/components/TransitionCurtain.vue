<script setup lang="ts">
const { register, transitionColor } = usePageTransition()
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  register(el.value)
})

onUnmounted(() => {
  register(null)
})
</script>

<template>
  <div
    ref="el"
    class="page-transition-curtain"
    :style="{ background: transitionColor }"
    aria-hidden="true"
  />
</template>
