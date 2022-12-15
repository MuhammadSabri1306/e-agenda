<script setup>
import { ref } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import { useDataForm } from "@/modules/data-form";
import { DatePicker } from "v-calendar";
import FileUploadAttachment from "@/components/FileUploadAttachment.vue";

const props = defineProps({
	message: { type: String, default: null },
	letterNo: { type: String, default: null }
});

const { data, v$ } = useDataForm({
	message: { value: props.message },
	letter: { value: null },
	letterNo: { value: props.letterNo }
});

const changeAttachment = file => data.letter = file;
const hasSubmitted = ref(false);

const getValue = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	
	if(!isValid)
		return null;
	
	return {
		message: data.message,
		letter: data.letter,
		letterNo: data.letterNo
	};
};

defineExpose({ getValue });
</script>
<template>
	<form>
		<div class="basic-card">
			<slot name="loader"></slot>
			<div class="grid grid-cols-1 gap-8 p-8">
				<div class="form-group mb-8">
					<label for="textDesc">Pesan Undangan</label>
					<textarea v-model="v$.message.$model" :class="{ 'invalid': hasSubmitted && v$.message.$invalid }" rows="4"></textarea>
				</div>
				<div class="form-group">
					<label for="inputLetterNo">No. Surat</label>
					<input v-model="v$.letterNo.$model" id="inputLetterNo">
				</div>
				<div class="form-group">
					<label for="inputAttachment">File Surat <span class="text-xs font-semibold">(*.pdf)</span></label>
					<FileUploadAttachment fieldId="inputAttachment" @change="changeAttachment" />
				</div>
			</div>
			<slot name="handler"></slot>
		</div>
	</form>
</template>