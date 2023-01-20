<script setup>
import { reactive, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";

const props = defineProps({
	curDate: { type: Date, default: () => new Date() }
});

const agendaStore = useAgendaStore();
const agendaToday = computed(() => agendaStore.today);

const getTimeItem = () => Array.from(new Array(24).keys()).map(item => item + 1);

const point = computed(() => {
	const agenda = agendaStore.today;
	const dateNow = new Date();

	const dateStart = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, dateNow.getDate());
	const dateEnd = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, dateNow.getDate() + 1, 0);
	
	const timeItem = getTimeItem().map((tItem, index) => {
		const key = tItem.toString().length === 1 ? `0${ tItem }:00` : `${ tItem }:00`;
		const items = agenda
			.filter(aItem =>  {
				const inStartRange = tItem >= aItem.time.start.date.getHours();
				const inEndRange = tItem <= aItem.time.end.date.getHours();
				// console.log(aItem.time.start.date.getHours(), tItem, inStartRange);

				return inStartRange && inEndRange;
			})
			.map(aItem => aItem.twColor);

		const bgColor = (items.length >= 1) ? items[items.length - 1] : "bg-transparent";
		// console.log(`index:${ index }\nbg:${ bgColor }\nitems:`)
		// console.log(items)
		return { key, bgColor };
	});

	return timeItem;
});

</script>
<template>
	<div>
		<div v-for="item in point" class="time-item">
			<p class="w-24 flex justify-center items-center text-xs font-semibold h-8 text-gray-600">{{ item.key }}</p>
			<div :class="[item.bgColor]" class="opacity-80"></div>
		</div>
	</div>
</template>
<style scoped>
	
.time-item {
	@apply grid grid-cols-[auto_1fr];
}

.time-item:not(:last-child) {
	@apply border-b;
}

</style>