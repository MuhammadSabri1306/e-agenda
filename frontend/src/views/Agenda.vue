<script setup>
import { ref, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import HeaderBasic from "@/components/HeaderBasic.vue";
import Calendar from "@/components/Calendar.vue";
import CustomSelect from "@/components/ui/CustomSelect.vue";
import ButtonSort from "@/components/ButtonSort.vue";
import TableTimePoint from "@/components/TableTimePoint.vue";
import CardAgenda from "@/components/CardAgenda.vue";
import ModalAddAgenda from "@/components/ModalAddAgenda.vue";

const storeAgenda = useAgendaStore();
storeAgenda.fetchAgenda();

const agenda = computed(() => storeAgenda.agenda);

const category = computed(() => storeAgenda.selectedCategory.title);
const categoryList = computed(() => {
	return storeAgenda.category.items.map(item => {
		const value = item.title;
		const disabled = false;
		return { value, disabled };
	});
});

const changeCategory = val => {
	const index = categoryList.value.findIndex(item => item.value === val);
	storeAgenda.setCategoryIndex(index);
};

const changeSort = val => null;

const isAscSort = computed(() => storeAgenda.sort.isAsc);
const toggleSortOrder = () => storeAgenda.toggleSortAsc();

const showAddModal = ref(false);
const onAdd = () => showAddModal.value = true;
</script>
<template>
	<BasicLayout @new="onAdd">
		<template #main>
			<div class="p-8 grid grid-cols-[auto_1fr] gap-8 bg-gray-100">
				<div>
					<Calendar class="basic-card mb-4" />
					<div class="basic-card py-6">
						<h4 class="text-gray-800 text-xl leading-tight mb-4 px-4">Agenda per jam</h4>
						<div class="h-96 overflow-y-auto border-y custom-scrollbar">
							<TableTimePoint />
						</div>
					</div>
				</div>
				<div>
					<HeaderBasic class="mb-6 ml-4" />
					<div v-if="agenda.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
						<CardAgenda v-for="item in agenda" :id="item.id" />
					</div>
				</div>
				<ModalAddAgenda v-if="showAddModal" @cancel="showAddModal = false" />
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