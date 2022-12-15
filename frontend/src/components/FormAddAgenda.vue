<script setup>
import { ref, reactive, computed } from "vue";
import { useAgendaStore } from "@/stores/agenda";
import { useViewStore } from "@/stores/view";
import LoadingLine from "@/components/ui/LoadingLine.vue";
import ButtonBack from "@/components/ButtonBack.vue";
import FormAgenda1 from "@/components/form-agenda/Section1.vue";
import FormAgenda2 from "@/components/form-agenda/Section2.vue";
import FormAgenda3 from "@/components/form-agenda/Section3.vue";

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
const viewStore = useViewStore();
const showLoader = ref(false);

const saveAgenda = () => {
	const body = {
		nama: data.title,
		tempat: data.location,
		warna: data.color,
		tanggal_mulai: data.startDate,
		tanggal_selesai: data.endDate,
		mulai_pukul: data.startTime,
		sampai_pukul: data.endTime
	};

	if(data.desc)
		body.deskripsi = data.desc;
	if(data.pesan)
		body.pesan = data.message;
	if(data.letter)
		body.file = data.letter;
	if(data.letterNo)
		body.no_surat = data.letterNo;

	showLoader.value = true;
	agendaStore.addAgenda(body, success => {
		showLoader.value = false;
		if(!success)
			return viewStore.showToast("Agenda tidak tersimpan", "Terjadi masalah saat menghubungi server.", false);
		
		agendaStore.fetchAgenda(true);
		router.push("/agenda");
	});
};

const formIndex = ref(0);
const formElm1 = ref(null);
const formElm2 = ref(null);
const formElm3 = ref(null);

const onForm1Next = async () => {
	const result = await formElm1.value.getValue();
	if(!result)
		return;

	data.title = result.title;
	data.color = result.color;
	data.desc = result.desc;
	formIndex.value = 1;
};

const onForm2Next = async () => {
	const result = await formElm2.value.getValue();
	if(!result)
		return;

	data.location = result.location;
	data.startDate = result.startDate;
	data.endDate = result.endDate;
	data.startTime = result.startTime;
	data.endTime = result.endTime;
	formIndex.value = 2;
};

const onForm3Next = async () => {
	const result = await formElm3.value.getValue();
	if(!result)
		return;

	data.message = result.message;
	data.letter = result.letter;
	data.letterNo = result.letterNo;
	saveAgenda();
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Rapat</h2>
		<div class="flex items-center mb-8">
			<ButtonBack />
		</div>
		<div class="flex justify-center">
			<div class="w-full md:w-[30rem]">
				<FormAgenda1 v-show="formIndex === 0" ref="formElm1" @submit.prevent="onForm1Next">
					<template #handler>
						<div class="flex items-center pb-6 mt-4 px-8">
							<button type="submit" class="ml-auto btn btn-icon text-white transition-colors bg-primary-700 hover:bg-primary-600">
								<span>Lanjutkan</span>
								<font-awesome-icon icon="fa-solid fa-angle-right" fixed-width />
							</button>
						</div>
					</template>
				</FormAgenda1>
				<FormAgenda2 v-show="formIndex === 1" ref="formElm2" @submit.prevent="onForm2Next">
					<template #handler>
						<div class="flex items-center pb-6 mt-4 px-8">
							<button type="button" @click="formIndex = 0" class="btn btn-icon text-gray-700 transition-colors bg-gray-200 hover:bg-gray-50">
								<font-awesome-icon icon="fa-solid fa-angle-left" fixed-width />
								<span>Kembali</span>
							</button>
							<button type="submit" class="ml-auto btn btn-icon text-white transition-colors bg-primary-700 hover:bg-primary-600">
								<span>Lanjutkan</span>
								<font-awesome-icon icon="fa-solid fa-angle-right" fixed-width />
							</button>
						</div>
					</template>
				</FormAgenda2>
				<FormAgenda3 v-show="formIndex === 2" ref="formElm3" @submit.prevent="onForm3Next">
					<template #loader>
						<div class="h-1 relative">
							<LoadingLine v-if="showLoader" />
						</div>
					</template>
					<template #handler>
						<div class="flex items-center pb-6 mt-4 px-8">
							<button type="button" @click="formIndex = 1" class="btn btn-icon text-gray-700 transition-colors bg-gray-200 hover:bg-gray-50">
								<font-awesome-icon icon="fa-solid fa-angle-left" fixed-width />
								<span>Kembali</span>
							</button>
							<button type="submit" class="ml-auto btn btn-icon text-white transition-colors bg-primary-700 hover:bg-primary-600">
								<font-awesome-icon icon="fa-solid fa-check" fixed-width />
								<span>Simpan</span>
							</button>
						</div>
					</template>
				</FormAgenda3>
			</div>
		</div>
		<div v-if="showLoader" class="fixed z-[8889] top-0 left-0 w-screen h-screen bg-white/40 flex justify-center items-center p-8">
			<div class="h-2 w-[28rem]">
				<LoadingLine class="border border-gray-400" />
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

</style>