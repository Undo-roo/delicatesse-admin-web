export interface Client {
    id: number;
    company: string;
    point_person: string;
    contact_information: string;
    email: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
}

export interface ClientList {
    id: number;
    company: string;
    point_person: string;
    contact_information: string;
    email: string;
    avatar?: string;
    created_at: string;
}

export interface ClientPayload {
    company: string;
    point_person: string;
    contact_information: string;
    email: string;
}
