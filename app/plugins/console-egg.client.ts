export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.dev) return

  const { $i18n } = nuxtApp as unknown as { $i18n: { t: (key: string) => string } }
  const t = (key: string) => $i18n?.t?.(key) ?? key

  const titleStyle = 'font: bold 22px "Clash Display", sans-serif; color: #b7c4a8; padding: 4px 0;'
  const bodyStyle = 'font: 13px ui-monospace, "JetBrains Mono", monospace; color: #a39e93;'
  const ctaStyle = 'font: 13px ui-monospace, "JetBrains Mono", monospace; color: #d7e4cb;'
  const muteStyle = 'font: 11px ui-monospace, "JetBrains Mono", monospace; color: #555;'

  console.log(`%c${t('console.greeting')}`, titleStyle)
  console.log(`%c${t('console.hint')}`, bodyStyle)
  console.log(`%c${t('console.cta')}`, ctaStyle)
  console.log(`%c${t('console.stack')}`, muteStyle)
})
