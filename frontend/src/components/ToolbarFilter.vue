<script setup>
import { computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import Dropdown from "@/components/ui/Dropdown.vue";

const agendaStore = useAgendaStore();
const filters = computed(() => {
	return agendaStore.filter.items.map((item, index) => ({ value: index, label: item }));
});

const currIndex = computed(() => agendaStore.filter.selectedIndex);
const changeFilter = index => agendaStore.setFilterIndex(index);

const isAsc = computed(() => agendaStore.sort.isAsc);
const onToggleAsc = () => agendaStore.toggleSortAsc();
</script>
<template>
	<div class="flex items-stretch gap-4">
		<Dropdown :options="filters" :value="currIndex" labelKey="label" @change="changeFilter" class="dropdown-filter" />
		<button @click="onToggleAsc" class="p-3 leading-none rounded-md text-gray-600 bg-white hover:bg-gray-200 focus:bg-gray-200 border border-gray-200 hover:border-gray-300 focus:border-primary-500">
			<font-awesome-icon v-show="isAsc" icon="fa-solid fa-arrow-down-wide-short" fixed-width />
			<font-awesome-icon v-show="!isAsc" icon="fa-solid fa-arrow-up-short-wide" fixed-width />
		</button>
	</div>
</template>
<style scoped>
	
.dropdown-filter {
	@apply grow;
}

.dropdown-filter :deep(.dropdown-toggler) {
	@apply grow py-3;
}

</style>