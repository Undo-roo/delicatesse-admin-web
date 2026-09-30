export interface DataTableColumn {
    key: string;
    label: string;
}

export interface DataTable {
    columns?: DataTableColumn[];
    rows?: Record<string, any>[];
}
