<script setup>
import { reactive, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";

const props = defineProps({
	curDate: { type: Date, default: () => new Date() }
});

const agendaStore = useAgendaStore();
const agendaToday = computed(() => agendaStore.today);

const getTimeItem = () => Array.from(new Array(24).keys()).map(item => item + 1);
/*const point = computed(() => {

});*/

const point = computed(() => {
	return getTimeItem().map(tItem => {
		const key = tItem.toString().length === 1 ? `0${ tItem }:00` : `${ tItem }:00`;

		const items = agendaStore.today
			.filter(aItem =>  tItem >= aItem.time.start.h && tItem <= aItem.time.end.h)
			.map(aItem => aItem.color);

		const bgColor = (items.length < 1) ? "bg-transparent" : items[0];
		return { key, bgColor };
	});
});

</script>
<template>
	<div>
		<div v-for="(item, index) in point" class="grid grid-cols-[auto_1fr]" :class="{ 'border-y': index === 0, 'border-b': index > 0 }">
			<p class="w-24 flex justify-center items-center text-xs font-semibold h-8 text-gray-600">{{ item.key }}</p>
			<div :class="[item.bgColor]"></div>
		</div>
	</div>
</template>