<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useAgendaStore } from "@/stores/agenda";

const agendaStore = useAgendaStore();
const emit = defineEmits(["expand"]);

const props = defineProps({ id: Number });

const agenda = computed(() => {
	const data = agendaStore.getById(props.id);
	if(!data)
		return {};

	const startDate = data.date.start,
		endDate = data.date.end;

	const date = `${ startDate.date }/${ startDate.month }/${ startDate.year } - ${ endDate.date }/${ endDate.month }/${ endDate.year }`;
	const title = data.title;
	const twColor = data.color;

	return { date, title, twColor };
});

const showCollapse = ref(false);
const cardCollapse = ref(null);
const onCollapseBlur = event => {
	if(cardCollapse.value.contains(event.relatedTarget))
		return;
	showCollapse.value = false;
};
</script>
<template>
	<div class="basic-card relative hover:bg-white/50 group">
		<div class="flex px-8 pt-8 pb-4">
			<span class="block w-3 h-3 rounded-full absolute top-0 left-8 mt-10" :class="agenda.twColor"></span>
			<h6 class="ml-7 text-xl text-gray-600 font-body group-hover:text-sky-600">{{ agenda.title }}</h6>
		</div>
		<p class="flex items-center gap-1 text-gray-500 justify-end px-6 pb-4 group-hover:text-sky-600">
			<font-awesome-icon icon="fa-regular fa-calendar" fixed-width />
			<span class="text-xs font-semibold mt-1">{{ agenda.date }}</span>
		</p>
		<a href="#" class="absolute w-full h-full top-0 left-0"></a>
		<div class="absolute right-2 top-2">
			<div class="relative">
				<button type="button" @click="showCollapse = !showCollapse" @focusout="onCollapseBlur" class="rounded-full h-8 w-8 text-gray-500 text-xl flex justify-center items-center bg-transparent hover:bg-gray-200 focus:bg-gray-200" >
					<font-awesome-icon icon="fa-solid fa-ellipsis-vertical" fixed-width />
				</button>
				<Transition name="fade">
					<div v-show="showCollapse" ref="cardCollapse" class="card-collapse">
						<ul @focusout="onCollapseBlur" class="flex flex-col" tabindex="-1">
							<li class="card-collapse-item">
								<button type="button">Edit Agenda</button>
							</li>
							<li class="card-collapse-item">
								<button type="button">Hapus Agenda</button>
							</li>
						</ul>
					</div>
				</Transition>
			</div>
		</div>
	</div>
</template>
<style scoped>
	
.card-collapse {
	@apply bg-white py-2 rounded overflow-hidden shadow absolute right-full top-0;
}

.card-collapse-item > button {
	@apply block whitespace-nowrap py-2 pl-8 pr-16 text-sm text-left w-full font-medium text-gray-600 bg-white hover:bg-gray-100;
}

.card-collapse-item:not(:last-child) {
	@apply border-b;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s, margin 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	@apply opacity-0 -mt-2 mb-2;
}

</style>