<script setup lang="ts">
import { gsap } from 'gsap'

const { t } = useI18n()
const { applyMagnetic } = useMagnetic()
const { scrollTo: lenisScrollTo } = useLenis()

const navLinks = computed(() => [
  { label: t('nav.about'), href: '#about' },
  { label: t('nav.services'), href: '#services' },
  { label: t('nav.projects'), href: '#projects' },
  { label: t('nav.certs'), href: '/certifications' },
  { label: t('nav.shell'), href: '#shell' },
  { label: t('nav.contact'), href: '#contact' },
])

const route = useRoute()
const isProjectPage = computed(() => route.path.includes('/projets/') || route.path.includes('/projects/'))
const activeSection = ref('home')
const isMenuOpen = ref(false)
const { y: scrollY } = useWindowScroll()
const { height: winH } = useWindowSize()
const isScrolled = computed(() => scrollY.value > 50)

// On project pages: hide the nav while the user is still in the hero zone (top 40% of viewport).
// As soon as they scroll past it, the nav slides into view.
const navHiddenInHero = computed(() => {
  if (!isProjectPage.value) return false
  return scrollY.value < winH.value * 0.4
})

const ctaRef = ref<HTMLElement | null>(null)

// Force active section based on route
watchEffect(() => {
  if (route.path.includes('/certifications')) activeSection.value = '/certifications'
  else if (isProjectPage.value) activeSection.value = 'projects'
})

function scrollTo(href: string) {
  const id = href.replace('#', '')
  isMenuOpen.value = false

  if (href.startsWith('/')) {
    navigateTo(href)
    return
  }

  if (isProjectPage.value) {
    navigateTo(`/${id === 'home' ? '' : `#${id}`}`)
    return
  }

  const el = document.getElementById(id)
  if (el) lenisScrollTo(el, { offset: 0 })
}

let sectionObserver: IntersectionObserver | null = null

onUnmounted(() => {
  sectionObserver?.disconnect()
  setBackgroundInert(false)
})

function setBackgroundInert(inert: boolean) {
  if (typeof document === 'undefined') return
  const targets = document.querySelectorAll('main, footer')
  targets.forEach((el) => {
    if (inert) el.setAttribute('inert', '')
    else el.removeAttribute('inert')
  })
}

watch(isMenuOpen, (open) => {
  setBackgroundInert(open)
})

onMounted(() => {
  const sectionIds = ['home', 'about', 'services', 'skills', 'projects', 'shell', 'clients', 'contact']

  sectionObserver = new IntersectionObserver(
    (entries) => {
      if (isProjectPage.value) return
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      }
    },
    { rootMargin: '-20% 0px -60% 0px' },
  )

  function observeSections() {
    sectionObserver?.disconnect()
    nextTick(() => {
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) sectionObserver?.observe(el)
      }
    })
  }

  observeSections()

  // Re-observe sections after route changes (e.g. coming back from a project page)
  watch(() => route.path, () => {
    if (!isProjectPage.value) observeSections()
  })

  // Force "contact" when near bottom of page
  watch(scrollY, (y) => {
    if (isProjectPage.value) return
    const nearBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 100
    if (nearBottom) activeSection.value = 'contact'
  })

  // Nav entrance animation — only run once per app session (not on every route change)
  const navAnimated = useState('nav-animated', () => false)
  const navItems = document.querySelectorAll('.nav-item')

  if (navAnimated.value) {
    // Already played: snap to final state, no animation
    gsap.set('.nav-bar', { y: 0 })
    gsap.set(navItems, { opacity: 1, y: 0 })
  }
  else {
    navAnimated.value = true
    const isMobileNav = window.innerWidth < 900
    gsap.set('.nav-bar', { y: isMobileNav ? 80 : -80 })
    gsap.set(navItems, { opacity: 0, y: isMobileNav ? 20 : -20 })

    const navTl = gsap.timeline({ delay: 1.8 })
    navTl.to('.nav-bar', {
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
    navTl.to(navItems, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.15,
      ease: 'power3.out',
    }, '-=0.3')
  }

  // Apply magnetic effect to CTA
  if (ctaRef.value) {
    applyMagnetic(ctaRef.value, 0.2)
  }

})
</script>

<template>
  <nav
    class="nav-bar fixed left-0 right-0 bottom-0 nav:bottom-auto nav:top-0 z-50 transition-all duration-500"
    :class="[
      isScrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent',
      navHiddenInHero ? 'translate-y-full nav:-translate-y-full pointer-events-none opacity-0' : 'opacity-100',
    ]"
  >
    <div class="mx-auto flex max-w-[1280px] items-center px-4 py-2 nav:px-8 nav:py-5">
      <!-- Left: logo + nav links -->
      <div class="hidden items-center gap-8 nav:flex">
        <NuxtLink to="/" class="nav-item font-display text-2xl font-bold tracking-tight text-foreground">
          jw<span class="text-primary transition-colors duration-[2000ms]">.</span>
        </NuxtLink>
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="nav-item nav-link relative text-sm transition-colors duration-300"
          :class="activeSection === link.href.replace('#', '') ? 'text-foreground nav-link--active' : 'text-muted-foreground hover:text-foreground'"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Mobile: logo + CTA left -->
      <NuxtLink to="/" class="font-display text-2xl font-bold tracking-tight text-foreground nav:hidden">
        jw<span class="text-primary transition-colors duration-[2000ms]">.</span>
      </NuxtLink>
      <a
        href="#contact"
        class="ml-4 inline-flex items-center rounded-full border border-foreground/20 px-4 py-2 text-xs font-semibold tracking-wider text-foreground nav:hidden"
        @click.prevent="scrollTo('#contact')"
      >
        {{ t('nav.cta') }}
        <IconsArrowTopRight class="ml-1.5 h-3 w-3" />
      </a>

      <!-- Right: lang + theme + CTA -->
      <div class="ml-auto hidden items-center gap-6 nav:flex">
        <ThemeToggle
          class="nav-item flex h-8 w-8 cursor-pointer items-center justify-center text-foreground transition-colors duration-300 hover:text-primary"
          :size="18"
        />
        <a
          ref="ctaRef"
          href="#contact"
          class="nav-item nav-cta relative inline-flex items-center pl-6 pr-7 py-2.5 text-xs font-semibold tracking-wider text-foreground"
          @click.prevent="scrollTo('#contact')"
        >
          {{ t('nav.cta') }}
          <IconsArrowTopRight class="ml-2 h-3.5 w-3.5 shrink-0" />
        </a>
      </div>

      <!-- Mobile menu button -->
      <button
        class="ml-auto flex h-10 w-10 cursor-pointer items-center justify-center nav:hidden"
        :aria-label="isMenuOpen ? t('nav.closeMenu') : t('nav.toggleMenu')"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <div class="relative h-4 w-6">
          <span
            class="absolute left-0 h-px w-full bg-foreground transition-all duration-300"
            :class="isMenuOpen ? 'top-1/2 rotate-45' : 'top-0'"
          />
          <span
            class="absolute left-0 top-1/2 h-px w-full bg-foreground transition-all duration-300"
            :class="isMenuOpen ? 'opacity-0' : 'opacity-100'"
          />
          <span
            class="absolute left-0 h-px w-full bg-foreground transition-all duration-300"
            :class="isMenuOpen ? 'top-1/2 -rotate-45' : 'top-full'"
          />
        </div>
      </button>
    </div>

  </nav>

  <!-- Mobile menu overlay — outside nav so it covers full screen -->
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isMenuOpen"
      id="mobile-menu"
      class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background nav:hidden"
    >
      <a
        v-for="link in navLinks"
        :key="link.label"
        :href="link.href"
        class="font-display text-3xl font-bold transition-colors"
        :class="activeSection === link.href.replace('#', '') ? 'text-foreground' : 'text-muted-foreground'"
        @click.prevent="scrollTo(link.href)"
      >
        {{ link.label }}
      </a>
      <ThemeToggle
        class="mt-2 flex h-10 w-10 cursor-pointer items-center justify-center text-foreground transition-colors duration-300 hover:text-primary"
        :size="22"
      />
    </div>
  </Transition>


</template>
