import type { FunctionalComponent } from "vue";

export interface TextInput {
    preIcon?: FunctionalComponent;
    postIcon?: FunctionalComponent;
    placeholder?: string;
    error?: string;
    label?: string;
    baseClass?: string;
    disabled?: boolean;
}