<template>
	<NuxtLayout name="admin">
		
		<!-- TAB -->
		<div class="flex w-full gap-x-10">
			<div class="">
				<div class="flex gap-x-2 text-3xl font-bold items-center text-gray">
					<p>Manpower</p>
					<Icon name="boxicons:chevron-right-filled" class="size-12" />
					<p class="text-primary">Employees</p>
				</div>
				<div>
					<!-- Tab button here -->
				</div>
			</div>

			<div class="flex-1">
				<forms-filter />
			</div>
		</div>

		
		<presets-data-table 
			:columns="tableColumns" 
			:rows="rows" 
			:filter="tableFilter" 
			:page-size="meta?.per_page" 
			class="mt-12"
			@read="row => {
				activeEmployee = row;
				sheetOpen = true
			}"
			@delete="row => {
				activeEmployee = row;
				actionModal.title = `Archive ${activeEmployee?.name}?`;
				actionModal.message = 'Temporarily employee\' data is unnaccessible and prohibits them to access the system until restore back';
				actionModal.variant = 'destructive';
				actionDialogOpen = true;
			}"
			@restore="row => {
				activeEmployee = row;
				actionModal.title = `Restore ${activeEmployee?.name}?`;
				actionModal.message = 'Employee\'s data will now be accessible and has the access to the system';
				actionModal.variant = 'info';
				actionDialogOpen = true;
			}"
		/>

		
		<modals-sheet v-model="sheetOpen" side="bottom" title="EMPLOYEE INFORMATION">
			<employees-read :id="activeEmployee?.id" />
		</modals-sheet>


		<modals-confirmation 
			v-model="actionDialogOpen"
			:variant="actionModal.variant"
			:title="actionModal.title"
			:message="actionModal.message"
			@confirm="handleActions"
			:loading="loading"
		/>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import BaseAvatar from '~/components/formatters/BaseAvatar.vue';
import MobileNumber from '~/components/formatters/MobileNumber.vue';
type Variant = 'destructive' | 'success' | 'warning' | 'info'

const { rows, meta, status, search, page, refresh } = useEmployees();
const { loading, archive, restore } = useEmployeeActions();

const activeEmployee = ref();

const sheetOpen = ref(false);
const actionDialogOpen = ref(false);

const actionModal = ref<{title: string, message: string, variant: Variant }>({
	title: "",
	message: "",
	variant: "destructive",
});

const handleActions = async () => {
	const employee = activeEmployee.value;

	if(!employee || loading.value) {
		actionDialogOpen.value = false;
		return;
	}

	if(actionModal.value.variant === 'destructive') await archive(employee.id);
	else await restore(employee.id);

	actionDialogOpen.value = false;
}

const tableColumns = [
    {
        key: 'name',
        label: 'Name',
        cell: ({ row }: any) => h(BaseAvatar, {
            name: row.original.name,
        }),
    },
    { key: 'email', label: 'Email' },
    {
        key: 'mobileNumber',
        label: 'Mobile Number',
        cell: ({ row }: any) => h(MobileNumber, { number: row.original.mobileNumber }),
    },
    { key: 'role', label: 'Role' },
    { key: 'dateCreated', label: 'Date Created' },
];

const tableFilter = ref('');

onMounted(refresh);
</script>
