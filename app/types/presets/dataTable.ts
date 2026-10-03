export interface DataTableCellContext {
    row: { original: Record<string, any>; index: number; id: string };
    column: unknown;
    table: unknown;
    getValue: () => unknown;
}

export interface DataTableColumn {
    key: string;
    label?: string;
    /** Custom cell renderer — pass a component here, e.g. `cell: ({ row }) => h(StatusPill, { text: row.original.status })`. */
    cell?: (ctx: DataTableCellContext) => unknown;
}

export interface DataTable {
    columns?: DataTableColumn[];
    rows?: Record<string, any>[];
    pageSize?: number;
    /** Global search string — filters across every column value. */
    filter?: string;
}
