<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAgendaStore } from "@/stores/agenda";
import { useViewStore } from "@/stores/view";
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

const contacts = ref([]);
const hasSubmitted = ref(false);
const isSending = ref(false);

const onSend = async () => {
	hasSubmitted.value = true;
	if(contacts.value.length < 1)
		return;

	const body = {
		rapatId: agendaId.value,
		contacts: contacts.value
	};

	isSending.value = true;
	agendaStore.sendInvitation(body, success => {
		isSending.value = false;
		hasSubmitted.value = false;

		if(!success) {
			viewStore.showToast("Koneksi gagal", "Terjadi masalah saat menghubungi server.", false);
			return;
		}
		
		viewStore.showToast("Undangan Rapat", "Undangan rapat anda telah tersimpan di server untuk segera dikirim.", true);
		contacts.value.splice(0);
	});
};
</script>
<template>
	<div>
		<form v-if="isLoaded" @submit.prevent="onSubmit">
			<div>
				<div class="flex items-center mb-8 gap-4">
					<ButtonBack />
				</div>
				<div class="py-8 md:px-8">
					<ListInvitationContact :value="contacts" @change="val => contacts = val" />
					<p v-if="hasSubmitted && contacts.length < 1" class="shaked-text mt-4 px-8 text-sm font-semibold text-red-700 text-center">Belum ada kontak yang dipilih</p>
				</div>
				<div class="flex justify-end p-8">
					<button v-if="!isSending" type="button" @click="onSend" class="btn btn-icon text-white hover-margin bg-green-600 hover:bg-green-500">
						<span class="icon-wa">
							<font-awesome-icon icon="fa-brands fa-whatsapp" fixed-width />
						</span>
						<span class="ml-2">Kirim Undangan</span>
					</button>
					<button v-else type="button" disabled class="btn btn-icon text-white bg-green-500">
						<span>
							<font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width />
						</span>
						<span class="ml-2">Mengirim</span>
					</button>
				</div>
			</div>
		</form>
		<div v-else class="p-8 space-y-2.5">
			<div class="flex items-center w-full space-x-2">
		        <div class="skeleton-loader skeleton-text w-32"></div>
		        <div class="skeleton-loader skeleton-text w-24"></div>
		        <div class="skeleton-loader skeleton-text w-full"></div>
		    </div>
		    <div class="flex items-center w-full space-x-2 max-w-[480px]">
		        <div class="skeleton-loader skeleton-text w-full"></div>
		        <div class="skeleton-loader skeleton-text w-full"></div>
		        <div class="skeleton-loader skeleton-text w-24"></div>
		    </div>
		    <div class="flex items-center w-full space-x-2 max-w-[400px]">
		        <div class="skeleton-loader skeleton-text w-full"></div>
		        <div class="skeleton-loader skeleton-text w-80"></div>
		        <div class="skeleton-loader skeleton-text w-full"></div>
		    </div>
		    <div class="flex items-center w-full space-x-2 max-w-[480px]">
		        <div class="skeleton-loader skeleton-text w-full"></div>
		        <div class="skeleton-loader skeleton-text w-full"></div>
		        <div class="skeleton-loader skeleton-text w-24"></div>
		    </div>
		    <div class="flex items-center w-full space-x-2 max-w-[440px]">
		        <div class="skeleton-loader skeleton-text w-32"></div>
		        <div class="skeleton-loader skeleton-text w-24"></div>
		        <div class="skeleton-loader skeleton-text w-full"></div>
		    </div>
		    <div class="flex items-center w-full space-x-2 max-w-[360px]">
		        <div class="skeleton-loader skeleton-text w-full"></div>
		        <div class="skeleton-loader skeleton-text w-80"></div>
		        <div class="skeleton-loader skeleton-text w-full"></div>
		    </div>
		</div>
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