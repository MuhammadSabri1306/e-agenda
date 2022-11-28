<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { required } from "@vuelidate/validators";
import { useAccountStore } from "@/stores/account";
import { useViewStore } from "@/stores/view";
import { useDataForm } from "@/modules/data-form";
import LoadingLine from "@/components/ui/LoadingLine.vue";

const { data, v$ } = useDataForm({
	username: { required },
	password: { required }
});

const accountStore = useAccountStore();
const viewStore = useViewStore();

const route = useRoute();
const router = useRouter();

const hasSubmitted = ref(false);
const showLoader = ref(true);

const onLogin = async () => {
	hasSubmitted.value = true;
	const isValid = await v$.value.$validate();
	
	if(!isValid)
		return;

	const { username, password } = data;
	accountStore.login({ username, password }, success => {

		if(!success) {
			viewStore.showToast("Gagal Login", "Silahkan login menggunakan data yang benar.", false);
			return console.log("fail");
		}

		setTimeout(() => router.push(route.query.redirect || "/agenda"), 500);

	});
};
</script>
<template>
	<div class="form-login pb-8">
		<div class="h-1 relative">
			<LoadingLine v-if="showLoader" />
		</div>
		<div class="px-8 py-4 pt-10">
			<h2 class="form-login-title">Log In</h2>
			<form @submit.prevent="onLogin">
				<div class="grid grid-cols-1 mb-4 gap-4">
					<div class="form-group">
						<input type="text" v-model="v$.username.$model" :class="{ 'invalid': v$.username.$invalid && hasSubmitted }" placeholder="Masukkan email atau nomor telepon">
					</div>
					<div class="form-group">
						<input type="password" v-model="v$.password.$model" :class="{ 'invalid': v$.password.$invalid && hasSubmitted }" placeholder="Masukkan password">
					</div>
				</div>
				<p class="text-right text-xs font-semibold mb-4">
					<a href="#" class="p-2 text-black/70 hover:text-black/90 focus:text-black/90">Lupa Password?</a>
				</p>
				<div class="grid grid-cols-1 mb-10">
					<button type="submit" class="btn-login">Log In</button>
				</div>
			</form>
			<div class="flex items-center mb-6">
				<div class="grow border-b border-gray-400"></div>
				<p class="font-semibold text-sm text-black/80 mx-4">ATAU</p>
				<div class="grow border-b border-gray-400"></div>
			</div>
			<p class="text-center mb-10">
				<a href="#" class="inline-flex items-center p-2 text-blue-700/80 hover:text-blue-700/90 focus:text-blue-700/90">
					<span class=""><font-awesome-icon icon="fa-brands fa-google" fixed-width /></span>
					<span class="text-sm font-semibold ml-2">Log in dengan Google</span>
				</a>
			</p>
		</div>
	</div>
</template>
<style scoped>
	
.form-login {
	@apply bg-white lg:bg-transparent shadow-lg lg:shadow-none border lg:border-0 rounded-lg my-auto;
}

.form-login-title {
	@apply text-3xl font-body font-bold text-gray-900 text-center md:text-left md:ml-1 mb-8;
}

.btn-login {
	@apply px-4 py-2 text-sm rounded font-semibold text-white border border-blue-600 transition-colors bg-blue-600 hover:bg-blue-700;
}

</style>