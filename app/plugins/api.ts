import { createServices } from '~/services'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const token = useCookie<string | null>('token')

    const services = createServices({
        baseURL: config.public.apiBase,
        getToken: () => token.value,
        onUnauthorized: () => {
            token.value = null
        },
    })

    return {
        provide: {
            api: services.api,
            services,
        },
    }
})
