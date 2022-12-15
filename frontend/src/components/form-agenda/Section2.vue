<script setup>
import { ref } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import { DatePicker } from "v-calendar";

const props = defineProps({
	location: { type: String, default: null },
	startDate: { type: Object, default: new Date() },
	endDate: { type: Object, default: new Date() },
	startTime: { type: String, default: "09:00" },
	endTime: { type: String, default: "09:00" }
});

const { data, v$ } = useDataForm({
	location: { value: props.location, required },
	date: {
		value: { start: props.startDate, end: props.endDate },
		required
	},
	startTime: { value: props.startTime, required },
	endTime: { value: props.endTime, required }
});

const hasSubmitted = ref(false);
const getValue = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();

	if(!isValid)
		return null;

	return {
		location: data.location,
		startDate: data.date.start.toISOString().split("T")[0],
		endDate: data.date.end.toISOString().split("T")[0],
		startTime: data.startTime,
		endTime: data.endTime
	};
};

defineExpose({ getValue });
</script>
<template>
	<form>
		<div class="basic-card">
			<slot name="loader"></slot>
			<div class="grid grid-cols-1 gap-8 p-8">
				<div class="form-group">
					<label for="inputLocation">Tempat *</label>
					<input type="text" v-model="v$.location.$model" :class="{ 'invalid': hasSubmitted && v$.location.$invalid }" id="inputLocation">
				</div>
				<div class="form-group">
					<label>Waktu *</label>
					<div class="grid grid-cols-[1fr_auto_1fr] gap-2 form-group items-center">
						<input type="time" v-model="v$.startTime.$model">
						<span class="text-gray-500 text-sm">
							<font-awesome-icon icon="fa-solid fa-left-right" />
						</span>
						<input type="time" v-model="v$.endTime.$model">
					</div>
				</div>
				<div class="form-group">
					<label>Tanggal *</label>
					<div class="flex justify-center">
						<DatePicker v-model="data.date" :color="data.color" is-range />
					</div>
				</div>
			</div>
			<slot name="handler"></slot>
		</div>
	</form>
</template>