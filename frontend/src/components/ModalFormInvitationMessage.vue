<script setup>
import { computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import { useDataForm } from "@/modules/data-form";
import Modal from "@/components/ui/Modal.vue";
import FileUploadAttachment from "@/components/FileUploadAttachment.vue";

const props = defineProps({
	id: { default: null },
	title: String
});

const agendaStore = useAgendaStore();
const currAgenda = computed(() => props.id ? agendaStore.getById(props.id) : null);

const filename = ref(props.id ? currAgenda.letter : null);
const { data, v$ } = useDataForm({
	message: { value: props.id ? currAgenda.message : null, required },
	letterNo: { value: props.id ? currAgenda.letterNo : null },
	letter: { value: null }
});

</script>
<template>
	<Modal ref="modal" @close="$emit('cancel')">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">{{ title }}</h3>
			</div>
		</template>
		<template #body>
			<form @submit.prevent="">
				<div class="py-4 px-8 grid grid-cols-1 gap-8">
					<div class="form-group">
						<label for="textDesc">Pesan Undangan:</label>
						<textarea v-model="v$.message.$model" :class="{ 'invalid': hasSubmitted && v$.message.$invalid }" rows="4"></textarea>
					</div>
					<div class="form-group">
						<label for="inputLetterNo">No. Surat:</label>
						<input v-model="v$.letterNo.$model" :class="{ 'invalid': hasSubmitted && v$.message.$invalid }" id="inputLetterNo">
					</div>
					<div class="form-group">
						<label for="inputAttachment">Lampiran <span class="text-xs font-semibold">(*.pdf)</span>:</label>
						<FileUploadAttachment fieldId="inputAttachment" :uploadedFilename="filename" @change="changeAttachment" />
					</div>
				</div>
			</form>
		</template>
	</Modal>
</template>