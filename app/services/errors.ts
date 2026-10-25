import { FetchError } from 'ofetch'

export interface ApiError {
    status?: number
    message: string
    fieldErrors: Record<string, string[]>
}

export function getApiError(e: unknown): ApiError {
    if (e instanceof FetchError) {
        const body = e.data as any
        const fieldErrors: Record<string, string[]> = {}

        // FastAPI validation: detail = [{ loc: ['body', 'name'], msg }]
        if (Array.isArray(body?.detail)) {
            for (const d of body.detail) {
                const field = d.loc.slice(1).join('.')
                ;(fieldErrors[field] ??= []).push(d.msg)
            }
        }
        // Laravel-style validation: errors = { name: ['...'] }
        else if (body?.errors) {
            Object.assign(fieldErrors, body.errors)
        }

        // don't show raw server messages for 5xx, they can leak internals
        const isServerError = (e.status ?? 0) >= 500
        const message = (!isServerError && (body?.message ?? (typeof body?.detail === 'string' ? body.detail : undefined)))
            || defaultMessage(e.status)

        return { status: e.status, message, fieldErrors }
    }
    return { message: 'Something went wrong.', fieldErrors: {} }
}

function defaultMessage(status?: number) {
    if (!status) return 'Cannot reach the server. Check your connection.'
    if (status === 403) return 'You don’t have permission to do that.'
    if (status === 404) return 'Not found.'
    if (status >= 500) return 'Server error. Please try again later.'
    return 'Request failed.'
}