<template>
    <div class="overflow-x-auto rounded-md border border-black/10 bg-white">
        <table class="w-full border-collapse text-left">
            <thead>
                <tr>
                    <th
                        class="border border-white bg-primary px-5 py-3 text-base font-bold text-white"
                        :class="stickyClass(0, true)"
                        :style="stickyStyle(0)"
                    >
                        {{ rowHeaderLabel }}
                    </th>
                    <th
                        v-for="(col, r) in columns"
                        :key="col.id"
                        class="border border-white bg-primary px-5 py-3 text-center text-base font-bold text-white"
                        :class="stickyClass(1 + r, true)"
                        :style="stickyStyle(1 + r)"
                    >
                        {{ col.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(perm, i) in permissions" :key="perm.id">
                    <td
                        class="border-t border-black/10 px-5 py-3 align-top"
                        :class="[rowBg(i), stickyClass(0)]"
                        :style="stickyStyle(0)"
                    >
                        <p class="text-base font-bold text-black">{{ perm.name }}</p>
                        <p v-if="perm.description" class="text-base font-normal text-black">
                            {{ perm.description }}
                        </p>
                    </td>
                    <td
                        v-for="(col, r) in columns"
                        :key="col.id"
                        class="border-t border-black/10 px-5 py-3"
                        :class="rowBg(i)"
                        :style="stickyStyle(1 + r)"
                    >
                        <div class="flex justify-center">
                            <forms-toggle
                                shape="square"
                                :icon="matrix[col.id]?.[perm.id] ? 'boxicons:lock' : 'boxicons:lock-open'"
                                :model-value="!!matrix[col.id]?.[perm.id]"
                                @update:model-value="(val) => emit('toggle', col.id, perm.id, val)"
                            />
                        </div>
                    </td>
                </tr>
                <tr v-if="!permissions.length">
                    <td :colspan="columns.length + 1" class="px-5 py-10 text-center text-base text-gray">
                        No permissions found
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import type { Permission } from '~/types/manpower/roles';
import type { MatrixColumn } from '~/types/presets/permissionMatrix';

const props = withDefaults(defineProps<{
    permissions: Permission[];
    columns: MatrixColumn[];
    matrix: Record<number, Record<number, boolean>>;
    rowHeaderLabel?: string;
    rowHeaderWidth?: number;
    rowHeaderFrozen?: boolean;
    defaultColumnWidth?: number;
}>(), {
    rowHeaderLabel: 'Permissions',
    rowHeaderWidth: 320,
    rowHeaderFrozen: true,
    defaultColumnWidth: 320,
});

const emit = defineEmits<{ toggle: [roleId: number, permId: number, value: boolean] }>();

// Width of the column at the given 0-based index (0 = row header, 1.. = columns).
function colWidth(colIndex: number): number {
    if (colIndex === 0) return props.rowHeaderWidth;
    return props.columns[colIndex - 1]?.width ?? props.defaultColumnWidth;
}

function isFrozen(colIndex: number): boolean {
    if (colIndex === 0) return props.rowHeaderFrozen;
    return props.columns[colIndex - 1]?.frozen ?? false;
}

// Highest frozen column index — used to draw the separator on the frozen edge.
const lastFrozenIndex = computed(() => {
    let last = props.rowHeaderFrozen ? 0 : -1;
    props.columns.forEach((c, r) => {
        if (c.frozen) last = 1 + r;
    });
    return last;
});

// Cumulative left offset so each frozen column stacks after the previous one.
function frozenLeft(colIndex: number): number {
    let offset = 0;
    for (let i = 0; i < colIndex; i++) offset += colWidth(i);
    return offset;
}

// Frozen columns get a FIXED width (keeps the left offset exact) + a left pin.
// Non-frozen columns keep a min-width so they can grow and scroll.
function stickyStyle(colIndex: number): Record<string, string> {
    const width = colWidth(colIndex);
    if (isFrozen(colIndex)) {
        return { left: `${frozenLeft(colIndex)}px`, width: `${width}px` };
    }
    return { minWidth: `${width}px` };
}

function stickyClass(colIndex: number, header = false): string {
    if (!isFrozen(colIndex)) return '';
    const z = header ? 'z-20' : 'z-10';
    const edge = colIndex === lastFrozenIndex.value ? 'border-r border-r-black/20' : '';
    return `sticky ${z} ${edge}`.trim();
}

function rowBg(i: number): string {
    return i % 2 ? 'bg-[#FBFBFB]' : 'bg-white';
}
</script>
