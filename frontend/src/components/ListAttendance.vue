<script setup>
import { ref, reactive, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import Dropdown from "@/components/ui/Dropdown.vue";
import ModalFormAttendance from "@/components/ModalFormAttendance.vue";
import ToolbarFilter from "@/components/ToolbarFilter.vue";

const agendaStore = useAgendaStore();
const att = computed(() => agendaStore.attendance);
const isAttLoaded = ref(false);
agendaStore.fetchAttendance(false, success => isAttLoaded.value = success);

const getEditUrl = attId => `/att/${ attId }`;
const getActiveClass = status => {
	const isActive = Boolean(Number(status));
	return {
		'text-gray-500': !isActive,
		'text-green-500': isActive
	};
};

const showFormAdd = ref(false);
</script>
<template>
	<div>
		<h2 class="side-title">Agenda Rapat</h2>
		<ToolbarFilter class="mb-4" />
		<div v-if="isAttLoaded && att.length < 1">
			<p class="text-sm font-semibold text-gray-700">Belum ada agenda rapat.</p>
		</div>
		<ul v-if="isAttLoaded && att.length > 0" class="category-list">
			<li v-for="item in att">
				<router-link :to="getEditUrl(item.id)">
					<span :class="getActiveClass(item.status_rapat)" class="beep-circle">
						<font-awesome-icon icon="fa-solid fa-circle" />
					</span>
					<span>{{ item.nama }}</span>
				</router-link>
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
	@apply flex items-center gap-2 pl-2 pr-4 py-3 md:py-2 md:text-sm md:font-medium text-gray-600 transition-colors bg-white hover:bg-gray-100;
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