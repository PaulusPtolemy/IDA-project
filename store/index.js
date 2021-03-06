
export const state = () => ({
    //
})

export const mutations = {
    //
}

export const actions = {
    async nuxtServerInit({ dispatch }) {
        try {
            await dispatch('lots/fetchLots')
        } catch (e) {
            console.log('nuxtServerInit error', e)
        }
    },
}
