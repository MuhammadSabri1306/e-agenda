<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import Calendar from "@/components/Calendar.vue";
import TableTimePoint from "@/components/TableTimePoint.vue";
import OffcanvasAgenda from "@/components/OffcanvasAgenda.vue";
import ListAgenda from "@/components/ListAgenda.vue";
import FormAddAgenda from "@/components/FormAddAgenda.vue";

const detailAgendaId = ref(null);
const route = useRoute();
const showFormAdd = computed(() => route.name == "agendaNew");
</script>
<template>
	<BasicLayout @new="$router.push('/agenda/new')">
		<template #main>
			<div class="p-8 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 bg-gray-100">
				<div>
					<Calendar class="basic-card mb-4" />
					<div class="basic-card py-6">
						<h4 class="text-gray-800 text-xl leading-tight mb-4 px-4">Agenda per jam</h4>
						<div class="h-96 overflow-y-auto border-y custom-scrollbar">
							<TableTimePoint />
						</div>
					</div>
				</div>
				<FormAddAgenda v-if="showFormAdd" />
				<ListAgenda v-else @showDetail="val => detailAgendaId = val" />
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