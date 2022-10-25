<script setup>
import { ref } from "vue";
import { required } from "@vuelidate/validators";
import { useDataForm } from "@/modules/dataForm";

const { data, v$ } = useDataForm({
	username: { required },
	password: { required }
});

const hasSubmitted = ref(false);
const onLogin = () => {
	hasSubmitted.value = true;
	v$.$validate().then().catch();
};
</script>
<template>
	<div>
		<h2 class=" text-3xl font-body font-bold text-black/90 text-center md:text-left md:ml-1 hover-margin mb-8">Log In</h2>
		<div class="form-group mb-2">
			<input v-model="v$.username.$model" :class="{ 'invalid': v$.username.$invalid && hasSubmitted }" type="text" placeholder="Masukkan email atau nomor telepon">
		</div>
		<div class="form-group mb-4">
			<input v-model="v$.password.$model" :class="{ 'invalid': v$.password.$invalid && hasSubmitted }" type="password" placeholder="Masukkan password">
		</div>
		<p class="text-right text-xs font-semibold mb-4">
			<a href="#" class="p-2 text-black/70 hover:text-black/90 focus:text-black/90">Lupa Password?</a>
		</p>
		<div class="grid grid-cols-1 mb-10">
			<button @click="onLogin" type="button" class="px-4 py-2 text-sm rounded font-semibold text-white border border-blue-600 bg-blue-600 hover:bg-blue-700">Log In</button>
		</div>
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
</template>
<style scoped>

.form-group > input, .form-group > textarea {
	@apply block w-full border rounded focus:bg-white text-black/70 focus:text-black/90 px-4 py-2 text-sm font-medium;
}

.form-group > input.invalid, .form-group > textarea.invalid {
	@apply border-red-400;
	animation: justshake 0.3s forwards;
}

@keyframes justshake {
  25% { transform: translateX(5px); }
  50% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(-5px); }
}

</style>