<template>
	<presets-read-sidebar>
	</presets-read-sidebar>

	<employees-form
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
