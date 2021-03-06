import Vue from 'vue'

Vue.mixin({
    methods: {
        isIE() {
            if (process.browser) {
                const ua = window.navigator.userAgent
                return ua.includes('MSIE ') || ua.includes('Trident/')
            } else {
                return false
            }
        },
        isFox() {
            if (process.browser) {
                const ua = window.navigator.userAgent.toLowerCase()
                return ua.includes('mozilla') || ua.includes('firefox')
            } else {
                return false
            }
        },
    },
})
