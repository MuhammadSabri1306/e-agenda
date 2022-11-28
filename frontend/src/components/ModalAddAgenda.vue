<script setup>
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import Modal from "@/components/ui/Modal.vue";
import SelectColor from "@/components/SelectColor.vue";

const emit = defineEmits(["cancel"]);
const { data, v$ } = useDataForm({
	title: { required },
	location: { required },
	color: { required },
	startDate: {},
	endDate: {},
	startTime: {},
	endTime: {}
});

data.startDate = data.endDate = new Date().toISOString().slice(0, 10);
data.startTime = data.endTime = "07:00";
data.color = "blue";

const onSubmit = () => {
	console.log(data.color);
};
</script>
<template>
	<Modal ref="modal" @close="$emit('cancel')">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">Agenda Baru</h3>
			</div>
		</template>
		<template #body>
			<div class="py-4 px-8">
				<form @submit.prevent="onSubmit">
					<div class="grid grid-cols-1 gap-4 mb-8">
						<div class="flex gap-4">
							<label class="text-gray-700 text-sm font-medium my-auto">Warna</label>
							<SelectColor defaultValue="data.color" @change="value => data.color = value" class="w-[10rem]" />
						</div>
						<div class="form-group">
							<label for="inputTitle">Judul Agenda *</label>
							<input type="text" v-model="v$.title.$model" id="inputTitle">
						</div>
						<div class="form-group">
							<label for="inputLocation">Tempat *</label>
							<input type="text" v-model="v$.location.$model" id="inputLocation">
						</div>
					</div>
					<div class="flex justify-end mb-4">
						<button type="submit" class="text-white bg-primary-700 hover:bg-primary-600 px-4 py-2 rounded text-sm">Tambah</button>
					</div>
				</form>
			</div>
		</template>
	</Modal>
</template>