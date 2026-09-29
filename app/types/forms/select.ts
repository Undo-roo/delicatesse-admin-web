import type { FunctionalComponent } from "vue";

export interface SelectOption {
    value: any;
    label: string;
}

export interface Select {
    options: SelectOption[];
    preIcon?: FunctionalComponent;
    postIcon?: FunctionalComponent;
    label?: string;
    error?: string;
    baseClass?: string;
    disabled?: boolean;
    searchable?: boolean;
    placeholder?: string;
    fetchOptions?: (query: string) => Promise<SelectOption[]>;
}
