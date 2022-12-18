<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAgendaStore } from "@/stores/agenda";
import { useViewStore } from "@/stores/view";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import LoadingLine from "@/components/ui/LoadingLine.vue";
import ButtonBack from "@/components/ButtonBack.vue";
import FileUpload from "@/components/ui/FileUpload.vue";
import ListInvitationContact from "@/components/ListInvitationContact.vue";

const route = useRoute();
const agendaId = computed(() => route.params.agendaId);
const agendaStore = useAgendaStore();
const currAgenda = computed(() => agendaStore.getById(agendaId.value));
const isLoaded = ref(false);

const viewStore = useViewStore();
agendaStore.fetchAgenda(false, success => {
	if(!success)
		return viewStore.showToast("Koneksi gagal", "Terjadi masalah saat menghubungi server.");
	isLoaded.value = true;
});

const { data, v$ } = useDataForm({
	contact: { value: [] }
});

const isSaving = ref(false);
const hasSubmitted = ref(false);
const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid || isSaving.value)
		return;

	const body = {
		rapatId: agendaId.value,
		contacts: data.contact
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
		rapatId: agendaId.value,
		contacts: data.contact
	};
	isSending.value = true;
	console.log(body);
};
</script>
<template>
	<div>
		<form v-if="isLoaded" @submit.prevent="onSubmit">
			<div>
				<div class="flex items-center mb-8 gap-4">
					<ButtonBack />
					<!-- <button type="submit" class="ml-auto btn btn-icon btn-toolbar text-white hover-margin bg-primary-600 hover:bg-primary-500">
						<font-awesome-icon icon="fa-solid fa-check" />
						<span class="ml-2">Simpan Draft</span>
					</button>
					<button type="button" class="btn btn-icon btn-toolbar text-white hover-margin bg-red-500 hover:bg-red-400">
						<font-awesome-icon icon="fa-solid fa-xmark" />
						<span class="ml-2">Reset Draft</span>
					</button> -->
				</div>
				<div class="h-1 relative pt-4">
					<LoadingLine v-if="isSaving" />
				</div>
				<div class="py-8 md:px-8">
					<ListInvitationContact :value="data.contact" @change="val => data.contact = val" />
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