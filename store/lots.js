import { getVehicles } from '~/static/request'

export const state = () => ({
    lotsList: null,
})

export const getters = {
    getCurrentLot: state => id => state.lotsList.find(e => e.id === id),

    getCurrentLotTab: (state, getters) => function(route) {
        const currentTab = getters.getCurrentLot(route.params.id)
        const tabName = `${route.params.slug}_text`
        const res = {
            label: tabName,
            data: currentTab[tabName],
        }
        return res
    },
}

export const mutations = {
    SET_LOTS(state, payload) {
        state.lotsList = payload
    },

    SET_ITEM(state, payload) {
        state.lotsList.push(payload)
    },
}

export const actions = {
    async fetchLots({ commit }) {
        const data = await getVehicles()
        commit('SET_LOTS', data)
    },

    setNewItem({ commit }, data) {
        commit('SET_ITEM', data)
    },
}
