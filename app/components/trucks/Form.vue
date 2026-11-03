<template>
	<form class="w-full max-w-[640px]" @submit.prevent="submit">
		<p v-if="generalError" class="px-6 pt-2 text-error font-bold">{{ generalError }}</p>

		<div class="grid grid-cols-12 gap-x-4 gap-y-4 px-6 py-2">
			<div class="col-span-12">
				<forms-text-input
					v-model="form.plate_number"
					label="Plate Number"
					placeholder="ABC-1234"
					:error="errors.plate_number"
				/>
			</div>
			<div class="col-span-12 sm:col-span-6">
				<forms-text-input
					v-model="form.owned_at"
					label="Owned At"
					type="date"
					:error="errors.owned_at"
				/>
			</div>
			<div v-if="isEdit" class="col-span-12 sm:col-span-6">
				<forms-select
					v-model="status"
					:options="statusOptions"
					label="Status"
					placeholder="Select a status"
					:error="errors.status"
				/>
			</div>
		</div>

		<div class="mt-6 flex justify-end gap-3 px-6 py-4">
			<forms-button class="w-full" text="Discard Changes" variant="outline" @click="emits('cancel')" />
			<forms-button class="w-full" type="submit" pre-icon="boxicons:save" :text="isEdit ? 'Update Information' : 'Create Truck'" :disabled="loading" />
		</div>
	</form>
</template>

<script lang="ts" setup>
import type { Truck } from '~/types/assets/truck';
import type { SelectOption } from '~/types/forms/select';

const props = defineProps<{
    truck?: Truck | null;
    open?: boolean;
}>();

const emits = defineEmits<{
    'saved': [];
    'cancel': [];
}>();

const { trucks } = useApi();
const { success } = useToast();

const statusOptions: SelectOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'available', label: 'Available' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'defective', label: 'Defective' },
];

const form = reactive({
    plate_number: '',
    owned_at: '',
});

const status = ref<SelectOption>();
const loading = ref(false);
const errors = reactive<Record<string, string>>({});
const generalError = ref('');

const isEdit = computed(() => !!props.truck);

// Hydrate (reset + pre-fill) whenever the form becomes active. `immediate` covers
// the update case where the form mounts already-open (isUpdating === true).
watch(() => props.open, (isOpen) => {
    if (!isOpen) return;
    hydrate();
}, { immediate: true });

function hydrate() {
    reset();
    const t = props.truck;
    if (t) {
        form.plate_number = t.plate_number;
        form.owned_at = toISODate(t.owned_at);
        status.value = statusOptions.find((o) => o.value === t.status) ?? undefined;
    }
}

function reset() {
    form.plate_number = '';
    form.owned_at = '';
    status.value = undefined;
    clearErrors();
}

// The read model exposes `owned_at` in display form ("Jun 15, 2026"); a native
// <input type="date"> needs an ISO "YYYY-MM-DD" value to pre-fill.
function toISODate(display: string | undefined | null): string {
    if (!display) return '';
    const d = new Date(display);
    if (isNaN(d.getTime())) return display;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
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
        ['plate_number', /plate[_\\s]?number/],
        ['owned_at', /owned[_\\s]?at/],
        ['status', /status/],
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

async function submit() {
    if (loading.value) return;
    clearErrors();

    const payload = {
        plate_number: form.plate_number.trim(),
        owned_at: form.owned_at.trim() || undefined,
        status: status.value?.value,
    };

    loading.value = true;
    try {
        if (isEdit.value && props.truck) {
            await trucks.update(props.truck.id, payload);
        } else {
            await trucks.store(payload);
        }
        success(isEdit.value ? 'Truck updated successfully' : 'Truck created successfully');
        emits('saved');
    } catch (e) {
        // 400/422 are validation/business errors — surface them on the form,
        // not as a toast (the api:error plugin skips these statuses).
        const status = (e as any)?.status;
        if (status === 400 || status === 422) {
            applyErrors(e);
        }
    } finally {
        loading.value = false;
    }
}
</script>
