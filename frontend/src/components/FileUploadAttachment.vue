<script setup>
import { ref, computed } from "vue";
import FileUpload from "@/components/ui/FileUpload.vue";

const emit = defineEmits(["change"]);
const props = defineProps({
	uploadedFilename: { type: String, default: null },
	fieldId: String
});

const filename = ref(props.uploadedFilename);
const showFileUpload = computed(() => !filename.value);

const onChange = files => {
	const file = files[0];
	filename.value = file.name;
	emit("change", file);
};
</script>
<template>
	<div class="relative">
		<div v-show="!showFileUpload" class="absolute left-0 top-0 w-full h-full border-2 border-primary-100 rounded-2xl flex flex-col justify-center items-center p-16">
			<div class="btn btn-icon text-white bg-gray-700">
				<font-awesome-icon icon="fa-solid fa-cloud-arrow-up" />
				<span class="ml-2">{{ filename }}</span>
			</div>
		</div>
		<div :class="{ 'opacity-0': !showFileUpload }" class="z-[2]">
			<FileUpload :fieldId="fieldId" fieldAccept="application/pdf" regexAccept="pdf" @change="onChange" />
		</div>
		<!-- <FileUpload :fieldId="fieldId" :fieldAccept="fieldAccept" :regexAccept="regexAccept" :placeholder="placeholder" class="z-[2]" /> -->
	</div>
</template>