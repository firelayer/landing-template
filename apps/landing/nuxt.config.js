const path = require('path')
const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css' }
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
    '~/plugins/vuetify.js',
    '~/plugins/firebase.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
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
  //   hostname: `https://${config.firebase.authDomain}`,
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

  /*
  ** Build configuration
  */
  build: {
    publicPath: '/_static/',
    transpile: [/^vuetify/],
    plugins: [
      new VuetifyLoaderPlugin({})
    ],
    loaders: {
      /**
       * Inject SCSS variables globally
       */
      sass: {
        prependData: '@import \'~@/assets/styles/vuetify/_index.scss\''
      },
      scss: {
        prependData: '@import \'~@/assets/styles/vuetify/_index.scss\';'
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
