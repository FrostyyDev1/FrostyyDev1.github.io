<script setup lang="ts">
const { isDark, toggle: toggleTheme } = useTheme()

withDefaults(defineProps<{
  size?: number
}>(), {
  size: 18,
})
</script>

<template>
  <button
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <IconsSun v-if="isDark" :width="size" :height="size" />
    <IconsMoon v-else :width="size" :height="size" />
  </button>
</template>
