<template>
	<form class="w-full max-w-[640px]" @submit.prevent="submit">
		<p v-if="generalError" class="px-6 pt-2 text-error font-bold">{{ generalError }}</p>

		<div class="grid grid-cols-12 gap-x-4 gap-y-4 px-6 py-2">
			<div class="col-span-12 sm:col-span-6">
				<forms-text-input
					v-model="form.company"
					label="Company"
					placeholder="Delicatesse Inc."
					:error="errors.company"
				/>
			</div>
			<div class="col-span-12 sm:col-span-6">
				<forms-text-input
					v-model="form.point_person"
					label="Point Person"
					placeholder="Juan Dela Cruz"
					:error="errors.point_person"
				/>
			</div>
			<div class="col-span-12 sm:col-span-6">
				<forms-mobile-input
					v-model="form.contact_information"
					label="Mobile Number"
					:error="errors.contact_information"
				/>
			</div>
			<div class="col-span-12 sm:col-span-6">
				<forms-text-input
					v-model="form.email"
					label="Email"
					type="email"
					placeholder="juan@delicatesse.co"
					:error="errors.email"
				/>
			</div>
		</div>

		<div class="mt-6 flex justify-end gap-3 border-t border-lightGray px-6 py-4">
			<forms-button text="Discard Changes" variant="outline" @click="emits('cancel')" />
			<forms-button type="submit" pre-icon="boxicons:save" :text="isEdit ? 'Update Information' : 'Create Client'" :disabled="loading" />
		</div>
	</form>
</template>

<script lang="ts" setup>
import type { Client } from '~/types/external/client';

const props = defineProps<{
    client?: Client | null;
    open?: boolean;
}>();

const emits = defineEmits<{
    'saved': [];
    'cancel': [];
}>();

const { clients } = useApi();
const { success } = useToast();

const form = reactive({
    company: '',
    point_person: '',
    contact_information: '',
    email: '',
});

const loading = ref(false);
const errors = reactive<Record<string, string>>({});
const generalError = ref('');

const isEdit = computed(() => !!props.client);

// Hydrate (reset + pre-fill) whenever the form becomes active.
watch(() => props.open, (isOpen) => {
    if (!isOpen) return;
    hydrate();
}, { immediate: true });

function hydrate() {
    reset();
    const c = props.client;
    if (c) {
        form.company = c.company;
        form.point_person = c.point_person;
        form.contact_information = c.contact_information;
        form.email = c.email;
    }
}

function reset() {
    form.company = '';
    form.point_person = '';
    form.contact_information = '';
    form.email = '';
    clearErrors();
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
        ['company', /company/],
        ['point_person', /point[_\s]?person/],
        ['contact_information', /contact[_\s]?information|\bcontact\b/],
        ['email', /email/],
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
        company: form.company.trim(),
        point_person: form.point_person.trim(),
        contact_information: form.contact_information.trim(),
        email: form.email.trim(),
    };

    loading.value = true;
    try {
        if (isEdit.value && props.client) {
            await clients.update(props.client.id, payload);
        } else {
            await clients.store(payload);
        }
        success(isEdit.value ? 'Client updated successfully' : 'Client created successfully');
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
