<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import { useDataForm } from "@/modules/data-form";
import { required } from "@vuelidate/validators";
import Modal from "@/components/ui/Modal.vue";
import LoadingLine from "@/components/ui/LoadingLine.vue";

const userStore = useUserStore();
const viewStore = useViewStore();

const hasSubmitted = ref(false);
const showLoader = ref(false);
const modal = ref(null);

const { data, v$ } = useDataForm({
	name: { required },
	email: { required },
	pass1: { required },
	pass2: { required }
});

const isPassMatched = computed(() => data.pass1 === data.pass2);

const onSubmit = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	if(!isValid || !isPassMatched.value)
		return;

	showLoader.value = true;
	const body = {
		name: data.name,
		email: data.email,
		password: data.pass1
	};

	userStore.saveUser(body, success => {
		if(!success) {
			viewStore.showToast("Koneksi gagal", "Terjadi masalah saat menghubungi server.", false);
			return;
		}

		userStore.fetchUser(true);
		modal.value.hide();
		viewStore.showToast("Akun", "Berhasil membuat akun.", true);
	});
};
</script>
<template>
	<Modal ref="modal">
		<template #header>
			<div class="p-4">
				<h3 class="text-lg text-gray-700">Detail Akun</h3>
			</div>
		</template>
		<template #body>
			<div>
				<div class="h-1 relative">
					<LoadingLine v-if="showLoader" />
				</div>
				<form @submit.prevent="onSubmit">
					<div class="py-4 px-8 grid grid-cols-1 gap-4">
						<div class="form-group">
							<label for="inputName">Nama *</label>
							<input type="text" v-model="v$.name.$model" :class="{ 'invalid': hasSubmitted && v$.name.$invalid }" id="inputName">
						</div>
						<div class="form-group">
							<label for="inputEmail">Email *</label>
							<input type="email" v-model="v$.email.$model" :class="{ 'invalid': hasSubmitted && v$.email.$invalid }" id="inputEmail">
						</div>
						<div class="form-group">
							<label for="inputPass1">Password *</label>
							<input type="password" v-model="v$.pass1.$model" :class="{ 'invalid': hasSubmitted && v$.pass1.$invalid }" id="inputPass1">
						</div>
						<div class="form-group">
							<label for="inputPass2">Masukkan ulang Password *</label>
							<input type="password" v-model="v$.pass2.$model" :class="{ 'invalid': hasSubmitted && v$.pass2.$invalid || hasSubmitted && !isPassMatched }" id="inputPass2">
							<label v-if="hasSubmitted && !isPassMatched"><small class="text-red-700 font-semibold ml-4">Password tidak cocok.</small></label>
						</div>
					</div>
					<div class="flex justify-end mb-8 px-8">
						<button type="submit" class="btn btn-icon text-white gap-2 transition-colors bg-primary-600 hover:bg-primary-500">
							<font-awesome-icon icon="fa-solid fa-plus" fixed-width />
							<span>Buat Akun</span>
						</button>
					</div>
				</form>
			</div>
		</template>
	</Modal>
</template>