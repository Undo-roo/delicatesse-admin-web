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

export function useEmployeeActions() {
    // both at the top of the function so the Nuxt context is available
    const { employees } = useApi()
    const { success } = useToast()

    const loading = ref(false)

    async function run(
        action: () => Promise<unknown>,
        message: string,
        keys: string[],
    ) {
        if (loading.value) return false
        loading.value = true
        try {
            await action()
            success(message)
            await refreshNuxtData(keys)
            return true
        }
        catch {
            return false
        }
        finally {
            loading.value = false
        }
    }

    // the record is gone after archive/delete, so only the list refreshes
    const archive = (id: string | number) => run(() => employees.destroy(id), 'Successfuly archived the employee\'s data', ['employees'])

    // restore brings it back, so the detail can refresh too
    const restore = (id: string | number) => run(() => employees.restore(id), 'Successfuly restored the employee\'s data', ['employees'])

    return { loading, archive, restore }
}