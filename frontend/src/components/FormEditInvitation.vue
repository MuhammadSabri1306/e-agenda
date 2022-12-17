<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAgendaStore } from "@/stores/agenda";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import LoadingLine from "@/components/ui/LoadingLine.vue";
import ButtonBack from "@/components/ButtonBack.vue";
import FileUpload from "@/components/ui/FileUpload.vue";
import ListInvitationContact from "@/components/ListInvitationContact.vue";

const route = useRoute();
const invitationId = computed(() => route.params.id);
const agendaStore = useAgendaStore();

const agendaName = ref(null);
const attachmentFilename = ref("");
const { data, v$ } = useDataForm({
	message: { value: null, required },
	attachmentFile: { value: null },
	contact: { value: [] }
});

const isLoaded = ref(true);
agendaStore.fetchInvitation(false, success => {
	return;
	if(!success)
		return;

	const currInv = agendaStore.invitation.find(item => item.id == invitationId.value);
	if(!currInv)
		return;

	agendaName.value = currInv.agenda.title;
	data.message = currInv.message;
	attachmentFilename.value = currInv.attachment;
	data.contact = currInv.contact;
	isLoaded.value = true;
	console.log("Terjadi")
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

const isSending = ref(false);
const onSend = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid || isSending.value)
		return;

	const body = {
		message: data.message,
		attachment: data.attachmentFile,
		contact: data.contact
	};
	isSending.value = true;
	console.log(body);
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Undangan Rapat</h2>
		<form v-if="isLoaded" @submit.prevent="onSubmit">
			<div>
				<div class="flex items-center mb-8 gap-4">
					<ButtonBack />
					<button type="submit" class="ml-auto btn btn-icon btn-toolbar text-white hover-margin bg-primary-600 hover:bg-primary-500">
						<font-awesome-icon icon="fa-solid fa-check" />
						<span class="ml-2">Simpan Draft</span>
					</button>
					<button type="button" class="btn btn-icon btn-toolbar text-white hover-margin bg-red-500 hover:bg-red-400">
						<font-awesome-icon icon="fa-solid fa-xmark" />
						<span class="ml-2">Reset Draft</span>
					</button>
				</div>
				<div class="basic-card">
					<div class="h-1 relative">
						<LoadingLine v-if="isSaving" />
					</div>
					<div class="form-group p-8">
						<label>Kontak:</label>
						<ListInvitationContact :value="data.contact" @change="changeContact" />
					</div>
					<div class="flex justify-end p-8">
						<button type="button" @click="onSend" class="btn btn-icon text-white hover-margin bg-green-600 hover:bg-green-500">
							<span v-if="isSending">
								<font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width />
							</span>
							<span v-else class="icon-wa">
								<font-awesome-icon icon="fa-brands fa-whatsapp" fixed-width />
							</span>
							<span class="ml-2">Kirim Undangan</span>
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

.icon-wa svg {
	@apply w-6 h-6;
}

</style>