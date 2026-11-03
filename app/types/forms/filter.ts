export interface FilterTab {
    label: string;
    value: string;
}

export interface Filter {
    placeholder?: string;
    disabled?: boolean;
    hasFilter?: boolean;
    baseClass?: string;
    tabs?: FilterTab[];
    tab?: string;
}
