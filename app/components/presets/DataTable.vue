<template>
    <div :class="baseClass">
		<!-- Datatable -->
        <div class="overflow-hidden shadow-lg">
            <table class="w-full border-collapse bg-white">
                <thead>
                    <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <th
                            v-for="header in headerGroup.headers"
                            :key="header.id"
                            class="bg-primary py-3 px-4 text-left font-bold text-white select-none border-white border-r-1 first:rounded-tl last:rounded-tr"
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
                            class="bg-primary py-3 px-4 text-left text-sm font-bold text-white select-none border-white border-r-1 first:rounded-tl last:rounded-tr"
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
                            class="font-normal text-black p-5"
                        >
                            <FlexRender v-if="cell.column.columnDef.cell" :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            <span v-else>{{ cell.getValue() }}</span>
                        </td>
					
                        <td
                            class="font-normal text-black p-5"
                        >
							<div class="flex gap-x-2">
								<forms-button @click="emits('read')" pre-icon="boxicons:eye" variant="ghost" />
								<forms-button pre-icon="boxicons:trash-alt" variant="destructive" />
							</div>
                        </td>
                    </tr>
                    <tr v-if="!table.getRowModel().rows.length">
                        <td :colspan="columns.length" class="px-3 py-8 text-center text-[10px] text-gray">No results found</td>
                    </tr>
                </tbody>
            </table>
        </div>

		<presets-pagination
			:table="table"
			:perPage="pageSize"
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
  (e: 'read'): void
  (e: 'close'): void
}>()


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
</script>
