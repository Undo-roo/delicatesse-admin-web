<template>
	<presets-read-sidebar>
		<template #avatar>
			<forms-avatar-input
				:src="client?.avatar"
				:name="client?.company"
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
				text="Delete Client" 
				variant="destructive" 
				class="w-full !border-red-500" 
				pre-icon="boxicons:trash"
				@click="emit('delete')"
			/>
		</template>
	</presets-read-sidebar>

	<!-- read mode -->
	<div v-if="client && !isFetching && !isUpdating" class="w-full px-6 py-2">
		<presets-read-card>
			<presets-read-card-content 
				class="col-span-12"
				label="Company" 
				:content="client.company" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Point Person" 
				:content="client.point_person" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Contact Information" 
				:content="client.contact_information" 
			/>
			<presets-read-card-content 
				class="col-span-12"
				label="Email" 
				:content="client.email" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Date Created" 
				:content="client.created_at" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Date Updated" 
				:content="client.updated_at" 
			/>
		</presets-read-card>
	</div>

	<!-- update mode -->
	<clients-form
		v-else-if="isUpdating && client"
		:client="client"
		:open="isUpdating"
		@saved="onSaved"
		@cancel="isUpdating = false"
	/>
</template>

<script lang="ts" setup>
interface ClientReadSheet {
	id: string|number;
}
const props = defineProps<ClientReadSheet>();

const emit = defineEmits<{ delete: [] }>();

const clientId = computed(() => props.id);

const isUpdating = ref(false);

const { data: client, status, refresh } = useClient(clientId);
const { clients } = useApi();
const { success } = useToast();

const isFetching = computed(() => status.value === 'pending' || status.value === 'idle');

async function onSaved() {
	await refresh();
	await refreshNuxtData('clients');
	isUpdating.value = false;
}

async function handleAvatarChange(file: File) {
	if (!client.value) return;
	try {
		await clients.uploadAvatar(client.value.id, file);
		success('Avatar updated successfully');
		await refresh();
	} catch {
		// global api:error plugin surfaces the failure
	}
}
</script>
