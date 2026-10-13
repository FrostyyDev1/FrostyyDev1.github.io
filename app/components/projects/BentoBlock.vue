<script setup lang="ts">
import { gsap } from 'gsap'
import type { Project } from '~/types'

const props = defineProps<{
  project: Project
  index: number
  total: number
  /** Slug of the currently hovered block in the parent grid (for cross-block DNA) */
  hoveredSlug: string | null
}>()

const emit = defineEmits<{
  hover: [slug: string | null]
}>()

const { t } = useI18n()

const root = ref<HTMLElement | null>(null)
const isHovered = computed(() => props.hoveredSlug === props.project.slug)

const accent = computed(() => props.project.accentColor ?? 'var(--color-primary)')

const coverSrc = computed(() => {
  return props.project.images.find(i => i.cover)?.src ?? props.project.images[0]?.src ?? ''
})

// Tailwind grid sizing per bentoSize.
// Mobile (1 col): all blocks full width, sized by min-h.
// Tablet (6 col): L=6 row-2, M=6 row-2, S=3 row-1.
// Desktop (12 col): L=8 row-2, M=4 row-2, S=4 row-1.
const sizeClass = computed(() => {
  switch (props.project.bentoSize) {
    case 'l': return 'col-span-1 sm:col-span-6 lg:col-span-8 sm:row-span-2 min-h-[420px] sm:min-h-[520px]'
    case 'm': return 'col-span-1 sm:col-span-6 lg:col-span-4 sm:row-span-2 min-h-[340px] sm:min-h-[520px]'
    case 's':
    default: return 'col-span-1 sm:col-span-3 lg:col-span-4 sm:row-span-1 min-h-[260px]'
  }
})

const isLarge = computed(() => props.project.bentoSize === 'l')
const isSmall = computed(() => props.project.bentoSize === 's')

const paddedNum = computed(() => String(props.total - props.index).padStart(2, '0'))

function onClick(e: MouseEvent) {
  if (!root.value) return
  e.preventDefault()
  const target = (e.currentTarget as HTMLAnchorElement)
  const href = target.getAttribute('href') ?? `/projets/${props.project.slug}`
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    navigateTo(href)
    return
  }
  gsap.to(root.value, {
    scale: 1.04,
    y: -8,
    boxShadow: `0 30px 60px -10px ${accent.value}66`,
    duration: 0.32,
    ease: 'power2.out',
    onComplete: () => { navigateTo(href) },
  })
}

// Hover/leave only emit state to parent for cross-block DNA + dim coordination.
// All hover visuals (lift, ken-burns, ring, CTA) are pure CSS for robustness
// against rapid in/out (no orphaned GSAP tweens).
function onEnter() {
  emit('hover', props.project.slug)
}

function onLeave() {
  emit('hover', null)
}
</script>

<template>
  <NuxtLink
    ref="root"
    :to="`/projets/${project.slug}`"
    :data-bento-slug="project.slug"
    :data-bento-techs="project.technologies.join('|')"
    data-cursor-project
    :data-cursor-text="t('projects.view')"
    class="bento-block group relative block overflow-hidden rounded-3xl bg-neutral-900 will-change-transform"
    :class="[sizeClass, { 'is-hovered': isHovered, 'is-dimmed': hoveredSlug && !isHovered }]"
    :style="{ '--bento-accent': accent }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @click="onClick"
  >
    <!-- Real cover image, full-bleed, with ken-burns scale on hover (pure CSS) -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="bento-image-scale absolute inset-0 will-change-transform">
        <NuxtImg
          v-if="coverSrc"
          :src="coverSrc"
          :alt="project.title"
          sizes="sm:480px md:640px lg:800px xl:1000px"
          width="1200"
          height="900"
          loading="lazy"
          class="h-full w-full object-cover object-center"
        />
      </div>
    </div>

    <!-- Accent color tint (subtle 12% wash to unify the visual language) -->
    <div
      class="pointer-events-none absolute inset-0 mix-blend-color"
      :style="{ background: accent, opacity: 0.18 }"
    />

    <!-- Subtle film grain texture -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;);"
    />

    <!-- Big number watermark (only on L and M) -->
    <div
      v-if="!isSmall"
      class="pointer-events-none absolute -bottom-12 -right-4 z-[1] select-none font-display font-black leading-[0.8] tracking-tighter text-white opacity-[0.08]"
      :class="isLarge ? 'text-[20rem]' : 'text-[13rem]'"
      aria-hidden="true"
    >
      {{ paddedNum }}
    </div>

    <!-- Bottom scrim for text legibility -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
      :class="isLarge ? 'h-2/3' : isSmall ? 'h-full' : 'h-3/4'"
      style="background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 45%, transparent 100%);"
    />

    <!-- Content overlay: bottom-aligned. Lifts 12px on hover (texts only) -->
    <div
      class="bento-content absolute inset-x-0 bottom-0 z-[2] flex flex-col gap-2"
      :class="isLarge ? 'p-7 gap-3' : isSmall ? 'p-4' : 'p-5'"
    >
      <!-- Title -->
      <h3
        class="bento-title font-display font-black leading-[0.95] tracking-tight text-white"
        :class="isLarge ? 'text-4xl @[700px]:text-6xl' : isSmall ? 'text-xl' : 'text-2xl @[700px]:text-3xl'"
      >
        {{ project.title }}
      </h3>

      <!-- Description (only on L/M) -->
      <p
        v-if="!isSmall"
        class="bento-desc line-clamp-2 text-sm leading-relaxed text-white/85"
        :class="isLarge ? 'text-base max-w-md' : ''"
      >
        {{ t(`projects.items.${project.slug}.description`) }}
      </p>

      <!-- Tech tags -->
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tech in (isSmall ? project.technologies.slice(0, 2) : project.technologies)"
          :key="tech"
          class="bento-tag rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-white/95 backdrop-blur-sm transition-colors"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- Hover ring — uses the cycling primary color (uniform across cards) -->
    <div class="bento-accent-ring pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300" />

  </NuxtLink>
</template>

<style scoped>
.bento-block {
  transition: filter 0.4s ease, opacity 0.4s ease;
}

.bento-block.is-hovered {
  z-index: 5;
}

/* Background image zooms in slightly on hover (ken-burns) — symmetric in/out */
.bento-image-scale {
  transform: scale(1);
  transform-origin: center center;
  transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}

.bento-block:hover .bento-image-scale,
.bento-block.is-hovered .bento-image-scale {
  transform: scale(1.06);
}

/* Content lifts 12px on hover — only the texts/labels move, not the whole card */
.bento-content {
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.bento-block:hover .bento-content,
.bento-block.is-hovered .bento-content {
  transform: translateY(-12px);
}

/* Accent ring uses the cycling primary color, uniformly across all cards */
.bento-accent-ring {
  box-shadow:
    inset 0 0 0 1.5px var(--color-primary),
    0 30px 60px -10px color-mix(in srgb, var(--color-primary) 30%, transparent);
}

.bento-block:hover .bento-accent-ring,
.bento-block.is-hovered .bento-accent-ring {
  opacity: 1;
}

/* Soft dim on the other cards when one is hovered — restrained, not pornographic grey */
.bento-block.is-dimmed {
  filter: saturate(0.75) brightness(0.85);
  opacity: 0.8;
}
</style>
