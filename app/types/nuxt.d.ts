import type { ApiClient } from '~/services/api'
import type { Services } from '~/services'

declare module '#app' {
    interface NuxtApp {
        $api: ApiClient
        $services: Services
    }
}
