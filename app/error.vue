<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
    error: NuxtError
}>()

const goHome = () => clearError({ redirect: '/' })
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center gap-6 bg-lightGray px-6 text-center">
        <div class="flex flex-col items-center gap-3">
            <span class="text-[64px] font-bold leading-none text-primary">{{ error.statusCode }}</span>
            <h1 class="text-xl font-semibold text-black">
                {{ error.statusMessage || 'Something went wrong' }}
            </h1>
            <p class="max-w-md text-sm text-darkGray">
                {{ error.message || 'An unexpected error has occurred. Please try again.' }}
            </p>
        </div>

        <forms-button text="Back to home" variant="default" @click="goHome" />
    </div>
</template>
