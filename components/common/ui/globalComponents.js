import Vue from 'vue'

import './globalComponents.scss'

import VButton from './VButton'
import VInput from './VInput'
import VIconSprite from './VIconSprite'

const components = [
    VButton,
    VInput,
    VIconSprite,
]

components.forEach((component) => {
    if (component.name) {
        Vue.component(component.name, component)
    } else {
        console.warn('[UI] Register / No component name: ', component)
    }
})
