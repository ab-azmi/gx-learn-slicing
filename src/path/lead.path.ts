export const crudPath = (feature: string) => {
    return {
        index: `/${feature}`,
        form: `/${feature}/form`,
        detail: `/${feature}/detail`,
    };
}

export const leadPath = crudPath('leads');