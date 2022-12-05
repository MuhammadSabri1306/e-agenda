<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import ListAttendance from "@/components/ListAttendance.vue";
import HeroAttendance from "@/components/HeroAttendance.vue";
import TableAttendanceDetail from "@/components/TableAttendanceDetail.vue";
import FormEditInvitation from "@/components/FormEditInvitation.vue";

const route = useRoute();
const showDetail = computed(() => route.name == "attendanceDetail");
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="container py-8">
				<div class="grid grid-cols-1 md:grid-cols-[17rem_1fr] gap-8">
					<div>
						<ListAttendance />
					</div>
					<div>
						<TableAttendanceDetail v-if="showDetail" />
						<HeroAttendance v-else />
					</div>
				</div>
			</div>
		</template>
	</BasicLayout>
</template>