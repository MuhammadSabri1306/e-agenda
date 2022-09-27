<script setup>
import { ref, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import HeaderBasic from "@/components/HeaderBasic.vue"
import Calendar from "@/components/Calendar.vue";
import CustomSelect from "@/components/ui/CustomSelect.vue";
import ButtonSort from "@/components/ButtonSort.vue";

const storeAgenda = useAgendaStore()
// console.log(storeAgenda.category);

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

const isAscSort = computed(() => storeAgenda.sort.isAsc);
const toggleSortOrder = () => storeAgenda.toggleSortAsc();
</script>
<template>
	<div class="flex">
		<div class="grow">
			<HeaderBasic class="mb-6 ml-4" />
			<div class="flex items-end">
				<div class="inline-flex items-center">
					<label class="text-gray-600 font-bold text-sm mr-2">Kategori:</label>
					<CustomSelect :value="category" :list="categoryList" @change="changeCategory" />
				</div>
				<div class="inline-flex items-center ml-8">
					<label class="text-gray-600 font-bold text-sm mr-2">Urut berdasarkan:</label>
					<CustomSelect :value="category" :list="categoryList" @change="changeCategory" />
				</div>
				<ButtonSort :ascending="isAscSort" @click="toggleSortOrder" />
			</div>
		</div>
		<div class="pl-6">
			<Calendar class="basic-card mb-6 ml-auto" />
		</div>
	</div>
</template>