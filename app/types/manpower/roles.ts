export interface Permission {
    id: number;
    name: string;
    description?: string;
}

export interface Role {
    id: number;
    name: string;
    description?: string;
    width?: number;
    frozen?: boolean;
    permission_ids?: number[];
}
