<template>
	<form class="w-full px-6 py-2" @submit.prevent="submit">
		<div class="max-w-[640px]">
			<p v-if="generalError" class="px-6 pt-2 text-error font-bold">{{ generalError }}</p>

			<div class="grid grid-cols-12 gap-x-4 gap-y-4 px-6 py-2">
				<div class="col-span-12 sm:col-span-6">
					<forms-text-input
						v-model="form.first_name"
						label="First Name"
						placeholder="Juan"
						:error="errors.first_name"
					/>
				</div>
				<div class="col-span-12 sm:col-span-6">
					<forms-text-input
						v-model="form.last_name"
						label="Last Name"
						placeholder="Dela Cruz"
						:error="errors.last_name"
					/>
				</div>
				<div class="col-span-12">
					<forms-text-input
						v-model="form.email"
						label="Email"
						type="email"
						placeholder="juan.delacruz@delicatesse.ph"
						:error="errors.email"
					/>
				</div>
				<div class="col-span-12 sm:col-span-6">
					<forms-text-input
						v-model="form.mobile_number"
						label="Mobile Number"
						placeholder="9123456789"
						:error="errors.mobile_number"
					/>
				</div>
				<div class="col-span-12 sm:col-span-6">
					<forms-text-input
						v-model="form.date_hired"
						label="Date Hired"
						type="date"
						:error="errors.date_hired"
					/>
				</div>
				<div class="col-span-12">
					<forms-select
						v-model="role"
						:options="roleOptions"
						label="Role"
						placeholder="Select a role"
						:error="errors.role_id"
					/>
				</div>
			</div>

			<div class="mt-6 flex justify-end gap-3 border-t border-lightGray px-6 py-4">
				<forms-button text="Discard Changes" variant="outline" @click="emits('cancel')" />
				<forms-button type="submit" pre-icon="boxicons:save" :text="isEdit ? 'Update Information' : 'Create Employee'" :disabled="loading" />
			</div>
		</div>
	</form>
</template>

<script lang="ts" setup>
import type { Employee } from '~/types/manpower/employees';
import type { SelectOption } from '~/types/forms/select';

const props = defineProps<{
    employee?: Employee | null;
    open?: boolean;
}>();

const emits = defineEmits<{
    'saved': [];
    'cancel': [];
}>();

const { employees } = useApi();
const { data: roles } = useRoles();
const { success } = useToast();

const roleOptions = computed<SelectOption[]>(() =>
    (roles.value ?? []).map((r) => ({ value: r.id, label: r.name })),
);

const form = reactive({
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    date_hired: '',
});

const role = ref<SelectOption>();
const loading = ref(false);
const errors = reactive<Record<string, string>>({});
const generalError = ref('');

const isEdit = computed(() => !!props.employee);

// Hydrate (reset + pre-fill) whenever the form becomes active. `immediate` covers
// the update case where the form mounts already-open (isUpdating === true).
watch(() => props.open, (isOpen) => {
    if (!isOpen) return;
    hydrate();
}, { immediate: true });

function hydrate() {
    reset();
    const e = props.employee;
    if (e) {
        form.first_name = e.first_name;
        form.last_name = e.last_name;
        form.email = e.email;
        form.mobile_number = e.mobile_number ?? '';
        form.date_hired = e.date_hired ?? '';
        // The read model exposes the role NAME; map it back to an option value (id).
        role.value = roleOptions.value.find((o) => o.label === e.role) ?? undefined;
    }
}

function reset() {
    form.first_name = '';
    form.last_name = '';
    form.email = '';
    form.mobile_number = '';
    form.date_hired = '';
    role.value = undefined;
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
    // Pydantic v2 prefixes field_validator ValueErrors with "Value error, ".
    return text.replace(/^Value error,\s*/i, '');
}

function matchField(detail: string): string | null {
    const d = detail.toLowerCase();
    const matchers: Array<[string, RegExp]> = [
        ['first_name', /first[_\s]?name/],
        ['last_name', /last[_\s]?name/],
        ['mobile_number', /mobile[_\s]?number/],
        ['date_hired', /date[_\s]?hired/],
        ['email', /email/],
        ['role_id', /role/],
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
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        mobile_number: form.mobile_number.trim() || undefined,
        date_hired: form.date_hired.trim() || undefined,
        role_id: role.value?.value,
    };

    loading.value = true;
    try {
        if (isEdit.value && props.employee) {
            await employees.update(props.employee.id, payload);
        } else {
            await employees.store(payload);
        }
        success(isEdit.value ? 'Employee updated successfully' : 'Employee created successfully');
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
