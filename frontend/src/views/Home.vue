<script setup>
import { ref, onMounted } from "vue";

const mainElm = ref(null);
const showContent = ref(false);

onMounted(() => {
	if(!document.body.classList.contains("bg-gray-100"))
		document.body.classList.add("bg-gray-100");

	if(mainElm.value.classList.contains("loading"))
		setTimeout(() => mainElm.value.classList.remove("loading"), 300);
});
</script>
<template>
	<main ref="mainElm" class="main-content">
		<div class="min-h-screen">&nbsp;</div>
		<div class="absolute-layer bg-no-repeat bg-cover bg-center bg-[url('/assets/img/home-hero.webp')] brightness-[0.3]"></div>
		<div class="absolute-layer bg-gradient-to-tr from-red-500 to-indigo-500 opacity-70"></div>
		<div class="absolute-layer bg-no-repeat bg-cover bg-center bg-[url('/assets/img/animated-shape.svg')]"></div>
		<div class="absolute-layer flex justify-start items-start">
			<div class="py-3 px-16 relative bg-black">
				<a href="#" class="flex items-center text-warning-400 text-shadow-black transition-transform scale-100 hover:scale-95"><img src="/assets/img/logo-pemprov-sulsel.webp" class="h-12 w-auto"><div class="ml-2"><p class="text-2xl leading-none font-bold tracking-widest">DPRD</p><p class="text-xs leading-none font-semibold">SULAWESI SELATAN</p></div></a>
			</div>
		</div>
		<div class="absolute-layer flex justify-center items-center z-[1]">
			<div class="flip-wrapper">
				<a href="/agenda" class="flip mx-auto">
					<div class="flip-inner w-[20rem] md:w-[24rem] h-[24rem]">
						<div class="flip-front">
							<div class="rounded-3xl bg-white/80 shadow w-full h-full flex flex-col justify-center items-center">
								<h2 class="text-3xl text-black text-center font-semibold font-body">Selamat Datang di</h2>
								<div class="flex justify-center my-8 text-red-500">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>
								</div>
								<h6 class="text-lg text-black text-center font-body mb-2">SISTEM INFORMASI</h6>
								<h1 class="text-5xl text-red-500 font-black text-shadow-white mb-4">E-AGENDA</h1>
								<p class="text-sm text-white font-bold bg-indigo-600 px-4 py-2 rounded-[50rem]">MULAI</p>
							</div>
						</div>
						<div class="flip-back">
							<div class="rounded-3xl bg-red-600/80 shadow w-full h-full flex justify-center items-center text-5xl font-bold tracking-widest text-white text-shadow-black">
								<font-awesome-icon icon="fa-solid fa-play" />
								<span class="ml-4">MULAI</span>
							</div>
						</div>
					</div>
				</a>
			</div>
			<a href="/agenda" class="hidden mt-4 bg-primary-700 hover:bg-primary-800 h-16 rounded-[50rem] shadow mb-2 inline-flex  w-[20rem] shadow-xl border border-primary-800">
				<h4 class="text-2xl text-white text-shadow-black font-bold m-auto">E-AGENDA</h4>
			</a>
			<!-- <div class="w-80">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" id="blobSvg" style="opacity: 1;"><image x="0" y="0" width="100%" height="100%" clip-path="url(#shape)" href="https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=880&amp;q=80" preserveAspectRatio="none"></image><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color: rgb(238, 205, 163);"></stop><stop offset="100%" style="stop-color: rgb(239, 98, 159);"></stop></linearGradient></defs><clipPath id="shape"><path id="blob" fill="url(#gradient)"><animate attributeName="d" dur="10000ms" repeatCount="indefinite" values="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;M453.78747,319.98894Q416.97789,389.97789,353.96683,436.87838Q290.95577,483.77887,223.95577,447.43366Q156.95577,411.08845,105.64373,365.97789Q54.33169,320.86732,62.67444,252.61056Q71.01719,184.3538,113.01965,135.21007Q155.02211,86.06634,220.52211,66.46683Q286.02211,46.86732,335.5,91.94472Q384.97789,137.02211,437.78747,193.51106Q490.59704,250,453.78747,319.98894Z;M411.39826,313.90633Q402.59677,377.81265,342.92059,407.63957Q283.24442,437.46649,215.13648,432.5428Q147.02853,427.61911,82.23325,380.9572Q17.43796,334.29529,20.45223,250.83809Q23.46649,167.38089,82.5856,115.05707Q141.70471,62.73325,212.19045,63.73015Q282.67618,64.72705,352.67308,84.79839Q422.66998,104.86972,421.43486,177.43486Q420.19974,250,411.39826,313.90633Z;M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;"></animate></path></clipPath></svg>
			</div> -->
		</div>
	</main>
</template>
<style scoped>
	.absolute-layer {
		@apply absolute top-0 left-0 w-full h-full;
	}

	.main-content {
		@apply relative overflow-y-hidden max-h-[0];
		transition: max-height .6s ease-in-out;
	}

	.main-content:not(.loading) {
		@apply max-h-screen;
	}

	.flip-wrapper {
		@apply flex;
		flex-flow: row wrap;
	}

	.flip {
		-webkit-perspective: 1200px;
		-moz-perspective: 1200px;
		perspective: 1200px;
	}

	.flip-inner {
		-webkit-transform-style: preserve-3d;
		-moz-transform-style: preserve-3d;
		transform-style: preserve-3d;
		transition: transform .3s ease-in-out;
	}

	.flip:hover .flip-inner {
		transform: rotateY(180deg);
	}

	.flip-front, .flip-back {
		@apply absolute w-full h-full;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transform-style: preserve-3d;
		-moz-transform-style: preserve-3d;
		transform-style: preserve-3d;
	}

	.flip-back {
		-webkit-transform: rotateY(180deg);
		-moz-transform: rotateY(180deg);
		transform: rotateY(180deg);
	}
</style>