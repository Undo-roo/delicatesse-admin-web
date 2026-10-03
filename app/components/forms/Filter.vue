<template>
    <div :class="baseClass">
		<div class="flex gap-x-4">
			<div class="flex-1 flex min-h-[40px] items-center gap-4 rounded-lg bg-white px-3 rounded shadow">
				<Icon name="boxicons:search" class="size-8 flex-shrink-0 text-primary" />
				<input
					type="text"
					v-model="query"
					:placeholder="placeholder"
					:disabled="disabled"
					class="min-w-0 flex-1 outline-none font-bold text-black placeholder:text-gray disabled:cursor-not-allowed h-15"
				/>
				<button v-if="query" type="button" class="flex-shrink-0 cursor-pointer disabled:cursor-not-allowed" :disabled="disabled" @click="query = ''">
					<Icon name="boxicons:x" class="size-4 text-darkGray" />
				</button>
			</div>

			<forms-button class="text-sm min-h-[60px] w-[125px]" text="Search" />
			<forms-button class="text-sm min-h-[60px] w-[125px]" variant="ghost" text="Clear" :disabled="!query" />
		</div>
    </div>
</template>

<script lang="ts" setup>
import type { Filter } from '~/types/forms/filter';

withDefaults(defineProps<Filter>(), {
    placeholder: 'Search',
});

const query = defineModel<string>({ default: '' });
</script>
