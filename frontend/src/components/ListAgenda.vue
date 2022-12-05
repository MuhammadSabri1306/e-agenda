<script setup>
import { ref, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import CardAgenda from "@/components/CardAgenda.vue";

defineEmits(["showDetail"]);
const storeAgenda = useAgendaStore();
storeAgenda.fetchAgenda();
const agenda = computed(() => storeAgenda.agenda);
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Rapat</h2>
		<div class="flex items-center mb-8">
			<button type="button" @click="$router.push('/agenda/new')" class="btn btn-icon text-white transition-colors bg-primary-600 hover:bg-primary-500 focus:bg-primary-500">
				<font-awesome-icon icon="fa-solid fa-plus" fixed-width />
				<span class="ml-2">Rapat Baru</span>
			</button>
		</div>
		<div v-if="agenda.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
			<CardAgenda v-for="item in agenda" :id="item.id" @expand="$emit('showDetail', item.id)" />
		</div>
	</div>
</template>