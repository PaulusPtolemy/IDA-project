import { computed, ssrRef } from '@nuxtjs/composition-api'
import { getVehicles } from '~/static/request'

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

const setLot = (payload: ILot) => {
    state.value.lotsList ? state.value.lotsList.push(payload) : state.value.lotsList = [payload]
}

const setLots = async(): Promise<void> => {
    try {
        state.value.lotsList = await getVehicles()
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
