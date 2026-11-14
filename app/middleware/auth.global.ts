/**
 * Global auth guard: protects every route except the login page (`/`).
 *
 * Disable it for local testing by setting `ADMIN_AUTH_DISABLED=true`
 * in `.env` (exposed as `runtimeConfig.public.authDisabled`).
 */
export default defineNuxtRouteMiddleware((to) => {
    const config = useRuntimeConfig()
    if (config.public.authDisabled) return

    const token = useCookie<string | null>('token')

    // `/` is the login page — let it through.
    if (to.path !== '/' && !token.value) {
        return navigateTo('/')
    }
})
