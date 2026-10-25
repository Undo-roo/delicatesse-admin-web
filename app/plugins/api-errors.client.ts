export default defineNuxtPlugin((nuxtApp) => {
    const { error } = useToast()
    const router = useRouter()

    nuxtApp.hook('api:error', (e) => {
        if (!e.status) {
            error('Cannot reach the server. Check your connection.', 'Network error')
            return
        }

        if (e.status === 401 || e.status === 422) return

        if (e.status === 403) {
            error('You don’t have access to that.', 'Access denied')
            router.push('/admin')
            return
        }

        if (e.status >= 500) {
            error('Server error. Please try again later.')
            return
        }

        const detail = e.data?.detail
        error(e.data?.message ?? (typeof detail === 'string' ? detail : undefined) ?? 'Request failed.')
    })
})