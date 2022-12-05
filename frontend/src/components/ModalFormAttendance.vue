<script setup>
import { ref, computed } from "vue";
import { required } from "@vuelidate/validators";
import { useAgendaStore } from "@/stores/agenda";
import { useDataForm } from "@/modules/data-form";
import Modal from "@/components/ui/Modal.vue";
import LoadingLine from "@/components/ui/LoadingLine.vue";
import Dropdown from "@/components/ui/Dropdown.vue";

const emit = defineEmits(["cancel"]);
const { data, v$ } = useDataForm({
	agendaId: { value: null, required }
});

const isAgendaLoaded = ref(false);
const agendaStore = useAgendaStore();
const agenda = computed(() => agendaStore.agenda);
agendaStore.fetchAgenda(false, success => isAgendaLoaded.value = success);

const hasSubmitted = ref(false);
const showLoader = ref(false);

const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid)
		return;

	showLoader.value = true;
	console.log(data.agendaId);
};
</script>
<template>
	<Modal ref="modal" @close="$emit('cancel')">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">Absensi Baru</h3>
			</div>
		</template>
		<template #body>
			<div>
				<div class="h-1 relative">
					<LoadingLine v-if="showLoader" />
				</div>
				<form @submit.prevent="onSubmit" class="py-4 px-8">
					<div class="form-group mb-8 flex items-center gap-4">
						<label>Agenda</label>
						<Dropdown v-if="isAgendaLoaded" :options="agenda" labelKey="title" valueKey="id" defaultTitle="Pilih Agenda" @change="val => data.agendaId = val" class="dropdown-agenda grow" />
					</div>
					<div class="flex justify-end mb-4">
						<button type="submit" class="btn btn-icon text-white transition-colors bg-primary-600 hover:bg-primary-500">
							<font-awesome-icon icon="fa-solid fa-plus" fixed-width />
							<span class="ml-2">Buat Absensi</span>
						</button>
					</div>
				</form>
			</div>
		</template>
	</Modal>
</template>
<style scoped>
	
.dropdown-agenda :deep(.dropdown-collapse) {
	@apply z-[2] w-auto;
}

.dropdown-agenda :deep(.dropdown-collapse) ul {
	@apply max-h-[10rem] overflow-y-auto;
}

</style>