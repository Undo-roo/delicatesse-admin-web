<template>
    <div class="px-2 py-5 w-full">
        <h1 class="!mb-12">Project UI Components</h1>

        <!-- INPUT -->
        <div class="bg-primary-700 px-2 py-5 mb-8">
            <h2 class="text-white my-auto">INPUT</h2>
        </div>

        <!-- Text Input -->
        <div class="mb-4">
            <h3>Text Input</h3>

            <div class="grid grid-cols-6 mt-4 gap-4">
                <div @focusin="isFocused = true" @focusout="isFocused = false">
                    <forms-text-input :label="textInputLbl" ref="textInputOne" />
                </div>
                <forms-text-input label="Error State" error="Error text here" />
                <forms-text-input label="Disabled State" disabled />
                <forms-text-input pre-icon="boxicons:alert-circle-filled" label="Pre Icon State" />
                <forms-text-input post-icon="boxicons:chevron-down" label="Post Icon State" />
                <forms-text-input pre-icon="boxicons:search" post-icon="boxicons:chevron-down" label="Both Icons" />
            </div>
        </div>

        <!-- Text Input -->
        <div class="mb-4">
            <h3>Number Input</h3>

            <div class="grid grid-cols-6 mt-4 gap-4">
                
            </div>
        </div>

        <!-- Select -->
        <div class="mb-4">
            <h3>Select</h3>

            <div class="grid grid-cols-6 mt-4 gap-4">
                <forms-select v-model="selectValue" :options="options" label="Default State" />
                <forms-select v-model="selectValue2" :options="options" label="Error State" error="Error text here" />
                <forms-select v-model="selectValue3" :options="options" label="Disabled State" disabled />
                <forms-select v-model="selectValue4" :options="options" label="Searchable State" searchable />
                <forms-select v-model="selectValue5" :options="[]" label="Searchable (fetch)" searchable :fetch-options="fetchOptions" />
            </div>
        </div>

        <!-- Textarea -->
        <div class="mb-4">
            <h3>Textarea</h3>

            <div class="grid grid-cols-6 mt-4 gap-4">
                <forms-textarea label="Default State" />
                <forms-textarea label="Error State" error="Error text here" />
                <forms-textarea label="Locked State" locked />
                <forms-textarea label="Disabled State" disabled />
            </div>
        </div>

        <!-- Multiselect -->
        <div class="mb-4">
            <h3>Multiselect</h3>

            <div class="grid grid-cols-6 mt-4 gap-4">
                <forms-multiselect v-model="multiValue" :options="options" label="Default State" />
                <forms-multiselect v-model="multiValue2" :options="options" label="Error State" error="Error text here" />
                <forms-multiselect v-model="multiValue3" :options="options" label="Disabled State" disabled />
                <forms-multiselect v-model="multiValue4" :options="options" label="Searchable State" searchable />
                <forms-multiselect v-model="multiValue5" :options="[]" label="Searchable (fetch)" searchable :fetch-options="fetchOptions" />
            </div>
        </div>

        <!-- Button -->
        <div class="mb-4">
            <h3>Button</h3>

            <div class="grid grid-cols-6 mt-4 gap-4">
                <forms-button text="Default State" pre-icon="boxicons:alert-circle-filled" />
                <forms-button text="Outline" variant="outline" />
                <forms-button text="Ghost" variant="ghost" />
                <forms-button text="Secondary" variant="secondary" />
                <forms-button text="Destructive" variant="destructive" />
                <forms-button text="Link" variant="link" />
                <forms-button text="Disabled" disabled />
            </div>
        </div>

        <!-- PRESETS -->
        <div class="bg-primary-700 px-2 py-5 mb-8">
            <h2 class="text-white my-auto">Presets</h2>
        </div>

        <!-- Datatable -->
        <div class="mb-4">
            <h3>Datatable</h3>

            <div class="grid grid-cols-6 mt-4 gap-4">
            </div>
        </div>

        <!-- Modal -->
        <div class="mb-4">
            <h3>Modal</h3>
        </div>

        <!-- Modal -->
        <div class="mb-4">
            <h3>Alert Dialog</h3>
        </div>

        <!-- Panel Sheets -->
        <div class="mb-4">
            <h3>Alert Dialog</h3>
        </div>

        <!-- Status Pill -->
        <div class="mb-4">
            <h3>Alert Dialog</h3>
        </div>

        <!-- Status Pill -->
        <div class="mb-4">
            <h3>Status Pill</h3>
        </div>

        <!-- Formatter -->
        <div class="bg-primary-700 px-2 py-5 mb-8">
            <h2 class="text-white my-auto">Formatter</h2>
        </div>

        <!-- Status Pill -->
        <div class="mb-4">
            <h3>Number Formatter</h3>
        </div>


    </div>
</template>

<script lang="ts" setup>

const isFocused = ref(false);

const textInputLbl = computed(() => {
    return isFocused.value ? "Active State" : "Inactive State";
});

const options = [
    { value: 1, label: "Option One" },
    { value: 2, label: "Option Two" },
    { value: 3, label: "Option Three" },
    { value: 4, label: "Option Four" },
];

const selectValue = ref();
const selectValue2 = ref();
const selectValue3 = ref();
const selectValue4 = ref();
const selectValue5 = ref();

const textareaValue = ref("");
const textareaValue2 = ref("");
const textareaValue3 = ref("");

const multiValue = ref<any[]>([]);
const multiValue2 = ref<any[]>([]);
const multiValue3 = ref<any[]>([]);
const multiValue4 = ref<any[]>([]);
const multiValue5 = ref<any[]>([]);

const fetchOptions = async (query: string) => {
    // Simulate a network call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const q = query.trim().toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
};

</script>
