import type { SelectOption } from "~/types/forms/select";

export interface Multiselect {
    options: SelectOption[];
    label?: string;
    error?: string;
    baseClass?: string;
    disabled?: boolean;
    searchable?: boolean;
    placeholder?: string;
    fetchOptions?: (query: string) => Promise<SelectOption[]>;
}
