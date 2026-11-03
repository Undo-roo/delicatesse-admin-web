<template>
	<presets-read-sidebar>
		<template #avatar>
			<forms-avatar-input
				:src="truck?.avatar"
				:name="truck?.plate_number"
				:editable="isUpdating"
				@change="handleAvatarChange"
			/>
		</template>
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
				text="Delete Truck" 
				variant="destructive" 
				class="w-full !border-red-500" 
				pre-icon="boxicons:trash"
				@click="emit('delete')"
			/>
		</template>
	</presets-read-sidebar>

	<!-- read mode -->
	<div v-if="truck && !isFetching && !isUpdating" class="w-full px-6 py-2">
		<presets-read-card>
			<presets-read-card-content 
				class="col-span-12"
				label="Plate Number" 
				:content="truck.plate_number" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Status" 
			>
				<formatters-status-pill
					:text="statusMeta[truck.status]?.label ?? truck.status"
					:variant="statusMeta[truck.status]?.variant ?? 'default'"
				/>
			</presets-read-card-content>
			<presets-read-card-content 
				class="col-span-6"
				label="Owned At" 
				:content="truck.owned_at" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Date Created" 
				:content="truck.created_at" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Date Updated" 
				:content="truck.updated_at" 
			/>
		</presets-read-card>
	</div>

	<!-- update mode -->
	<trucks-form
		v-else-if="isUpdating && truck"
		:truck="truck"
		:open="isUpdating"
		@saved="onSaved"
		@cancel="isUpdating = false"
	/>
</template>

<script lang="ts" setup>
import type { StatusPillVariant } from '~/types/formatters/statusPill';

interface TruckReadSheet {
	id: string|number;
}
const props = defineProps<TruckReadSheet>();

const emit = defineEmits<{ delete: [] }>();

const truckId = computed(() => props.id);

const isUpdating = ref(false);

const { data: truck, status, refresh } = useTruck(truckId);
const { trucks } = useApi();
const { success } = useToast();

const statusMeta: Record<string, { label: string; variant: StatusPillVariant }> = {
	draft: { label: 'Draft', variant: 'gray' },
	available: { label: 'Available', variant: 'green' },
	in_transit: { label: 'In Transit', variant: 'blue' },
	defective: { label: 'Defective', variant: 'red' },
};

const isFetching = computed(() => status.value === 'pending' || status.value === 'idle');

async function onSaved() {
	await refresh();
	await refreshNuxtData('trucks');
	isUpdating.value = false;
}

async function handleAvatarChange(file: File) {
	if (!truck.value) return;
	try {
		await trucks.uploadAvatar(truck.value.id, file);
		success('Avatar updated successfully');
		await refresh();
	} catch {
		// global api:error plugin surfaces the failure
	}
}
</script>
