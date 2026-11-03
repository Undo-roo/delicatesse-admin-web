<template>
	<NuxtLayout name="admin" :breadcrumbs="['Assets', 'Trucks']">
		
		<template #filter>
			<forms-filter
				v-model:tab="tab"
				:tabs="truckTabs"
				@search="onSearch"
				@clear="onClear"
			>
				<template #actions>
					<forms-button 
						text="Add Truck" 
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
				activeTruck = row;
				sheetOpen = true
			}"
			@delete="row => {
				activeTruck = row;
				promptArchive();
			}"
			@restore="row => {
				activeTruck = row;
				actionModal.title = `Restore ${activeTruck?.plate_number}?`;
				actionModal.message = 'Truck\'s data will now be accessible to the system';
				actionModal.variant = 'info';
				actionDialogOpen = true;
			}"
		/>
		
		<modals-sheet v-model="sheetOpen" side="bottom" title="TRUCK INFORMATION">
			<trucks-read :id="activeTruck?.id" @delete="promptArchive" />
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
			:title="'Create Truck'"
		>
			<trucks-create-sheet
				:open="createSheetOpen"
				@saved="onSaved"
				@cancel="createSheetOpen = false"
			/>
		</modals-sheet>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import BaseAvatar from '~/components/formatters/BaseAvatar.vue';
import StatusPill from '~/components/formatters/StatusPill.vue';
import type { StatusPillVariant } from '~/types/formatters/statusPill';
type Variant = 'destructive' | 'success' | 'warning' | 'info'

const { rows, meta, status, search, page, tab, refresh } = useTrucks();
const { loading, archive, restore } = useTruckActions();

const truckTabs = [
	{ label: 'Active', value: 'active' },
	{ label: 'Archived', value: 'archived' },
];

const statusMeta: Record<string, { label: string; variant: StatusPillVariant }> = {
	draft: { label: 'Draft', variant: 'gray' },
	available: { label: 'Available', variant: 'green' },
	in_transit: { label: 'In Transit', variant: 'blue' },
	defective: { label: 'Defective', variant: 'red' },
};

function onSearch(q: string) {
	search.value = q;
}

function onClear() {
	search.value = '';
}

const activeTruck = ref();

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
	actionModal.value.title = `Archive ${activeTruck.value?.plate_number}?`;
	actionModal.value.message = "Temporarily the truck's data is inaccessible and prohibits them from accessing the system until restored";
	actionModal.value.variant = 'destructive';
	actionDialogOpen.value = true;
}

const handleActions = async () => {
	const truck = activeTruck.value;

	if(!truck || loading.value) {
		actionDialogOpen.value = false;
		return;
	}

	if(actionModal.value.variant === 'destructive') await archive(truck.id);
	else await restore(truck.id);

	actionDialogOpen.value = false;
	sheetOpen.value = false;
}

const tableColumns = [
    {
        key: 'plate_number',
        label: 'Plate Number',
        cell: ({ row }: any) => h(BaseAvatar, {
            name: row.original.plate_number,
            src: row.original.avatar,
        }),
    },
    {
        key: 'status',
        label: 'Status',
        cell: ({ row }: any) => {
            const s = statusMeta[row.original.status] ?? { label: row.original.status, variant: 'default' as StatusPillVariant };
            return h(StatusPill, { text: s.label, variant: s.variant });
        },
    },
    { key: 'owned_at', label: 'Owned At' },
    { key: 'created_at', label: 'Date Created' },
];

onMounted(refresh);
</script>
