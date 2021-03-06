import Vue from 'vue'

import './globalComponents.scss'

import VImageLazy from '../VImageLazy'
import VButton from './button/VButton'
import VInput from './input/VInput'
import VSelect from './select/VSelect'
import VIconSprite from './VIconSprite'
import VTabs from './tabs/VTabs'
import VTab from './tabs/VTab'

const components = [
    VButton,
    VInput,
    VIconSprite,
    VSelect,
    VImageLazy,
    VTabs,
    VTab,
]

components.forEach(component => {
    if (component.name) {
        Vue.component(component.name, component)
    } else {
        console.warn('[UI] Register / No component name: ', component)
    }
})
