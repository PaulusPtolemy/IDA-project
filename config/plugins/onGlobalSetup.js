import { onGlobalSetup } from '@nuxtjs/composition-api'
import { setLots } from '~/composable/store/lots'

// fetching lots globally

export default () => {
    onGlobalSetup(async() => {
        await setLots()
    })
}
