import { BaseService } from "../../base-service";
import type { ApiClient } from '../../api'
import type { Role } from "~/types/manpower/roles";

export class RoleService extends BaseService<Role> {
    constructor(api: ApiClient) {
        super(api, 'roles')
    }

    all() {
        return this.api.get<Role[]>(this.endpoint())
    }
}
