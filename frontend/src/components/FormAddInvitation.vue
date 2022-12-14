<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAgendaStore } from "@/stores/agenda";
import { useViewStore } from "@/stores/view";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import LoadingLine from "@/components/ui/LoadingLine.vue";
import ButtonBack from "@/components/ButtonBack.vue";
import ListInvitationContact from "@/components/ListInvitationContact.vue";
import FileUploadAttachment from "@/components/FileUploadAttachment.vue";

const route = useRoute();
const agendaId = computed(() => route.params.agendaId);
const agendaStore = useAgendaStore();

const agenda = computed(() => agendaStore.list);
const isAgendaLoaded = ref(false);
agendaStore.fetchAgenda(false, success => isAgendaLoaded.value = success);

const agendaName = computed(() => {
	if(!isAgendaLoaded.value)
		return null;
	const currAgenda = agenda.value.find(item => item.id == agendaId.value);
	if(!currAgenda)
		return;
	return !currAgenda ? null : currAgenda.title;
});

const { data, v$ } = useDataForm({
	message: { value: null, required },
	letter: { value: null },
	letterNo: { value: null }
});

const changeContact = contactList => data.contact = contactList;
const changeAttachment = file => data.letter = file;

const isSaving = ref(false);
const hasSubmitted = ref(false);
const viewStore = useViewStore();

const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid || isSaving.value)
		return;
	
	const body = {
		pesan: data.message,
		file: data.letter,
		no_surat: data.letterNo
	};

	isSaving.value = true;
	agendaStore.saveInvitation(agendaId.value, body, success => {
		if(!success) {
			viewStore.showToast("Koneksi gagal", "Terjadi masalah saat menghubungi server.", false);
			return;
		}
	});
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Undangan Rapat</h2>
		<form v-if="isAgendaLoaded" @submit.prevent="onSubmit">
			<div>
				<div class="flex items-center mb-8 gap-4">
					<ButtonBack />
					<button type="submit" class="ml-auto btn btn-icon btn-toolbar text-white hover-margin bg-primary-600 hover:bg-primary-500">
						<font-awesome-icon icon="fa-solid fa-check" />
						<span class="ml-2">Simpan Draft</span>
					</button>
				</div>
				<div class="basic-card">
					<div class="h-1 relative">
						<LoadingLine v-if="isSaving" />
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
						<div>
							<div class="form-group mb-8">
								<label for="textDesc">Pesan Undangan:</label>
								<textarea v-model="v$.message.$model" :class="{ 'invalid': hasSubmitted && v$.message.$invalid }" rows="4"></textarea>
							</div>
							<div class="form-group">
								<label for="inputLetterNo">No. Surat:</label>
								<input v-model="v$.letterNo.$model" id="inputLetterNo">
							</div>
						</div>
						<div>
							<div class="form-group">
								<label for="inputAttachment">File Surat <span class="text-xs font-semibold">(*.pdf)</span>:</label>
								<FileUploadAttachment fieldId="inputAttachment" @change="changeAttachment" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>
<style scoped>

.basic-card {
	@apply overflow-hidden border shadow-lg;
}

.btn-toolbar {
	@apply text-xs font-semibold;
}

</style>