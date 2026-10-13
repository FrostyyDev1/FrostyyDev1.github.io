<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '~/types'

const props = defineProps<{ project: Project }>()

const { t, te } = useI18n()
const router = useRouter()

const i18nKey = (suffix: string) => `projects.items.${props.project.slug}.${suffix}`

const hasContextText = computed(() => te(i18nKey('longDescription')))
const hasApproachText = computed(() => te(i18nKey('approach')))
const hasResultText = computed(() => te(i18nKey('result')))
const hasStackNote = computed(() => te(i18nKey('stackNote')))

const takeaways = computed(() =>
  props.project.takeawaysCount
    ? Array.from({ length: props.project.takeawaysCount }, (_, i) => t(i18nKey(`takeaway${i + 1}`)))
    : [],
)
const hasApproachContent = computed(() => hasApproachText.value || takeaways.value.length > 0)

const accent = computed(() => props.project.accentColor ?? 'var(--color-primary)')

// Body images: when a dedicated heroImage is set, body shows all UI screenshots.
// Otherwise the cover-flagged image is in the hero, so skip it from the body.
const bodyImages = computed(() => {
  if (props.project.heroImage) return props.project.images
  const cover = props.project.images.find(i => i.cover)
  if (!cover) return props.project.images
  return props.project.images.filter(i => i !== cover)
})

function goBack() {
  if (window.history.length > 1) {
    router.back()
  }
  else {
    navigateTo('/#projects')
  }
}

const bodyEl = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!bodyEl.value) return
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    // Reveal each section on scroll
    const sections = bodyEl.value!.querySelectorAll('.project-section')
    sections.forEach((section) => {
      const num = section.querySelector('.project-section-num')
      const title = section.querySelector('.project-section-title')
      const rule = section.querySelector('.project-section-rule')
      const body = section.querySelectorAll('.project-section-body > *')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
      if (num) tl.from(num, { y: 24, opacity: 0, duration: 0.5, ease: 'power3.out' })
      if (rule) tl.from(rule, { scaleX: 0, transformOrigin: 'left', duration: 0.6, ease: 'power3.out' }, '-=0.3')
      if (title) tl.from(title, { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      if (body.length) tl.from(body, { y: 24, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.4')
    })

  }, bodyEl.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <article class="project-page" :style="{ '--project-accent': accent }">
    <!-- Top bar: back button (sticky-ish above hero) -->
    <div class="project-topbar">
      <button
        class="project-back group/back"
        :aria-label="t('projects.back')"
        data-cursor-hover
        @click="goBack"
      >
        <IconsArrowLeft aria-hidden="true" class="h-4.5 w-4.5 transition-transform duration-300 group-hover/back:-translate-x-1" />
        <span>{{ t('projects.back') }}</span>
      </button>

      <span v-if="project.agency" class="project-topbar-agency">
        {{ t('projects.madeWithAgency') }}
        <a
          :href="project.agency.url"
          target="_blank"
          rel="noopener"
          data-cursor-hover
        >
          {{ project.agency.name }}
        </a>
      </span>
    </div>

    <!-- Cinematic hero -->
    <ProjectHero :project="project" />

    <!-- Big animated stats band (only if project has stats) -->
    <ProjectStats v-if="project.stats?.length" :project="project" />

    <!-- Body: 2-col layout with section numbers + scroll reveals -->
    <div ref="bodyEl" class="project-body-wrapper">
      <div class="project-layout">
        <!-- IMAGES -->
        <div v-if="bodyImages.length" class="project-images space-y-6">
          <div
            v-for="(img, idx) in bodyImages"
            :key="idx"
            class="project-body-image overflow-hidden rounded-xl shadow-sm ring-1 ring-foreground/5"
          >
            <NuxtImg
              :src="img.src"
              sizes="sm:100vw md:50vw lg:600px"
              :alt="t('projects.imageAlt', { project: project.title, n: idx + 2, tech: project.technologies.slice(0, 2).join(', ') })"
              width="1920"
              loading="lazy"
              class="block h-auto w-full"
            />
          </div>
        </div>

        <!-- TEXT -->
        <div class="project-text space-y-12 lg:space-y-14">
          <!-- 01 — Contexte -->
          <section v-if="hasContextText" id="section-context" class="project-section">
            <div class="project-section-num font-mono text-xs tracking-[0.3em]" aria-hidden="true" :style="{ color: accent }">
              01
            </div>
            <h2 class="project-section-title text-balance mt-2 font-display text-2xl font-bold leading-tight text-foreground lg:text-3xl">
              {{ t('projects.contextLabel') }}
            </h2>
            <div class="project-section-rule mt-3 h-px w-12" :style="{ background: accent }" />
            <div class="project-section-body mt-6">
              <p class="text-base leading-relaxed text-foreground/85 lg:text-[17px]">
                {{ t(i18nKey('longDescription')) }}
              </p>
            </div>
          </section>

          <!-- 02 — Mon approche -->
          <section v-if="hasApproachContent" id="section-approach" class="project-section">
            <div class="project-section-num font-mono text-xs tracking-[0.3em]" aria-hidden="true" :style="{ color: accent }">
              02
            </div>
            <h2 class="project-section-title text-balance mt-2 font-display text-2xl font-bold leading-tight text-foreground lg:text-3xl">
              {{ t('projects.approachLabel') }}
            </h2>
            <div class="project-section-rule mt-3 h-px w-12" :style="{ background: accent }" />
            <div class="project-section-body mt-6">
              <p v-if="hasApproachText" class="text-base leading-relaxed text-foreground/85 lg:text-[17px]">
                {{ t(i18nKey('approach')) }}
              </p>
              <ul v-if="takeaways.length" class="mt-6 space-y-2.5">
                <li v-for="(item, i) in takeaways" :key="i" class="flex items-start gap-3 text-base leading-relaxed text-foreground/85 lg:text-[17px]">
                  <span class="mt-2.5 h-1 w-1 shrink-0 rounded-full" aria-hidden="true" :style="{ background: accent }" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </section>

          <!-- 03 — Stack -->
          <section id="section-stack" class="project-section">
            <div class="project-section-num font-mono text-xs tracking-[0.3em]" aria-hidden="true" :style="{ color: accent }">
              03
            </div>
            <h2 class="project-section-title text-balance mt-2 font-display text-2xl font-bold leading-tight text-foreground lg:text-3xl">
              {{ t('projects.stackLabel') }}
            </h2>
            <div class="project-section-rule mt-3 h-px w-12" :style="{ background: accent }" />
            <div class="project-section-body mt-6">
              <p v-if="hasStackNote" class="text-base leading-relaxed text-foreground/85 lg:text-[17px]">
                {{ t(i18nKey('stackNote')) }}
              </p>
              <div class="mt-6 flex flex-wrap gap-2">
                <Badge v-for="tech in project.technologies" :key="tech">
                  {{ tech }}
                </Badge>
              </div>
            </div>
          </section>

          <!-- 04 — Résultat -->
          <section v-if="hasResultText" id="section-result" class="project-section">
            <div class="project-section-num font-mono text-xs tracking-[0.3em]" aria-hidden="true" :style="{ color: accent }">
              04
            </div>
            <h2 class="project-section-title text-balance mt-2 font-display text-2xl font-bold leading-tight text-foreground lg:text-3xl">
              {{ t('projects.resultLabel') }}
            </h2>
            <div class="project-section-rule mt-3 h-px w-12" :style="{ background: accent }" />
            <div class="project-section-body mt-6">
              <p class="text-base leading-relaxed text-foreground/85 lg:text-[17px]">
                {{ t(i18nKey('result')) }}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Footer nav -->
    <ProjectFooterNav :slug="project.slug" />
  </article>
</template>
