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
        title: 'Pepelane',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'nuxt composition api for machines on typescript' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'preconnect', href: 'https://loremflickr.com' },
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
    plugins,
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

    axios: {
        baseUrl: !isDev ? 'https://pepelane.herokuapp.com/' : '',
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
        http2: {
            push: true,
        },
        bundleRenderer: {
            shouldPreload: (file, type) => {
                return ['font'].includes(type)
            },
        },
    },

    build: {
        loaders: {
            cssModules: {
                modules: {
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

        optimization: {
            minimize: !isDev,
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(css|vue)$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
        },

        extractCSS: {
            ignoreOrder: true,
        },

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
