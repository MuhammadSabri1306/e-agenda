<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAgendaStore } from "@/stores/agenda";
import CardTable from "@/components/ui/CardTable.vue";
import SwitchToggle from "@/components/ui/SwitchToggle.vue";
import CardQrCode from "@/components/CardQrCode.vue";
import { useDateId, toTimeStr } from "@/modules/date-id";

const route = useRoute();
const attId = computed(() => route.params.id);

const isAttLoaded = ref(false);
const agendaStore = useAgendaStore();
const currAtt = computed(() => agendaStore.attendance.find(item => item.id == attId.value));
agendaStore.fetchAttendance(false, success => isAttLoaded.value = success);

const isUpdate = ref(false);
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Absensi Rapat</h2>
		<div v-if="isAttLoaded">
			<div class="mb-8 flex items-start gap-8">
				<div class="basic-card card-attendance-desc">
					<div class="form-group mb-4">
						<label>Name Agenda :<br>{{ currAtt.agenda.title }}</label>
					</div>
					<div class="form-group">
						<label>Status :</label>
						<div class="flex items-center gap-2">
							<span :class="{ 'opacity-0': !isUpdate }" class="text-gray-500">
								<font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width />
							</span>
							<label>Tidak Aktif</label>
							<SwitchToggle :value="currAtt.available" />
							<label>Aktif</label>
						</div>
					</div>
				</div>
				<CardQrCode :targetUrl="currAtt.uniqueKey" />
			</div>
			<h2 class="text-gray-800 text-xl font-body mb-4 ml-4 font-semibold">Daftar Hadir</h2>
			<div v-if="currAtt.member.length < 1">
				<p class="text-sm font-semibold text-gray-700">Belum ada peserta.</p>
			</div>
			<div v-else>
				<CardTable :hoverable="true" class="table-attendance">
					<template #thead>
						<tr>
							<th>No</th>
							<th>Waktu</th>
							<th>Nama</th>
							<th>No. Whatsapp</th>
							<th>Email</th>
						</tr>
					</template>
					<template #tbody>
						<tr v-for="(item, index) in currAtt.member">
							<td>{{ index + 1 }}</td>
							<td>{{ item.dateTime }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.wa }}</td>
							<td>{{ item.email }}</td>
						</tr>
					</template>
				</CardTable>
			</div>
		</div>
	</div>
</template>
<style scoped>

.card-attendance-desc {
	@apply border shadow-sm p-8;
}

td {
	@apply text-xs font-semibold text-gray-600 !important;
}

</style>