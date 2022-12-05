<script setup>
import { ref, reactive, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import Dropdown from "@/components/ui/Dropdown.vue";

const filters = [
	{ id: 1, title: "Sebulan Terakhir" },
	{ id: 2, title: "3 Bulan Terakhir" },
	{ id: 3, title: "Setahun Terakhir" },
	{ id: 4, title: "Kurun Waktu" }
];

const appliedFilter = ref(1);
const isAgendaLoaded = ref(false);

const agendaStore = useAgendaStore();
const agenda = computed(() => agendaStore.agenda);
agendaStore.fetchAgenda(false, success => isAgendaLoaded.value = success);

const getAddUrl = agendaId => `/inv/new/${ agendaId }`;
const getEditUrl = invitationId => `/inv/edit/${ invitationId }`;
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-lg font-bold p-4 border-t-4 border-primary-500 mb-4">Agenda Rapat</h2>
		<div class="flex items-center gap-2 mb-4">
			<Dropdown :value="appliedFilter" labelKey="title" valueKey="id" :options="filters" @change="val => appliedFilter = val" class="w-48" />
		</div>
		<div v-if="!isAgendaLoaded">
			<p class="text-sm font-semibold text-gray-700">Belum ada agenda rapat.</p>
		</div>
		<ul v-else class="category-list">
			<li v-for="item in agenda">
				<router-link v-if="!item.invitationId" :to="getAddUrl(item.id)">
					<span class="beep-circle text-gray-500">
						<font-awesome-icon icon="fa-solid fa-circle" />
					</span>
					<span>{{ item.title }}</span>
				</router-link>
				<router-link v-else :to="getEditUrl(item.invitationId)">
					<span class="beep-circle text-green-500">
						<font-awesome-icon icon="fa-solid fa-circle" />
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
	@apply flex items-center gap-2 pl-2 pr-4 py-2 text-sm font-medium text-gray-600 transition-colors bg-white hover:bg-gray-100;
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