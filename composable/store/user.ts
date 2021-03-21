import { computed, reactive } from '@nuxtjs/composition-api'

const state = reactive({
    profile: {
        name: 'Bessie Cooper',
        avatar: 'https://placebeard.it/112x112',
    },
})

const getUser = computed(() => state.profile)

export {
    getUser,
}
