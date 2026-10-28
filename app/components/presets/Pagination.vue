<template>
    <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between gap-4 px-2">
        <div class="flex items-center gap-1">
            <button
                type="button"
                class="flex cursor-pointer items-center justify-center rounded bg-white px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="!canPrev"
                @click="goTo(1)"
            >
                <Icon name="boxicons:chevrons-left" class="size-6 text-primary" />
            </button>
            <button
                type="button"
                class="flex cursor-pointer items-center justify-center rounded bg-white px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="!canPrev"
                @click="goTo(page - 1)"
            >
                <Icon name="boxicons:chevron-left" class="size-6 text-primary" />
            </button>
            <button
                v-for="(n, i) in pageNumbers"
                :key="i"
                type="button"
                class="cursor-pointer rounded px-3 py-1 font-bold disabled:cursor-not-allowed"
                :class="n === page ? 'bg-primary text-white' : 'bg-white text-primary'"
                :disabled="n === '...'"
                @click="typeof n === 'number' && goTo(n)"
            >
                {{ n }}
            </button>
            <button
                type="button"
                class="flex cursor-pointer items-center justify-center rounded bg-white px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="!canNext"
                @click="goTo(page + 1)"
            >
                <Icon name="boxicons:chevron-right" class="size-6 text-primary" />
            </button>
            <button
                type="button"
                class="flex cursor-pointer items-center justify-center rounded bg-white px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="!canNext"
                @click="goTo(totalPages)"
            >
                <Icon name="boxicons:chevrons-right" class="size-6 text-primary" />
            </button>
        </div>
        <span class="font-bold text-black">Showing {{ startRow }} – {{ endRow }} of {{ total }}</span>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { Pagination } from '~/types/presets/pagination';

const props = withDefaults(defineProps<Pagination>(), {
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 0,
});

const emit = defineEmits<{ 'update:page': [page: number] }>();

const canPrev = computed(() => props.page > 1);
const canNext = computed(() => props.page < props.totalPages);
const startRow = computed(() => (props.total === 0 ? 0 : (props.page - 1) * props.perPage + 1));
const endRow = computed(() => Math.min(props.page * props.perPage, props.total));

function goTo(p: number) {
    if (p < 1 || p > props.totalPages || p === props.page) return;
    emit('update:page', p);
}

const pageNumbers = computed<(number | '...')[]>(() => {
    const total = props.totalPages;
    const current = props.page;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push('...');
    pages.push(total);
    return pages;
});
</script>
