<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAgendaStore } from "@/stores/agenda";
import { useViewStore } from "@/stores/view";
import { useDateId, toTimeStr } from "@/modules/date-id";
import CardTable from "@/components/ui/CardTable.vue";
import SwitchToggle from "@/components/ui/SwitchToggle.vue";
import CardQrCode from "@/components/CardQrCode.vue";
import ButtonBack from "@/components/ButtonBack.vue";``

const isAttLoaded = ref(false);
const agendaStore = useAgendaStore();
const route = useRoute();

const attendance = computed(() => agendaStore.attendance);
const agendaId = computed(() => route.params.id);
const isAvailable = ref(false);

const currAtt = computed(() => {
	if(attendance.value.length < 1)
		return {};

	const data = attendance.value.find(item => item.id == agendaId.value);
	return {
		title: data.nama,
		available: Boolean(Number(data.status_rapat)),
		qrCode: data.qr_code,
		list: data.absen
	};
});

const viewStore = useViewStore();
const initAttendance = success => {
	if(success)
		isAvailable.value = currAtt.value.available;
	else
		viewStore.showToast("Koneksi gagal", "Terjadi masalah saat menghubungi server.", false);
	isAttLoaded.value = success;
};

agendaStore.fetchAttendance(false, initAttendance);

const buildQrCodeAttr = computed(() => {
	const isLocal = document.location.href.search("localhost") >= 0;
	const baseUrl = isLocal ? "http://localhost:5173" : "https://e-rapat-sulsel.netlify.app";
	
	const targetUrl = baseUrl + "/att/room/" + currAtt.value.qrCode;
	const filename = "e-rapat_" + currAtt.value.qrCode;

	return { targetUrl, filename };
});

const isUpdate = ref(false);
const qrcodeFilename = qrCode => "e-rapat_" + qrCode;

const switchToggle = ref(null);
const isUpdatingStatus = ref(false);
const onSwitchStatus = () => {
	if(!switchToggle.value)
		return;

	isUpdatingStatus.value = true;
	const status = !isAvailable.value;
	agendaStore.updateAgendaStatus(agendaId.value, status, success => {
		if(!success) {
			viewStore.showToast("Koneksi gagal", "Terjadi masalah saat menghubungi server.", false);
			return;
		}

		switchToggle.value.setValue(status);
		agendaStore.fetchAttendance(true, initAttendance);

		const message = status ? "Absensi Rapat diaktifkan." : "Absensi Rapat dimatikan.";
		viewStore.showToast("Absensi", message, true);
		isUpdatingStatus.value = false;
	});
};

const buildTimestamp = dateTime => {
	const { date, monthNum, year } = useDateId(new Date(dateTime));
	const { time } = toTimeStr(new Date(dateTime), ":");

	return `${ year }/${ monthNum }/${ date } ${ time }`;
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Absensi Rapat</h2>
		<div class="flex items-center mb-8">
			<ButtonBack />
		</div>
		<div v-if="isAttLoaded">
			<div class="mb-8 flex flex-wrap items-start gap-8">
				<div class="basic-card card-attendance-desc">
					<div class="form-group mb-4">
						<label>Name Rapat :<br>{{ currAtt.title }}</label>
					</div>
					<div class="form-group">
						<label>Status :</label>
						<div class="flex items-center gap-2">
							<span :class="{ 'opacity-0': !isUpdate }" class="text-gray-500">
								<font-awesome-icon icon="fa-solid fa-circle-notch" spin fixed-width />
							</span>
							<label>Tidak Aktif</label>
							<SwitchToggle ref="switchToggle" :value="currAtt.available" :disabled="true" @click="onSwitchStatus" :class="{ 'opacity-50': isUpdatingStatus }" />
							<label>Aktif</label>
						</div>
					</div>
				</div>
				<CardQrCode v-bind="buildQrCodeAttr" />
			</div>
			<h2 class="text-gray-800 text-xl font-body mb-4 ml-4 font-semibold">Daftar Hadir</h2>
			<div>
				<CardTable :hoverable="true" class="table-attendance">
					<template #thead>
						<tr>
							<th>No</th>
							<th>Waktu</th>
							<th>Peserta</th>
							<th>No. Whatsapp</th>
						</tr>
					</template>
					<template #tbody>
						<tr v-if="currAtt.list.length < 1">
							<td colspan="4"><p class="text-center text-sm font-semibold text-gray-700">Belum ada peserta.</p></td>
						</tr>
						<tr v-for="(item, index) in currAtt.list">
							<td>{{ index + 1 }}</td>
							<td class="whitespace-nowrap">{{ buildTimestamp(item.created_at) }}</td>
							<td class="whitespace-nowrap">{{ item.nama }}<b class="pl-2">{{ item.jenis_kelamin == 'perempuan' ? '(P)' : '(L)' }}</b></td>
							<td>{{ item.no_hp }}</td>
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
	@apply text-sm font-medium text-gray-600 !important;
}

</style>