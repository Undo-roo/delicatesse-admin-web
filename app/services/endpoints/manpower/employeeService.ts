import { BaseService } from "../../base-service";
import type { ApiClient } from '../../api'

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

export class EmployeeService extends BaseService<Employee>
{
    constructor(api: ApiClient) {
        // Pass the required api instance and the base backend path 'employees'
        super(api, 'manpower/employees')
    }
}