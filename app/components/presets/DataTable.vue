<template>
    <div :class="baseClass">
        <div class="overflow-hidden rounded border border-gray">
            <table class="w-full border-collapse bg-white">
                <thead>
                    <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <th
                            v-for="header in headerGroup.headers"
                            :key="header.id"
                            class="bg-lightGray px-3 py-2 text-left text-[10px] font-normal text-black select-none"
                            :class="{ 'cursor-pointer': header.column.getCanSort() }"
                            @click="header.column.toggleSorting()"
                        >
                            <div class="flex items-center gap-1">
                                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                                <Icon v-if="header.column.getIsSorted() === 'asc'" name="boxicons:chevron-up" class="size-3 text-black" />
                                <Icon v-else-if="header.column.getIsSorted() === 'desc'" name="boxicons:chevron-down" class="size-3 text-black" />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in table.getRowModel().rows" :key="row.id">
                        <td
                            v-for="cell in row.getVisibleCells()"
                            :key="cell.id"
                            class="px-3 py-2 text-[10px] font-normal text-black"
                        >
                            <FlexRender v-if="cell.column.columnDef.cell" :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            <span v-else>{{ cell.getValue() }}</span>
                        </td>
                    </tr>
                    <tr v-if="!table.getRowModel().rows.length">
                        <td :colspan="columns.length" class="px-3 py-8 text-center text-[10px] text-gray">No results found</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="pageCount > 1" class="mt-3 flex items-center justify-between gap-4">
            <div class="flex items-center gap-1">
                <button
                    type="button"
                    class="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    :disabled="!table.getCanPreviousPage()"
                    @click="table.firstPage()"
                >
                    <Icon name="boxicons:chevrons-left" class="size-4 text-primary" />
                </button>
                <button
                    type="button"
                    class="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()"
                >
                    <Icon name="boxicons:chevron-left" class="size-4 text-primary" />
                </button>
                <button
                    v-for="(n, i) in pageNumbers"
                    :key="i"
                    type="button"
                    class="h-6 min-w-6 cursor-pointer rounded px-1 text-xs font-bold disabled:cursor-not-allowed"
                    :class="n === pageIndex + 1 ? 'bg-primary text-white' : 'bg-white text-primary'"
                    :disabled="n === '...'"
                    @click="typeof n === 'number' && table.setPageIndex(n - 1)"
                >
                    {{ n }}
                </button>
                <button
                    type="button"
                    class="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    :disabled="!table.getCanNextPage()"
                    @click="table.nextPage()"
                >
                    <Icon name="boxicons:chevron-right" class="size-4 text-primary" />
                </button>
                <button
                    type="button"
                    class="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    :disabled="!table.getCanNextPage()"
                    @click="table.lastPage()"
                >
                    <Icon name="boxicons:chevrons-right" class="size-4 text-primary" />
                </button>
            </div>
            <span class="text-xs font-bold text-black">Showing {{ startRow }}–{{ endRow }} of {{ totalRows }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import {
    FlexRender,
    useVueTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/vue-table'
import type { DataTable } from '~/types/presets/dataTable'

const props = withDefaults(defineProps<DataTable>(), {
    columns: () => [],
    rows: () => [],
    pageSize: 10,
})

const columnDefs = props.columns.map((c) => ({
    accessorKey: c.key,
    header: c.label ?? c.key,
    ...(c.cell ? { cell: c.cell } : {}),
}))

const filteredRows = computed(() => {
    const q = (props.filter ?? '').trim().toLowerCase()
    if (!q) return props.rows
    return props.rows.filter((row) =>
        props.columns.some((c) => String(row[c.key] ?? '').toLowerCase().includes(q))
    )
})

const table = useVueTable({
    data: filteredRows,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: props.pageSize } },
})

const pageCount = computed(() => table.getPageCount())
const pageIndex = computed(() => table.getState().pagination.pageIndex)
const pageSize = computed(() => table.getState().pagination.pageSize)
const totalRows = computed(() => filteredRows.value.length)
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
