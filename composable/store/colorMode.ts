import { computed, reactive } from '@nuxtjs/composition-api'

interface IColorMode {
    modeColor: string
}

const state = reactive<IColorMode>(
    {
        modeColor: 'dark',
    })

const setColor = (color: string): void => {
    state.modeColor = color
}

const getColor = computed(() => state.modeColor)

export {
    getColor,
    setColor,
}
