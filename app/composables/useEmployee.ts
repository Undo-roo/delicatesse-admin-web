import { type EmployeeList } from "~/types/manpower/employees"


export function useEmployee() {
  const { employees } = useApi()

  const list = useApiList<EmployeeList>('employees', p => employees.list(p))

  return {
	  list
  }
}