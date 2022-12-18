<script setup>
import { computed } from "vue";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import ListAttendance from "@/components/ListAttendance.vue";
import HeroAttendance from "@/components/HeroAttendance.vue";
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="container py-8 px-4 md:px-0">
				<div class="grid grid-cols-1 md:grid-cols-[17rem_1fr] gap-8">
					<div class="hidden md:block">
						<ListAttendance />
					</div>
					<div class="w-full overflow-x-hidden">
						<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Absensi Rapat</h2>
						<div class="block md:hidden mb-16">
							<ListAttendance />
						</div>
						<HeroAttendance />
					</div>
				</div>
			</div>
		</template>
	</BasicLayout>
</template>