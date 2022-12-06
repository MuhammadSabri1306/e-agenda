<script setup>
import { ref } from "vue";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import SelectColor from "@/components/SelectColor.vue";
import { DatePicker } from "v-calendar";
import LoadingLine from "@/components/ui/LoadingLine.vue";
import ButtonBack from "@/components/ButtonBack.vue";

const { data, v$ } = useDataForm({
	title: { required },
	location: { required },
	color: { required },
	desc: { required },
	date: {
		value: {
			start: new Date(),
			end: new Date()
		}
	},
	startTime: { value: "00:00" },
	endTime: { value: "00:00" }
});

const showLoader = ref(false);
const hasSubmitted = ref(false);
const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid)
		return;

	const body = {
		nama: data.title,
		tempat: data.location,
		color: data.color,
		desc: data.desc,
		tanggal_mulai: data.date.start,
		tanggal_selesai: data.date.end,
		mulai_pukul: data.startTime,
		sampai_pukul: data.endTime
	};
	console.log(body);
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Rapat</h2>
		<div class="flex items-center mb-8">
			<ButtonBack />
		</div>
		<form @submit.prevent="onSubmit">
			<div class="basic-card">
				<div class="h-1 relative">
					<LoadingLine v-if="showLoader" />
				</div>
				<div class="grid grid-cols-1 gap-8 p-8">
					<div class="form-group">
						<label for="inputTitle">Judul Rapat *</label>
						<input type="text" v-model="v$.title.$model" :class="{ 'invalid': hasSubmitted && v$.title.$invalid }" id="inputTitle">
					</div>
					<div class="form-group">
						<label for="textDesc">Deskripsi *</label>
						<textarea v-model="v$.desc.$model" :class="{ 'invalid': hasSubmitted && v$.desc.$invalid }" rows="4"></textarea>
					</div>
					<div class="flex flex-wrap items-start gap-8">
						<div class="grow grid grid-cols-1 gap-8">
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
								<label>Warna *</label>
								<SelectColor position="top" defaultValue="data.color" @change="value => data.color = value" class="w-[10rem]" />
							</div>
						</div>
						<div class="form-group">
							<label>Tanggal *</label>
							<DatePicker v-model="data.date" :color="data.color" is-range />
						</div>
					</div>
				</div>
				<div class="flex justify-end pb-8 px-8">
					<button type="submit" class="btn text-white hover-margin bg-primary-700 hover:bg-primary-600">Buat Agenda</button>
				</div>
			</div>
		</form>
	</div>
</template>
<style scoped>

.basic-card {
	@apply overflow-hidden;
}

</style>