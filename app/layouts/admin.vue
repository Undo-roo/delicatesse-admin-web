<template>
    <div>
        <div class="min-h-screen bg-[#F4F4F4]">
            <layout-header />
            <main class="h-[calc(100vh-160px)] overflow-y-scroll px-[42px] py-10">
                <!-- Page header: breadcrumbs + actions on top, filter/tabs underneath -->
                <div v-if="hasHeader" class="flex w-full flex-col gap-4">
                    <div v-if="breadcrumbs.length || $slots.actions" class="flex w-full items-center justify-between gap-x-10">
                        <div v-if="breadcrumbs.length" class="flex gap-x-2 text-3xl font-bold items-center text-gray">
                            <template v-for="(crumb, index) in breadcrumbs" :key="index">
                                <p :class="index === breadcrumbs.length - 1 ? 'text-primary' : ''">{{ crumb }}</p>
                                <Icon v-if="index < breadcrumbs.length - 1" name="boxicons:chevron-right-filled" class="size-12" />
                            </template>
                        </div>

                    </div>

                    <div v-if="$slots.filter">
                        <slot name="filter" />
                    </div>
                </div>

                <slot />
            </main>
        </div>

        <modals-toast
            v-model="toast.isOpen"
            :position="toast.position"
            :variant="toast.variant"
            :title="toast.title"
            :description="toast.description"
            :show-close="toast.showClose"
        />
    </div>
</template>

<script setup lang="ts">
const { toast } = useToast()

const props = withDefaults(defineProps<{ breadcrumbs?: string[] }>(), {
    breadcrumbs: () => [],
})

const slots = useSlots()
const hasHeader = computed(() => props.breadcrumbs.length > 0 || Boolean(slots.filter || slots.actions))
</script>
