<script setup>
import BasicLayout from "@/components/basic-layout/Layout.vue";
import ListInvitation from "@/components/ListInvitation.vue";
import FormInvitation from "@/components/FormInvitation.vue";
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="container py-8 px-4 md:px-8">
				<div class="grid grid-cols-1 md:grid-cols-[17rem_1fr] gap-8">
					<div class="hidden md:block">
						<ListInvitation />
					</div>
					<div class="w-full overflow-x-hidden">
						<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Undangan Rapat</h2>
						<FormInvitation />
					</div>
				</div>
			</div>
		</template>
	</BasicLayout>
</template>