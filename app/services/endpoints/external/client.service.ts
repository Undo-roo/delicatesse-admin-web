import { BaseService } from "../../base-service";
import type { ApiClient } from '../../api'
import type { Client, ClientList, ClientPayload } from "~/types/external/client";

export class ClientService extends BaseService<Client, ClientList, ClientPayload, ClientPayload>
{
    constructor(api: ApiClient) {
        super(api, 'external/clients')
    }

    restore(id: string | number) {
        return this.api.patch<Client>(this.endpoint(`${id}/restore`))
    }

    uploadAvatar(id: string | number, file: File) {
        const formData = new FormData()
        formData.append('avatar', file)
        return this.api.post<Client>(this.endpoint(`${id}/avatar`), formData)
    }
}
