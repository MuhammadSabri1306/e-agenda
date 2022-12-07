<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAgendaStore } from "@/stores/agenda";
import { useViewStore } from "@/stores/view";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import { objToTimeStr } from "@/modules/date-id";
import SelectColor from "@/components/SelectColor.vue";
import { DatePicker } from "v-calendar";
import LoadingLine from "@/components/ui/LoadingLine.vue";
import ButtonBack from "@/components/ButtonBack.vue";

const { data, v$ } = useDataForm({
	title: { required },
	location: { required },
	color: { value: "blue", required },
	desc: {},
	date: {
		value: {
			start: new Date(),
			end: new Date()
		}
	},
	startTime: { value: "00:00" },
	endTime: { value: "00:00" }
});

const isLoaded = ref(false);
const route = useRoute();
const agendaId = computed(() => route.params.id);

const agendaStore = useAgendaStore();
agendaStore.fetchAgenda(false, success => {
	if(!success)
		return;

	const currAgenda = agendaStore.getById(agendaId.value);
	if(!currAgenda)
		return;

	data.title = currAgenda.title;
	data.location = currAgenda.location;
	data.color = currAgenda.color;
	data.desc = currAgenda.desc;
	data.date.start = currAgenda.date.start.dateObj;
	data.date.end = currAgenda.date.end.dateObj;
	data.startTime = currAgenda.time.start.h + ":" + currAgenda.time.start.m;
	data.endTime = currAgenda.time.end.h + ":" + currAgenda.time.end.m;
	isLoaded.value = true;
});

const showLoader = ref(false);
const hasSubmitted = ref(false);
const viewStore = useViewStore();
const router = useRouter();

const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid)
		return;

	const body = {
		nama: data.title,
		tempat: data.location,
		warna: data.color,
		tanggal_mulai: data.date.start.toISOString().split("T")[0],
		tanggal_selesai: data.date.end.toISOString().split("T")[0],
		mulai_pukul: data.startTime,
		sampai_pukul: data.endTime
	};

	if(data.desc)
		body.deskripsi = data.desc;

	showLoader.value = true;
	agendaStore.updateAgenda(agendaId.value, body, success => {
		showLoader.value = false;
		if(!success) {
			viewStore.showToast("Gagal menyimpan perubahan", "Terjadi masalah saat menghubungi server.", false);
			return;
		}

		agendaStore.fetchAgenda(true);
		router.push("/agenda");
	});
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Rapat</h2>
		<div class="flex items-center mb-8">
			<ButtonBack />
		</div>
		<form v-if="isLoaded" @submit.prevent="onSubmit">
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
								<SelectColor position="top" :defaultValue="data.color" @change="value => data.color = value" class="w-[10rem]" />
							</div>
						</div>
						<div class="form-group">
							<label>Tanggal *</label>
							<DatePicker v-model="data.date" :color="data.color" is-range />
						</div>
					</div>
				</div>
				<div class="flex justify-end pb-8 px-8">
					<button type="submit" class="btn text-white hover-margin bg-primary-700 hover:bg-primary-600">Simpan Perubahan</button>
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