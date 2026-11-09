<template>
	<form class="w-full max-w-[640px]" @submit.prevent="submit">
		<p v-if="generalError" class="px-6 pt-2 text-error font-bold">{{ generalError }}</p>

		<div class="grid grid-cols-12 gap-x-4 gap-y-4 px-6 py-2">
			<div class="col-span-12">
				<forms-text-input
					v-model="form.name"
					label="Name"
					placeholder="e.g Sinigang"
					:error="errors.name"
				/>
			</div>
			<div class="col-span-12 sm:col-span-6">
				<forms-text-input
					v-model="form.price"
					label="Base Price"
					pre-label="₱"
					placeholder="e.g 2,250.00"
					:error="errors.price"
				/>
			</div>
			<div class="col-span-12 sm:col-span-6">
				<forms-text-input
					v-model="form.sku"
					label="SKU"
					placeholder="e.g SDK-WCX21-C02"
					:error="errors.sku"
				/>
			</div>
			<div class="col-span-12 sm:col-span-6">
				<forms-toggle v-model="form.vat_included" label="Vat Included" />
			</div>
			<div class="col-span-12 sm:col-span-6">
				<forms-text-input
					v-model="form.uom"
					label="Unit Measurement"
					placeholder="e.g 2312"
					:error="errors.uom"
				/>
			</div>
			<div class="col-span-12">
				<forms-multiselect
					v-model="categories"
					:options="categoryOptions"
					label="Category"
					placeholder="Select categories"
					searchable
					:error="errors.category_ids"
				/>
			</div>
			<div class="col-span-12">
				<forms-textarea
					v-model="form.description"
					label="Description"
					placeholder="Add description"
					:error="errors.description"
				/>
			</div>

			<div class="col-span-12">
				<forms-file-input
					v-model="nutritionalFacts"
					label="Nutritional facts"
					description="Upload Nutritional facts"
				/>
			</div>

			<div class="col-span-12">
				<forms-multi-file-input
					v-model="images"
					label="Product Image"
					:fields="['Front Image', 'Back Image', 'Side Image', 'Any Image']"
				/>
			</div>
		</div>

		<div class="mt-6 flex justify-end gap-3 px-6 py-4">
			<forms-button class="w-full" text="Discard Changes" variant="outline" @click="emits('cancel')" />
			<forms-button class="w-full" type="submit" pre-icon="boxicons:save" :text="isEdit ? 'Update Information' : 'Create Product'" :disabled="loading" />
		</div>
	</form>
</template>

<script lang="ts" setup>
import type { SelectOption } from '~/types/forms/select';
import type { Product } from '~/types/assets/product';

const props = defineProps<{
    product?: Product | null;
    open?: boolean;
}>();

const emits = defineEmits<{
	'saved': [];
	'cancel': [];
}>();

const { products } = useApi();
const { success } = useToast();

const { data: categoryList } = useCategories();

const form = reactive({
	name: '',
	price: '',
	sku: '',
	uom: '',
	vat_included: true,
	description: '',
});

const categories = ref<SelectOption[]>([]);
const nutritionalFacts = ref<File | null>(null);
const images = ref<(File | string | null)[]>([]);
const originalImages = ref<string[]>([]);

const categoryOptions = computed<SelectOption[]>(() =>
	(categoryList.value ?? []).map((c) => ({ value: c.id, label: c.name })),
);

const loading = ref(false);
const errors = reactive<Record<string, string>>({});
const generalError = ref('');

const isEdit = computed(() => !!props.product);

// Hydrate (reset + pre-fill) whenever the form becomes active. `immediate`
// covers the update case where the form mounts already-open (isUpdating).
watch(() => props.open, (isOpen) => {
    if (!isOpen) return;
    hydrate();
}, { immediate: true });

function hydrate() {
    reset();
    const p = props.product;
    if (p) {
        form.name = p.name;
        form.price = String(p.price);
        form.sku = p.sku;
        form.uom = p.uom ?? '';
        form.vat_included = p.vat_included;
        form.description = p.description ?? '';
        categories.value = categoryOptions.value.filter((o) =>
            (p.category_ids ?? []).includes(o.value),
        );
        images.value = [...(p.images ?? [])];
        originalImages.value = [...(p.images ?? [])];
    }
}

function reset() {
    form.name = '';
    form.price = '';
    form.sku = '';
    form.uom = '';
    form.vat_included = true;
    form.description = '';
    categories.value = [];
    nutritionalFacts.value = null;
    images.value = [];
    originalImages.value = [];
    clearErrors();
}

function slugify(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function clearErrors() {
	for (const k of Object.keys(errors)) delete errors[k];
	generalError.value = '';
}

function fieldFromLoc(loc: unknown): string | null {
	if (!Array.isArray(loc)) return null;
	const last = loc[loc.length - 1];
	return typeof last === 'string' ? last : null;
}

function cleanMessage(msg: unknown): string {
	const text = typeof msg === 'string' ? msg : 'Invalid value';
	return text.replace(/^Value error,\s*/i, '');
}

function matchField(detail: string): string | null {
	const d = detail.toLowerCase();
	const matchers: Array<[string, RegExp]> = [
		['name', /name/],
		['price', /price/],
		['sku', /sku/],
		['uom', /uom|unit[_\\s]?measurement/],
		['vat_included', /vat/],
		['category_ids', /categor/],
		['description', /description/],
	];
	for (const [field, re] of matchers) {
		if (re.test(d)) return field;
	}
	return null;
}

function applyErrors(err: any) {
	clearErrors();

	const detail = err?.data?.detail;

	if (Array.isArray(detail)) {
		for (const item of detail) {
			const field = fieldFromLoc(item?.loc);
			if (field) errors[field] = cleanMessage(item?.msg);
		}
		return;
	}

	if (typeof detail === 'string') {
		const field = matchField(detail);
		if (field) errors[field] = cleanMessage(detail);
		else generalError.value = detail;
	}
}

async function resolveImageFiles(): Promise<File[]> {
	const files: File[] = [];
	for (const entry of images.value) {
		if (entry instanceof File) {
			files.push(entry);
		} else if (typeof entry === 'string') {
			// Existing image URL — re-fetch so it can be re-uploaded in place
			// (backend replaces the whole set on every upload).
			const res = await fetch(entry);
			if (!res.ok) continue;
			const blob = await res.blob();
			files.push(new File([blob], entry.split('/').pop() || 'image', { type: blob.type || 'image/jpeg' }));
		}
	}
	return files;
}

async function submit() {
	if (loading.value) return;
	clearErrors();

	// Images and nutritional facts are not uploaded here — the backend has no
	// upload endpoints yet. They're captured in `images` / `nutritionalFacts`
	// for when those endpoints land.
	const payload = {
		name: form.name.trim(),
		slug: slugify(form.name),
		description: form.description.trim() || null,
		sku: form.sku.trim(),
		price: form.price.trim().replace(/,/g, ''),
		uom: form.uom.trim() || null,
		vat_included: form.vat_included,
		category_ids: categories.value.map((c) => c.value),
	};

	loading.value = true;
	try {
		let productId: string | number;
		if (isEdit.value && props.product) {
			productId = props.product.id;
			await products.update(productId, payload);
		} else {
			const created = await products.store(payload);
			productId = created.id;
		}

		// Sync product images (front/back/side/any). The backend replaces the
		// whole set on upload, so on any change (add/remove/reorder) we re-upload
		// the full ordered list — re-fetching kept URLs back into Files.
		const imageChanged =
			images.value.length !== originalImages.value.length ||
			images.value.some((entry, i) => entry !== originalImages.value[i]);
		if (imageChanged) {
			const imageFiles = await resolveImageFiles();
			if (imageFiles.length) {
				await products.uploadImages(productId, imageFiles);
			}
		}
		if (nutritionalFacts.value) {
			await products.uploadNutritionalFacts(productId, nutritionalFacts.value);
		}

		success(isEdit.value ? 'Product updated successfully' : 'Product created successfully');
		emits('saved');
	} catch (e) {
		const status = (e as any)?.status;
		if (status === 400 || status === 422) {
			applyErrors(e);
		}
	} finally {
		loading.value = false;
	}
}
</script>
