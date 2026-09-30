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

        <!-- Number Input -->
        <div class="mb-4">
            <h3>Number Input</h3>

            <div class="grid grid-cols-6 mt-4 gap-4">
                <forms-number-input label="Default State" />
                <forms-number-input label="Error State" error="Error text here" />
                <forms-number-input label="Disabled State" disabled />
            </div>
        </div>

        <!-- Date Input -->
        <div class="mb-4">
            <h3>Date Input</h3>

            <div class="grid grid-cols-6 mt-4 gap-4">
                <forms-date-input label="Default State" />
                <forms-date-input label="With Timer" has-time />
                <forms-date-input label="Disabled State" disabled />
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

            <presets-data-table :columns="tableColumns" :rows="tableRows" />
        </div>

        <!-- MODALS -->
        <div class="bg-primary-700 px-2 py-5 mb-8">
            <h2 class="text-white my-auto">MODALS</h2>
        </div>

        <!-- Modal -->
        <div class="mb-4">
            <h3>Dialog</h3>

            <forms-button text="Open Dialog" @click="dialogOpen = true" />
            <modals-dialog v-model="dialogOpen" title="Updated Informations">
                <p class="text-black">Dialog content goes here.</p>
            </modals-dialog>
        </div>

        <!-- Alert Dialog -->
        <div class="mb-4">
            <h3>Alert Dialog</h3>
        </div>

        <!-- Panel Sheets -->
        <div class="mb-4">
            <h3>Sheet Panel</h3>

            <div class="flex gap-4 mt-4">
                <forms-button text="Bottom Sheet" @click="openSheet('bottom')" />
                <forms-button text="Left Sheet" variant="outline" @click="openSheet('left')" />
                <forms-button text="Right Sheet" variant="outline" @click="openSheet('right')" />
            </div>

            <modals-sheet v-model="sheetOpen" :side="sheetSide" title="EMPLOYEE INFORMATION">
                <p class="text-black">Sheet content goes here.</p>
            </modals-sheet>
        </div>

        <!-- Toast -->
        <div class="mb-4">
            <h3>Toast</h3>

            <div class="flex flex-wrap gap-4 mt-4">
                <forms-button text="Top Left" @click="toasts.topLeft = true" />
                <forms-button text="Top Middle" variant="outline" @click="toasts.topMiddle = true" />
                <forms-button text="Top Right" variant="outline" @click="toasts.topRight = true" />
                <forms-button text="Bottom Left" variant="outline" @click="toasts.bottomLeft = true" />
                <forms-button text="Bottom Middle" variant="outline" @click="toasts.bottomMiddle = true" />
                <forms-button text="Bottom Right" variant="outline" @click="toasts.bottomRight = true" />
            </div>

            <modals-toast v-model="toasts.topLeft" position="top-left" variant="success" title="Success Title" description="Insert Success Toast Description Here" />
            <modals-toast v-model="toasts.topMiddle" position="top-middle" variant="error" title="Error Title" description="Insert Error Toast Description Here" />
            <modals-toast v-model="toasts.topRight" position="top-right" variant="info" title="Information Title" description="Insert Information Toast Description Here" />
            <modals-toast v-model="toasts.bottomLeft" position="bottom-left" variant="success" title="Success Title" description="Insert Success Toast Description Here" />
            <modals-toast v-model="toasts.bottomMiddle" position="bottom-middle" variant="error" title="Error Title" description="Insert Error Toast Description Here" />
            <modals-toast v-model="toasts.bottomRight" position="bottom-right" variant="info" title="Information Title" description="Insert Information Toast Description Here" />
        </div>

        <!-- Formatter -->
        <div class="bg-primary-700 px-2 py-5 mb-8">
            <h2 class="text-white my-auto">Formatter</h2>
        </div>

        <!-- Status Pill -->
        <div class="mb-4">
            <h3>Status Pill</h3>

            <div class="grid grid-cols-6 mt-4 gap-4">
                <formatters-status-pill text="Default" />
                <formatters-status-pill text="Red" variant="red" />
                <formatters-status-pill text="Black" variant="black" />
                <formatters-status-pill text="Blue" variant="blue" />
                <formatters-status-pill text="Gray" variant="gray" />
                <formatters-status-pill text="Green" variant="green" />
                <formatters-status-pill text="Light Blue" variant="light-blue" />
                <formatters-status-pill text="Orange" variant="orange" />
                <formatters-status-pill text="Pink" variant="pink" />
                <formatters-status-pill text="Teal" variant="teal" />
                <formatters-status-pill text="Yellow" variant="yellow" />
            </div>
        </div>

        <!-- Progress Bar -->
        <div class="mb-4">
            <h3>Progress Bar</h3>

            <div class="grid grid-cols-4 mt-4 gap-4">
                <formatters-progress-bar label="Information" :current="2" :total="10" />
                <formatters-progress-bar label="Emergency" :current="8" :total="10" variant="emergency" />
                <formatters-progress-bar label="Danger" :current="5" :total="10" variant="danger" />
                <formatters-progress-bar label="Success" :current="10" :total="10" variant="success" />
            </div>
        </div>

        <!-- Price -->
        <div class="mb-4">
            <h3>Price</h3>

            <div class="grid grid-cols-3 mt-4 gap-4">
                <formatters-price value="2.25K" />
                <formatters-price value="2.25K" variant="decrease" />
                <formatters-price value="2.25K" variant="increase" />
            </div>
        </div>

        <!-- Base Avatar -->
        <div class="mb-4">
            <h3>Base Avatar</h3>

            <div class="grid grid-cols-3 mt-4 gap-4">
                <formatters-base-avatar name="Hwang Yeji" />
                <formatters-base-avatar name="Hwang Yeji" src="https://i.pravatar.cc/100" />
            </div>
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

const tableColumns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
];

const tableRows = [
    { name: 'Emmental Cheese', category: 'Dairy', status: 'In Stock', price: '₱ 120', stock: 50 },
    { name: 'Prosciutto', category: 'Meat', status: 'Low Stock', price: '₱ 320', stock: 8 },
    { name: 'Baguette', category: 'Bakery', status: 'Out of Stock', price: '₱ 85', stock: 0 },
    { name: 'Olive Oil', category: 'Pantry', status: 'In Stock', price: '₱ 450', stock: 24 },
    { name: 'Truffle Honey', category: 'Pantry', status: 'In Stock', price: '₱ 780', stock: 12 },
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

const dialogOpen = ref(false);
const sheetOpen = ref(false);
const sheetSide = ref<'left' | 'right' | 'bottom'>('bottom');

function openSheet(side: 'left' | 'right' | 'bottom') {
    sheetSide.value = side;
    sheetOpen.value = true;
}

const toasts = reactive({
    topLeft: false,
    topMiddle: false,
    topRight: false,
    bottomLeft: false,
    bottomMiddle: false,
    bottomRight: false,
});

</script>
