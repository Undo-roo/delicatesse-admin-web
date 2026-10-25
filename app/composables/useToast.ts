import type { ToastState } from '~/types/modals/toast'

type ToastOptions = Partial<Omit<ToastState, 'isOpen'>>

export function useToast() {
    const toast = useState<ToastState>('toast', () => ({
        isOpen: false,
        title: undefined,
        description: undefined,
        variant: undefined,
        duration: undefined,
        position: 'top-middle',
        showClose: true,
    }))

    function show(options: ToastOptions) {
        toast.value = { ...toast.value, ...options, isOpen: true }
    }

    const success = (description: string, title = 'Success') =>
        show({ title, description, variant: 'success' })

    const error = (description: string, title = 'Error') =>
        show({ title, description, variant: 'error' })

    const info = (description: string, title = 'Info') =>
        show({ title, description, variant: 'error' })

    return { toast, show, success, error, info }
}