<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAgendaStore } from "@/stores/agenda";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import LoadingLine from "@/components/ui/LoadingLine.vue";
import ButtonBack from "@/components/ButtonBack.vue";
import FileUploadAttachment from "@/components/FileUploadAttachment.vue";
import ListInvitationContact from "@/components/ListInvitationContact.vue";

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
	attachmentFile: { value: null },
	contact: { value: [] }
});

const changeContact = contactList => data.contact = contactList;
const changeAttachment = file => {
	data.attachmentFile = file;
};

const isSaving = ref(false);
const hasSubmitted = ref(false);
const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid || isSaving.value)
		return;
	
	const body = {
		message: data.message,
		attachment: data.attachmentFile,
		contact: data.contact
	};
	isSaving.value = true;
	console.log(body);
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Undangan Rapat</h2>
		<form @submit.prevent="onSubmit">
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
					<div class="grid grid-cols-2 gap-8 p-8">
						<div class="flex flex-col gap-8">
							<div class="form-group">
								<label>Nama Agenda:</label>
								<p class="text-gray-800">{{ agendaName }}</p>
							</div>
							<div class="form-group">
								<label for="textDesc">Pesan Undangan:</label>
								<textarea v-model="v$.message.$model" :class="{ 'invalid': hasSubmitted && v$.message.$invalid }" rows="4"></textarea>
							</div>
						</div>
						<div class="flex flex-col gap-8">
							<div class="form-group">
								<label for="inputAttachment">Lampiran <span class="text-xs font-semibold">(*.pdf)</span></label>
								<FileUploadAttachment fieldId="inputAttachment" @change="changeAttachment" />
							</div>
						</div>
					</div>
					<div class="form-group px-8 pb-8">
						<label>Kontak:</label>
						<ListInvitationContact @change="changeContact" />
					</div>
					<div class="flex justify-end p-8">
						<button type="submit" class="btn btn-icon text-white hover-margin bg-primary-700 hover:bg-primary-600">
							<font-awesome-icon icon="fa-solid fa-check" />
							<span class="ml-2">Buat Undangan</span>
						</button>
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