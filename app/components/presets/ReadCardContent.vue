<template>
	<div>
		<label class="text-gray font-bold" :for="'card-'+label">{{ label }}</label>
		<slot>
        	<p class="font-bold">{{ content }}</p>
		</slot>
	</div>
</template>

<script lang="ts" setup>
interface ReadCardContent {
	label: string;
	content?: string;
}

withDefaults(defineProps<ReadCardContent>(), {
	
});
</script>
