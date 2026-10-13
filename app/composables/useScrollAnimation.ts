import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollAnimation() {
  const triggers: ScrollTrigger[] = []

  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
  })

  onUnmounted(() => {
    triggers.forEach(t => t.kill())
  })

  function animateOnScroll(selector: string, options?: gsap.TweenVars) {
    onMounted(() => {
      const tween = gsap.from(selector, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          toggleActions: 'play none none none',
          lazy: true,
        },
        ...options,
      })
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })
  }

  function staggerReveal(selector: string, staggerAmount: number = 0.1, delay: number = 0) {
    onMounted(() => {
      const tween = gsap.from(selector, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: staggerAmount,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          toggleActions: 'play none none none',
          lazy: true,
        },
      })
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })
  }

  function letterReveal(containerSelector: string, delay: number = 0) {
    onMounted(() => {
      const container = document.querySelector(containerSelector)
      if (!container) return

      const text = container.textContent || ''
      container.innerHTML = ''

      text.split('').forEach((char) => {
        const span = document.createElement('span')
        span.classList.add('letter-reveal')
        const inner = document.createElement('span')
        inner.textContent = char === ' ' ? '\u00A0' : char
        span.appendChild(inner)
        container.appendChild(span)
      })

      const tween = gsap.to(`${containerSelector} .letter-reveal span`, {
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: containerSelector,
          start: 'top 85%',
          toggleActions: 'play none none none',
          lazy: true,
        },
      })
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })
  }

  function parallax(selector: string, speed: number = 0.5) {
    onMounted(() => {
      const tween = gsap.to(selector, {
        y: () => speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: selector,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })
  }

  function maskReveal(selector: string, direction: 'left' | 'right' | 'up' | 'down' = 'left') {
    onMounted(() => {
      const clipPaths: Record<string, { from: string; to: string }> = {
        left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
        right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
        up: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
        down: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
      }

      const tween = gsap.fromTo(
        selector,
        { clipPath: clipPaths[direction].from },
        {
          clipPath: clipPaths[direction].to,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: selector,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })
  }

  function drawLine(selector: string) {
    onMounted(() => {
      const el = document.querySelector(selector) as SVGPathElement | null
      if (!el) return

      const length = el.getTotalLength()
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length })

      const tween = gsap.to(el, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      })
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })
  }

  function wordReveal(selector: string, delay: number = 0) {
    onMounted(() => {
      const el = document.querySelector(selector)
      if (!el) return

      const text = el.textContent || ''
      el.innerHTML = ''

      text.split(' ').forEach((word, i, arr) => {
        const wrapper = document.createElement('span')
        wrapper.style.display = 'inline-block'
        wrapper.style.overflow = 'hidden'
        wrapper.style.verticalAlign = 'top'
        const inner = document.createElement('span')
        inner.classList.add('word-reveal')
        inner.style.display = 'inline-block'
        inner.textContent = word
        wrapper.appendChild(inner)
        el.appendChild(wrapper)
        if (i < arr.length - 1) {
          el.appendChild(document.createTextNode(' '))
        }
      })

      const tween = gsap.from(`${selector} .word-reveal`, {
        y: '100%',
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          toggleActions: 'play none none none',
          lazy: true,
        },
      })
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })
  }

  function timelineReveal(containerSelector: string) {
    onMounted(() => {
      const container = document.querySelector(containerSelector)
      if (!container) return

      const line = container.querySelector('.timeline-line') as HTMLElement
      const items = container.querySelectorAll('.timeline-item')
      const dots = container.querySelectorAll('.timeline-dot')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerSelector,
          start: 'top 80%',
          toggleActions: 'play none none none',
          lazy: true,
        },
      })
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)

      const reversedDots = Array.from(dots).reverse()

      if (line) {
        tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: 'power3.inOut' })
      }

      if (items.length) {
        tl.from(items, { x: -20, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, '-=0.4')
      }

      if (reversedDots.length) {
        tl.from(reversedDots, { scale: 0, duration: 0.3, stagger: 0.12, ease: 'back.out(2)' })
      }
    })
  }

  function servicesReveal(containerSelector: string) {
    onMounted(() => {
      const container = document.querySelector(containerSelector)
      if (!container) return

      const cards = Array.from(container.querySelectorAll('.service-card'))
      const texts = container.querySelectorAll('.service-text')
      const icons = container.querySelectorAll('.service-icon')

      // Shuffle cards order randomly for each render
      const shuffled = [...cards].sort(() => Math.random() - 0.5)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerSelector,
          start: 'top 80%',
          toggleActions: 'play none none none',
          lazy: true,
        },
      })
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)

      // Cards appear in random order with scale + fade
      if (shuffled.length) {
        tl.from(shuffled, {
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        })
      }

      // Texts slide up from below
      if (texts.length) {
        tl.from(texts, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
        }, '-=0.2')
      }

      // Icons bounce in after texts
      if (icons.length) {
        tl.from(icons, {
          scale: 0,
          rotation: -15,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(3)',
        }, '-=0.3')
      }
    })
  }

  function skillsReveal(containerSelector: string) {
    onMounted(() => {
      const container = document.querySelector(containerSelector)
      if (!container) return

      const columns = container.querySelectorAll('.skills-column')
      const icons = Array.from(container.querySelectorAll('.skill-icon'))

      // Columns stagger: each column appears one after another,
      // and within each column, names slide up with stagger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerSelector,
          start: 'top 80%',
          toggleActions: 'play none none none',
          lazy: true,
        },
      })
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)

      columns.forEach((col, colIndex) => {
        const names = col.querySelectorAll('.skill-name')
        if (names.length) {
          tl.from(names, {
            y: 30,
            opacity: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power3.out',
          }, 0.5 + colIndex * 0.15)
        }
      })

      // Icons pop in random order with their own scroll trigger
      const iconsContainer = container.querySelector('.skills-icons')
      if (icons.length && iconsContainer) {
        const shuffled = [...icons].sort(() => Math.random() - 0.5)
        // Set initial hidden state
        gsap.set(shuffled, { scale: 0, opacity: 0 })

        // Stagger decreases: slow at start, fast at end
        const staggerValues = shuffled.map((_, i) => {
          const t = i / Math.max(shuffled.length - 1, 1)
          return 0.06 * (1 - t * 0.8) // starts at 0.06s, ends at ~0.012s
        })
        let accumulated = 0
        const delays = staggerValues.map((_val, i) => {
          if (i === 0) return 0
          accumulated += staggerValues[i - 1]!
          return accumulated
        })

        // Each icon pops with elastic ease, starts 0.5s after columns
        shuffled.forEach((icon, i) => {
          tl.to(icon, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            onComplete() {
              (icon as HTMLElement).classList.add('skill-icon--ready')
            },
          }, 1 + (delays[i] ?? 0))
        })
      }
    })
  }

  function projectsReveal(containerSelector: string) {
    onMounted(() => {
      const container = document.querySelector(containerSelector)
      if (!container) return

      // Hero project — mask reveal from bottom
      const hero = container.querySelector('.project-hero')
      if (hero) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
        if (heroTl.scrollTrigger) triggers.push(heroTl.scrollTrigger)

        heroTl.fromTo(hero, {
          clipPath: 'inset(100% 0 0 0)',
        }, {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          ease: 'power3.inOut',
        })

        // Title, then description, then tags
        const heroTitle = hero.querySelector('.project-hero-title')
        const heroDesc = hero.querySelector('.project-hero-desc')
        const heroTags = hero.querySelectorAll('.project-hero-tag')

        if (heroTitle) {
          heroTl.from(heroTitle, { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        }
        if (heroDesc) {
          heroTl.from(heroDesc, { y: 20, opacity: 0, duration: 0.4, ease: 'power3.out' }, '-=0.1')
        }
        if (heroTags.length) {
          heroTl.from(heroTags, { y: 15, opacity: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out' }, '-=0.1')
        }
      }

      // Grid projects — stagger with column offset
      const gridCards = container.querySelectorAll('.project-card')
      if (gridCards.length) {
        const gridTl = gsap.timeline({
          scrollTrigger: {
            trigger: gridCards[0],
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
        if (gridTl.scrollTrigger) triggers.push(gridTl.scrollTrigger)

        // Animate each card: image reveals, then inner content staggers
        const cardDelays = [0, 0.2, 0.15, 0.35] // left1, right1, left2, right2

        Array.from(gridCards).forEach((card, i) => {
          const delay = cardDelays[i] ?? i * 0.15

          gridTl.from(card, {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 0.7,
            ease: 'power3.out',
          }, delay)

          // Title, then description, then tags stagger in
          const title = card.querySelector('.project-card-title')
          const desc = card.querySelector('.project-card-desc')
          const tags = card.querySelectorAll('.project-card-tag')

          const contentStart = delay + 0.4
          if (title) {
            gridTl.from(title, { y: 20, opacity: 0, duration: 0.4, ease: 'power3.out' }, contentStart)
          }
          if (desc) {
            gridTl.from(desc, { y: 20, opacity: 0, duration: 0.4, ease: 'power3.out' }, contentStart + 0.1)
          }
          if (tags.length) {
            gridTl.from(tags, { y: 15, opacity: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out' }, contentStart + 0.2)
          }
        })
      }
    })
  }

  return { animateOnScroll, staggerReveal, letterReveal, parallax, maskReveal, drawLine, wordReveal, timelineReveal, servicesReveal, skillsReveal, projectsReveal }
}
