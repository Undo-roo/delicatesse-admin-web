<template>
	<presets-read-sidebar>
		<template #footer>
			<forms-button 
				text="Update Information" 
				variant="outline" 
				@click="isUpdating = true" 
				class="w-full" 
				pre-icon="boxicons:edit"
				:disabled="isUpdating"
			/>
			<forms-button 
				text="Delete Employee" 
				variant="destructive" 
				class="w-full !border-red-500" 
				pre-icon="boxicons:trash"
				@click="emit('delete')"
			/>
		</template>
	</presets-read-sidebar>

	<!-- read mode -->
	<div v-if="employee && !isFetching && !isUpdating" class="w-full px-6 py-2">
		<presets-read-card>
			<presets-read-card-content 
				class="col-span-6"
				label="First Name" 
				:content="employee.first_name" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Last Name" 
				:content="employee.last_name" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Mobile Number" 
				:content="employee.mobile_number" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Role" 
				:content="employee.role" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Date Hired" 
				:content="employee.date_hired" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Date Created" 
				:content="employee.date_created" 
			/>
			<presets-read-card-content 
				class="col-span-12"
				label="Email" 
				:content="employee.email" 
			/>
		</presets-read-card>
	</div>

	<!-- update mode -->
	<employees-form
		v-else-if="isUpdating && employee"
		:employee="employee"
		:open="isUpdating"
		@saved="onSaved"
		@cancel="isUpdating = false"
	/>
</template>

<script lang="ts" setup>
interface EmployeeReadSheet {
	id: string|number;
}
const props = defineProps<EmployeeReadSheet>();

const emit = defineEmits<{ delete: [] }>();

const employeeId = computed(() => props.id);

const isUpdating = ref(false);

const { data: employee, status, refresh } = useEmployee(employeeId);

const isFetching = computed(() => status.value === 'pending' || status.value === 'idle');

async function onSaved() {
	await refresh();
	await refreshNuxtData('employees');
	isUpdating.value = false;
}
</script>
