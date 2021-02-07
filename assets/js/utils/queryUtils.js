export function applyQuery (defaulValues, queryValues) {
    const values = { ...defaulValues }

    if (typeof defaulValues !== 'object') {
        console.warn('defaulValues must be an object')
        return
    }
    if (typeof queryValues !== 'object') {
        console.warn('queryValues must be an object')
        return
    }
    if (!Object.keys(queryValues).length) {
        return values
    }

    for (const name in queryValues) {
        if (Object.prototype.hasOwnProperty.call(values, name)) {
            if (Array.isArray(values[name])) {
                if (Array.isArray(queryValues[name])) {
                    values[name] = queryValues[name].map((i) => {
                        if (i === 'true') {
                            return true
                        } else if (i === 'false') {
                            return false
                        } else if (isNaN(i)) {
                            return i
                        } else { return Number(i) }
                    })
                } else {
                    values[name] =
                        [queryValues[name] === 'true'
                            ? true
                            : queryValues[name] === 'false'
                                ? false
                                : isNaN(queryValues[name])
                                    ? queryValues[name]
                                    : Number(queryValues[name])]
                }
            } else if (Array.isArray(queryValues[name])) {
                    values[name] = queryValues[name][0] === 'true'
                        ? true
                        : queryValues[name][0] === 'false'
                            ? false
                            : isNaN(queryValues[name][0])
                                ? queryValues[name][0]
                                : Number(queryValues[name][0])
                } else {
                    values[name] = queryValues[name] === 'true'
                        ? true
                        : queryValues[name] === 'false'
                            ? false
                            : isNaN(queryValues[name])
                                ? queryValues[name]
                                : Number(queryValues[name])
                }
        }
    }

    // console.log('applyQuery result__', values);

    return values
}

export function objectToQuery (obj) {
    let qs = ''
    for (const name in obj) {
        if (obj[name]) {
            if (Array.isArray(obj[name])) {
                if (obj[name].length) {
                    qs += `${name}=`
                    obj[name].forEach((val) => {
                        qs += `${val},`
                    })
                    qs = qs.slice(0, -1) + '&'
                }
            } else {
                qs += `${name}=${obj[name]}&`
            }
        }
    }
    return qs.slice(0, -1)
}

export function queryToObject (qs) {
    const obj = {}

    if (qs) {
        const params = qs.split('&')

        params.forEach((param) => {
            const name = param.split('=')[0]
            const value = param.split('=')[1]
            if (name && value) {
                if (Object.prototype.hasOwnProperty.call(obj, name)) {
                    if (Array.isArray(obj[name])) {
                        obj[name].push(value)
                    } else {
                        obj[name] = [obj[name], value]
                    }
                } else {
                    obj[name] = value
                }
            }
        })
    }
    return obj
}
