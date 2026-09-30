<template>
    <header class="w-full bg-primary-700">
        <div class="flex items-center justify-between gap-6 px-10 py-10">
            <!-- Logo + brand -->
            <div class="flex items-center gap-3">
                <img v-if="logo" :src="logo" :alt="brand" class="h-20 w-auto object-contain" />
                <div class="flex flex-col">
                    <span class="text-md font-bold uppercase leading-tight text-white">{{ brand }}</span>
                    <span v-if="subtitle" class="text-md font-bold uppercase leading-tight text-white">{{ subtitle }}</span>
                </div>
            </div>

            <!-- Primary navigation -->
            <nav class="flex items-center gap-10">
                <template v-for="(item, i) in navItems" :key="i">
                    <NuxtLink
                        v-if="item.to"
                        :to="item.to"
                        class="flex flex-col items-center gap-2 no-underline"
                    >
                        <span class="text-[26px] font-medium uppercase leading-none text-white">{{ item.label }}</span>
                        <span v-if="item.active" class="h-[2px] w-full bg-status-yellow" />
                    </NuxtLink>
                    <span v-else class="flex flex-col items-center gap-2">
                        <span class="text-[26px] font-medium uppercase leading-none text-white">{{ item.label }}</span>
                        <span v-if="item.active" class="h-[2px] w-full bg-status-yellow" />
                    </span>
                </template>
            </nav>

            <!-- Profile -->
            <div class="flex items-center gap-4">
                <img
                    v-if="avatar"
                    :src="avatar"
                    :alt="name || 'Profile'"
                    class="h-14 w-14 rounded-full object-cover"
                />
                <Icon name="boxicons:chevron-down-circle-filled" class="size-6 text-white" />
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import type { Header } from '~/types/layout/header';

withDefaults(defineProps<Header>(), {
    brand: 'Delicatesse',
    subtitle: 'Food Corporation',
    navItems: () => [
        { label: 'Home' },
        { label: 'Manpower', active: true },
        { label: 'External' },
        { label: 'Accounting' },
        { label: 'Transactions' },
        { label: 'Assets' },
    ],
});
</script>
