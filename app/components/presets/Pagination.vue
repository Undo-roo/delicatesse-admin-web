<template>
	<div v-if="pageCount > 1" class="mt-6 flex items-center justify-between gap-4 px-2">
		<div class="flex items-center gap-1">
			<button
				type="button"
				class="flex px-2 py-1 cursor-pointer items-center justify-center rounded bg-white disabled:cursor-not-allowed disabled:opacity-40"
				:disabled="!table.getCanPreviousPage()"
				@click="table.firstPage()"
			>
				<Icon name="boxicons:chevrons-left" class="size-6 text-primary" />
			</button>
			<button
				type="button"
				class="flex px-2 py-1 cursor-pointer items-center justify-center rounded bg-white disabled:cursor-not-allowed disabled:opacity-40"
				:disabled="!table.getCanPreviousPage()"
				@click="table.previousPage()"
			>
				<Icon name="boxicons:chevron-left" class="size-6 text-primary" />
			</button>
			<button
				v-for="(n, i) in pageNumbers"
				:key="i"
				type="button"
				class="px-3 py-1 cursor-pointer rounded font-bold disabled:cursor-not-allowed"
				:class="n === pageIndex + 1 ? 'bg-primary text-white' : 'bg-white text-primary'"
				:disabled="n === '...'"
				@click="typeof n === 'number' && table.setPageIndex(n - 1)"
			>
				{{ n }}
			</button>
			<button
				type="button"
				class="flex px-2 py-1 cursor-pointer items-center justify-center rounded bg-white disabled:cursor-not-allowed disabled:opacity-40"
				:disabled="!table.getCanNextPage()"
				@click="table.nextPage()"
			>
				<Icon name="boxicons:chevron-right" class="size-6 text-primary" />
			</button>
			<button
				type="button"
				class="flex px-2 py-1 cursor-pointer items-center justify-center rounded bg-white disabled:cursor-not-allowed disabled:opacity-40"
				:disabled="!table.getCanNextPage()"
				@click="table.lastPage()"
			>
				<Icon name="boxicons:chevrons-right" class="size-6 text-primary" />
			</button>
		</div>
		<span class="font-bold text-black">Showing {{ startRow }} – {{ endRow }} of {{ totalRows }}</span>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
	table: any;
	perPage: number;
}>();

// page, perPage, totalPage, 

const pageCount = computed(() => props.table.getPageCount())
const pageIndex = computed(() => props.table.getState().pagination.pageIndex)
const pageSize = computed(() => props.table.getState().pagination.pageSize)
const totalRows = computed(() => props.perPage ?? 25)
const startRow = computed(() => (totalRows.value === 0 ? 0 : pageIndex.value * pageSize.value + 1))
const endRow = computed(() => Math.min((pageIndex.value + 1) * pageSize.value, totalRows.value))

const pageNumbers = computed<(number | '...')[]>(() => {
    const total = pageCount.value
    const current = pageIndex.value + 1
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    const pages: (number | '...')[] = [1]
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    if (start > 2) pages.push('...')
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < total - 1) pages.push('...')
    pages.push(total)
    return pages
})
</script>
