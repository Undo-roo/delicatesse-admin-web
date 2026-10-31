<template>
	<NuxtLayout name="admin" :breadcrumbs="['Manpower', 'Employees']">
		
		<template #filter>
			<forms-filter
				v-model:tab="tab"
				:tabs="employeeTabs"
				@search="onSearch"
				@clear="onClear"
			>
				<template #actions>
					<forms-button 
						text="Add Employee" 
						pre-icon="boxicons:plus-circle" 
						@click="openCreate" 
					/>
				</template>
			</forms-filter>
		</template>
		
		<presets-data-table 
			:columns="tableColumns" 
			:rows="rows" 
			:meta="meta"
			v-model:page="page"
			server-side
			:is-loading="status === 'pending'"
			:show-restore="tab === 'archived'"
			class="mt-4"
			@read="row => {
				activeEmployee = row;
				sheetOpen = true
			}"
			@delete="row => {
				activeEmployee = row;
				promptArchive();
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
			<employees-read :id="activeEmployee?.id" @delete="promptArchive" />
		</modals-sheet>

		<modals-confirmation 
			v-model="actionDialogOpen"
			:variant="actionModal.variant"
			:title="actionModal.title"
			:message="actionModal.message"
			@confirm="handleActions"
			:loading="loading"
		/>

		<modals-sheet
			v-model="createSheetOpen"
			side="bottom" 
			:title="'Create Employee'"
		>
			<employees-create-sheet
				:open="createSheetOpen"
				@saved="onSaved"
				@cancel="createSheetOpen = false"
			/>
		</modals-sheet>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import BaseAvatar from '~/components/formatters/BaseAvatar.vue';
import MobileNumber from '~/components/formatters/MobileNumber.vue';
type Variant = 'destructive' | 'success' | 'warning' | 'info'

const { rows, meta, status, search, page, tab, refresh } = useEmployees();
const { loading, archive, restore } = useEmployeeActions();

const employeeTabs = [
	{ label: 'Active', value: 'active' },
	{ label: 'Archived', value: 'archived' },
];

function onSearch(q: string) {
	search.value = q;
}

function onClear() {
	search.value = '';
}

const activeEmployee = ref();

const sheetOpen = ref(false);
const actionDialogOpen = ref(false);
const createSheetOpen = ref(false);

function openCreate() {
	createSheetOpen.value = true;
}

function onSaved() {
	createSheetOpen.value = false;
	refresh();
}

const actionModal = ref<{title: string, message: string, variant: Variant }>({
	title: "",
	message: "",
	variant: "destructive",
});

function promptArchive() {
	actionModal.value.title = `Archive ${activeEmployee.value?.name}?`;
	actionModal.value.message = "Temporarily employee' data is unnaccessible and prohibits them to access the system until restore back";
	actionModal.value.variant = 'destructive';
	actionDialogOpen.value = true;
}

const handleActions = async () => {
	const employee = activeEmployee.value;

	if(!employee || loading.value) {
		actionDialogOpen.value = false;
		return;
	}

	if(actionModal.value.variant === 'destructive') await archive(employee.id);
	else await restore(employee.id);

	actionDialogOpen.value = false;
	sheetOpen.value = false;
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

onMounted(refresh);
</script>
