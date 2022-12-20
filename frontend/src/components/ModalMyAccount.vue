<script setup>
import { ref } from "vue";
import { useAccountStore } from "@/stores/account";
import { useDataForm } from "@/modules/data-form";
import Modal from "@/components/ui/Modal.vue";

const accountStore = useAccountStore();


const showForm = ref(false);
</script>
<template>
	<Modal ref="modal" @close="$emit('cancel')">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">Detail Akun</h3>
			</div>
		</template>
		<template #body>
			<div>
				<div v-if="!showForm" class="py-4 px-8 grid grid-cols-[auto_1fr] gap-x-2 gap-y-8">
					<p>Nama</p>
				</div>
				<form v-else @submit.prevent="">
					<div class="py-4 px-8 grid grid-cols-1 gap-4">
						<div class="form-group">
							<label for=""></label>
						</div>
					</div>
				</form>
			</div>
		</template>
	</Modal>
</template>