<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import FormLogin from "@/components/FormLogin.vue";

const route = useRoute();
const isHomePage = computed(() => route.name == "home");
</script>
<template>
	<div class="relative w-screen overflow-x-hidden">
		<div class="bg-gray-100 min-h-screen">
			&nbsp;
		</div>
		<div :class="{ 'hero-login': !isHomePage }" class="absolute-layer hero">
			<div class="w-screen h-full bg-hero opacity-70"></div>
		</div>
		<Transition name="home-section">
			<div v-if="isHomePage" class="absolute-layer left-0 max-w-full md:max-w-[50vw] lg:max-w-[36rem] p-4 md:px-16 flex">
				<div class="m-auto">
					<h2 class="text-2xl md:text-4xl font-body font-bold text-black text-center md:text-left md:ml-1 hover-margin mb-6">Selamat Datang di</h2>
					<div class="flex items-end justify-center md:justify-start mb-6">
						<h1 class="text-5xl md:text-7xl font-black whitespace-nowrap text-blue-600 text-center md:text-left">E-AGENDA</h1>
						<p class="text-sm font-body font-bold mb-3 text-black/90 text-center ml-1">V1.0.0</p>
					</div>
					<p class="text-lg text-black/80 text-center md:text-left md:ml-1 mb-16">Cek agenda yang akan dilaksanakan hari ini atau dalam waktu dekat. Anda juga bisa memeriksa aktifitas lama yang telah diagendakan.</p>
					<div class="px-4 flex justify-center md:justify-start">
						<RouterLink to="/login" class="btn-primary">
							<span class="mr-2">Mulai Sekarang</span>
							<span class="text-sm mt-1">
								<font-awesome-icon icon="fa-solid fa-play" fixed-width />
							</span>
						</RouterLink>
					</div>
				</div>
			</div>
		</Transition>
		<Transition name="form-section">
			<div v-if="!isHomePage" class="absolute-layer right-0 w-full md:w-3/4 lg:w-[36rem] p-4 md:px-24 lg:px-32 flex flex-col items-stretch">
				<FormLogin />
			</div>
		</Transition>
		<header :class="{ 'lg:bg-transparent': !isHomePage }" class="absolute left-0 top-0 py-3 px-16 bg-black w-full md:w-auto transition-all rounded-br-2xl hover:rounded-br-sm">
			<RouterLink to="/" class="flex items-center text-shadow-black group">
				<img src="/assets/img/logo-pemprov-sulsel.webp" class="h-12 w-auto transition-transform scale-100 group-hover:scale-105">
				<div :class="{ 'text-warning-400': isHomePage, 'text-white': !isHomePage }">
					<p class="text-2xl leading-none font-bold tracking-widest transition-all ml-2 group-hover:ml-6">DPRD</p>
					<p class="text-xs leading-none font-semibold transition-all ml-2 group-hover:ml-4">SULAWESI SELATAN</p>
				</div>
			</RouterLink>
		</header>
		<footer class="absolute w-full left-0 bottom-0 px-6 py-4">
			<p :class="{ 'text-black/70': isHomePage, 'text-gray-700 md:text-white': !isHomePage }" class="text-sm font-bold text-center md:text-left">&copy; Liny Jaya Informatika - 2022 . All rights reserved.</p>
		</footer>
	</div>
</template>
<style scoped>

.absolute-layer {
	@apply absolute h-screen top-0;
}

.hero {
	/*@apply bg-gradient-to-tr from-indigo-600 to-red-600;*/
	left: 50%;
	clip-path: polygon(45% 0%, 85% 0%, 100% 100%, 0% 100%);
	overflow: hidden;
    transition: left 0.3s ease-in-out;
}

@media screen(lg) {
	.hero {
		clip-path: polygon(45% 0%, 85% 0%, 100% 100%, 0% 100%);
	}
}

@media screen(lg) {
	.hero {
		clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);
	}
}

.hero.hero-login {
	left: -50%;
}

.bg-hero {
	background-image: url('/assets/img/home-hero.webp'), linear-gradient(to top right, theme(colors.indigo.500), theme(colors.red.500));
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-blend-mode: lighten;
	background-size: cover;
	background-position: top;
}

.home-section-enter-active, .home-section-leave-active {
	transition: left 0.3s ease-in-out;
}

.home-section-enter-from, .home-section-leave-to {
	left: -100%;
}

.form-section-enter-active, .form-section-leave-active {
	transition: right 0.3s ease-in-out;
}

.form-section-enter-from, .form-section-leave-to {
	right: -100%;
}

.btn-primary {
	@apply relative z-[1] rounded inline-flex items-center overflow-hidden bg-blue-600 text-white px-6 py-3 transition-all text-lg hover:text-xl;
}

.btn-primary:before, .btn-primary:after {
	content: "";
	position: absolute;
	z-index: -1;
	border-radius: 50%;
	display: block;
	transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
}

.btn-primary:before {
	left: 50%;
	transform: translateX(-50%) scaleY(1) scaleX(1.25);
	top: 100%;
	width: 140%;
	height: 180%;
	background-color: rgba(0, 0, 0, 0.05);
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
}

.btn-primary:hover:before, .btn-primary:hover:after {
	@apply bg-black;
}

.btn-primary:hover:before {
	top: -35%;
	transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.btn-primary:hover:after {
	top: -45%;
	transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

</style>