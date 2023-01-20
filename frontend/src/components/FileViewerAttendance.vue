<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAgendaStore } from "@/stores/agenda";
import PDFViewer from "pdf-viewer-vue";
import ModalUploadAttFile from "@/components/ModalUploadAttFile.vue";
import { ArrowTopRightOnSquareIcon, MagnifyingGlassPlusIcon, ArrowUpTrayIcon, DocumentTextIcon } from "@heroicons/vue/24/outline";

const agendaStore = useAgendaStore();
const route = useRoute();

const attendance = computed(() => agendaStore.attendance);
const agendaId = computed(() => route.params.id);
const isAttLoaded = ref(false);

const fileUrl = computed(() => {
	const attendance = agendaStore.attendance;
	if(attendance.length < 1)
		return null;

	const data = attendance.find(item => item.id == agendaId.value);
	if(!data || !data.file_absen)
		return null;
	
	return "https://e-agenda.taekwondosulsel.info/storage/" + data.file_absen;
});

agendaStore.fetchAttendance(false, success => {
	isAttLoaded.value = success;
});

const showModalFile = ref(false);
const onFileChanged = () => {
	isAttLoaded.value = false;
	showModalFile.value = false;
	agendaStore.fetchAttendance(true, success => isAttLoaded.value = success);
};

const onDownload = () => {};
</script>
<template>
	<div v-if="isAttLoaded">
		<div class="upload-container flex flex-wrap items-start gap-x-6 gap-y-8">
			<div v-if="fileUrl" class="flex flex-col justify-center items-center">
				<a :href="fileUrl" target="_blank" class="btn-upload basic-card group">
					<div>
						<span><MagnifyingGlassPlusIcon class="h-6 w-6 text-gray-600" /></span>
						<span><ArrowTopRightOnSquareIcon class="h-6 w-6 text-primary-600" /></span>
					</div>
				</a>
				<span class="mt-3 truncate text-center text-[0.8125rem] leading-6 text-gray-500">Buka File</span>
			</div>
			<div class="flex flex-col justify-center items-center">
				<button type="button" @click="showModalFile = true" class="btn-upload basic-card group">
					<div>
						<span><DocumentTextIcon class="h-6 w-6 text-gray-600" /></span>
						<span><ArrowUpTrayIcon class="h-6 w-6 text-primary-600" /></span>
					</div>
				</button>
				<span v-if="fileUrl" class="mt-3 truncate text-center text-[0.8125rem] leading-6 text-gray-500">Ganti File</span>
				<span v-else class="mt-3 truncate text-center text-[0.8125rem] leading-6 text-gray-500">Upload File</span>
			</div>
		</div>
		<ModalUploadAttFile v-if="showModalFile" :agendaId="agendaId" @cancel="showModalFile = false" @changed="onFileChanged" />
	</div>
</template>
<style scoped>
	
.upload-container .btn-upload {
	@apply p-8 overflow-hidden relative bg-white shadow-none border border-gray-300;
}

.upload-container .btn-upload > div {
	@apply absolute left-0 transition-all top-0 hover:-top-full;
}

.upload-container .btn-upload,
.upload-container .btn-upload span {
	@apply w-[8rem] h-[8.5rem];
}

.upload-container .btn-upload span {
	@apply flex justify-center items-center;
}

</style>