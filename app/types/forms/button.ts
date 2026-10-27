
export interface Button {
    preIcon?: string;
    postIcon?: string;
    error?: string;
    text?: string;
    baseClass?: string;
    preIconClass?: string;
    postIconClass?: string;
    disabled?: boolean;
    variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive' | 'link'
}
