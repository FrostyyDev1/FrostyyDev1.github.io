// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = 'https://frostyydev1.github.io'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  modules: [
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxt/image',
    '@nuxt/fonts',
  ],

  image: {
    provider: 'none',
  },

  fonts: {
    defaults: {
      preload: true,
      weights: [400, 500, 600, 700],
    },
  },

  site: {
    url: siteUrl,
    name: 'Jacob Wiseman, IT support',
  },

  sitemap: {
    xslColumns: [
      { label: 'URL', width: '65%' },
      { label: 'Last Modified', width: '25%' },
    ],
    urls: [
      { loc: '/certifications', _i18nTransform: false },
      { loc: '/projets', _i18nTransform: false },
      ...[
        'northstar',
        'thomas-imaging',
        'comptia-a-plus',
        'network-plus',
        'csu-global',
      ].map(slug => ({ loc: `/projets/${slug}`, _i18nTransform: false })),
    ],
  },

  i18n: {
    baseUrl: siteUrl,
    locales: [
      { code: 'en', file: 'en.json', name: 'English', language: 'en-US' },
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  typescript: {
    strict: true,
  },

  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/components/ui', prefix: '' },
    { path: '~/components/home', prefix: 'Home' },
    { path: '~/components/project', prefix: 'Project' },
    { path: '~/components/icons', prefix: 'Icons' },
  ],

  imports: {
    dirs: ['composables/**', 'stores/**', 'types/**'],
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/certifications', '/projets'],
    },
  },

  app: {
    baseURL: '/',
    viewTransition: false,
    head: {
      meta: [
        { name: 'author', content: 'Jacob Wiseman' },
        { name: 'theme-color', content: '#0d0d0f' },
      ],
      script: [
        {
          innerHTML: `(function(){try{var h=document.documentElement;h.classList.add('app-loading');h.style.opacity='0';var m=document.cookie.match(/(?:^|;\\s*)theme=(dark|light)/);var d=m?m[1]==='dark':true;if(d)h.classList.add('dark')}catch(e){}})()`,
          type: 'text/javascript',
          tagPosition: 'head',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/ClashDisplay-Bold.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Satoshi-Regular.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Satoshi-Medium.woff2', crossorigin: '' },
      ],
    },
  },
})
