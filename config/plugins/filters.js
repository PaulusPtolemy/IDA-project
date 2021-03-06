import Vue from 'vue'

export function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1)
}

export function unCapitalize(str) {
    return str[0].toLowerCase() + str.slice(1)
}

const filters = { capitalize, unCapitalize }

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

export default filters
