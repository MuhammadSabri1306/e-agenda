<script setup>
import { ref, computed } from "vue";
import { useContactStore } from "@/stores/contact";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/data-form";
import SwitchToggle from "@/components/ui/SwitchToggle.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import LoadingLine from "@/components/ui/LoadingLine.vue";
import ButtonBack from "@/components/ButtonBack.vue";

const emit = defineEmits(["cancel"]);
const contactStore = useContactStore();

const isFraksiLoaded = ref(false);
const fraksi = computed(() => contactStore.fraksi);
contactStore.fetchFraksi(false, success => {
	if(success)
		isFraksiLoaded.value = true;
});

const isKomisiLoaded = ref(false);
const komisi = computed(() => contactStore.komisi);
contactStore.fetchKomisi(false, success => {
	if(success)
		isKomisiLoaded.value = true;
});

const isPansusLoaded = ref(false);
const pansus = computed(() => contactStore.pansus);
contactStore.fetchPansus(false, success => {
	if(success)
		isPansusLoaded.value = true;
});

const isOpdLoaded = ref(false);
const opd = computed(() => contactStore.opd);
contactStore.fetchOpd(false, success => {
	if(success)
		isOpdLoaded.value = true;
});

const { data, v$ } = useDataForm({
	name: { value: null, required },
	wa: { value: null, required },
	email: { value: null, required },
	isMember: { value: true },
	fraksi: { value: null },
	komisi: { value: null },
	pansus: { value: null },
	opd: { value: null }
});

const getData = (...keys) => {
	const result = {};
	keys.forEach(k => result[k] = data[k]);
	return result;
};

const showLoader = ref(false);
const hasSubmitted = ref(false);
const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid)
		return;

	const body = {
		name: data.name,
		wa: data.wa,
		email: data.email
	};
	if(data.isMember) {
		body.fraksi = data.fraksi;
		body.komisi = data.komisi;
		body.pansus = data.pansus;
	} else {
		body.opd = data.opd;
	}
	showLoader.value = true;
	console.log(body);
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Kontak</h2>
		<div class="flex items-center mb-8">
			<ButtonBack />
		</div>
		<div class="basic-card">
			<div class="h-1 relative mb-8">
				<LoadingLine v-if="showLoader" />
			</div>
			<form @submit.prevent="onSubmit">
				<div class="grid grid-cols-2 gap-8 m-8">
					<div>
						<div class="form-group mb-8">
							<label for="inputName">Nama Kontak *</label>
							<input type="text" v-model="v$.name.$model" :class="{ 'invalid': hasSubmitted && v$.name.$invalid }" id="inputName">
						</div>
						<div class="form-group mb-8">
							<label for="inputWa">No. Whatsapp *</label>
							<input type="tele" v-model="v$.wa.$model" :class="{ 'invalid': hasSubmitted && v$.wa.$invalid }" id="inputWa">
						</div>
						<div class="form-group">
							<label for="inputEmail">Email</label>
							<input type="email" v-model="v$.email.$model" :class="{ 'invalid': hasSubmitted && v$.email.$invalid }" id="inputEmail">
						</div>
					</div>
					<div>
						<div class="form-group mb-8">
							<label class="mb-2">Status</label>
							<div class="flex items-center gap-2 ml-8">
								<label>Anggota DPRD</label>
								<SwitchToggle :value="true" @toggle="val => data.isMember = val" />
							</div>
						</div>
						<div v-if="data.isMember && isFraksiLoaded" class="form-group mb-8 flex items-center gap-4">
							<label>Fraksi</label>
							<Dropdown :options="fraksi" labelKey="name" valueKey="id" defaultTitle="Pilih Fraksi" class="dropdown-category" />
						</div>
						<div v-if="data.isMember && isKomisiLoaded" class="form-group mb-8 flex items-center gap-4">
							<label>Komisi</label>
							<Dropdown :options="komisi" labelKey="name" valueKey="id" defaultTitle="Pilih Komisi" class="dropdown-category" />
						</div>
						<div v-if="data.isMember && isPansusLoaded" class="form-group mb-8 flex items-center gap-4">
							<label>Pansus</label>
							<Dropdown :options="pansus" labelKey="name" valueKey="id" defaultTitle="Pilih Pansus" class="dropdown-category" />
						</div>
						<div v-if="!data.isMember && isOpdLoaded" class="form-group mb-8 flex items-center gap-4">
							<label>OPD</label>
							<Dropdown :options="opd" labelKey="name" valueKey="id" defaultTitle="Pilih OPD" class="dropdown-category" />
						</div>
					</div>
				</div>
				<div class="flex justify-end mx-8 mb-8">
					<button type="submit" class="btn btn-icon text-white bg-primary-600 hover:bg-primary-500">
						<font-awesome-icon icon="fa-solid fa-check" fixed-width />
						<span class="ml-2">Simpan Kontak</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
<style scoped>
	
.dropdown-category {
	@apply grow;
}

.dropdown-category :deep(.dropdown-collapse) {
	@apply z-[2];
}

.dropdown-category :deep(.dropdown-collapse) ul {
	@apply max-h-[10rem] overflow-y-auto;
}

.basic-card {
	@apply overflow-hidden shadow-lg border;
}

</style>