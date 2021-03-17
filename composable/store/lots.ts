import { computed, ssrRef } from '@nuxtjs/composition-api'
import axios from 'axios'

import { ILot, ILots, IResponse } from '~/types/lots'

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
    setLots,
    setLot,
}
