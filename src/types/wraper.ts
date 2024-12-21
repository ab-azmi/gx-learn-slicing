export type Paginate<T> = {
    result : T[];
    status: {
        code: number;
        message: string;
        internalMsg: string | null;
        attributes: Array<string> | null;
    },
    pagination: {
        count: number;
        currentPage: number;
        perPage: number;
        totalPage: number;
        links: {
            next: number | null;
            previous: number | null;
        }
    }
}