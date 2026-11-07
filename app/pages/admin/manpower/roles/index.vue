<template>
	<NuxtLayout name="admin" :breadcrumbs="['Manpower', 'Roles']">

		<template #filter>
			<forms-filter
				@search="onSearch"
				@clear="onClear"
			>
				<template #actions>
					<forms-button
						text="Save Changes"
						pre-icon="boxicons:edit"
						:disabled="!isDirty || saving"
						@click="saveChanges"
					/>
				</template>
			</forms-filter>
		</template>

		<!-- Permission matrix (sticky first column, horizontally scrollable role columns) -->
		<presets-permission-matrix
			class="mt-4"
			:permissions="filteredPermissions"
			:row-header-width="650"
			:columns="columns"
			:matrix="matrix"
			@toggle="onToggle"
		/>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import type { MatrixColumn } from '~/types/presets/permissionMatrix';

const { data: roles, refresh: refreshRoles } = useRoles();
const { data: permissions } = usePermissions();
const { saving, saveAll } = useRolePermissionActions();
const { success } = useToast();

const search = ref('');
const isDirty = ref(false);

// Local editable matrix: roleId -> permissionId -> granted.
const matrix = reactive<Record<number, Record<number, boolean>>>({});

// Hydrate the matrix from server data whenever it loads (initial + after save).
watch([roles, permissions], ([r, p]) => {
	if (!r || !p) return;
	for (const role of r) {
		const grants = new Set(role.permission_ids ?? []);
		if (!matrix[role.id]) matrix[role.id] = {};
		for (const perm of p) {
			matrix[role.id][perm.id] = grants.has(perm.id);
		}
	}
	isDirty.value = false;
}, { immediate: true });

const filteredPermissions = computed(() => {
	const q = search.value.trim().toLowerCase();
	if (!q) return permissions.value ?? [];
	return (permissions.value ?? []).filter(
		(p) =>
			p.name.toLowerCase().includes(q) ||
			(p.description ?? '').toLowerCase().includes(q),
	);
});

// Column definitions drive the matrix design — width/frozen come from the role data.
const columns = computed<MatrixColumn[]>(() =>
	(roles.value ?? []).map((r) => ({
		id: r.id,
		label: r.name,
		width: r.width,
		frozen: r.frozen,
	})),
);

function onSearch(q: string) {
	search.value = q;
}

function onClear() {
	search.value = '';
}

function onToggle(roleId: number, permId: number, value: boolean) {
	if (!matrix[roleId]) matrix[roleId] = {};
	matrix[roleId][permId] = value;
	isDirty.value = true;
}

async function saveChanges() {
	if (!roles.value || !permissions.value) return;

	const rolePermissions = roles.value.map((role) => ({
		id: role.id,
		permission_ids: permissions.value!
			.filter((p) => !!matrix[role.id]?.[p.id])
			.map((p) => p.id),
	}));

	const ok = await saveAll(rolePermissions);
	if (ok) {
		isDirty.value = false;
		success('Permissions saved successfully');
		await refreshRoles();
	}
}
</script>
