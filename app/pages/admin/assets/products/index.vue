<template>
	<NuxtLayout name="admin" :breadcrumbs="['Assets', 'Products']">
		
		<template #filter>
			<forms-filter
				v-model:tab="tab"
				:tabs="tabs"
				@search="onSearch"
				@clear="onClear"
			>
				<template #actions>
					<forms-button 
						text="Add Product" 
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
				activeProduct = row;
				sheetOpen = true
			}"
			@delete="row => {
				activeProduct = row;
				promptArchive();
			}"
			@restore="row => {
				activeProduct = row;
				actionModal.title = `Restore ${activeProduct?.plate_number}?`;
				actionModal.message = 'Truck\'s data will now be accessible to the system';
				actionModal.variant = 'info';
				actionDialogOpen = true;
			}"
		/>
		
		<modals-sheet v-model="sheetOpen" side="bottom" title="PRODUCT INFORMATION">
			<trucks-read :id="activeProduct?.id" @delete="promptArchive" />
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
			:title="'Create Product'"
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
import Price from '~/components/formatters/Price.vue';
import ProgressBar from '~/components/formatters/ProgressBar.vue';
import StatusPill from '~/components/formatters/StatusPill.vue';
import { InventoryStatus } from '~/types/assets/product';
import type { ProgressBarVariant } from '~/types/formatters/progressBar';
import type { StatusPillVariant } from '~/types/formatters/statusPill';
type Variant = 'destructive' | 'success' | 'warning' | 'info'

const { rows, meta, status, search, page, tab, refresh } = useProducts();
const { loading, archive, restore } = useProductActions();

const tabs = [
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

const activeProduct = ref();

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
	actionModal.value.title = `Archive ${activeProduct.value?.plate_number}?`;
	actionModal.value.message = "Temporarily the truck's data is inaccessible and prohibits them from accessing the system until restored";
	actionModal.value.variant = 'destructive';
	actionDialogOpen.value = true;
}

const handleActions = async () => {
	const truck = activeProduct.value;

	if(!truck || loading.value) {
		actionDialogOpen.value = false;
		return;
	}

	if(actionModal.value.variant === 'destructive') await archive(truck.id);
	else await restore(truck.id);

	actionDialogOpen.value = false;
	sheetOpen.value = false;
}

const invetoryStockProgress = (inventoryStatus: string): { label: string, variant: ProgressBarVariant } => {
	switch(inventoryStatus) {
		case InventoryStatus.IN_STOCK:
			return {
				label: 'In Stock',
				variant: 'success',
			}
		case InventoryStatus.LOW_STOCK:
			return {
				label: 'Low Stock',
				variant: 'danger',
			}
		case InventoryStatus.OUT_OF_STOCK:
			return {
				label: 'Out of Stock',
				variant: 'emergency',
			}
	}

	return {
		label: 'N/A',
		variant: 'default',
	}
}

const tableColumns = [
    {
        key: 'name',
        label: 'Product',
        cell: ({ row }: any) => h(BaseAvatar, {
            name: row.original.name,
			src: undefined,
        }),
    },
    {
        key: 'stock',
        label: 'Stock',
        maxWidth: 80,
        cell: ({ row }: any) => {
			const product = row.original;
			const { label, variant } = invetoryStockProgress(product.inventory_status);

            return h(ProgressBar, {
				label: label,
				current: product.inventory_count,
				total: product.inventory_threshold,
				variant: variant,
				showPercentage: false,
			});
        },
    },
    { key: 'categories', label: 'Categories' },
    {
        key: 'revenue',
        label: 'Revenue',
   		class: 'text-right',
        cell: ({ row }: any) => h(Price, {
            value: row.original.revenue,
        }),
    },
    { key: 'created_at', label: 'Date Created' },
];

onMounted(refresh);
</script>
