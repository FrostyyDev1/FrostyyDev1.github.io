<script setup lang="ts">
const { t } = useI18n()
const { animateOnScroll, letterReveal, wordReveal, staggerReveal } = useScrollAnimation()

// Animations
letterReveal('.contact-label')
wordReveal('.contact-subtitle', 0.2)

// Social links — stagger each link individually, delayed to start AFTER the title
staggerReveal('.contact-socials > a', 0.1, 0.8)

// Form — stagger each field block (input + label) and the submit button together
staggerReveal('.contact-form-card [data-field]', 0.1, 0.4)

animateOnScroll('.contact-baseline', { y: 20, duration: 0.5, delay: 1.2 })
animateOnScroll('.contact-location', { y: 20, duration: 0.5, delay: 1.3 })
</script>

<template>
  <section id="contact" class="relative bg-muted pb-10 pt-20 lg:pb-16 lg:pt-32">
    <div class="relative z-10 mx-auto max-w-7xl px-4 md:px-8">

      <!-- Bloc 1 — flex row : subtitle gauche, liens droite -->
      <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
        <!-- Left: label + subtitle + socials -->
        <div class="w-full md:max-w-xl">
          <span class="section-label contact-label">{{ t('contact.label') }}</span>
          <p class="section-title contact-subtitle mt-4">
            {{ t('contact.subtitle') }}
          </p>
          <div class="contact-socials mt-8 flex flex-col items-start gap-4">
            <a
              href="mailto:jacob.wiseman345@gmail.com"
              class="group inline-flex items-center gap-3 text-base text-foreground"
              data-cursor-hover
            >
              <IconsMail class="h-[18px] w-[18px] shrink-0 text-foreground" />
              <span class="underline-grow">jacob.wiseman345@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/jacob20"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-3 text-base text-foreground"
            >
              <IconsLinkedIn class="h-[18px] w-[18px] shrink-0 text-foreground" />
              <span class="underline-grow">LinkedIn</span>
            </a>
            <a
              href="https://northstarwv.com"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-3 text-base text-foreground"
            >
              <IconsArrowTopRight class="h-[18px] w-[18px] shrink-0 text-foreground" />
              <span class="underline-grow">northstarwv.com</span>
            </a>
          </div>

          <div class="mt-8">
            <p class="contact-baseline text-sm text-muted-foreground md:text-base">
              {{ t('hero.baseline') }}
            </p>
            <p class="contact-location mt-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
              {{ t('hero.location') }}
            </p>
          </div>
        </div>

        <!-- Right: contact form -->
        <div class="contact-form-wrapper w-full md:max-w-lg">
          <ContactForm />
        </div>
      </div>

    </div>
  </section>
</template>
