<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAccountStore } from "@/stores/account";

const router = useRouter();
const route = useRoute();
const isLoginPage = computed(() => route.name == "login");

const accountStore = useAccountStore();
const formLoginElm = ref(null);

const username = ref("");
const password = ref("");

const isUsernameValid = ref(true);
const isPasswordValid = ref(true);

const login = () => {
	if(accountStore.isAuthed) {
		router.push("/agenda");
		return;
	}

	if(username.value != "sabri123") {
		username.value = "";
		isUsernameValid.value = false;
		formLoginElm.value["username"].focus();
	} else if(!isUsernameValid.value)
		isUsernameValid.value = true;

	if(password.value != "sabri123") {
		password.value = "";
		isPasswordValid.value = false;
		isUsernameValid.value && formLoginElm.value["password"].focus();
	} else if(!isPasswordValid.value)
		isPasswordValid.value = true;

	if(!isUsernameValid || !isPasswordValid)
		return;

	accountStore.setUser({ id: 1, name: "Muhammad Sabri", username: "sabri123", role: "user" });
	accountStore.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11aGFtbWFkIFNhYnJpIiwidXNlcm5hbWUiOiJzYWJyaTEyMyIsInJvbGUiOiJ1c2VyIn0.gFCd1OQk35gs4HkCP7nzNx6CihPVnV3ABtsUvb8ThKY");

	router.push("/agenda");
};
</script>
<template>
	<main class="bg-gradient-to-bl from-indigo-600/10 to-white">
		<div class="min-h-screen">&nbsp;</div>
		<Transition duration="500" name="left-slide">
			<div v-if="!isLoginPage" class="absolute w-full h-full top-0 left-0 flex justify-center items-center">
				<div class="w-[20rem] md:w-[24rem] flex flex-col items-stretch">
					<div class="relative mb-4">
						<div class="hover-margin group">
							<div class="bg-primary-800 h-16 rounded shadow flex justify-center items-center">
								<h4 class="text-xl text-white text-shadow-black font-bold px-16 mt-2 cursor-default">E-AGENDA</h4>
							</div>
							<p class="absolute top-1/2 left-8 -translate-y-1/2 text-white transition-all group-hover:top-[calc(50%-0.25rem)]">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>
							</p>
						</div>
					</div>
					<div class="rounded shadow bg-white px-8 pt-4 pb-12 relative cursor-default">
						<h1 class="text-3xl font-light text-black/90 text-center py-4 hover-margin">Selamat Datang di</h1>
						<p class="text-sm font-semibold text-black/80 text-center leading-relaxed">Sistem Informasi <span class="font-bold">Agenda Elektronik.</span> Cek agenda yang akan dilaksanakan hari ini atau dalam waktu dekat. Anda juga bisa memeriksa aktifitas lama yang telah diagendakan.</p>
						<RouterLink to="/login" class="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 btn-primary">
							<font-awesome-icon icon="fa-solid fa-play" fixed-width />
							<span class="ml-1">MULAI</span>
						</RouterLink>
					</div>
				</div>
			</div>
		</Transition>
		<Transition duration="500" name="fade-bg">
			<div v-if="isLoginPage" class="absolute-layer bg-gradient-to-r from-purple-600 to-sky-700"></div>
		</Transition>
		<Transition duration="500" name="left-slide">
			<div v-show="isLoginPage" class="absolute w-full h-full top-0 left-0 flex items-center">
				<div class="w-[15rem] md:w-[24rem] ml-[15%] rounded-2xl shadow bg-white px-8 pt-4 pb-12 relative cursor-default">
					<div class="my-8 flex">
						<img src="/assets/img/app-illustration.webp" class="max-w-[15rem] mx-auto" alt="App Illustration">
					</div>
					<p class="text-sm font-bold text-black/80 text-center leading-relaxed mb-2">Selamat Datang di</p>
					<h1 class="text-4xl font-light text-black/90 text-center">E-AGENDA</h1>
				</div>
			</div>
		</Transition>
		<div class="absolute top-0 left-0 flex justify-start items-start">
			<div :class="{ 'bg-black': !isLoginPage, 'bg-transparent': isLoginPage }" class="py-3 px-16 relative bg-black w-full md:w-auto transition-all rounded-br-2xl hover:rounded-br-sm">
				<a href="#" class="flex items-center text-shadow-black group">
					<img src="/assets/img/logo-pemprov-sulsel.webp" class="h-12 w-auto transition-transform scale-100 group-hover:scale-105">
					<div class="transition-transform scale-100 group-hover:scale-105"></div>
					<div :class="{ 'text-warning-400': !isLoginPage, 'text-white': isLoginPage }">
						<p class="text-2xl leading-none font-bold tracking-widest transition-all ml-2 group-hover:ml-6">DPRD</p>
						<p class="text-xs leading-none font-semibold transition-all ml-2 group-hover:ml-4">SULAWESI SELATAN</p>
					</div>
				</a>
			</div>
		</div>
		<Transition duration="500" name="right-slide">
			<div v-if="isLoginPage" class="fixed top-0 right-0 bg-white shadow">
				<form ref="formLoginElm" @submit.prevent="login">
					<div class="login-card w-[35rem]">
						<div class="form-group">
							<label for="inputUsername">Username</label>
							<input v-model="username" type="text" name="username" id="inputUsername" placeholder="Contoh: ahmad123" :class="{ 'border-danger-700': !isUsernameValid }">
							<p v-if="!isUsernameValid" class="text-xs font-semibold text-danger-700">Username tidak benar.</p>
						</div>
						<div class="form-group">
							<label for="inputPassword">Password</label>
							<input v-model="password" type="password" name="password" id="inputPassword" placeholder="Contoh: qwerty123" :class="{ 'border-danger-700': !isPasswordValid }">
							<p v-if="!isPasswordValid" class="text-xs font-semibold text-danger-700">Password tidak benar.</p>
						</div>
						<div class="flex justify-between items-center py-4">
							<RouterLink to="/" class="text-xs font-medium border-b transition-all text-black/80 hover:text-black border-transparent hover:border-black">Kembali</RouterLink>
							<button type="submit" class="px-6 py-2 rounded-lg text-white font-semibold bg-primary-700 hover:bg-primary-900">Log In</button>
						</div>
					</div>
				</form>
			</div>
		</Transition>
	</main>
</template>

<style scoped>

.login-card {
	@apply h-screen flex flex-col justify-center py-8 pl-16 pr-16 md:pr-24;
}

.login-card .form-group {
	@apply flex flex-col gap-2 mb-6;
}

.login-card .form-group > label {
	@apply text-black/90 text-xs font-semibold;
}

.login-card .form-group > input {
	@apply w-full block text-black rounded-lg px-4 py-2 border text-sm;
}

.fade-bg-enter-active, .fade-bg-leave-active {
	@apply transition-opacity duration-500;
}

.fade-bg-enter-from, .fade-bg-leave-to {
	@apply opacity-0;
}

.right-slide-enter-active, .right-slide-leave-active {
	@apply transition-all duration-300 delay-200 ease-in-out;
}

.right-slide-enter-from, .right-slide-leave-to {
	@apply -right-full;
}

.left-slide-enter-active, .left-slide-leave-active {
	@apply transition-all duration-300 delay-200 ease-in-out;
}

.left-slide-enter-from, .left-slide-leave-to {
	@apply -left-full;
}

.absolute-layer {
	@apply absolute top-0 left-0 w-full h-full;
}

.hover-margin {
	@apply transition-all mt-0 hover:-mt-1 mb-0 hover:mb-1;
}

.btn-primary {
	@apply inline-flex items-center overflow-hidden text-lg font-bold bg-white border-2 rounded-[50rem] transition-all duration-200 ease-in text-black hover:text-white border-black/90 hover:border-primary-700 px-6 hover:px-12 focus:px-12 py-2 hover:py-3 focus:py-3;
	box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.5);
}

.btn-primary:active {
	box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.btn-primary:before {
	content: "";
	position: absolute;
	left: 50%;
	transform: translateX(-50%) scaleY(1) scaleX(1.25);
	top: 100%;
	width: 140%;
	height: 180%;
	background-color: rgba(0, 0, 0, 0.05);
	border-radius: 50%;
	display: block;
	transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
	z-index: -1;
}

.btn-primary:after {
	content: "";
	position: absolute;
	left: 55%;
	transform: translateX(-50%) scaleY(1) scaleX(1.45);
	top: 180%;
	width: 160%;
	height: 190%;
	background-color: theme(colors.primary.700);
	border-radius: 50%;
	display: block;
	transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
	z-index: -1;
}

.btn-primary:hover:before {
	top: -35%;
	background-color: theme(colors.primary.700);
	transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.btn-primary:hover:after {
	top: -45%;
	background-color: theme(colors.primary.700);
	transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

</style>