<script setup>
import { ref, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAgendaStore } from "@/stores/agenda";
import { useViewStore } from "@/stores/view";
import LoadingLine from "@/components/ui/LoadingLine.vue";
import ButtonBack from "@/components/ButtonBack.vue";
import FormAgenda1 from "@/components/form-agenda/Section1.vue";
import FormAgenda2 from "@/components/form-agenda/Section2.vue";
import FormAgenda3 from "@/components/form-agenda/Section3.vue";

const isLoaded = ref(false);
const route = useRoute();
const agendaId = computed(() => route.params.id);

const data = reactive({
	title: null,
	color: null,
	desc: null,
	location: null,
	startDate: null,
	endDate: null,
	startTime: null,
	endTime: null,
	message: null,
	letter: null,
	letterNo: null
});

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
	data.startDate = currAgenda.date.start.dateObj;
	data.endDate = currAgenda.date.end.dateObj;
	data.startTime = currAgenda.time.start.h + ":" + currAgenda.time.start.m;
	data.endTime = currAgenda.time.end.h + ":" + currAgenda.time.end.m;
	data.message = currAgenda.message;
	data.letterNo = currAgenda.letterNo;
	isLoaded.value = true;
});

const viewStore = useViewStore();
const showLoader = ref(false);
const router = useRouter();

const saveAgenda = () => {
	const formData = new FormData();
	formData.append("nama", data.title);
	formData.append("tempat", data.location);
	formData.append("warna", data.color);
	formData.append("tanggal_mulai", data.startDate.toISOString().split("T")[0]);
	formData.append("tanggal_selesai", data.endDate.toISOString().split("T")[0]);
	formData.append("mulai_pukul", data.startTime);
	formData.append("sampai_pukul", data.endTime);

	if(data.desc)
		formData.append("deskripsi", data.desc);
	if(data.message)
		formData.append("pesan", data.message);
	if(data.letter)
		formData.append("file", data.letter);
	if(data.letterNo)
		formData.append("no_surat", data.letterNo);

	showLoader.value = true;
	agendaStore.updateAgenda(agendaId.value, formData, success => {
		showLoader.value = false;
		if(!success)
			return viewStore.showToast("Perubahan tidak tersimpan", "Terjadi masalah saat menghubungi server.", false);
		
		agendaStore.fetchAgenda(true);
		viewStore.showToast("Rapat", "Berhasil menyimpan perubahan.", true);
	});
};

const formIndex = ref(0);
const formElm1 = ref(null);
const formElm2 = ref(null);
const formElm3 = ref(null);

const onFormSubmit = async () => {
	const result1 = await formElm1.value.getValue();
	if(result1) {
		data.title = result1.title;
		data.color = result1.color;
		data.desc = result1.desc;
	}

	const result2 = await formElm2.value.getValue();
	if(result2) {
		data.location = result2.location;
		data.startDate = result2.startDate;
		data.endDate = result2.endDate;
		data.startTime = result2.startTime;
		data.endTime = result2.endTime;
	}

	const result3 = await formElm3.value.getValue();
	if(result3) {
		data.message = result3.message;
		data.letter = result3.letter;
		data.letterNo = result3.letterNo;
	}

	saveAgenda();
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Rapat</h2>
		<div class="flex items-center mb-16">
			<ButtonBack />
		</div>
		<div v-if="isLoaded" class="flex flex-col justify-center items-center">
			<div class="flex items-center justify-center gap-4 mb-8">
				<button type="button" @click="formIndex = 0" :class="{ 'active': formIndex === 0 }" class="btn-step">
					<font-awesome-icon icon="fa-solid fa-circle" fixed-width />
				</button>
				<button type="button" @click="formIndex = 1" :class="{ 'active': formIndex === 1 }" class="btn-step">
					<font-awesome-icon icon="fa-solid fa-circle" fixed-width />
				</button>
				<button type="button" @click="formIndex = 2" :class="{ 'active': formIndex === 2 }" class="btn-step">
					<font-awesome-icon icon="fa-solid fa-circle" fixed-width />
				</button>
			</div>
			<div class="w-full md:w-[30rem]">
				<FormAgenda1 v-show="formIndex === 0" ref="formElm1" @submit.prevent="onFormSubmit" :title="data.title" :color="data.color" :desc="data.desc">
					<template #loader>
						<div class="h-1 relative">
							<LoadingLine v-if="showLoader" />
						</div>
					</template>
					<template #handler>
						<div class="flex items-center pb-6 mt-4 px-8">
							<button type="submit" class="ml-auto btn btn-icon text-white transition-colors bg-primary-700 hover:bg-primary-600">
								<font-awesome-icon icon="fa-solid fa-check" fixed-width />
								<span>Simpan</span>
							</button>
						</div>
					</template>
				</FormAgenda1>
				<FormAgenda2 v-show="formIndex === 1" ref="formElm2" @submit.prevent="onFormSubmit" :location="data.location" :startDate="data.startDate" :endDate="data.endDate" :startTime="data.startTime" :endTime="data.endTime">
					<template #loader>
						<div class="h-1 relative">
							<LoadingLine v-if="showLoader" />
						</div>
					</template>
					<template #handler>
						<div class="flex items-center pb-6 mt-4 px-8">
							<button type="submit" class="ml-auto btn btn-icon text-white transition-colors bg-primary-700 hover:bg-primary-600">
								<font-awesome-icon icon="fa-solid fa-check" fixed-width />
								<span>Simpan</span>
							</button>
						</div>
					</template>
				</FormAgenda2>
				<FormAgenda3 v-show="formIndex === 2" ref="formElm3" @submit.prevent="onFormSubmit" :message="data.message" :letterNo="data.letterNo">
					<template #loader>
						<div class="h-1 relative">
							<LoadingLine v-if="showLoader" />
						</div>
					</template>
					<template #handler>
						<div class="flex items-center pb-6 mt-4 px-8">
							<button type="submit" class="ml-auto btn btn-icon text-white transition-colors bg-primary-700 hover:bg-primary-600">
								<font-awesome-icon icon="fa-solid fa-check" fixed-width />
								<span>Simpan</span>
							</button>
						</div>
					</template>
				</FormAgenda3>
			</div>
		</div>
	</div>
</template>
<style scoped>

.basic-card {
	@apply overflow-hidden;
}

.btn-icon {
	@apply gap-2;
}

.btn-step {
	@apply text-gray-400 text-xs;
}

.btn-step.active {
	@apply text-primary-500 text-base;
}

</style>