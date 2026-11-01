<template>
	<forms-number-input 
		v-model="model"
		label="Mobile Input" 
		:base-class="baseClass"
		:error="error" 
		pre-label="+63"
		placeholder="e.g 9123456789"
		:max="10"
	/>
</template>

<script lang="ts" setup>
import type { NumberInput } from '~/types/forms/numberInput';

const props = withDefaults(defineProps<NumberInput>(), {
    placeholder: 'e.g 9662484132',
});

// The model holds the raw 10-digit value starting with 9 (e.g. "9123456789");
// the input shows the formatted "912 345 6789" with a static "+63" prefix.
const model = defineModel<string>({ default: '' });

</script>
