interface ILot {
    [key: string]: string
}

interface ILots {
    lotsList: ILot[] | null
}

interface IResponse {
    statusCode: number | undefined
}

interface ILotTab {
    label: string,
    data: string,
}

interface IRouteParams {
    slug: string
    id: string
}

export {
    ILot,
    ILots,
    ILotTab,
    IRouteParams,
    IResponse,
}
