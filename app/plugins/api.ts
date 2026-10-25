import type { FetchError } from 'ofetch'
import { createServices } from '~/services'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const token = useCookie<string | null>('token')

    const services = createServices({
        baseURL: config.public.apiBase,
        getToken: () => token.value,

        onError: async (e) => {
            const err = e as FetchError

            // expired session: we had a token and the server rejected it
            // (without the token check, a wrong password on the login form would also land here)
            if (err.status === 401 && token.value) {
                token.value = null
                await nuxtApp.runWithContext(() => navigateTo('/admin/login'))
                return
            }

            await nuxtApp.callHook('api:error', err)
        },
    })

    return {
        provide: {
            api: services.api,
            services,
        },
    }
})