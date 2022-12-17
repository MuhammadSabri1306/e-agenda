<script setup>
import { ref, onMounted } from "vue";
import { useViewStore } from "@/stores/view";
import { StreamBarcodeReader } from "vue-barcode-reader";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["close", "scan"]);

const open = ref(true);
const show = ref(false);

onMounted(() => {
	if(!show.value)
		show.value = true;
});

const onHidden = () => {
	emit("close");
	open.value = false;
};

const showScanner = ref(false);
const viewStore = useViewStore();

const onDecode = roomUrl => {
	showScanner.value = false;
	alert(roomUrl);
	if(roomUrl && roomUrl !== undefined)
		return viewStore.showToast("QR Code", "QR Code Rapat tidak terdeteksi.", false);
	
	roomUrl = roomUrl.split("/");
	if(roomUrl.length < 1)
		return viewStore.showToast("QR Code", "QR Code Rapat tidak terdeteksi.", false);
	
	emit("scan", roomUrl[roomUrl.length - 1]);
};
</script>
<template>
	<div v-if="open">
		<Transition name="offcanvas-fade" @after-leave="onHidden">
			<div v-show="show" class="offcanvas-scanner" @click.self="show = false">
				<div class="offcanvas-scanner-content fixed bottom-0 right-0 w-full landscape:md:w-2/3 landscape:lg:w-1/2 landscape:xl:w-1/3 min-h-[20rem] landscape:h-full bg-[#181818] landscape:border border-[#121212] shadow-lg text-gray-600 rounded-t-2xl landscape:rounded-t-none overflow-y-auto grid grid-cols-1 grid-rows-[auto_1fr]">
					<div class="flex items-start">
						<h3 class="text-xl lg:text-lg font-semibold p-8 landscape:p-4 text-gray-100">Detail Agenda</h3>
						<button type="button" @click="show = false" class="ml-auto p-4 text-gray-500 transition-opacity opacity-80 hover:opacity-100">
							<XMarkIcon class="w-8 h-8" />
						</button>
					</div>
					<div class="landscape:px-8 landscape:pt-4 pb-8 flex justify-center items-center">
						<div v-show="showScanner">
							<StreamBarcodeReader @decode="onDecode" @loaded="showScanner = true" />
							<p class="text-sm font-semibold text-blue-600 text-shadow-black text-center mt-4">Scan QR Code Rapat</p>
						</div>
						<div v-if="!showScanner" class="w-full aspect-[1.5/1] flex justify-center items-center">
							<span class="text-4xl text-gray-400">
								<font-awesome-icon icon="fa-solid fa-circle-notch" spin />
							</span>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>
<style scoped>
	
.offcanvas-scanner {
	@apply fixed w-screen h-screen top-0 left-0 bg-gray-900/70 z-[7777];
}

.offcanvas-fade-enter-active,
.offcanvas-fade-leave-active {
	transition: opacity 0.3s;
}

.offcanvas-fade-enter-from,
.offcanvas-fade-leave-to {
	@apply opacity-0;
}

.offcanvas-fade-enter-to,
.offcanvas-fade-leave-from {
	@apply opacity-100;
}

.offcanvas-fade-enter-active .offcanvas-scanner-content,
.offcanvas-fade-leave-active .offcanvas-scanner-content {
	transition: bottom 0.3s, right 0.3s;
}

.offcanvas-fade-enter-from .offcanvas-scanner-content,
.offcanvas-fade-leave-to .offcanvas-scanner-content {
	@apply bottom-[-101vh] landscape:bottom-0 right-0 landscape:right-[-101vw] ;
}

.offcanvas-fade-enter-to .offcanvas-scanner-content,
.offcanvas-fade-leave-from .offcanvas-scanner-content {
	@apply bottom-0 right-0;
}

</style>