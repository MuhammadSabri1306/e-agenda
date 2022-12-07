<script setup>
import { ref, computed, onMounted } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import { useDateId, objToTimeStr } from "@/modules/date-id";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["close"]);
const props = defineProps({
	agendaId: { required: true }
});

const open = ref(true);
const show = ref(false);

onMounted(() => {
	if(!show.value)
		show.value = true;
});

const onHidden = () => {
	emit("close");
	open.value = false;
};

const storeAgenda = useAgendaStore();
const currAgenda = computed(() => {
	return storeAgenda.getById(props.agendaId);
});

const agendaDate = computed(() => {
	if(!currAgenda.value)
		return;

	const { start, end } = currAgenda.value.date;
	return { start: start.toDateStr(), end: end.toDateStr() };
});

const agendaTime = computed(() => {
	if(!currAgenda.value)
		return;

	const { start, end } = currAgenda.value.time;
	return `${ start.h }:${ start.m } - ${ end.h }:${ end.m }`;
});
</script>
<template>
	<div v-if="open">
		<Transition name="offcanvas-fade" @after-leave="onHidden">
			<div v-show="show" class="offcanvas-agenda" @click.self="show = false">
				<div class="offcanvas-agenda-content fixed bottom-0 right-0 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 min-h-[20rem] md:h-full bg-white border shadow-lg text-gray-600 rounded-t-2xl md:rounded-t-none overflow-y-auto">
					<div class="flex items-start">
						<h3 class="text-xl lg:text-lg font-semibold p-8 md:p-4">Detail Agenda</h3>
						<button type="button" @click="show = false" class="ml-auto p-4 text-gray-500 transition-opacity opacity-80 hover:opacity-100">
							<XMarkIcon class="w-8 h-8" />
						</button>
					</div>
					<div class="px-8 py-4 pb-8 text-gray-700">
						<p class="text-sm">Agenda :</p>
						<p class="text-gray-800 font-bold mb-4">{{ currAgenda.title }}</p>
						<p class="text-sm mb-1">Deskripsi :</p>
						<p class="text-gray-800 text-sm mb-4">{{ currAgenda.desc }}</p>
						<div class="mb-8 grid grid-cols-1 gap-4">
							<p class="flex items-center gap-1">
								<span class="text-blue-500 text-lg">
									<font-awesome-icon icon="fa-solid fa-location-dot" fixed-width />
								</span>
								<span class="text-gray-800 text-sm">{{ currAgenda.location }}</span>
							</p>
							<p class="flex items-center gap-1">
								<span class="text-blue-500 text-lg">
									<font-awesome-icon icon="fa-regular fa-clock" fixed-width />
								</span>
								<span class="text-gray-800 text-sm">Pukul <span class="font-semibold">{{ agendaTime }}</span></span>
							</p>
							<div class="day-range">
								<div class="day-icon">
									<span class="text-blue-500 text-lg">
										<font-awesome-icon icon="fa-regular fa-calendar-days" fixed-width />
									</span>
								</div>
								<div class="day-label">
									<span>{{ agendaDate.start }}</span>
								</div>
								<div class="day-icon day-icon-range">
									<font-awesome-icon icon="fa-solid fa-circle" fixed-width />
									<font-awesome-icon icon="fa-solid fa-circle" fixed-width />
									<font-awesome-icon icon="fa-solid fa-circle" fixed-width />
								</div>
								<div></div>
								<div class="day-icon">
									<span class="text-gray-400 text-xs">
										<font-awesome-icon icon="fa-solid fa-circle" fixed-width size="sm" />
									</span>
								</div>
								<div class="day-label">
									<span>{{ agendaDate.end }}</span>
								</div>
							</div>
						</div>
						<div class="flex justify-end gap-2">
							<a href="#" class="offcanvas-agenda-link">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
							</a>
							<a href="#" class="offcanvas-agenda-link">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
							</a>
							<a href="#" class="offcanvas-agenda-link">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>
<style scoped>
	
.offcanvas-agenda {
	@apply fixed w-screen h-screen top-0 left-0 bg-gray-900/70 z-[7777];
}

.offcanvas-fade-enter-active,
.offcanvas-fade-leave-active {
	transition: opacity 0.3s;
}

.offcanvas-fade-enter-from,
.offcanvas-fade-leave-to {
	@apply opacity-0;
}

.offcanvas-fade-enter-to,
.offcanvas-fade-leave-from {
	@apply opacity-100;
}

.offcanvas-fade-enter-active .offcanvas-agenda-content,
.offcanvas-fade-leave-active .offcanvas-agenda-content {
	transition: bottom 0.3s, right 0.3s;
}

.offcanvas-fade-enter-from .offcanvas-agenda-content,
.offcanvas-fade-leave-to .offcanvas-agenda-content {
	@apply bottom-[-101vh] md:bottom-0 right-0 md:right-[-101vw] ;
}

.offcanvas-fade-enter-to .offcanvas-agenda-content,
.offcanvas-fade-leave-from .offcanvas-agenda-content {
	@apply bottom-0 right-0;
}

.day-range {
	@apply grid grid-cols-[auto_1fr] gap-1;
}

.day-range .day-label {
	@apply flex items-center text-gray-800 text-sm;
}

.day-range .day-icon {
	@apply flex flex-col justify-center items-center;
}

.day-range .day-icon-range {
	@apply gap-1 text-gray-400;
}

.day-range .day-icon-range svg {
	@apply h-1;
}

.offcanvas-agenda-link {
	@apply p-2 transition-colors text-gray-600 hover:text-primary-700;
}

.offcanvas-agenda-link svg {
	@apply h-6 w-6;
}

</style>