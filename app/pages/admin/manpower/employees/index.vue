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
			:page-size="meta?.per_page" 
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

const { list } = useEmployee();
const { rows, meta, status, search, page } = list

const tableRows = computed(() =>
  rows.value.map(e => ({
    name: e.name,
    email: e.email,
    mobileNumber: e.mobile_number,   // may be null
    role: e.role,
    dateCreated: e.date_created,
  })),
)

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
const tableFilter = ref('');

</script>
