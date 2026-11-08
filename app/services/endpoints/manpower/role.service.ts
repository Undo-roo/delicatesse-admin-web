import { BaseService } from "../../base-service";
import type { ApiClient } from '../../api'
import type { Permission, Role } from "~/types/manpower/roles";

export class RoleService extends BaseService<Role> {
    constructor(api: ApiClient) {
        super(api, 'manpower/roles')
    }

    all() {
        return this.api.get<Role[]>(this.endpoint())
    }

    permissions() {
        return this.api.get<Permission[]>(this.endpoint('permissions'))
    }

    updatePermissions(id: string | number, permission_ids: number[]) {
        return this.api.put<{ id: number; permission_ids: number[] }>(
            this.endpoint(`${id}/permissions`),
            { permission_ids },
        )
    }
}
