<template>
	<presets-read-sidebar>
		<template #avatar>
			<forms-avatar-input editable />
		</template>
	</presets-read-sidebar>

	<trucks-form
		:open="open"
		@saved="emits('saved')"
		@cancel="emits('cancel')"
	/>
</template>

<script lang="ts" setup>
defineProps<{ open?: boolean }>();

const emits = defineEmits<{
    'saved': [];
    'cancel': [];
}>();
</script>
