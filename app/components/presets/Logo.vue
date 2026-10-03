<template>
    <img :src="src" alt="Logo" :width="width" :height="height">
</template>

<script lang="ts" setup>
import type { Logo } from '~/types/presets/logo';


withDefaults(defineProps<Logo>(), {
    width: 80,
    height: 80,
    src: 'logo.png',
});
</script>
