<template>
    <div>
        <!-- Breadcrumbs -->
        <div class="mb-4 flex items-center gap-2">
            <span class="text-[32px] font-bold leading-none text-gray">Products</span>
            <Icon name="boxicons:chevron-right" class="size-7 text-gray" />
            <span class="text-[32px] font-bold leading-none text-primary">Categories</span>
        </div>

        <!-- Search -->
        <forms-filter v-model="filter" placeholder="Search by Name" class="mb-4 max-w-md" />

        <!-- Table -->
        <presets-data-table :columns="columns" :rows="products" :filter="filter" :page-size="8" />
    </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import StatusPill from '~/components/formatters/StatusPill.vue';

definePageMeta({ layout: 'admin' });

const filter = ref('');

const variantMap: Record<string, string> = {
    'In Stock': 'green',
    'Low Stock': 'yellow',
    'Out of Stock': 'red',
};

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    {
        key: 'status',
        label: 'Status',
        cell: ({ row }: any) => h(StatusPill, {
            text: row.original.status,
            variant: variantMap[row.original.status] ?? 'default',
            showIcon: false,
        }),
    },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
];

const products = [
    { name: 'Emmental Cheese', category: 'Dairy', status: 'In Stock', price: '₱ 120', stock: 50 },
    { name: 'Prosciutto', category: 'Meat', status: 'Low Stock', price: '₱ 320', stock: 8 },
    { name: 'Baguette', category: 'Bakery', status: 'Out of Stock', price: '₱ 85', stock: 0 },
    { name: 'Olive Oil', category: 'Pantry', status: 'In Stock', price: '₱ 450', stock: 24 },
    { name: 'Truffle Honey', category: 'Pantry', status: 'In Stock', price: '₱ 780', stock: 12 },
    { name: 'Camembert', category: 'Dairy', status: 'Low Stock', price: '₱ 210', stock: 5 },
    { name: 'Sourdough', category: 'Bakery', status: 'In Stock', price: '₱ 140', stock: 30 },
    { name: 'Parmesan', category: 'Dairy', status: 'In Stock', price: '₱ 380', stock: 40 },
    { name: 'Salami', category: 'Meat', status: 'Out of Stock', price: '₱ 260', stock: 0 },
    { name: 'Balsamic Vinegar', category: 'Pantry', status: 'In Stock', price: '₱ 320', stock: 18 },
    { name: 'Fig Jam', category: 'Pantry', status: 'Low Stock', price: '₱ 195', stock: 6 },
    { name: 'Chorizo', category: 'Meat', status: 'In Stock', price: '₱ 290', stock: 22 },
    { name: 'Mozzarella', category: 'Dairy', status: 'In Stock', price: '₱ 160', stock: 35 },
    { name: 'Ciabatta', category: 'Bakery', status: 'In Stock', price: '₱ 95', stock: 28 },
    { name: 'Anchovies', category: 'Pantry', status: 'Out of Stock', price: '₱ 240', stock: 0 },
    { name: 'Pancetta', category: 'Meat', status: 'In Stock', price: '₱ 350', stock: 15 },
];
</script>
