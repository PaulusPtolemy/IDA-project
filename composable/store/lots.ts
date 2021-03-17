import { computed, ssrRef } from '@nuxtjs/composition-api'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ILot, ILots, IResponse } from '~/types/lots'

// importing nuxt axios plugin from context
let $axios: NuxtAxiosInstance

const setAxios = (plugin: NuxtAxiosInstance): void => {
    $axios = plugin
}

const state = ssrRef<ILots>(
    {
        lotsList: null,
    })

const getLotsList = computed(() => state.value.lotsList)

const setLot = (payload: ILot): IResponse | void => {
    try {
        state.value.lotsList ? state.value.lotsList.push(payload) : state.value.lotsList = [payload]
        return {
            statusCode: 200,
        }
    } catch (e) {
        console.log('store/lots setLot', e)
    }
}

const setLots = async(): Promise<void> => {
    console.log('$axios.defaults.baseURL', $axios.defaults.baseURL)
    try {
        state.value.lotsList = await $axios.$get('/api/vehicles/')
    } catch (e) {
        console.log('store/lots setLots', e)
    }
}

export {
    getLotsList,
    setLots,
    setLot,
    setAxios,
}
