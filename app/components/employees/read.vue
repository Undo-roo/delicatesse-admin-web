<template>
	<presets-read-sidebar>
	</presets-read-sidebar>

	<!-- skeletal loading -->
	 <!-- Error state -->
	<div v-if="employee && !isFetching" class="w-full px-6 py-2">
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

		<div class="mt-6 flex justify-end px-6 pb-4">
			<forms-button text="Edit" pre-icon="boxicons:edit" @click="emit('edit', employee)" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Employee } from '~/types/manpower/employees';

interface EmployeeReadSheet {
	id: string|number;
}
const props = defineProps<EmployeeReadSheet>();

const emit = defineEmits<{ edit: [employee: Employee] }>();

const employeeId = computed(() => props.id);
	
const { data: employee, status, refresh } = useEmployee(employeeId);

const isFetching = computed(() => status.value === 'pending' || status.value === 'idle' );
</script>
