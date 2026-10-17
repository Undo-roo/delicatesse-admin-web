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
			:rows="tableRows" 
			:filter="tableFilter" 
			:page-size="5" 
			class="mt-12"
			@read="sheetOpen = true"
		/>
		
		<modals-sheet v-model="sheetOpen" side="bottom" title="EMPLOYEE INFORMATION">
			<employees-read />
		</modals-sheet>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import BaseAvatar from '~/components/formatters/BaseAvatar.vue';
import MobileNumber from '~/components/formatters/MobileNumber.vue';

const sheetOpen = ref(false);


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
    // {
    //     key: 'status',
    //     label: 'Status',
    //     cell: ({ row }: any) => h(StatusPill, {
    //         text: row.original.status,
    //         variant: statusVariantMap[row.original.status] ?? 'default',
    //         showIcon: false,
    //     }),
    // },
    { key: 'dateCreated', label: 'Date Created' },
];

const tableRows = [
	{ name: 'Maria Santos', email: 'maria.santos@company.ph', mobileNumber: '917 555 0192', role: 'Inventory Manager', dateCreated: '2026-01-15' },
    { name: 'Juan Reyes', email: 'juan.reyes@company.ph', mobileNumber: '918 555 0283', role: 'Logistics Specialist', dateCreated: '2026-02-10' },
    { name: 'Angela Cruz', email: 'angela.cruz@company.ph', mobileNumber: '919 555 0374', role: 'Store Associate', dateCreated: '2026-03-01' },
    { name: 'Carlos Garcia', email: 'carlos.garcia@company.ph', mobileNumber: '920 555 0465', role: 'Procurement Officer', dateCreated: '2025-11-20' },
    { name: 'Bea Mendoza', email: 'bea.mendoza@company.ph', mobileNumber: '921 555 0556', role: 'Quality Control', dateCreated: '2026-01-05' },
    { name: 'Mark Ramos', email: 'mark.ramos@company.ph', mobileNumber: '922 555 0647', role: 'Store Associate', dateCreated: '2026-02-18' },
    { name: 'Sofia Torres', email: 'sofia.torres@company.ph', mobileNumber: '923 555 0738', role: 'Inventory Supervisor', dateCreated: '2026-03-05' },
    { name: 'Gabriel Aquino', email: 'gabriel.aquino@company.ph', mobileNumber: '924 555 0829', role: 'Logistics Specialist', dateCreated: '2025-12-12' },
    { name: 'Patricia Bautista', email: 'patricia.bautista@company.ph', mobileNumber: '925 555 0910', role: 'Store Associate', dateCreated: '2026-01-30' },
    { name: 'Daniel Dela Cruz', email: 'daniel.delacruz@company.ph', mobileNumber: '926 555 1001', role: 'Procurement Specialist', dateCreated: '2025-10-15' },
    { name: 'Christina Fernandez', email: 'christina.fernandez@company.ph', mobileNumber: '927 555 1192', role: 'Store Associate', dateCreated: '2026-02-22' },
    { name: 'Rafael Villanueva', email: 'rafael.villanueva@company.ph', mobileNumber: '928 555 1283', role: 'Warehouse Lead', dateCreated: '2026-01-11' },
];
const tableFilter = ref('');

</script>
