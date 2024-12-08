export type Setting = {
    id?: number,
    key?: string,
    description?: string,
    value: string,
}

export type SettingFilter = {
    search: string,
}