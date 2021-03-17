import { onGlobalSetup, useContext } from '@nuxtjs/composition-api'
import { setLots, setAxios } from '~/composable/store/lots'

// fetching lots globally

export default () => {
    onGlobalSetup(async() => {
        const { $axios } = useContext()
        setAxios($axios)
        await setLots()
    })
}
