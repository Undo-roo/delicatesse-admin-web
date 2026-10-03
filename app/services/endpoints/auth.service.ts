import { BaseService } from '../base-service'
import type { ApiClient } from '../api'

export interface AuthUser {
    id: string
    name: string
    email: string
}

export interface LoginPayload {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
    user: AuthUser
}

export class AuthService extends BaseService<AuthUser> {
    constructor(api: ApiClient) {
        super(api, 'auth')
    }

    login(payload: LoginPayload) {
        return this.api.post<LoginResponse>('auth/login', payload)
    }

    logout() {
        return this.api.post<void>('auth/logout')
    }

    me() {
        return this.api.get<AuthUser>('auth/me')
    }
}
