import type { AuthUser } from '~/services/endpoints/auth.service'

/**
 * Auth state + actions, built around the `token` cookie that the api plugin
 * also reads to attach `Authorization: Bearer <token>` to every request.
 */
export function useAuth() {
    const { auth } = useApi()

    // Same cookie key the api plugin uses for the bearer token.
    const token = useCookie<string | null>('token')
    const user = useState<AuthUser | null>('auth-user', () => null)

    const isAuthenticated = computed(() => !!token.value)

    async function login(email: string, password: string) {
        const session = await auth.login({ email, password })
        token.value = session.id
        return session
    }

    async function fetchUser() {
        const me = await auth.me()
        user.value = me.authenticated ? me.employee : null
        return user.value
    }

    async function logout() {
        const sessionId = token.value
        token.value = null
        user.value = null
        if (sessionId) {
            try {
                await auth.logout(sessionId)
            } catch {
                // Session may already be expired/revoked — ignore.
            }
        }
        await navigateTo('/')
    }

    return { token, user, isAuthenticated, login, fetchUser, logout }
}
