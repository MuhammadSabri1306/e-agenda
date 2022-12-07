<script setup>
import { ref, reactive, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import Dropdown from "@/components/ui/Dropdown.vue";
import ModalFormAttendance from "@/components/ModalFormAttendance.vue";

const appliedFilter = ref(1);
const filters = [
	{ id: 1, title: "Sebulan Terakhir" },
	{ id: 2, title: "3 Bulan Terakhir" },
	{ id: 3, title: "Setahun Terakhir" },
	{ id: 4, title: "Kurun Waktu" }
];

const agendaStore = useAgendaStore();
const att = computed(() => agendaStore.attendance);
const isAttLoaded = ref(false);
agendaStore.fetchAttendance(false, success => isAttLoaded.value = success);

const getEditUrl = attId => `/att/${ attId }`;
const showFormAdd = ref(false);
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-lg font-bold p-4 border-t-4 border-primary-500 mb-4">Agenda Rapat</h2>
		<div class="flex items-center gap-2 mb-4">
			<Dropdown :value="appliedFilter" labelKey="title" valueKey="id" :options="filters" @change="val => appliedFilter = val" class="grow" />
			<!-- <button type="button" @click="showFormAdd = true" class="ml-auto rounded w-10 h-10 flex justify-center items-center text-gray-500 transition-colors bg-transparent hover:bg-gray-100 focus:bg-gray-100">
				<font-awesome-icon icon="fa-solid fa-plus" />
			</button> -->
		</div>
		<div v-if="isAttLoaded && att.length < 1">
			<p class="text-sm font-semibold text-gray-700">Belum ada agenda rapat.</p>
		</div>
		<ul v-if="isAttLoaded && att.length > 0" class="category-list">
			<li v-for="item in att">
				<router-link :to="getEditUrl(item.id)">{{ item.nama }}</router-link>
			</li>
		</ul>
		<ModalFormAttendance v-if="showFormAdd" @cancel="showFormAdd = false" />
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