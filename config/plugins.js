export const plugins = [
    '~components/common/ui/globalComponents.js',
    { src: '~/config/plugins/vue-infinite-scroll.js', ssr: false },
    { src: '~/config/plugins/vue-debounce.js', ssr: false },
    { src: '~/config/plugins/vue-select.js', ssr: false },
    '~/config/plugins/filters.js',
    '~/config/plugins/methods.js',
    '~/config/plugins/svg-color.js',
    '~/config/plugins/lazyload.js',
    '~/config/plugins/modal.js',
]
