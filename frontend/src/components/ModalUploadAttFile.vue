<script setup>
import { ref, computed } from "vue";
import { required } from "@vuelidate/validators";
import { useAgendaStore } from "@/stores/agenda";
import { useViewStore } from "@/stores/view";
import { useDataForm } from "@/modules/data-form";
import Modal from "@/components/ui/Modal.vue";
import FileUpload from "@/components/ui/FileUpload.vue";
import LoadingLine from "@/components/ui/LoadingLine.vue";

const emit = defineEmits(["cancel", "changed"]);
const props = defineProps({
	agendaId: { required: true }
});
const { data, v$ } = useDataForm({
	file: { value: null, required }
});

const isAgendaLoaded = ref(false);
const agendaStore = useAgendaStore();

const viewStore = useViewStore();
const hasSubmitted = ref(false);
const showLoader = ref(false);

const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid)
		return;

	showLoader.value = true;
	agendaStore.uploadAttFile(props.agendaId, data.file, success => {
		showLoader.value = false;
		if(!success) {
			viewStore.showToast("File tidak tersimpan", "Terjadi masalah saat menghubungi server.", false);
			return;
		}
		viewStore.showToast("File Absensi", "Berhasil mengupload file.", true);
		emit("changed");
	});
};

const onFileChange = files => {
	data.file = files[0];
};
</script>
<template>
	<Modal ref="modal" @close="$emit('cancel')">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">Upload Absensi</h3>
			</div>
		</template>
		<template #body>
			<div>
				<div class="h-1 relative">
					<LoadingLine v-if="showLoader" />
				</div>
				<form @submit.prevent="onSubmit" class="py-4 px-8">
					<FileUpload fieldAccept="application/pdf" regexAccept="pdf|PDF" @change="onFileChange" class="mb-8" />
					<div class="flex justify-end mb-4">
						<button type="submit" class="btn btn-icon text-white transition-colors bg-primary-600 hover:bg-primary-500">
							<font-awesome-icon icon="fa-solid fa-plus" fixed-width />
							<span class="ml-2">Upload</span>
						</button>
					</div>
				</form>
			</div>
		</template>
	</Modal>
</template>