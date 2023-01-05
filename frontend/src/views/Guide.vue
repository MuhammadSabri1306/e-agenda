<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Footer from "@/components/basic-layout/Footer.vue";

import SectionIntro from "@/components/guides/Section1Intro.vue";

const toggleSidebar = ref(false);

const route = useRoute();
const router = useRouter();

const sections = {
	"intro": {
		title: "Bagian 1 - Pendahuluan",
		route: "/guide",
		component: SectionIntro
	},
	"newAgenda": {
		title: "Bagian 2 - Membuat Rapat Baru",
		route: "/guide/newAgenda",
		component: SectionIntro
	}
};

const currSection = computed(() => {
	const key = route.params.section;
	if(key.length < 1)
		return sections.intro;

	if(!sections[key] || sections[key] === undefined) {
		router.push("/e404");
		return {};
	}

	return sections[key];
});
</script>
<template>
	<div id="guideLayout" :class="{ 'toggle-sidebar': toggleSidebar }">
		<nav class="sidebar">
			<router-link to="/" class="block px-4 pb-8 pt-8 transition-opacity opacity-100 hover:opacity-90">
				<div class="flex items-center mb-4">
					<img src="/assets/img/logo-pemprov-sulsel.webp" class="h-12 w-auto">
					<div class="ml-2">
						<p class="text-3xl text-primary-600 font-bold font-body leading-none text-shadow-black whitespace-nowrap">E-RAPAT</p>
						<p class="text-sm text-warning-400 font-bold text-shadow-black">DPRD Sulawesi Selatan</p>
					</div>
				</div>
			</router-link>
			<p class="font-semibold text-white text-sm text-shadow-black px-4 mb-4">Petunjuk Penggunaan</p>
			<ul class="nav-menu">
				<li v-for="item in sections">
					<router-link :to="item.route">{{ item.title }}</router-link>
				</li>
			</ul>
		</nav>
		<main>
			<header class="bg-gray-100 md:pr-4 flex items-center">
				<button type="button" @click="toggleSidebar = !toggleSidebar" class="p-4 text-lg flex justify-center items-center h-full transition-colors bg-gray-900 text-gray-200 hover:text-white" title="Expand Menu">
					<font-awesome-icon icon="fa-solid fa-bars" fixed-width />
				</button>
				<div class="p-4">
					<h1>{{ currSection.title }}</h1>
				</div>
			</header>
			<component :is="currSection.component" class="px-4 md:px-8 py-8 grow" />
			<Footer class="pb-24 md:pb-0" />
		</main>
	</div>
</template>
<style scoped>
	
#guideLayout {
	@apply w-screen flex overflow-x-hidden;
}

#guideLayout .sidebar,
#guideLayout main {
	@apply h-screen overflow-y-auto overflow-x-hidden;
}

.sidebar {
	@apply bg-gray-900 w-[17rem] fixed top-0 left-[-18rem] md:left-0 transition-all duration-300;
}

.toggle-sidebar .sidebar {
	@apply left-0 md:left-[-18rem];
}

.nav-menu {
	@apply flex flex-col pl-4;
}

.nav-menu a {
	@apply px-4 py-2 block text-sm font-medium transition-colors text-gray-100 bg-gray-900 hover:text-white hover:bg-gray-800;
}

.nav-menu a.router-link-active {
	@apply text-primary-600 hover:bg-gray-800;
}

main {
	@apply flex flex-col text-gray-700;
}

main > * {
	@apply w-screen md:w-[calc(100vw-17rem)] md:ml-[17rem] transition-all duration-300;
}

.toggle-sidebar main > *  {
	@apply ml-[17rem] md:ml-0 md:w-screen;
}

h1, h2, h3, h4, h5, h6 {
	@apply font-body;
}

header h1 {
	@apply text-2xl font-semibold;
}

</style>