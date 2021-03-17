import { computed, ssrRef } from '@nuxtjs/composition-api'
import axios from 'axios'

import { ILot, ILots, ILotTab, IRouteParams } from '~/types/lots'

const state = ssrRef<ILots>(
    {
        lotsList: null,
    })

const getLotsList = computed(() => state.value.lotsList)

const getCurrentLot = (id: string): ILot | undefined => {
    return state.value.lotsList && Array.isArray(state.value.lotsList)
        ? state.value.lotsList?.find(e => e.id === id)
        : undefined
}

const getCurrentLotTab = (RouteParams: IRouteParams) => {
    const currentTab = getCurrentLot(RouteParams.id)
    const tabName = `${RouteParams.slug}_text`
    return <ILotTab> {
        label: tabName,
        data: currentTab ? currentTab[tabName] : '',
    }
}

interface IResponse {
    statusCode: number | undefined
}

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
    try {
        const res = await axios.get('/api/vehicles/')
        console.log(res.status)
        state.value.lotsList = res.data
    } catch (e) {
        console.log('store/lots setLots', e)
    }
}

export {
    getLotsList,
    getCurrentLot,
    getCurrentLotTab,
    setLots,
    setLot,
}
