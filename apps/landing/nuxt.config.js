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

export default {
  generate: { fallback: true },
  mode: 'universal',
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
    title: 'TheCompany',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: 'TheCompany - A new awesome service' }
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
    }]
    // '@nuxtjs/sitemap'
  ],

  /**
   * Proxy
   */
  proxy,

  /**
   * Sitemap
   */
  // sitemap: {
  //   hostname: `https://yourdomain.com`,
  //   gzip: true,
  //   exclude: [
  //     '/_static/'
  //   ]
  // },

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
