import { BaseService } from "../../base-service";
import type { ApiClient } from '../../api'
import type { Truck, TruckList, TruckPayload } from "~/types/assets/truck";

export class TruckService extends BaseService<Truck, TruckList, TruckPayload, TruckPayload>
{
    constructor(api: ApiClient) {
        super(api, 'assets/trucks')
    }

    // Trucks create/update are multipart/form-data (the avatar is uploaded
    // inline), unlike the JSON-based employee/client endpoints.
    store(payload: TruckPayload) {
        return this.api.post<Truck>(this.endpoint(), this.toFormData(payload))
    }

    update(id: string | number, payload: Partial<TruckPayload>) {
        return this.api.put<Truck>(this.endpoint(id), this.toFormData(payload))
    }

    uploadAvatar(id: string | number, file: File) {
        const formData = new FormData()
        formData.append('avatar', file)
        return this.api.put<Truck>(this.endpoint(id), formData)
    }

    restore(id: string | number) {
        return this.api.patch<Truck>(this.endpoint(`${id}/restore`))
    }

    private toFormData(payload: Partial<TruckPayload>): FormData {
        const formData = new FormData()
        if (payload.plate_number != null) formData.append('plate_number', payload.plate_number)
        if (payload.owned_at != null) formData.append('owned_at', payload.owned_at)
        if (payload.status != null) formData.append('status', payload.status)
        if (payload.avatar != null) formData.append('avatar', payload.avatar)
        return formData
    }
}
