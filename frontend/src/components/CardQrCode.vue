<script setup>
import { ref, computed } from "vue";
import QrcodeVue from "qrcode.vue";

const props = defineProps({
	targetUrl: { type: String, default: null }
});

const url = computed(() => props.targetUrl);
</script>
<template>
	<div class="basic-card">
		<div class="flex items-center justify-around gap-2 mb-4 bg-gray-200">
			<button type="button" class="btn btn-icon transition-colors bg-transparent hover:bg-gray-100 focus:bg-gray-100 text-gray-700 hover:text-primary-600 focus:text-primary-600">
				<font-awesome-icon icon="fa-solid fa-clipboard" fixed-width />
				<span class="ml-1 mt-1 text-xs font-semibold">Copy URL</span>
			</button>
			<button type="button" class="btn btn-icon transition-colors bg-transparent hover:bg-gray-100 focus:bg-gray-100 text-gray-700 hover:text-primary-600 focus:text-primary-600">
				<font-awesome-icon icon="fa-solid fa-qrcode" fixed-width />
				<span class="ml-1 mt-1 text-xs font-semibold">Download</span>
			</button>
		</div>
		<div class="p-4 flex justify-center">
			<QrcodeVue value="url" :size="150" level="H" />
		</div>
	</div>
</template>
<style scoped>
	
.basic-card {
	@apply border shadow-sm overflow-hidden;
}

</style>