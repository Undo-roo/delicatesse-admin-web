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
                    <presets-dropdown
                        v-if="item.children?.length"
                        :items="item.children"
                        trigger="hover"
                    >
                        <template #trigger>
                            <span class="flex flex-col items-center gap-2">
                                <span class="flex items-center gap-1">
                                    <span class="text-[26px] font-medium uppercase leading-none text-white">{{ item.label }}</span>
                                    <Icon name="boxicons:chevron-down" class="size-4 text-white" />
                                </span>
                                <span v-if="isActive(item)" class="h-[2px] w-full bg-status-yellow" />
                            </span>
                        </template>
                    </presets-dropdown>

                    <NuxtLink
                        v-else-if="item.to"
                        :to="item.to"
                        class="flex flex-col items-center gap-2 no-underline"
                    >
                        <span class="text-[26px] font-medium uppercase leading-none text-white">{{ item.label }}</span>
                        <span v-if="isActive(item)" class="h-[2px] w-full bg-status-yellow" />
                    </NuxtLink>

                    <span v-else class="flex flex-col items-center gap-2">
                        <span class="text-[26px] font-medium uppercase leading-none text-white">{{ item.label }}</span>
                        <span v-if="isActive(item)" class="h-[2px] w-full bg-status-yellow" />
                    </span>
                </template>
            </nav>

            <!-- Profile + dropdown -->
            <!-- <presets-dropdown
                :items="profileItems"
                trigger="click"
                align="right"
                :panel-class="profilePanelClass"
                :item-class="profileItemClass"
                @select="onProfileSelect"
            >
                <template #trigger>
                    <span class="flex items-center gap-4">
                        <img
                            v-if="avatar"
                            :src="avatar"
                            :alt="name || 'Profile'"
                            class="h-14 w-14 rounded-full object-cover"
                        />
                        <Icon name="boxicons:chevron-down-circle-filled" class="size-6 text-white" />
                    </span>
                </template>
            </presets-dropdown> -->
        </div>
    </header>
</template>

<script lang="ts" setup>
import type { Header, HeaderNavItem } from '~/types/layout/header';
import type { DropdownItem } from '~/types/presets/dropdown';

withDefaults(defineProps<Header>(), {
    logo: '/logo.png',
    brand: 'Delicatesse',
    subtitle: 'Food Corporation',
    navItems: () => [
        { label: 'Home', to: '/admin' },
        {
            label: 'Manpower',
            children: [
                { label: 'Employee', to: '/admin/manpower/employees' },
                { label: 'Roles & Permissions', to: '/admin/manpower/roles' },
            ],
        },
        {
            label: 'External',
            children: [{ label: 'Client', to: '/admin/external/clients' }],
        },
        {
            label: 'Accounting',
            children: [{ label: 'Quickbook Integrations', to: '/admin/accounting/quickbooks' }],
        },
        {
            label: 'Transactions',
            children: [{ label: 'Orders', to: '/admin/transactions/orders' }],
        },
        {
            label: 'Assets',
            children: [
                { label: 'Products', to: '/admin/assets/products' },
                { label: 'Inventory', to: '/admin/assets/inventory' },
                { label: 'Trucks', to: '/admin/assets/trucks' },
            ],
        },
    ],
    profileItems: () => [
        { label: 'Profile' },
        { label: 'Settings' },
        { label: 'Logout' },
    ],
});

const route = useRoute();

const profilePanelClass = 'min-w-40 flex flex-col rounded bg-primary-700 p-4';
const profileItemClass = 'block w-full cursor-pointer py-1 text-left text-base font-medium uppercase text-white hover:opacity-80';

// An item is highlighted when the current route matches its own `to`
// (leaf links like Home) or any child's `to` (dropdown parents).
// Computed here — not in the props defaults — because `defineProps` is hoisted
// out of setup and cannot reference `route` (or any local variable).
function isActive(item: HeaderNavItem): boolean {
    if (item.active) return true;
    if (item.children?.length) {
        return item.children.some((child) => child.to && route.path.startsWith(child.to));
    }
    return !!item.to && route.path === item.to;
}

function onProfileSelect(item: DropdownItem) {
    // TODO: wire profile actions (logout, settings navigation…)
    console.log('profile action', item.label);
}
</script>
