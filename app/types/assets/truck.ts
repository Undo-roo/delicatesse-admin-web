// A truck (asset domain). `status` is one of: draft, available, in_transit, defective.
export interface Truck {
    id: number;
    plate_number: string;
    avatar?: string;
    status: string;
    owned_at: string;
    created_at: string;
    updated_at: string;
}

export interface TruckList {
    id: number;
    plate_number: string;
    avatar?: string;
    status: string;
    owned_at: string;
    created_at: string;
}

// Trucks create/update via multipart form data (avatar uploaded inline).
export interface TruckPayload {
    plate_number: string;
    owned_at: string;
    status?: string;
    avatar?: File;
}
