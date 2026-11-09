import { ApiClient } from './api'
import type { ApiClientOptions } from './api'
import { AuthService } from './endpoints/auth.service'
import { ProductService } from './endpoints/assets/product.service'
import { TruckService } from './endpoints/assets/truck.service'
import { CategoryService } from './endpoints/assets/category.service'
import { EmployeeService } from './endpoints/manpower/employee.service'
import { RoleService } from './endpoints/manpower/role.service'
import { ClientService } from './endpoints/external/client.service'

/** Every endpoint service instance, all built around a single ApiClient. */
export interface Services {
    api: ApiClient
    auth: AuthService
    products: ProductService
    trucks: TruckService
    categories: CategoryService
    employees: EmployeeService
    roles: RoleService
    clients: ClientService
}

/**
 * Create the shared ApiClient + all endpoint services.
 * Register new endpoint services here — they become available via `useApi()`.
 */
export function createServices(options: ApiClientOptions = {}): Services {
    const api = new ApiClient(options)

    return {
        api,
        auth: new AuthService(api),

        // assets
        products: new ProductService(api),
        trucks: new TruckService(api),
        categories: new CategoryService(api),

        // manpower
        employees: new EmployeeService(api),
        roles: new RoleService(api),

        // external
        clients: new ClientService(api),
    }
}

export { ApiClient }
export type { ApiClientOptions } from './api'
export { BaseService } from './base-service'
export type { ListParams } from './base-service'
