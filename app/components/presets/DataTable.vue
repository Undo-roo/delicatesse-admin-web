<template>
    <div :class="baseClass">
		<!-- Datatable -->
        <div class="overflow-hidden shadow-lg" :class="{ 'opacity-50 pointer-events-none': isLoading }">
            <table class="w-full border-collapse bg-white">
                <thead>
                    <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <th
                            v-for="header in headerGroup.headers"
                            :key="header.id"
                            class="border-r-1 border-white bg-primary px-4 py-3 text-left text-sm font-bold text-white select-none first:rounded-tl last:rounded-tr"
                            :class="{ 'cursor-pointer': header.column.getCanSort() }"
                            @click="header.column.toggleSorting()"
                        >
                            <div class="flex items-center gap-1 text-sm">
                                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                                <Icon v-if="header.column.getIsSorted() === 'asc'" name="boxicons:chevron-up" class="size-3 text-white" />
                                <Icon v-else-if="header.column.getIsSorted() === 'desc'" name="boxicons:chevron-down" class="size-3 text-white" />
                            </div>
                        </th>
                        <th
							v-if="hasActions"
                            class="border-r-1 border-white bg-primary px-4 py-3 text-left text-sm font-bold text-white select-none first:rounded-tl last:rounded-tr"
                        >
							<FlexRender render="Actions" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in table.getRowModel().rows" class="odd:bg-white even:bg-lightGray" :key="row.id">
                        <td
                            v-for="cell in row.getVisibleCells()"
                            :key="cell.id"
                            class="p-5 font-normal text-black"
                        >
                            <FlexRender v-if="cell.column.columnDef.cell" :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            <span v-else>{{ cell.getValue() }}</span>
                        </td>
					
                        <td v-if="hasActions" class="p-5 font-normal text-black">
							<div class="flex gap-x-2">
								<forms-button v-if="!showRestore" @click="emits('read', row.original)" pre-icon="boxicons:eye" variant="outline" />
								<forms-button v-if="!showRestore" @click="emits('delete', row.original)" pre-icon="boxicons:trash-alt" variant="destructive" />
								<forms-button v-if="showRestore" @click="emits('restore', row.original)" pre-icon="boxicons:recycle" pre-icon-class="text-green-600" variant="outline" />
							</div>
                        </td>
                    </tr>
                    <tr v-if="!table.getRowModel().rows.length">
                        <td :colspan="columnsCount" class="px-3 py-8 text-center text-gray">No results found</td>
                    </tr>
                </tbody>
            </table>
        </div>

		<presets-pagination
			:page="paginationPage"
			:per-page="paginationPerPage"
			:total="paginationTotal"
			:total-pages="paginationTotalPages"
			@update:page="onPageChange"
		/>
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

const emits = defineEmits<{
    'update:page': [page: number];
    'read': [row: any];
    'delete': [row: any];
    'restore': [row: any];
}>()

const props = withDefaults(defineProps<DataTable>(), {
    columns: () => [],
    rows: () => [],
    pageSize: 10,
    serverSide: false,
    hasActions: true,
    showRestore: false,
})

const columnDefs = props.columns.map((c) => ({
    accessorKey: c.key,
    header: c.label ?? c.key,
    ...(c.cell ? { cell: c.cell } : {}),
}))

const columnsCount = computed(() => props.columns.length + +props.hasActions)

// Client-side filtering — only used when serverSide is false.
const filteredRows = computed(() => {
    if (props.serverSide) return props.rows
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
    manualPagination: props.serverSide,
    initialState: { pagination: { pageSize: props.pageSize } },
})

const paginationPage = computed(() =>
    props.serverSide ? (props.page ?? props.meta?.page ?? 1) : table.getState().pagination.pageIndex + 1,
)
const paginationPerPage = computed(() =>
    props.serverSide ? (props.meta?.per_page ?? props.pageSize) : table.getState().pagination.pageSize,
)
const paginationTotal = computed(() =>
    props.serverSide ? (props.meta?.total ?? 0) : filteredRows.value.length,
)
const paginationTotalPages = computed(() =>
    props.serverSide ? (props.meta?.total_pages ?? 0) : table.getPageCount(),
)

function onPageChange(p: number) {
    if (props.serverSide) emits('update:page', p)
    else table.setPageIndex(p - 1)
}
</script>
