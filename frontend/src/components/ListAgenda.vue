<script setup>
import { ref, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import CardAgenda from "@/components/CardAgenda.vue";

defineEmits(["showDetail"]);
const storeAgenda = useAgendaStore();

storeAgenda.fetchAgenda();
const agenda = computed(() => storeAgenda.listFiltered);
</script>
<template>
	<div v-if="agenda.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
		<CardAgenda v-for="item in agenda" :id="item.id" @expand="$emit('showDetail', item.id)" />
	</div>
	<div v-else>
		<h6 class="text-center text-gray-500 font-bold text-2xl">Belum ada agenda rapat.</h6>
	</div>
</template>