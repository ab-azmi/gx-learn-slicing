export const crudPath = (feature: string) => {
    //return crud paths
    return {
        index: `/${feature}`,
        form: `/${feature}/form`,
    };
}

export const leadPath = crudPath('leads');