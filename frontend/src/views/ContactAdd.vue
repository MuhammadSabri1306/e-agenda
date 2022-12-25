<script setup>
import BasicLayout from "@/components/basic-layout/Layout.vue";
import ListContactCategory from "@/components/ListContactCategory.vue";
import FormAddContact from "@/components/FormAddContact.vue";
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="container py-8 px-4 md:px-16">
				<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Kontak</h2>
				<FormAddContact />
			</div>
		</template>
	</BasicLayout>
</template>