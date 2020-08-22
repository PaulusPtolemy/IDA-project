const isDev = process.env.NODE_ENV === 'development';
const getScopedName = require('./plugins/getScopedName.js');

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css/normalize.css',
    '@/assets/fonts/font.css',
    '~/assets/scss/_main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {src: '~plugins/vue-infinite-scroll.js', ssr: false},
    {src: '~plugins/vue-debounce.js', ssr: false},
    {src: '~plugins/vue-select.js', ssr: false},
    '~/plugins/filters.js',
    '~/plugins/methods.js',
    '~/plugins/svg-color.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/color-mode',
    '@nuxtjs/svg'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/svg',
    '@nuxtjs/axios',
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    analyze: true,
    loaders: {
      cssModules: {
        modules: {
          ...( isDev ?
              {
                localIdentName: "[path][name]_[local]"
              }
              :
              {
                getLocalIdent: (context, localIdentName, localName) => (
                  getScopedName(localName, context.resourcePath)
                )
              }
          ),
        }
      },

    },
  }
}
