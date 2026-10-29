<template>
	<presets-read-sidebar>
	</presets-read-sidebar>

	<form class="w-full max-w-[640px]" @submit.prevent="submit">
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
	</form>
</template>

<script lang="ts" setup>
import type { Employee } from '~/types/manpower/employees';
import type { SelectOption } from '~/types/forms/select';

const props = defineProps<{
    employee?: Employee | null;
}>();

const emits = defineEmits<{
    'saved': [];
    'cancel': [];
}>();

const { employees } = useApi();
const { data: roles } = useRoles();
const { success, error } = useToast();

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

const isEdit = computed(() => !!props.employee);

watch(open, (isOpen) => {
    if (!isOpen) return;
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
});

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
        open.value = false;
        emit('saved');
    } catch (e) {
        // 422 validation errors are skipped by the api:error plugin — surface them here.
        const status = (e as any)?.status;
        if (status === 422) {
            const detail = (e as any)?.data?.detail;
            error(typeof detail === 'string' ? detail : 'Please check your inputs.');
        }
        // other statuses are already toasted by the api:error plugin
    } finally {
        loading.value = false;
    }
}
</script>
