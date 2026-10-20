import { BaseService } from "../../base-service";
import type { ApiClient } from '../../api'
import type { Employee, EmployeeList } from "~/types/manpower/employees";

export class EmployeeService extends BaseService<Employee, EmployeeList>
{
    constructor(api: ApiClient) {
        // Pass the required api instance and the base backend path 'employees'
        super(api, 'manpower/employees')
    }
}