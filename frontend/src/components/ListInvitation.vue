<script setup>
import { ref, reactive, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import ToolbarFilter from "@/components/ToolbarFilter.vue";

const isAgendaLoaded = ref(false);
const agendaStore = useAgendaStore();
const agenda = computed(() => agendaStore.listFiltered);
agendaStore.fetchAgenda(false, success => isAgendaLoaded.value = success);
</script>
<template>
	<div>
		<h2 class="side-title">Agenda Rapat</h2>
		<ToolbarFilter class="mb-4" />
		<div v-if="agenda.length < 1">
			<p class="text-sm font-semibold text-gray-700">Belum ada agenda rapat.</p>
		</div>
		<ul v-if="isAgendaLoaded" class="category-list">
			<li v-for="item in agenda">
				<router-link :to="'/inv/detail/' + item.id">
					<span class="beep-circle text-gray-500">
						<font-awesome-icon icon="fa-solid fa-circle" fixed-width />
					</span>
					<span>{{ item.title }}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<style scoped>
	
.category-list {
	@apply flex flex-col;
}

.category-list a {
	@apply flex items-center gap-2 px-4 py-3 md:py-2 md:text-sm md:font-medium text-gray-600 transition-colors bg-white hover:bg-gray-100;
}

.beep-circle {
	@apply inline-flex;
}

.beep-circle svg {
	@apply w-2 h-2 opacity-70;
}

.category-list li {
	@apply border-b;
}

.category-list .router-link-active {
	@apply bg-gray-100 text-primary-600;
}

</style>