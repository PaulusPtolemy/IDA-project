import incstr from 'incstr'

const createUniqueIdGenerator = () => {
    const uniqIds = {}

    const generateNextId = incstr.idGenerator({
        alphabet: 'abcefghijklmnopqrstuvwxyzABCEFGHJKLMNOPQRSTUVWXYZ',
    })

    return name => {
        if (!uniqIds[name]) {
            uniqIds[name] = generateNextId()
        }

        return uniqIds[name]
    }
}

const localNameIdGenerator = createUniqueIdGenerator()
const componentNameIdGenerator = createUniqueIdGenerator()

export const obfuscation = (localName, resourcePath) => {
    const componentName = resourcePath

    const localId = localNameIdGenerator(localName)
    const componentId = componentNameIdGenerator(componentName)

    return `${componentId}_${localId}`
}
