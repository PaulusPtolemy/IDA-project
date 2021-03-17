import { plugins } from './config/plugins'
import { obfuscation } from './config/plugins/getScopedName'
const isDev = process.env.NODE_ENV === 'development'

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
            lang: 'en',
        },
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },
    /*
  ** Global CSS
  */
    css: [
        'normalize.css/normalize.css',
        '~/assets/scss/common.scss',
        '~/assets/scss/vendors.scss',
    ],

    styleResources: {
        scss: ['~/assets/scss/shared/*.scss'],
    },
    /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
    plugins: [
        ...plugins,
    ],
    /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
    components: true,
    /*
  ** Nuxt.js dev-modules
  */

    typescript: {
        typeCheck: {
            eslint: {
                files: './**/*.{ts,js,vue}',
            },
        },
    },

    buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
        '@nuxtjs/svg',
        '@nuxtjs/composition-api',
        '@nuxt/typescript-build',

        [
            '@nuxtjs/stylelint-module',
            {
                files: ['**/*.scss', '**/*.vue'],
                failOnError: false,
                quiet: false,
            },
        ],
        [
            '@nuxtjs/eslint-module',
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/,
            },
        ],
    ],
    /*
  ** Nuxt.js modules
  */
    modules: [
        '@nuxtjs/svg',
        '@nuxtjs/svg-sprite',
        '@nuxtjs/style-resources',
        '@nuxtjs/axios',
    ],
    serverMiddleware: {
        '/api': '~/api',
    },

    // svg модуль для инлайн полного импорта
    // svg-sprite для создания спрайта

    svgSprite: {
        input: '~/assets/svg/sprite/',
    },
    /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
    render: {
    // включить при https
    // http2: {
    //   push: true,
    //   pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles
    //   .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
    // },
    },
    build: {
        loaders: {
            cssModules: {
                modules: {
                    // exportGlobals: true
                    // mode: (resourcePath) => {
                    //   if (/pure.scss$/i.test(resourcePath)) {
                    //     return 'pure'
                    //   }
                    //
                    //   if (/global.scss$/i.test(resourcePath)) {
                    //     return 'global'
                    //   }
                    //
                    //   return 'local'
                    // },
                    ...(isDev
                        ? {
                            localIdentName: '[name]_[local]',
                        }
                        : {
                            getLocalIdent: (context, localIdentName, localName) => (
                                obfuscation(localName, context.resourcePath)
                            ),
                        }
                    ),
                },
            },

        },
        ...(!isDev && {
            html: {
                minify: {
                    collapseBooleanAttributes: true,
                    decodeEntities: true,
                    minifyCSS: true,
                    minifyJS: true,
                    processConditionalComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    trimCustomFragments: true,
                    useShortDoctype: true,
                },
            },
        }),
        optimization: {
            minimize: !isDev,
        },
        ...(!isDev && {
            extractCSS: {
                ignoreOrder: true,
            },
        }),
        postcss: {
            ...(!isDev && {
                preset: {
                    browsers: 'cover 99.5%',
                    autoprefixer: true,
                },
            }),
        },
    },
}
