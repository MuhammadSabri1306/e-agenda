<script setup>
import { computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";

const agendaStore = useAgendaStore();

const props = defineProps({ id: Number });
const agendaId = computed(() => props.id);

const agenda = computed(() => {
	const data = agendaStore.getById(agendaId.value);
	if(!data)
		return {};

	const startDate = data.date.start,
		endDate = data.date.end;

	const date = `${ startDate.date }/${ startDate.month }/${ startDate.year } - ${ endDate.date }/${ endDate.month }/${ endDate.year }`;
	const title = data.title;
	const twColor = data.color;

	return { date, title, twColor };
});
</script>
<template>
	<div class="basic-card">
		<div class="flex items-center gap-4 px-8 pt-8 pb-4">
			<span class="block w-3 h-3 rounded-full" :class="agenda.twColor"></span>
			<h6 class="text-xl text-gray-600 font-light font-body">{{ agenda.title }}</h6>
		</div>
		<p class="flex items-center gap-1 text-gray-500 justify-end px-6 pb-4">
			<font-awesome-icon icon="fa-regular fa-calendar" fixed-width />
			<span class="text-xs font-semibold mt-1">{{ agenda.date }}</span>
		</p>
	</div>
</template>