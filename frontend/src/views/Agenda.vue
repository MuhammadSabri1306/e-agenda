<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import * as breakpoint from "@/modules/screenBreakpoint";
import HeaderBasic from "@/components/HeaderBasic.vue"
import Calendar from "@/components/Calendar.vue";
import CustomSelect from "@/components/ui/CustomSelect.vue";
import ButtonSort from "@/components/ButtonSort.vue";
import TableTimePoint from "@/components/TableTimePoint.vue";
import CardAgenda from "@/components/CardAgenda.vue";

const storeAgenda = useAgendaStore();
storeAgenda.fetchModel();

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

const agendaIdLists = computed(() => {
	return storeAgenda.list.map(({ id }) => id);
})

const calendarPosition = ref("left");

const watchCalendarPosition = () => {
	if(breakpoint.isExtraSmall() || breakpoint.isSmall() || breakpoint.isLarge()) {
		calendarPosition.value = "left";
	} else {
		calendarPosition.value = "right";
	}
};

onMounted(() => watchCalendarPosition() && window.addEventListener("resize", watchCalendarPosition));
onUnmounted(() => window.addEventListener("resize", watchCalendarPosition));
</script>
<template>
	<div class="flex flex-wrap">
		<div class="grow mr-6">
			<HeaderBasic class="mb-6 ml-4" />
			<div class="flex flex-col gap-6 mb-6">
				<CardAgenda v-for="itemId in agendaIdLists" :id="itemId" />
			</div>
			<div v-if="calendarPosition === 'left'">
				<Calendar class="basic-card mb-6 ml-auto" />
			</div>
			<div class="basic-card grid grid-cols-1 mb-6 p-6">
				<h4 class="text-black/80 text-xl leading-tight mb-4">Agenda per jam</h4>
				<div class="h-96 overflow-y-auto border-y custom-scrollbar">
					<TableTimePoint />
				</div>
			</div>
		</div>
		<div v-if="calendarPosition === 'right'">
			<Calendar class="basic-card mb-6 ml-auto" />
		</div>
	</div>
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