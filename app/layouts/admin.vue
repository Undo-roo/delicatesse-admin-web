<template>
    <div>
        <div class="min-h-screen bg-[#F4F4F4]">
            <layout-header />
            <main class="h-[calc(100vh-160px)] overflow-y-scroll px-[42px] py-10">
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
</script>