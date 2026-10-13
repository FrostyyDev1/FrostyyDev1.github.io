<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border pb-24 pt-8 nav:pb-8">
    <div class="mx-auto flex max-w-7xl flex-col items-start gap-3 px-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
      <p class="text-xs text-muted-foreground">
        &copy; {{ year }} {{ t('footer.copyright') }}
        <span aria-hidden="true"> · </span>
        <a href="mailto:jacob.wiseman345@gmail.com" class="underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline">jacob.wiseman345@gmail.com</a>
      </p>
      <p class="text-xs text-muted-foreground">
        {{ t('footer.credit') }}
        <span aria-hidden="true"> · </span>
        <a
          href="https://github.com/emricooo/portfolio-emeric-guyon"
          target="_blank"
          rel="noopener"
          class="underline underline-offset-4 decoration-border transition-colors duration-300 hover:text-foreground hover:decoration-foreground"
        >
          {{ t('footer.source') }}
        </a>
      </p>
    </div>
  </footer>
</template>
