<template>
    <header class="w-full bg-primary-700 shadow">
        <div class="flex items-center justify-between gap-4 px-6 py-6 lg:gap-6 lg:px-10 lg:py-10">
            <!-- Logo + brand -->
            <div class="flex shrink-0 items-center gap-3">
                <img v-if="logo" :src="logo" :alt="brand" class="h-12 w-auto object-contain lg:h-20" />
                <div class="flex flex-col">
                    <span class="text-base font-bold uppercase leading-tight text-white lg:text-md">{{ brand }}</span>
                    <span v-if="subtitle" class="text-base font-bold uppercase leading-tight text-white lg:text-md">{{ subtitle }}</span>
                </div>
            </div>

            <!-- Hamburger toggle (shown below lg) -->
            <button
                type="button"
                class="cursor-pointer text-white lg:hidden"
                :aria-expanded="open"
                aria-label="Toggle navigation"
                @click="open = !open"
            >
                <Icon :name="open ? 'boxicons:x' : 'boxicons:menu'" class="size-8" />
            </button>

            <!-- Desktop navigation (lg and up) -->
            <nav class="hidden items-center gap-5 lg:flex xl:gap-10">
                <template v-for="(item, i) in navItems" :key="i">
                    <presets-dropdown
                        v-if="item.children?.length"
                        :items="item.children"
                        trigger="hover"
                    >
                        <template #trigger>
                            <span class="flex flex-col items-center gap-2">
                                <span class="flex items-center gap-1">
                                    <span class="text-lg font-medium uppercase leading-none text-white xl:text-[26px]">{{ item.label }}</span>
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
                        <span class="text-lg font-medium uppercase leading-none text-white xl:text-[26px]">{{ item.label }}</span>
                        <span v-if="isActive(item)" class="h-[2px] w-full bg-status-yellow" />
                    </NuxtLink>

                    <span v-else class="flex flex-col items-center gap-2">
                        <span class="text-lg font-medium uppercase leading-none text-white xl:text-[26px]">{{ item.label }}</span>
                        <span v-if="isActive(item)" class="h-[2px] w-full bg-status-yellow" />
                    </span>
                </template>
            </nav>
        </div>

        <!-- Mobile collapsible sidebar (below lg) -->
        <nav
            v-if="open"
            class="flex flex-col gap-1 border-t border-white/10 bg-primary-800 px-6 py-4 lg:hidden"
        >
            <template v-for="(item, i) in navItems" :key="i">
                <template v-if="item.children?.length">
                    <p class="mt-2 px-1 text-sm font-bold uppercase tracking-wide text-white/50">
                        {{ item.label }}
                    </p>
                    <NuxtLink
                        v-for="child in item.children"
                        :key="child.to"
                        :to="child.to"
                        class="rounded px-3 py-2 text-base font-medium text-white hover:bg-white/10"
                        @click="open = false"
                    >
                        {{ child.label }}
                    </NuxtLink>
                </template>
                <NuxtLink
                    v-else-if="item.to"
                    :to="item.to"
                    class="rounded px-3 py-2 text-base font-medium text-white hover:bg-white/10"
                    @click="open = false"
                >
                    {{ item.label }}
                </NuxtLink>
            </template>
        </nav>
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

const open = ref(false);

// Close the drawer whenever the route changes (navigation from within it).
watch(() => route.path, () => {
    open.value = false;
});

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
