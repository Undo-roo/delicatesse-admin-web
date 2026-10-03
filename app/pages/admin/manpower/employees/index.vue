<template>
	<NuxtLayout name="admin">
		
		<!-- TAB -->
		<div class="flex w-full gap-x-10">
			<div class="">
				<div class="flex gap-x-2 text-3xl font-bold items-center text-gray">
					<p>Manpower</p>
					<Icon name="boxicons:chevron-right-filled" class="size-12" />
					<p class="text-primary">Employees</p>
				</div>
				<div>
					<!-- Tab button here -->
				</div>
			</div>

			<div class="flex-1">
				<forms-filter />
			</div>
		</div>
	</NuxtLayout>
</template>

<script lang="ts" setup>

</script>
