<template>
    <div class="w-[320px] flex flex-col gap-y-8 mt-4">
		<!-- Avatar (editable when `editable`) -->
		<div
			class="group relative self-center"
			:class="editable ? 'cursor-pointer' : ''"
			@click="editable && openPicker()"
		>
			<NuxtImg
				v-if="preview"
				:src="preview"
				height="210"
				width="210"
				class="rounded self-center object-cover"
			/>
			<div
				v-else-if="name"
				class="flex h-[210px] w-[210px] items-center justify-center rounded bg-primary text-5xl font-bold text-white"
			>
				{{ initials }}
			</div>
			<div
				v-else
				class="flex h-[210px] w-[210px] items-center justify-center rounded bg-lightGray"
			>
				<Icon name="boxicons:user-circle" class="size-16 text-darkGray" />
			</div>

			<div
				v-if="editable"
				class="absolute inset-0 flex items-center justify-center rounded bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
			>
				<Icon name="boxicons:camera" class="size-8 text-white" />
			</div>

			<input
				v-if="editable"
				ref="inputRef"
				type="file"
				accept="image/*"
				class="hidden"
				@change="onChange"
			/>
		</div>

		<div>
			<div v-for="test in tests" :class="[{'active': test.isActive}, 'flex items-center gap-x-3 px-4 py-2 mb-2 rounded cursor-pointer box']" >
				<Icon :name="test.icon" class="size-5" />
				<p >{{ test.label }}</p>
			</div>
		</div>

		<div v-if="$slots.footer" class="w-full mt-auto space-y-2">
			<slot name="footer" />
		</div>
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
	src?: string | null;
	name?: string;
	editable?: boolean;
}>(), {
	src: null,
	name: '',
	editable: false,
});

const emit = defineEmits<{ change: [file: File] }>();

const inputRef = ref<HTMLInputElement>();

const preview = ref<string | null>(props.src);

watch(() => props.src, (value) => {
	preview.value = value ?? null;
});

const initials = computed(() => {
	if (!props.name) return '';
	return props.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
});

function openPicker() {
	inputRef.value?.click();
}

function onChange(e: Event) {
	const input = e.target as HTMLInputElement;
	const file = input.files?.[0];
	if (!file) return;
	preview.value = URL.createObjectURL(file);
	emit('change', file);
	input.value = '';
}

const tests = [
	{
		icon: "boxicons:user-square",
		label: "Employee Information",
		isActive: true,
	},
	{
		icon: "boxicons:motion",
		label: "Activity Logs",
		isActive: false,
	},
	{
		icon: "boxicons:pie-chart-filled",
		label: "Analytics",
		isActive: false,
	},
];
</script>

<style>
.active {
	background-color: #F1F1F1;
	color: #6c2176;
}

.box:hover {
	background-color: #F1F1F1;
	color: #6c2176;
}
</style>
