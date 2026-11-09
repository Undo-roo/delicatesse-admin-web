<template>
	<div :class="[
		'grid grid-cols-12 max-w-[640px] gap-y-4',
		{
			'bg-gray/15 rounded p-2': variant === 'secondary'
		}
	]">
		<slot />
	</div>
</template>

<script lang="ts" setup>
interface ReadCardProps {
	variant?: 'default' | 'secondary'
}

withDefaults(defineProps<ReadCardProps>(), {
	variant: 'default'
});
</script>
