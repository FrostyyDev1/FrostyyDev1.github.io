<script setup lang="ts">
const { t } = useI18n()
const { maskReveal, staggerReveal, letterReveal, wordReveal, timelineReveal } = useScrollAnimation()

// Photo — mask reveal from bottom
maskReveal('.about-image', 'down')

// Label — word by word reveal
letterReveal('.about-label')

// Title — word by word reveal
wordReveal('.about-title', 0.2)

// Paragraphs — stagger fade up
staggerReveal('.about-text p', 0.15)

// Timeline — line draws, items slide in, dots bounce
timelineReveal('.about-timeline')
</script>

<template>
  <section id="about" class="relative pb-10 pt-20 lg:pb-16 lg:pt-32">
    <!-- Glow -->
    <div class="section-glow left-1/4 top-1/2 -translate-y-1/2 bg-accent-cyan" />

    <div class="relative z-10 mx-auto max-w-[1280px] px-4 md:px-8">
      <div class="flex flex-col items-start gap-12 md:flex-row md:gap-10 lg:gap-20">
        <!-- Photo -->
        <div class="about-image relative w-full aspect-[3/4] md:aspect-auto md:flex-1 md:self-stretch md:min-h-[500px]">
          <HomeAboutPortraitLive
            src="/images/portrait-about.jpg"
            alt="A photo of me is on the way. This frame is just a placeholder."
            city="Charleston"
          />
        </div>

        <!-- Text -->
        <div class="about-text flex-1 space-y-6 md:max-w-[50%]">
          <span class="section-label about-label">{{ t('about.label') }}</span>
          <h2 class="section-title about-title">
            {{ t('about.title') }}
          </h2>
          <p class="text-base leading-relaxed text-muted-foreground">
            {{ t('about.p1') }}
          </p>
          <p class="text-base leading-relaxed text-muted-foreground">
            {{ t('about.p2') }}
          </p>
          <p class="text-base leading-relaxed text-muted-foreground">
            {{ t('about.p3') }}
          </p>

          <!-- Experience timeline -->
          <div class="about-timeline mt-8 border-t border-border pt-8">
            <span class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{{ t('about.experienceLabel') }}</span>
            <div class="mt-6 pl-6 space-y-5 relative">
              <div class="timeline-line absolute left-0 top-0 h-full w-px origin-top bg-border" />
              <div v-for="(exp, i) in ['exp1', 'exp2', 'exp3']" :key="exp" class="timeline-item relative">
                <span class="timeline-dot absolute -left-6 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full" :class="i === 0 ? 'bg-primary' : 'bg-border'" />
                <div class="flex items-baseline justify-between gap-4">
                  <span class="text-sm font-semibold text-foreground">{{ t(`about.${exp}.company`) }} <span class="font-normal text-muted-foreground"> · {{ t(`about.${exp}.role`) }}</span></span>
                  <span class="shrink-0 text-xs text-muted-foreground">{{ t(`about.${exp}.period`) }}</span>
                </div>
                <p class="mt-1 text-xs text-muted-foreground/60">{{ t(`about.${exp}.clients`) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
