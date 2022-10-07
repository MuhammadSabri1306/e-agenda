<script setup>
import { ref, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import { isLarge, isExtraLarge, isExtraLarge2 } from "@/modules/screenBreakpoint";
import HeaderBasic from "@/components/HeaderBasic.vue"
import Calendar from "@/components/Calendar.vue";
import CustomSelect from "@/components/ui/CustomSelect.vue";
import ButtonSort from "@/components/ButtonSort.vue";

const storeAgenda = useAgendaStore();
storeAgenda.fetchModel();
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

const changeSort = val => null;

const isAscSort = computed(() => storeAgenda.sort.isAsc);
const toggleSortOrder = () => storeAgenda.toggleSortAsc();

const tailwindColor = {
	gray: "bg-gray-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    teal: "bg-teal-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500"
};

const data = computed(() => {
	return storeAgenda.model.map(item => {
		const startDate = new Date(item.startDate),
			endDate = new Date(item.endDate);

		const date = `${ startDate.getDate() }/${ startDate.getMonth() + 1 }/${ startDate.getFullYear() } - ${ endDate.getDate() }/${ endDate.getMonth() + 1 }/${ endDate.getFullYear() }`;
		const title = item.title;
		const twColor = tailwindColor[item.color];

		return { date, title, twColor };
	});
});
</script>
<template>
	<div class="flex flex-wrap">
		<div class="grow mr-6">
			<HeaderBasic class="mb-6 ml-4" />
			<div class="flex items-end mb-6">
				<div class="inline-flex items-center">
					<label class="text-gray-600 font-bold text-sm mr-2">Kategori:</label>
					<CustomSelect :value="category" :list="categoryList" @change="changeCategory" />
				</div>
				<div class="inline-flex items-center ml-6">
					<label class="text-gray-600 font-bold text-sm mr-2">Urut berdasarkan:</label>
					<CustomSelect :value="category" :list="categoryList" @change="changeSort" />
				</div>
				<ButtonSort :ascending="isAscSort" @click="toggleSortOrder" class="ml-6" />
			</div>
			<div class="basic-card flex flex-col py-4 mb-6">
				<div v-for="(item, index) in data" class="py-2 border-b border-gray-100" :class="{ 'border-t': index === 0 }">
					<a role="button" class="flex items-end">
						<span class="block w-3 h-3 rounded-full mx-4" :class="item.twColor"></span>
						<span class="text-xs font-semibold text-black/50 px-4 border-r border-gray-100 leading-none">{{ item.date }}</span>
						<span class="text-base text-black/70 ml-4 leading-none">{{ item.title }}</span>
					</a>
				</div>
			</div>
		</div>
		<div v-if="isLarge() || isExtraLarge() || isExtraLarge2()">
			<Calendar class="basic-card mb-6 ml-auto" />
		</div>
	</div>
</template>