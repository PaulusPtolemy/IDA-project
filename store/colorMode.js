
export const state = () => ({
    modeColor: 'dark',
})

export const getters = {
    //
}

export const actions = {
    setColorMode({ commit }, data) {
        commit('SET_COLOR_MODE', data)
    },
}

export const mutations = {
    SET_COLOR_MODE(state, payload) {
        state.modeColor = payload
    },
}
