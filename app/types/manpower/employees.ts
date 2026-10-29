// 1. Define what an Employee looks like in your system
export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    mobile_number?: string;
    role?: string;
    date_hired?: string;
    date_created: string;
    email: string;
}

export interface EmployeeList {
    id: number;
    name: string
    email: string
    mobile_number?: string
    role?: string
    date_created: string
}

export interface EmployeePayload {
    first_name: string;
    last_name: string;
    email: string;
    date_hired?: string;
    mobile_number?: string;
    role_id: number;
}