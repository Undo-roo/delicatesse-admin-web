export type ToastVariant = 'success' | 'error' | 'info';

export type ToastPosition = 'top-left' | 'top-middle' | 'top-right' | 'bottom-left' | 'bottom-middle' | 'bottom-right';

export interface Toast {
    title?: string;
    description?: string;
    variant?: ToastVariant;
    position?: ToastPosition;
    showClose?: boolean;
    duration?: number;
}
