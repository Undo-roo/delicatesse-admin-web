import type { HookResult } from '@nuxt/schema'
import type { FetchError } from 'ofetch'

declare module '#app' {
    interface RuntimeNuxtHooks {
        'api:error': (error: FetchError) => HookResult
    }
}