<template>
	<NuxtLayout name="admin" :breadcrumbs="['External', 'Clients']">
		
		<template #filter>
			<forms-filter
				v-model:tab="tab"
				:tabs="clientTabs"
				@search="onSearch"
				@clear="onClear"
			>
				<template #actions>
					<forms-button 
						text="Add Client" 
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
				activeClient = row;
				sheetOpen = true
			}"
			@delete="row => {
				activeClient = row;
				promptArchive();
			}"
			@restore="row => {
				activeClient = row;
				actionModal.title = `Restore ${activeClient?.company}?`;
				actionModal.message = 'Client\'s data will now be accessible to the system';
				actionModal.variant = 'info';
				actionDialogOpen = true;
			}"
		/>
		
		<modals-sheet v-model="sheetOpen" side="bottom" title="CLIENT INFORMATION">
			<clients-read :id="activeClient?.id" @delete="promptArchive" />
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
			:title="'Create Client'"
		>
			<clients-create-sheet
				:open="createSheetOpen"
				@saved="onSaved"
				@cancel="createSheetOpen = false"
			/>
		</modals-sheet>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import BaseAvatar from '~/components/formatters/BaseAvatar.vue';
type Variant = 'destructive' | 'success' | 'warning' | 'info'

const { rows, meta, status, search, page, tab, refresh } = useClients();
const { loading, archive, restore } = useClientActions();

const clientTabs = [
	{ label: 'Active', value: 'active' },
	{ label: 'Archived', value: 'archived' },
];

function onSearch(q: string) {
	search.value = q;
}

function onClear() {
	search.value = '';
}

const activeClient = ref();

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
	actionModal.value.title = `Archive ${activeClient.value?.company}?`;
	actionModal.value.message = "Temporarily the client's data is inaccessible and prohibits them from accessing the system until restored";
	actionModal.value.variant = 'destructive';
	actionDialogOpen.value = true;
}

const handleActions = async () => {
	const client = activeClient.value;

	if(!client || loading.value) {
		actionDialogOpen.value = false;
		return;
	}

	if(actionModal.value.variant === 'destructive') await archive(client.id);
	else await restore(client.id);

	actionDialogOpen.value = false;
	sheetOpen.value = false;
}

const tableColumns = [
    {
        key: 'company',
        label: 'Company',
        cell: ({ row }: any) => h(BaseAvatar, {
            name: row.original.company,
            src: row.original.avatar,
        }),
    },
    { key: 'point_person', label: 'Point Person' },
    { key: 'contact_information', label: 'Contact Information' },
    { key: 'email', label: 'Email' },
    { key: 'created_at', label: 'Date Created' },
];

onMounted(refresh);
</script>
