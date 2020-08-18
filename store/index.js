import { getVehicles } from '~/static/request'
export const state = () => ({
  data: null,
  errorOnLoad: null,
  user: {
    name: 'Bessie Cooper',
    avatar: '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\n'
  },
  popup: false,
  currentLot: null
})

export const getters = {
  getdata (state) {
    return state.data
  },
  getErrorOnLoad (state) {
    return state.errorOnLoad
  },
  getUser (state) {
    return state.user
  },
  getPopup (state) {
    return state.popup
  },
  getCurrentProduct (state) {
    return state.currentLot
  }
}

export const mutations = {
  SET_DATA (state, payload) {
    state.data = payload
  },
  SET_ERROR (state, payload) {
    state.errorOnLoad = payload
  },
  SET_POPUP (state, payload) {
    state.popup = payload
  },
  SET_ITEM (state, payload) {
    state.data.push(payload)
  },
  SET_CURRENT_LOT (state, payload) {
    state.currentLot = payload
  }
}

export const actions = {
  async GET_DATA_ACT ({ commit }) {
    const data = await getVehicles()
    commit('SET_DATA', data)
  },

  ACT_SET_POPUP ({ commit }, val) {
    commit('SET_POPUP', val)
  },

  ACT_SET_ITEM ({ commit }, data) {
    commit('SET_ITEM', data)
  },

  async ACT_CURRENT_LOT ({ commit, dispatch, state }, { route }) {
    if (!state.data) {
      await dispatch('GET_DATA_ACT')
    }
    const lot = state.data.find(e => e.id === route.params.id)
    commit('SET_CURRENT_LOT', lot)
    return state.currentLot
  }

}
