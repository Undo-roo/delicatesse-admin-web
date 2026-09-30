export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
    title?: string;
    description?: string;
    variant?: ToastVariant;
    showClose?: boolean;
}
