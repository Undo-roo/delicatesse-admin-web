<template>
    <span class="inline-flex items-center gap-2 px-1 py-2">
		<span class="text-gray font-bold">+63</span>
        <span >{{ number }}</span>
    </span>
</template>

<script lang="ts" setup>
defineProps<{
	number: string;
}>()
</script>
