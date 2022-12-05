<script setup>
import Modal from "@/components/ui/Modal.vue";

const props = defineProps({
	selectedContact: { type: Array }
})
</script>
<template>
	<Modal ref="modal" @close="$emit('cancel')">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">Tambah Kontak</h3>
			</div>
		</template>
		<template #body>
			<div class="py-4 px-8 grid grid-cols-2 gap-4">
				<div></div>
			</div>
		</template>
	</Modal>
</template>