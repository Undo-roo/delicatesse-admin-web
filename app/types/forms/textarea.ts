import type { FunctionalComponent } from "vue";

export interface Textarea {
    preIcon?: FunctionalComponent;
    postIcon?: FunctionalComponent;
    placeholder?: string;
    error?: string;
    label?: string;
    baseClass?: string;
    disabled?: boolean;
    rows?: number;
    locked?: boolean;
}
