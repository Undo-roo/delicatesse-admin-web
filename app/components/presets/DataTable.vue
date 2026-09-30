<template>
    <div class="overflow-hidden rounded border border-gray">
        <table class="w-full border-collapse bg-white">
            <thead>
                <tr>
                    <th
                        v-for="col in columns"
                        :key="col.key"
                        class="bg-lightGray px-3 py-2 text-left text-[10px] font-normal text-black"
                    >
                        {{ col.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) in rows" :key="i">
                    <td
                        v-for="col in columns"
                        :key="col.key"
                        class="px-3 py-2 text-[10px] font-normal text-black"
                    >
                        {{ row[col.key] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import type { DataTable } from '~/types/presets/dataTable';

withDefaults(defineProps<DataTable>(), {
    columns: () => [],
    rows: () => [],
});
</script>
