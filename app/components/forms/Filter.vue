<template>
    <div :class="baseClass">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <!-- Tab filter -->
            <div v-if="tabs?.length" class="flex flex-wrap items-center gap-2">
                <button
                    v-for="t in tabs"
                    :key="t.value"
                    type="button"
                    class="cursor-pointer rounded-full px-5 py-2 text-sm font-bold transition-colors"
                    :class="tab === t.value ? 'bg-primary text-white' : 'bg-lightGray text-darkGray hover:bg-gray'"
                    @click="emit('update:tab', t.value)"
                >
                    {{ t.label }}
                </button>
            </div>

            <!-- Search + buttons -->
            <div class="flex flex-1 gap-x-4">
                <div class="flex min-h-[40px] flex-1 items-center gap-4 rounded-lg bg-white px-3 shadow">
                    <Icon name="boxicons:search" class="size-8 flex-shrink-0 text-primary" />
                    <input
                        type="text"
                        v-model="query"
                        :placeholder="placeholder"
                        :disabled="disabled"
                        class="h-15 min-w-0 flex-1 font-bold text-black outline-none placeholder:text-gray disabled:cursor-not-allowed"
                        @keyup.enter="onSearch"
                    />
                    <button v-if="query" type="button" class="flex-shrink-0 cursor-pointer disabled:cursor-not-allowed" :disabled="disabled" @click="onClear">
                        <Icon name="boxicons:x" class="size-4 text-darkGray" />
                    </button>
                </div>

                <forms-button class="min-h-[60px] w-[125px] text-sm" text="Search" @click="onSearch" />
                <forms-button class="min-h-[60px] w-[125px] text-sm" variant="ghost" text="Clear" :disabled="!query" @click="onClear" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Filter } from '~/types/forms/filter';

withDefaults(defineProps<Filter>(), {
    placeholder: 'Search',
    tabs: () => [],
});

const emit = defineEmits<{
    'update:tab': [value: string];
    'search': [query: string];
    'clear': [];
}>();

const query = defineModel<string>({ default: '' });

function onSearch() {
    emit('search', query.value);
}

function onClear() {
    query.value = '';
    emit('clear');
}
</script>
