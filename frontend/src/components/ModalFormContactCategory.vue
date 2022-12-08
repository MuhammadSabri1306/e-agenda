<script setup>
import { ref, computed } from "vue";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import Modal from "@/components/ui/Modal.vue";
import LoadingLine from "@/components/ui/LoadingLine.vue";

const emit = defineEmits(["cancel", "new", "update"]);
const props = defineProps({
	categoryType: { type: String, required: true },
	categoryId: { default: null },
	categoryName: { default: null }
});
const { data, v$ } = useDataForm({
	name: { value: props.categoryName, required }
});

const isNewCategory = computed(() => !props.categoryId);
const hasSubmitted = ref(false);
const showLoader = ref(false);

const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid)
		return;

	showLoader.value = true;
	const { name } = data;

	// NEW CATEGORY
	if(!props.categoryId) {
		emit("new", props.categoryType, name);
		return;
	}

	// UPDATE CATEGORY
	emit("update", props.categoryType, props.categoryId, name);
};
</script>
<template>
	<Modal ref="modal" @close="$emit('cancel')">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">{{ !props.categoryId ? 'Kategori Baru' : 'Update Kategori' }}</h3>
			</div>
		</template>
		<template #body>
			<div>
				<div class="h-1 relative">
					<LoadingLine v-if="showLoader" />
				</div>
				<form @submit.prevent="onSubmit" class="py-4 px-8">
					<div class="grid grid-cols-1 gap-8 mb-8">
						<p>
							<span class="font-semibold text-xs text-white bg-gray-600 mt-4 px-3 py-1 rounded-pill uppercase">{{ categoryType }}</span>
						</p>
						<div class="form-group">
							<label for="inputName">Nama Kategori *</label>
							<input type="text" v-model="v$.name.$model" :class="{ 'invalid': hasSubmitted && v$.name.$invalid }" id="inputName">
						</div>
					</div>
					<div class="flex justify-end mb-4">
						<button type="submit" class="btn btn-icon text-white transition-colors bg-primary-600 hover:bg-primary-500">
							<font-awesome-icon icon="fa-solid fa-plus" fixed-width />
							<span v-if="!categoryId" class="ml-2">Buat Kategori</span>
							<span v-else class="ml-2">Simpan Perubahan</span>
						</button>
					</div>
				</form>
			</div>
		</template>
	</Modal>
</template>