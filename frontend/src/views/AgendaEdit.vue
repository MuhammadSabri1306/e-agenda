<script setup>
import { ref, computed } from "vue";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import Calendar from "@/components/Calendar.vue";
import TableTimePoint from "@/components/TableTimePoint.vue";
import OffcanvasAgenda from "@/components/OffcanvasAgenda.vue";
import FormEditAgenda from "@/components/FormEditAgenda.vue";
import ToolbarFilter from "@/components/ToolbarFilter.vue";

const detailAgendaId = ref(null);
</script>
<template>
	<BasicLayout baseBgClass="bg-gray-100">
		<template #toolbar>
			<div class="py-2 border-t">
				<div class="container flex items-center justify-end gap-8">
					<div class="form-group">
						<label>Filter</label>
					</div>
					<ToolbarFilter />
				</div>
			</div>
		</template>
		<template #main>
			<div class="p-8 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
				<div class="row-start-2 row-end-3 md:row-start-1 md:row-end-2 mt-8">
					<div>
						<Calendar @select="val => detailAgendaId = val" class="basic-card mb-4" />
						<div class="basic-card py-6">
							<h4 class="text-gray-800 text-xl leading-tight mb-4 px-4">Rapat hari ini</h4>
							<div class="h-96 overflow-y-auto border-y custom-scrollbar">
								<TableTimePoint />
							</div>
						</div>
					</div>
				</div>
				<div class="w-full overflow-x-hidden">
					<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Rapat</h2>
					<FormEditAgenda />
				</div>
				<OffcanvasAgenda v-if="detailAgendaId" :agendaId="detailAgendaId" @close="detailAgendaId = null" />
			</div>
		</template>
	</BasicLayout>
</template>
<style scoped>

.custom-scrollbar::-webkit-scrollbar {
	@apply w-3;
}

.custom-scrollbar::-webkit-scrollbar-track {
	@apply bg-white;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	@apply bg-gray-300 rounded-[50rem];
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	@apply bg-gray-400;
}
</style>