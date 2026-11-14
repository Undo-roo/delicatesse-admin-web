import { BaseService } from '../base-service'
import type { ApiClient } from '../api'

/** The authenticated employee, as returned by `GET /auth/me`. */
export interface AuthUser {
    id: number
    first_name: string
    last_name: string
    email: string
    status: string
}

export interface LoginPayload {
    email: string
    password: string
}

/**
 * A server-side session. The `id` is what the frontend stores as the "token"
 * and sends back as `Authorization: Bearer <id>`.
 */
export interface Session {
    id: string
    employee_id: number
    expires_at: string
    is_revoked: boolean
}

export interface MeResponse {
    authenticated: boolean
    employee: AuthUser | null
}

export class AuthService extends BaseService<AuthUser> {
    constructor(api: ApiClient) {
        super(api, 'auth')
    }

    login(payload: LoginPayload) {
        return this.api.post<Session>('auth/login', payload)
    }

    logout(sessionId: string) {
        return this.api.post<void>(`auth/logout/${sessionId}`)
    }

    me() {
        return this.api.get<MeResponse>('auth/me')
    }
}
