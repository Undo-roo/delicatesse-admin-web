<template>
	<presets-read-sidebar>
	</presets-read-sidebar>

	<div class="w-full px-6 py-2">
		<presets-read-card>
			<presets-read-card-content 
				class="col-span-6"
				label="First Name" 
				:content="employee.first_name" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Last Name" 
				:content="employee.last_name" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Mobile Number" 
				:content="employee.mobile_number" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Role" 
				:content="employee.role" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Date Hired" 
				:content="employee.date_hired" 
			/>
			<presets-read-card-content 
				class="col-span-6"
				label="Date Created" 
				:content="employee.date_created" 
			/>
			<presets-read-card-content 
				class="col-span-12"
				label="Email" 
				:content="employee.email" 
			/>
		</presets-read-card>
	</div>
</template>

<script lang="ts" setup>
interface EmployeeReadSheet {
	id: string|number;
}

const employee = {
    id: 1,
    first_name: "Yeji",
    last_name: "Hwang",
    mobile_number: "09662484132",
    role: "Super Admin",
    date_hired: "June 25, 2026",
    date_created: "June 25, 2026",
    email: "hwng.yeji@gmail.com",
};

const isFetching = ref(false);

onActivated(() => {
	try {
		isFetching.value = true;
	}
	catch(err) {

	}
	finally {
		setTimeout(() => isFetching.value = false, 2_500)
	}
})
</script>
