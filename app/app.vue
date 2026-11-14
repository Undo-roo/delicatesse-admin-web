<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>

    <modals-toast
        v-model="toast.isOpen"
        :position="toast.position"
        :variant="toast.variant"
        :title="toast.title"
        :description="toast.description"
        :show-close="toast.showClose"
    />
</template>

<script setup lang="ts">
const { toast } = useToast()
</script>
