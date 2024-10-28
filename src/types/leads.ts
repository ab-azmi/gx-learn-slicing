export type Probability = {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

export type Status = {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

export type Type = {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;
}

export type Lead = {
    id?: number;
    code: string;
    name: string;
    branch: string;
    address: string;
    note: string;
    phone: string;
    created_at: string;
    updated_at: string;
    probability: Probability;
    status: Status;
    type: Type;
}