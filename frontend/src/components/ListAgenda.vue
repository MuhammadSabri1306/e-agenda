<script setup>
import { ref, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import CardAgenda from "@/components/CardAgenda.vue";

defineEmits(["showDetail"]);
const storeAgenda = useAgendaStore();

const isAgendaLoaded = ref(false);
storeAgenda.fetchAgenda(false, () => isAgendaLoaded.value = true);
const agenda = computed(() => storeAgenda.listFiltered);
</script>
<template>
	<div v-if="isAgendaLoaded && agenda.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
		<CardAgenda v-for="item in agenda" :id="item.id" @expand="$emit('showDetail', item.id)" />
	</div>
	<div v-else-if="isAgendaLoaded && agenda.length < 1">
		<h6 class="text-center text-gray-500 font-bold text-2xl">Belum ada agenda rapat.</h6>
	</div>
	<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
		<div v-for="n in 6" class="basic-card p-8">
			<div class="skeleton-loader skeleton-text w-1/3 mb-4"></div>
			<div class="skeleton-loader skeleton-text mb-2"></div>
			<div class="skeleton-loader skeleton-text"></div>
		</div>
	</div>
</template>