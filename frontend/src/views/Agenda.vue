<script setup>

import BasicLayout from "@/components/layout/BasicLayout.vue";
import NavTop from "@/components/NavTop.vue";
import NavSide from "@/components/NavSide.vue";
import HeaderBasic from "@/components/HeaderBasic.vue";
import Calendar from "@/components/Calendar.vue";

</script>
<template>
<div class="bg-gray-100">
	<BasicLayout>
		<template #topNav>
			<NavTop class="bg-white shadow-sm" />
		</template>

		<template #sideNav>
			<a href="#" class="bg-indigo-700 hover:bg-indigo-800 h-12 rounded-3xl shadow mb-4 flex">
				<h4 class="text-xl text-white text-shadow-black font-bold m-auto">E-AGENDA</h4>
			</a>
			<NavSide class="rounded-2xl shadow mb-4" />
			<div class="bg-white rounded-2xl shadow p-10">
				<img src="/assets/img/logo-pemprov-sulsel.webp">
			</div>
		</template>

		<template #main>
			<div class="col-span-2">
				<div class="flex items-end">
					<HeaderBasic class="mb-6" />
				</div>
			</div>
			<Calendar class="rounded-2xl shadow mb-4" />
		</template>
	</BasicLayout>
</div>
</template>