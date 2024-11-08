export type Paginate<T> = {
    data : T[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
        path: string;
        links: {
            url: string;
            label: string;
            active: boolean;
        }[]
    },
    links: {
        first: string;
        last: string;
        prev: string;
        next: string;
    }
}