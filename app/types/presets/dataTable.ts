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

export interface PaginationMeta {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

export interface DataTable {
    columns?: DataTableColumn[];
    rows?: Record<string, any>[];
    /** Server-side (backend) pagination: `rows` are already the current page. */
    serverSide?: boolean;
    meta?: PaginationMeta;
    /** Current page (v-model:page) — used only when `serverSide` is true. */
    page?: number;
    /** Client-side global search — used only when `serverSide` is false. */
    filter?: string;
    /** Client-side page size — used only when `serverSide` is false. */
    pageSize?: number;
    baseClass?: string;
    isLoading?: boolean;
    hasActions?: boolean;
    /** Show the restore action (only relevant on "archived" tab). */
    showRestore?: boolean;
}
