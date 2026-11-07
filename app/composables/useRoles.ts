import type { Permission, Role } from "~/types/manpower/roles";

export function useRoles() {
    const { roles } = useApi();
    return useAsyncData<Role[]>('roles', () => roles.all());
}

export function usePermissions() {
    const { roles } = useApi();
    return useAsyncData<Permission[]>('permissions', () => roles.permissions());
}

export function useRolePermissionActions() {
    const { roles } = useApi();
    const saving = ref(false);

    async function saveAll(rolePermissions: Array<{ id: number; permission_ids: number[] }>) {
        if (saving.value) return false;
        saving.value = true;
        try {
            await Promise.all(
                rolePermissions.map((rp) => roles.updatePermissions(rp.id, rp.permission_ids)),
            );
            return true;
        } catch {
            return false;
        } finally {
            saving.value = false;
        }
    }

    return { saving, saveAll };
}
