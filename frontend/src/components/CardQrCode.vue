<script setup>
import { ref, computed } from "vue";
import jsPDF from "jspdf";
import QrcodeVue from "qrcode.vue";

const props = defineProps({
	targetUrl: { type: String, default: null },
	filename: { type: String, default: "qrcode" }
});

const url = computed(() => props.targetUrl);

const copyUrl = () => {
	navigator.clipboard.writeText(url.value)
		.then(() => {
			console.log("Copied!");
		}, () => {
			console.log("Copy error");
		});
};

const qrCodeCanvas = ref(null);
const saveQrCode = () => {
	const qrCode = qrCodeCanvas.value.$el;
	const doc = new jsPDF("p", "px", [1000, 1000]);

	const size = doc.internal.pageSize.getWidth() - 100;
	doc.addImage(qrCode, "PNG", 50, 50, size, size);
	doc.save(props.filename + ".pdf");
};
</script>
<template>
	<div class="basic-card">
		<div class="flex items-center justify-around gap-2 mb-4 bg-gray-200">
			<button type="button" @click="copyUrl" class="btn btn-icon transition-colors bg-transparent hover:bg-gray-100 focus:bg-gray-100 text-gray-700 hover:text-primary-600 focus:text-primary-600">
				<font-awesome-icon icon="fa-solid fa-clipboard" fixed-width />
				<span class="ml-1 mt-1 text-xs font-semibold">Copy URL</span>
			</button>
			<button type="button" @click="saveQrCode" class="btn btn-icon transition-colors bg-transparent hover:bg-gray-100 focus:bg-gray-100 text-gray-700 hover:text-primary-600 focus:text-primary-600">
				<font-awesome-icon icon="fa-solid fa-qrcode" fixed-width />
				<span class="ml-1 mt-1 text-xs font-semibold">Download</span>
			</button>
		</div>
		<div class="p-4 flex justify-center">
			<QrcodeVue :value="url" :size="150" level="H" />
			<QrcodeVue ref="qrCodeCanvas" :value="url" :size="1000" level="H" render-as="canvas" class="hidden" />
		</div>
	</div>
</template>
<style scoped>
	
.basic-card {
	@apply border shadow-sm overflow-hidden;
}

</style>