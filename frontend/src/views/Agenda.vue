<script setup>

import BasicLayout from "@/components/layout/BasicLayout.vue";
import NavTop from "@/components/NavTop.vue";
import NavSide from "@/components/NavSide.vue";
import HeaderBasic from "@/components/HeaderBasic.vue";
import Calendar from "@/components/Calendar.vue";
import InputChipsFilter from "@/components/ui/InputChipsFilter.vue";

</script>
<template>
<div class="bg-gray-100">
	<BasicLayout>
		<template #topNav>
			<NavTop class="bg-white shadow-sm" />
		</template>

		<template #sideNav>
			<a href="#" class="mt-8 bg-primary-700 hover:bg-primary-800 h-12 rounded-3xl shadow mb-4 flex">
				<h4 class="text-xl text-white text-shadow-black font-bold m-auto">E-AGENDA</h4>
			</a>
			<NavSide class="basic-card mb-4" />
			<div class="basic-card p-10 hidden">
				<img src="/assets/img/logo-pemprov-sulsel.webp">
			</div>
		</template>

<template #main>
	<div class="flex">
		<div class="grow">
			<HeaderBasic class="mb-6 ml-4" />
			<div class="flex flex-wrap gap-4">
				<InputChipsFilter label="Semua" :checked="true" />
				<InputChipsFilter label="Hari ini" />
				<InputChipsFilter label="Kemarin" />
				<InputChipsFilter label="Bulan ini" />
				<InputChipsFilter label="Tahun ini" />
			</div>
		</div>
		<div class="pl-6">
			<Calendar class="basic-card mb-6 ml-auto" />
		</div>
	</div>
</template>

	</BasicLayout>
</div>
</template>

<style>
	.chips-filter {
		@apply h-10 rounded-[3rem] border border-primary-500 text-primary-600 hover:text-primary-800 hover:bg-primary-200 font-bold text-xs p-4;
	}

	.chips-filter.checked {
		@apply border-primary-600 bg-primary-600 text-white;
	}
</style>