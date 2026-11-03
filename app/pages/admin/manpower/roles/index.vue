<template>
	<NuxtLayout name="admin" :breadcrumbs="['Manpower', 'Roles']">
		
		<template #filter>
			<forms-filter
				v-model:tab="tab"
				@search="onSearch"
				@clear="onClear"
			>
				<template #actions>
					<forms-button 
						text="Save Changes" 
						pre-icon="boxicons:edit" 
						:disabled="!isDirty"
						@click="openCreate" 
					/>
				</template>
			</forms-filter>
		</template>

		<!-- <modals-confirmation 
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
		</modals-sheet>		 -->
	</NuxtLayout>
</template>

<script lang="ts" setup>
type Variant = 'destructive' | 'success' | 'warning' | 'info'

const { rows, meta, status, search, page, tab, refresh } = useEmployees();
const { loading, archive, restore } = useEmployeeActions();

function onSearch(q: string) {
	search.value = q;
}

function onClear() {
	search.value = '';
}

const sheetOpen = ref(false);
const isDirty = ref(false);
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

onMounted(refresh);
</script>
