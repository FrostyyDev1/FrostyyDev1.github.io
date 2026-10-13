<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '~/types'
import BentoBlock from './BentoBlock.vue'

defineProps<{
  projects: Project[]
}>()

const gridRef = ref<HTMLElement | null>(null)

const hoveredSlug = ref<string | null>(null)

function onHover(slug: string | null) {
  hoveredSlug.value = slug
}

// Cursor-following spotlight position (CSS variables on the grid)
const mx = ref(0)
const my = ref(0)
const spotlightVisible = ref(false)

function onGridMouseMove(e: MouseEvent) {
  if (!gridRef.value) return
  const r = gridRef.value.getBoundingClientRect()
  mx.value = e.clientX - r.left
  my.value = e.clientY - r.top
}

function onGridMouseEnter() { spotlightVisible.value = true }
function onGridMouseLeave() {
  spotlightVisible.value = false
  hoveredSlug.value = null
}

onMounted(() => {
  if (import.meta.server) return
  gsap.registerPlugin(ScrollTrigger)

  const grid = gridRef.value
  if (!grid) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const ctx = gsap.context(() => {
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.bento-block'))
    if (!cards.length) return

    if (reduced) return

    // Pre-set hidden state for everything before any scrollTrigger fires
    cards.forEach((card) => {
      gsap.set(card, { clipPath: 'inset(0 0 100% 0)' })
      const title = card.querySelector('.bento-title')
      const desc = card.querySelector<HTMLElement>('.bento-desc')
      const tags = card.querySelectorAll<HTMLElement>('.bento-tag')
      if (title) gsap.set(title, { y: 16, opacity: 0 })
      if (desc) gsap.set(desc, { y: 12, opacity: 0 })
      if (tags.length) gsap.set(tags, { y: 10, opacity: 0 })
    })

    // Group cards into "rows" by visual top position so we can stagger
    // cards entering the viewport together (left-to-right within a row),
    // while keeping different rows independent (each row triggers when scrolled to).
    const sortedCards = [...cards].sort((a, b) => {
      const ra = a.getBoundingClientRect()
      const rb = b.getBoundingClientRect()
      if (Math.abs(ra.top - rb.top) > 8) return ra.top - rb.top
      return ra.left - rb.left
    })

    const rowDelays = new Map<HTMLElement, number>()
    let currentRowTop = -Infinity
    let indexInRow = 0
    sortedCards.forEach((card) => {
      const top = card.getBoundingClientRect().top
      if (Math.abs(top - currentRowTop) > 8) {
        currentRowTop = top
        indexInRow = 0
      }
      rowDelays.set(card, indexInRow * 0.18)
      indexInRow += 1
    })

    // Per-card scrollTrigger — each card animates when IT enters viewport.
    // Cards on the same row get a stagger delay (left-to-right cascade).
    cards.forEach((card) => {
      const title = card.querySelector('.bento-title')
      const desc = card.querySelector<HTMLElement>('.bento-desc')
      const tags = card.querySelectorAll<HTMLElement>('.bento-tag')

      const tl = gsap.timeline({
        delay: rowDelays.get(card) ?? 0,
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
          once: true,
        },
      })

      // 1. Card mask reveal — top to bottom
      tl.to(card, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.9,
        ease: 'power3.out',
      }, 0)

      // 2. Title slides up (after mask reveal completes)
      if (title) {
        tl.to(title, {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        }, 1.0)
      }

      // 3. Description slides up (stagger from title)
      if (desc) {
        tl.to(desc, {
          y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        }, 1.15)
      }

      // 4. Tags stagger up (last in the cascade)
      if (tags.length) {
        tl.to(tags, {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out',
        }, 1.28)
      }
    })
  }, gridRef.value)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <div class="projects-bento relative mx-auto max-w-7xl px-4 pb-20 md:px-8 lg:pb-32">
    <div
      ref="gridRef"
      class="bento-grid relative grid grid-cols-1 gap-5 sm:grid-cols-6 lg:grid-cols-12 [grid-auto-flow:dense]"
      :style="{
        '--mx': `${mx}px`,
        '--my': `${my}px`,
      }"
      @mousemove="onGridMouseMove"
      @mouseenter="onGridMouseEnter"
      @mouseleave="onGridMouseLeave"
    >
      <!-- Spotlight follow-cursor layer — soft additive glow centered on cursor.
           Per-block dim via .is-dimmed handles the contrast. -->
      <div
        v-show="spotlightVisible"
        class="bento-spotlight pointer-events-none absolute inset-0 z-[4] rounded-3xl opacity-60"
        :style="{
          background: `radial-gradient(circle 380px at var(--mx) var(--my), rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 30%, transparent 60%)`,
          mixBlendMode: 'overlay',
          transition: 'opacity 0.35s ease',
        }"
      />

      <!-- Blocks -->
      <BentoBlock
        v-for="(project, i) in projects"
        :key="project.slug"
        :project="project"
        :index="i"
        :total="projects.length"
        :hovered-slug="hoveredSlug"
        @hover="onHover"
      />
    </div>
  </div>
</template>

<style scoped>
.bento-spotlight {
  z-index: 4;
}
</style>
