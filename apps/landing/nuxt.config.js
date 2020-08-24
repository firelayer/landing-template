const path = require('path')

const appName = path.basename(path.resolve(process.cwd()))
const config = JSON.parse(process.env[appName] || '{}')
const isProd = process.env.NODE_ENV === 'production'

// Proxy configurations for local development
const proxy = isProd ? {} : {
  '/api': {
    target: `http://localhost:5000/${config.firebase.projectId}/api`
  }
}

/**
 * Base url where the page will be
 */
const baseUrl = 'https://yourdomain.com'

/**
 * SEO content
 */
const SEO = {
  name: 'The Company',
  title: 'Landing Page - A new awesome service',
  description: 'This service is so new and so awesome that even the pope is asking for it',
  shortDescription: 'The best service',
  keywords: 'service, awesome, great'
}

export default {
  generate: { fallback: true },
  mode: 'universal',
  target: 'static',
  srcDir: 'src/',
  /**
   * Environment
   */
  env: {
    config: process.env[appName] || {}
  },

  /*
  ** Headers of the page
  */
  head: {
    title: SEO.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: SEO.description },
      { hid: 'keywords', name: 'keywords', content: SEO.keywords },
      // open graph
      { hid: 'og:site_name', property: 'og:site_name', content: SEO.name },
      { hid: 'og:title', property: 'og:title', content: SEO.title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:description', property: 'og:description', content: SEO.shortDescription },
      { hid: 'og:image', property: 'og:image', content: `${baseUrl}/images/share-card.png` },
      // twitter
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', name: 'twitter:title', content: SEO.title },
      { hid: 'twitter:description', name: 'twitter:description', content: SEO.shortDescription },
      { hid: 'twitter:image', name: 'twitter:image', content: `${baseUrl}/images/share-card.png` },
      { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: SEO.name },
      { hid: 'robots', name: 'robots', content: 'index,follow' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#1976d2' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/global.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/firebase.js'
  ],

  /**
   * Build modules
   */
  buildModules: [
    ['@nuxtjs/vuetify', {
      customVariables: ['~/assets/styles/vuetify'],
      optionsPath: '~/config/vuetify.options.js',
      treeShake: true,
      defaultAssets: {
        font: false
      }
    }]
  ],

  styleResources: {
    scss: [
      '~/assets/styles/vuetify/_index.scss'
    ]
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    ['@nuxtjs/axios', {
      baseURL: '/'
    }],
    '@nuxtjs/proxy',
    ['@nuxtjs/pwa', {
      meta: false,
      workbox: false,
      oneSignal: false
    }],
    ['nuxt-i18n', {
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected'
      },
      locales: [{
        code: 'en',
        name: 'English',
        file: 'en-US.js'
      }, {
        code: 'pt',
        name: 'Português',
        file: 'pt-PT.js'
      }],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: 'en'
      }
    }],
    '@nuxtjs/sitemap'
  ],

  /**
   * Proxy
   */
  proxy,

  /**
   * Sitemap
   */
  sitemap: {
    hostname: baseUrl,
    gzip: true,
    exclude: [
      '/_static/'
    ]
  },

  /**
   * Manifest file
   */
  manifest: {
    name: 'Firelayer',
    'short_name': 'Firelayer',
    description: 'Firelayer - Jump-start you Firebase Web Project'
  },

  /**
   * Bundle rendered
   */
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['style', 'font'].includes(type)
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    publicPath: '/_static/',
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {}
  }
}
