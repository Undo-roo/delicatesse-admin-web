<template>
    <div class="w-[320px] flex flex-col gap-y-8 mt-4">

		<div v-if="$slots.avatar" class="self-center">
			<slot name="avatar" />
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
