<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '~/data/skills'

const { t } = useI18n()
const { letterReveal, wordReveal, staggerReveal, skillsReveal } = useScrollAnimation()

const hoveredSkill = ref<string | null>(null)
const isHovered = computed(() => hoveredSkill.value !== null)

// Animations
letterReveal('.skills-label')
wordReveal('.skills-title', 0.2)
staggerReveal('.skill-name', 0.04)
skillsReveal('.skills-content')

// Split logos into: first 3, middle rows of 5, last 3
const firstRow = computed(() => skills.slice(0, 3))
const middleRows = computed(() => skills.slice(3, skills.length - 3))
const lastRow = computed(() => skills.slice(skills.length - 3))

// === Random pop swap loop (after initial reveal completes) ===
const SWAP_INITIAL_DELAY = 3000 // wait for initial reveal animation to finish
const SWAP_INTERVAL = 2200 // pause between swaps
let swapTimeoutId: ReturnType<typeof setTimeout> | null = null
let currentSwapTl: gsap.core.Timeline | null = null

function popSwap(iconA: HTMLElement, iconB: HTMLElement) {
  const aRect = iconA.getBoundingClientRect()
  const bRect = iconB.getBoundingClientRect()
  const dx = bRect.left - aRect.left
  const dy = bRect.top - aRect.top
  if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return null

  const aX = (gsap.getProperty(iconA, 'x') as number) || 0
  const aY = (gsap.getProperty(iconA, 'y') as number) || 0
  const bX = (gsap.getProperty(iconB, 'x') as number) || 0
  const bY = (gsap.getProperty(iconB, 'y') as number) || 0

  const tl = gsap.timeline()
  // 1. Pop up — scale + subtle drop-shadow flash
  tl.to([iconA, iconB], {
    scale: 1.4,
    duration: 0.25,
    ease: 'back.out(2.5)',
    overwrite: 'auto',
  })
  // 2. Swap positions — animate together
  tl.to(iconA, {
    x: aX + dx,
    y: aY + dy,
    duration: 0.55,
    ease: 'power3.inOut',
    overwrite: 'auto',
  }, '<0.05')
  tl.to(iconB, {
    x: bX - dx,
    y: bY - dy,
    duration: 0.55,
    ease: 'power3.inOut',
    overwrite: 'auto',
  }, '<')
  // 3. Scale back
  tl.to([iconA, iconB], {
    scale: 1,
    duration: 0.3,
    ease: 'back.out(1.7)',
    overwrite: 'auto',
  }, '-=0.15')

  return tl
}

function pickAndSwap() {
  const icons = Array.from(document.querySelectorAll<HTMLElement>('.skills-icons .skill-icon'))
  if (icons.length < 2) return

  const a = Math.floor(Math.random() * icons.length)
  let b = Math.floor(Math.random() * icons.length)
  while (b === a) b = Math.floor(Math.random() * icons.length)

  currentSwapTl = popSwap(icons[a]!, icons[b]!)
}

function scheduleNextSwap() {
  if (swapTimeoutId) clearTimeout(swapTimeoutId)
  swapTimeoutId = setTimeout(() => {
    // Skip if user is hovering a skill (text or icon) OR previous swap still running
    if (!isHovered.value && (!currentSwapTl || !currentSwapTl.isActive())) {
      pickAndSwap()
    }
    scheduleNextSwap()
  }, SWAP_INTERVAL)
}

// On resize, accumulated x/y transforms point to old visual coordinates that
// no longer match the new layout — reset them so swaps recompute from a clean
// state. We also kill any active swap timeline.
function resetIconTransforms() {
  currentSwapTl?.kill()
  currentSwapTl = null
  const icons = document.querySelectorAll<HTMLElement>('.skills-icons .skill-icon')
  gsap.set(icons, { x: 0, y: 0, scale: 1, clearProps: 'transform' })
}

let resizeRaf: number | null = null
function onResize() {
  if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
  resizeRaf = requestAnimationFrame(resetIconTransforms)
}

onMounted(() => {
  if (import.meta.server) return

  // Start the swap loop AFTER the section is in view + initial reveal finished
  ScrollTrigger.create({
    trigger: '.skills-content',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      setTimeout(() => scheduleNextSwap(), SWAP_INITIAL_DELAY)
    },
  })

  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  if (swapTimeoutId) clearTimeout(swapTimeoutId)
  if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
  currentSwapTl?.kill()
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <section id="skills" class="relative pb-20 pt-10 lg:pb-32 lg:pt-16">
    <div class="section-glow right-1/4 top-1/3 bg-accent-magenta" />

    <div class="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
      <!-- Content: Left (header + names) + Logos right -->
      <div class="skills-content flex flex-col gap-12 sm:flex-row sm:items-center sm:gap-12 lg:gap-20">
        <!-- Left: Header + 4-column name grid -->
        <div class="flex-1">
          <div class="mb-10 max-w-xl">
            <span class="section-label skills-label">{{ t('skills.label') }}</span>
            <h2 class="section-title skills-title mt-4">
              {{ t('skills.title') }}
            </h2>
          </div>
          <div class="skills-names columns-2 gap-x-8 nav:columns-3 lg:columns-4">
            <span
              v-for="skill in skills"
              :key="skill.name"
              class="skill-name mb-2 block break-inside-avoid cursor-default text-sm text-foreground transition-colors duration-300 md:text-base"
              :class="[skill.highlighted ? 'text-primary!' : '']"
              @mouseenter="hoveredSkill = skill.name"
              @mouseleave="hoveredSkill = null"
            >
              <span
                class="skill-name-text relative"
                :class="hoveredSkill === skill.name ? 'skill-name--active' : ''"
              >{{ skill.name }}</span>
            </span>
          </div>
        </div>

        <!-- Right: Logo grid (3 / 5×n / 3) -->
        <div class="skills-icons hidden flex-col items-center sm:flex" :class="{ 'has-hover': hoveredSkill }">
          <!-- First row: 3 logos centered -->
          <div class="flex">
            <div
              v-for="skill in firstRow"
              :key="skill.name"
              class="skill-icon flex h-12 w-12 items-center justify-center md:h-14 md:w-14"
              :data-skill="skill.name"
              @mouseenter="hoveredSkill = skill.name"
              @mouseleave="hoveredSkill = null"
            >
              <img
                :src="skill.logo"
                :alt="skill.name"
                class="skill-logo h-8 w-8 object-contain md:h-10 md:w-10"
                :class="hoveredSkill === skill.name ? 'skill-logo--active' : ''"
              >
            </div>
          </div>
          <!-- Middle rows: 5 per row -->
          <div class="flex flex-wrap justify-center" :style="{ maxWidth: `${5 * 56}px` }">
            <div
              v-for="skill in middleRows"
              :key="skill.name"
              class="skill-icon flex h-12 w-12 items-center justify-center md:h-14 md:w-14"
              :data-skill="skill.name"
              @mouseenter="hoveredSkill = skill.name"
              @mouseleave="hoveredSkill = null"
            >
              <img
                :src="skill.logo"
                :alt="skill.name"
                class="skill-logo h-8 w-8 object-contain md:h-10 md:w-10"
                :class="hoveredSkill === skill.name ? 'skill-logo--active' : ''"
              >
            </div>
          </div>
          <!-- Last row: 3 logos centered -->
          <div class="flex">
            <div
              v-for="skill in lastRow"
              :key="skill.name"
              class="skill-icon flex h-12 w-12 items-center justify-center md:h-14 md:w-14"
              :data-skill="skill.name"
              @mouseenter="hoveredSkill = skill.name"
              @mouseleave="hoveredSkill = null"
            >
              <img
                :src="skill.logo"
                :alt="skill.name"
                class="skill-logo h-8 w-8 object-contain md:h-10 md:w-10"
                :class="hoveredSkill === skill.name ? 'skill-logo--active' : ''"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
