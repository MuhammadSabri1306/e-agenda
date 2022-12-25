<script setup>
import BasicLayout from "@/components/basic-layout/Layout.vue";
import TableContact from "@/components/TableContact.vue";
import ToolbarFilterContact from "@/components/ToolbarFilterContact.vue";
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="container py-8 px-4 md:px-0">
				<div class="grid grid-cols-1 md:grid-cols-[17rem_1fr] gap-8">
					<div class="hidden md:block">
						<h2 class="side-title">Kategori</h2>
						<ToolbarFilterContact class="hidden md:block" />
					</div>
					<div class="w-full overflow-x-hidden">
						<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Kontak</h2>
						<div class="flex items-center mb-8">
							<button type="button" @click="$router.push('/contact/new')" class="btn btn-icon text-white transition-colors bg-primary-600 hover:bg-primary-500 focus:bg-primary-500">
								<font-awesome-icon icon="fa-solid fa-plus" fixed-width />
								<span class="ml-2">Kontak Baru</span>
							</button>
						</div>
						<ToolbarFilterContact class="md:hidden mb-8" />
						<TableContact />
					</div>
				</div>
			</div>
		</template>
	</BasicLayout>
</template>