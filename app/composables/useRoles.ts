import type { Role } from "~/types/manpower/roles";

export function useRoles() {
    const { roles } = useApi();
    return useAsyncData<Role[]>('roles', () => roles.all());
}
