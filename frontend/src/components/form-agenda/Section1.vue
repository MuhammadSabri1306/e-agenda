<script setup>
import { ref } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import SelectColor from "@/components/SelectColor.vue";

const props = defineProps({
	title: { type: String, default: null },
	color: { type: String, default: "blue" },
	desc: { type: String, default: null }
});

const { data, v$ } = useDataForm({
	title: { value: props.title, required },
	color: { value: props.color, required },
	desc: { value: props.desc }
});

const hasSubmitted = ref(false);
const getValue = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();

	if(!isValid)
		return null;

	return {
		title: data.title,
		color: data.color,
		desc: data.desc
	};
};

defineExpose({ getValue });
</script>
<template>
	<form @submit.prevent="onSubmit">
		<div class="basic-card">
			<slot name="loader"></slot>
			<div class="grid grid-cols-1 gap-8 p-8">
				<div class="form-group">
					<label>Warna *</label>
					<SelectColor position="top" defaultValue="data.color" @change="value => data.color = value" class="w-[10rem]" />
				</div>
				<div class="form-group">
					<label for="inputTitle">Judul Rapat *</label>
					<input type="text" v-model="v$.title.$model" :class="{ 'invalid': hasSubmitted && v$.title.$invalid }" id="inputTitle">
				</div>
				<div class="form-group">
					<label for="textDesc">Deskripsi</label>
					<textarea v-model="v$.desc.$model" :class="{ 'invalid': hasSubmitted && v$.desc.$invalid }" rows="4"></textarea>
				</div>
			</div>
			<slot name="handler"></slot>
		</div>
	</form>
</template>