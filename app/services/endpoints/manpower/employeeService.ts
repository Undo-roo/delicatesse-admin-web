import { BaseService } from "../../base-service";
import type { ApiClient } from '../../api'
import type { Employee, EmployeeList, EmployeePayload } from "~/types/manpower/employees";

export class EmployeeService extends BaseService<Employee, EmployeeList, EmployeePayload, EmployeePayload>
{
    constructor(api: ApiClient) {
        // Pass the required api instance and the base backend path 'employees'
        super(api, 'manpower/employees')
    }

    restore(id: string | number) {
        return this.api.patch<Employee>(this.endpoint(`${id}/restore`))
    }
}