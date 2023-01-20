<script setup>
import { ref, computed } from "vue";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import ListAttendance from "@/components/ListAttendance.vue";
import TableAttendanceDetail from "@/components/TableAttendanceDetail.vue";
import FileViewerAttendance from "@/components/FileViewerAttendance.vue";
import ButtonBack from "@/components/ButtonBack.vue";

const activeTab = ref(0);
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="container py-8 px-4 md:px-8">
				<div class="grid grid-cols-1 md:grid-cols-[17rem_1fr] gap-8">
					<div class="hidden md:block">
						<ListAttendance />
					</div>
					<div class="w-full overflow-x-hidden">
						<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Absensi Rapat</h2>
						<div class="flex items-center mb-8">
							<ButtonBack />
						</div>
						<div class="mb-8 flex items-end">
							<a role="button" @click="activeTab = 0" :class="{ 'active': activeTab === 0 }" class="nav-tab">Data Sesi</a>
							<a role="button" @click="activeTab = 1" :class="{ 'active': activeTab === 1 }" class="nav-tab">Arsip</a>
							<div class="grow border-b border-gray-300"></div>
						</div>
						<TableAttendanceDetail v-if="activeTab === 0" />
						<FileViewerAttendance v-if="activeTab === 1" />
					</div>
				</div>
			</div>
		</template>
	</BasicLayout>
</template>
<style scoped>
	
.nav-tab {
	@apply px-6 py-2 text-sm font-semibold text-gray-600 border-b border-gray-300 transition-colors;
}

.nav-tab.active {
	@apply text-primary-600 border-b-2 border-primary-600;
}

</style>