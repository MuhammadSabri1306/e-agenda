<script setup>
import { ref, computed } from "vue";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import Calendar from "@/components/Calendar.vue";
import TableTimePoint from "@/components/TableTimePoint.vue";
import OffcanvasAgenda from "@/components/OffcanvasAgenda.vue";
import ListAgenda from "@/components/ListAgenda.vue";
import ToolbarFilter from "@/components/ToolbarFilter.vue";

const detailAgendaId = ref(null);
</script>
<template>
	<BasicLayout @new="$router.push('/agenda/new')" baseBgClass="bg-gray-100">
		<template #toolbar>
			<div class="py-2 border-t">
				<div class="container flex items-center justify-end gap-8">
					<div class="form-group">
						<label>Filter</label>
					</div>
					<ToolbarFilter />
				</div>
			</div>
		</template>
		<template #main>
			<div class="p-8 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
				<div class="row-start-2 row-end-3 md:row-start-1 md:row-end-2 mt-8">
					<div class="hidden md:flex flex-col gap-8 mb-8">
						<button type="button" @click="$router.push('/agenda/new')" class="btn btn-icon text-white transition-colors bg-primary-600 hover:bg-primary-500 focus:bg-primary-500">
							<font-awesome-icon icon="fa-solid fa-plus" fixed-width />
							<span class="ml-2">Rapat Baru</span>
						</button>
					</div>
					<div>
						<Calendar @select="val => detailAgendaId = val" class="basic-card mb-4" />
						<div class="basic-card py-6">
							<h4 class="text-gray-800 text-xl leading-tight mb-4 px-4">Rapat hari ini</h4>
							<div class="h-96 overflow-y-auto border-y custom-scrollbar">
								<TableTimePoint />
							</div>
						</div>
					</div>
				</div>
				<div class="w-full overflow-x-visible">
					<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Rapat</h2>
					<div class="flex md:hidden flex-col gap-8 mb-8">
						<button type="button" @click="$router.push('/agenda/new')" class="btn btn-icon text-white transition-colors bg-primary-600 hover:bg-primary-500 focus:bg-primary-500">
							<font-awesome-icon icon="fa-solid fa-plus" fixed-width />
							<span class="ml-2">Rapat Baru</span>
						</button>
					</div>
					<ListAgenda @showDetail="val => detailAgendaId = val" />
				</div>
				<OffcanvasAgenda v-if="detailAgendaId" :agendaId="detailAgendaId" @close="detailAgendaId = null" />
			</div>
		</template>
	</BasicLayout>
</template>