<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { required } from "@vuelidate/validators";
import { useAgendaStore } from "@/stores/agenda";
import { useDataForm } from "@/modules/data-form";
import { fetchLogin } from "@/modules/sample-data";
import LoadingLine from "@/components/ui/LoadingLine.vue";

const agendaName = ref(null);
const { data, v$ } = useDataForm({
	name: { required },
	email: { required },
	phoneNumber: { required }
});

const route = useRoute();
const roomUniqueKey = computed(() => route.params.ukey);
const agendaStore = useAgendaStore();
agendaStore.fetchAttendance(false, success => {
	if(!success)
		return;

	const currAtt = agendaStore.attendance.find(item => item.uniqueKey == roomUniqueKey.value);
	if(!currAtt)
		return;

	agendaName.value = currAtt.agenda.title;
	console.log(currAtt);
});

const hasSubmitted = ref(false);
const showLoader = ref(false);

const onLogin = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	
	if(!isValid)
		return;

	showLoader.value = true;
};
</script>
<template>
	<div class="form-regist">
		<div class="h-1 relative">
			<LoadingLine v-if="showLoader" />
		</div>
		<div class="px-8 py-4 pt-10">
			<h2 class="form-regist-title text-3xl text-gray-900">Absensi Rapat</h2>
			<h6 class="form-regist-title text-gray-800 mb-8">{{ agendaName }}</h6>
			<p class="text-gray-700 mb-8">Silahkan mengisi absensi rapat dengan melengkapi data anda di form berikut.</p>
			<form @submit.prevent="onLogin">
				<div class="grid grid-cols-1 mb-4 gap-4 mb-8">
					<div class="form-group">
						<label for="inputName">Nama Lengkap</label>
						<input type="text" v-model="v$.name.$model" id="inputName" :class="{ 'invalid': v$.name.$invalid && hasSubmitted }" placeholder="Masukkan nama anda">
					</div>
					<div class="form-group">
						<label for="inputEmail">Email</label>
						<input type="email" v-model="v$.email.$model" id="inputEmail" :class="{ 'invalid': v$.email.$invalid && hasSubmitted }" placeholder="Exp: namasaya@gmail.com">
					</div>
					<div class="form-group">
						<label for="inputPhone">Nomor Telepon</label>
						<input type="tele" v-model="v$.phoneNumber.$model" :class="{ 'invalid': v$.phoneNumber.$invalid && hasSubmitted }" placeholder="Exp: 0851********">
					</div>
				</div>
				<div class="grid grid-cols-1 mb-10">
					<button type="submit" class="btn-regist">Simpan</button>
				</div>
			</form>
		</div>
	</div>
</template>
<style scoped>
	
.form-regist {
	@apply bg-white lg:bg-transparent shadow-lg lg:shadow-none border lg:border-0 rounded-lg my-auto;
}

.form-regist-title {
	@apply font-body font-bold text-center md:text-left md:ml-1;
}

.btn-regist {
	@apply px-4 py-2 text-sm rounded font-semibold text-white border border-blue-600 transition-colors bg-blue-600 hover:bg-blue-700;
}

</style>