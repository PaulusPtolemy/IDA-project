export function lockBody() {
    // const header = document.getElementById('header')
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
    // header.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'
}

export function unlockBody() {
    // const header = document.getElementById('header')
    document.body.style.height = ''
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    // header.style.paddingRight = ''
}

export function hasAll(arr1, arr2) {
    const hash = arr1.reduce(function(acc, i) {
        acc[i] = true
        return acc
    }, {})
    return arr2.every(function(i) {
        return i in hash
    })
}

export function debounce(fn, wait) {
    let timeout = null
    const timer = +wait

    const debounced = function(...args) {
        const later = () => {
            timeout = null

            fn.apply(this, args)
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, timer)

        if (!timeout) {
            fn.apply(this, args)
        }
    }

    debounced.cancel = () => {
        clearTimeout(timeout)
        timeout = null
    }

    return debounced
}
