<template>
    <div class="px-2 py-5 w-full">
        <h1 class="!mb-12">Project UI Components</h1>

        <div class="bg-primary-700 px-2 py-5 mb-8">
            <h2 class="text-white my-auto">INPUT</h2>
        </div>

        <div class="mb-4">
            <h3 >Text Input</h3>

            <div class="grid grid-cols-3 mt-4 gap-4">
                <div @focusin="isFocused = true" @focusout="isFocused = false">
                    <forms-text-input :label="textInputLbl" ref="textInputOne" />
                </div>
                <forms-text-input label="Error State" error="Error text here" />
                <forms-text-input label="Disabled State" disabled />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const isFocused = ref(false);

const textInputLbl = computed(() => {
    return isFocused.value ? "Active State" : "Inactive State";
});

</script>