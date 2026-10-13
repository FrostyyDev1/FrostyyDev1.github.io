const SITE_URL = 'https://frostyydev1.github.io'

export function useSeo(options: {
  title?: string
  description?: string
  image?: string
  url?: string
}) {
  const route = useRoute()
  const { t, locale } = useI18n()

  const defaultImage = `${SITE_URL}/images/og-image.jpg`

  const defaults = {
    title: t('seo.title'),
    description: t('seo.description'),
    image: defaultImage,
  }

  const title = options.title || defaults.title
  const description = options.description || defaults.description
  const image = options.image?.startsWith('http') ? options.image : `${SITE_URL}${options.image || defaultImage.replace(SITE_URL, '')}`
  const canonicalUrl = options.url || `${SITE_URL}${route.path}`

  const isEn = locale.value === 'en'
  useHead({
    title,
    link: [
      { rel: 'canonical', href: canonicalUrl },
    ],
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:site_name', content: 'Jacob Wiseman' },
      { property: 'og:locale', content: isEn ? 'en_US' : 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
  })
}
