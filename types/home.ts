interface IOption {
    value: number,
    label: string,
}

interface IValues {
    [key: string]: string | number,
}

interface IScrollOptions {
    disabled: boolean,
    limit: number,
}

interface IFlags {
    [key: string]: boolean
}

interface IQuery {
    [key: string]: string
}

export {
    IOption,
    IValues,
    IScrollOptions,
    IFlags,
    IQuery,
}
