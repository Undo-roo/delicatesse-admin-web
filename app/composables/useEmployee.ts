import { type Employee, type EmployeeList } from "~/types/manpower/employees"

export function useEmployees() {
  const { employees } = useApi();
  return useApiList<EmployeeList>('employees', p => employees.list(p));
}

export function useEmployee(id: MaybeRefOrGetter<string | number | undefined>) {
  const { employees } = useApi()
  return useAsyncData<Employee>(
    () => `employee-${toValue(id)}`,
    () => employees.show(toValue(id)!),
    { enabled: () => toValue(id) != null },
  )
}

// export async function createUser(input: UserInput) {
//   await $fetch('/api/users', { method: 'POST', body: input })
//   await refreshNuxtData('users')
// }

// export async function updateUser(id: number, input: UserInput) {
//   await $fetch(`/api/users/${id}`, { method: 'PATCH', body: input })
//   await refreshNuxtData(['users', `user-${id}`])
// }