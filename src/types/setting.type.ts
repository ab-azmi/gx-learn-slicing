export type Setting = {
    id?: number,
    key?: string,
    description?: string,
    value: string,
}

export type SettingFilter = {
    search: string,
}

export type FixedCost = {
    id?: number,
    name: string,
    description: string,
    amount: number,
    frequencyId: number,
    frequency?: {
        id: number,
        name: string,
    },
    createdAt?: string,
    updatedAt?: string,
}

export type FixedCostFilter = {
    search: string,
    orderBy: string,
    orderType: string,
}