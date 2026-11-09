<template>
	<presets-read-sidebar>
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
				text="Delete Product" 
				variant="destructive" 
				class="w-full !border-red-500" 
				pre-icon="boxicons:trash"
				@click="emit('delete')"
			/>
		</template>
	</presets-read-sidebar>

	<!-- read mode -->
	<div v-if="product && !isFetching && !isUpdating" class="w-full px-6 py-2">
		<presets-read-card>
			<presets-read-card-content 
				class="col-span-6"
				label="Name" 
				:content="product.name" 
			/>
		 	<presets-read-card-content 
				class="col-span-6"
				label="Status" 
			>
				<div>
					<formatters-status-pill
						:text="statusMeta[product.status]?.label ?? product.status"
						:variant="statusMeta[product.status]?.variant ?? 'default'"
					/>
				</div>
			</presets-read-card-content>
		 	<presets-read-card-content 
				class="col-span-6"
				label="Base Price" 
			>
				<formatters-price
					:value="product.price"
				/>
			</presets-read-card-content>
		 	<presets-read-card-content 
				class="col-span-6"
				label="Unit Measurement"
				:content="product.uom" 
			/>
			<presets-read-card-content 
				class="col-span-12"
				label="Category" 
				:content="product.categories" 
			/>
			<presets-read-card-content 
				class="col-span-12"
				label="Description" 
				:content="product.description" 
			/>

			<presets-read-card variant="secondary" class="col-span-12">
				<presets-read-card-content 
					class="col-span-12"
					label="Nutrional Facts" 
				>
					<formatters-image-preview
						v-if="product?.nutritional_facts_url"
						:src="product.nutritional_facts_url.src"
						:name="product.nutritional_facts_url.filename"
						:extension="product.nutritional_facts_url.media_type"
						:space="product.nutritional_facts_url.size_display"
						:width="product.nutritional_facts_url.width"
						:length="product.nutritional_facts_url.height"
						:size="180"
					/>

        			<p class="font-bold">No uploaded image</p>
				</presets-read-card-content>

				<presets-read-card-content 
					class="col-span-12"
					label="Product Image" 
				>
					<formatters-group-image-preview
						v-if="product?.images?.length"
						:images="product.images"
						:name="product.name"
					/>
					<p v-else class="font-bold">No uploaded image</p>
				</presets-read-card-content>
			</presets-read-card>
		</presets-read-card>
	</div>

	<!-- update mode -->
	<products-form
		v-else-if="isUpdating && product"
		:product="product"
		:open="isUpdating"
		@saved="onSaved"
		@cancel="isUpdating = false"
	/>
</template>

<script lang="ts" setup>
import type { StatusPillVariant } from '~/types/formatters/statusPill';

interface ProlductReadSheet {
	id: string|number;
}
const props = defineProps<ProlductReadSheet>();

const emit = defineEmits<{ delete: [] }>();

const productId = computed(() => props.id);

const isUpdating = ref(false);

const { data: product, status, refresh } = useProduct(productId);
const { products } = useApi();
const { success } = useToast();

const statusMeta: Record<string, { label: string; variant: StatusPillVariant }> = {
	draft: { label: 'Draft', variant: 'yellow' },
	published: { label: 'Published', variant: 'green' },
};

const isFetching = computed(() => status.value === 'pending' || status.value === 'idle');

async function onSaved() {
	await refresh();
	await refreshNuxtData('trucks');
	isUpdating.value = false;
}
</script>
