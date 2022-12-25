<script setup>
import { ref, computed } from "vue";
import { useContactStore } from "@/stores/contact";
import { useViewStore } from "@/stores/view";
import CardTable from "@/components/ui/CardTable.vue";
import ListBox from "@/components/ui/ListBox.vue";
import ChipsClosable from "@/components/ui/ChipsClosable.vue";

const viewStore = useViewStore();
const contactStore = useContactStore();

const contact = computed(() => contactStore.filteredContact);
const isContactLoaded = ref(false);

const fraksi = computed(() => contactStore.fraksi);
const isFraksiLoaded = ref(false);

const komisi = computed(() => contactStore.komisi);
const isKomisiLoaded = ref(false);

const dewanTitle = contactStore.dewanTitle;
const badanDewan = contactStore.badanDewan;

contactStore.fetchContact(false, success => {
	isContactLoaded.value = success;
	if(!success)
		viewStore.showToast("Koneksi gagal", "Terjadi masalah saat menghubungi server.", false);
});

contactStore.fetchFraksi(false, success => {
	isFraksiLoaded.value = success;
	if(!success)
		viewStore.showToast("Beberapa modul gagal dimuat", "Sistem mungkin tidak dapat berjalan semestinya. Hal ini dapat terjadi karena koneksi internet yang lambat atau terdapat masalah dalam koneksi ke server.", false);
});

contactStore.fetchKomisi(false, success => {
	isKomisiLoaded.value = true;
	if(!success)
		viewStore.showToast("Beberapa modul gagal dimuat", "Sistem mungkin tidak dapat berjalan semestinya. Hal ini dapat terjadi karena koneksi internet yang lambat atau terdapat masalah dalam koneksi ke server.", false);
});

const appliedFilter = computed(() => contactStore.appliedFilter);
const removeFilter = contactStore.removeFilter;
const addFilter = filter => {
	const type = filter.nama_fraksi ? "fraksi"
		: filter.nama_komisi ? "komisi"
		: (filter.typeKey || null);
	if(!type)
		return;
	contactStore.addFilter(type, filter);
};

const getEditContactUrl = currId => `/contact/edit/${ currId }`;

const getCategory = item => {
	const result = [];

	if(item.pimpinan_dewan != "Anggota")
		result.push(item.pimpinan_dewan + " DPRD");
	if(item.kedudukan_badan_kehormatan != "Bukan Anggota")
		result.push(item.kedudukan_badan_kehormatan + " Badan Kehormatan");
	if(item.kedudukan_badan_anggaran != "Bukan Anggota")
		result.push(item.kedudukan_badan_anggaran + " Badan Anggaran");
	if(item.kedudukan_badan_musyawarah != "Bukan Anggota")
		result.push(item.kedudukan_badan_musyawarah + " Badan Musyawarah");
	if(item.kedudukan_badan_pembentukan_perda != "Bukan Anggota")
		result.push(item.kedudukan_badan_pembentukan_perda + " Badan Perda");
	if(item.kedudukan_komisi && item.kedudukan_komisi != "Bukan Anggota" && item.komisi && item.komisi.nama_komisi)
		result.push(item.kedudukan_komisi + " " + item.komisi.nama_komisi);
	if(item.fraksi && item.fraksi.nama_fraksi)
		result.push(item.kedudukan_fraksi + " " + item.fraksi.nama_fraksi.replace("Partai ", ""));

	return result.join(", ");
};
</script>
<template>
	<div>
		<div v-if="isContactLoaded && contact.length < 1">
			<p class="text-sm font-semibold text-gray-700">Belum ada kontak</p>
		</div>
		<div v-if="isContactLoaded && contact.length > 0">
			<CardTable :hoverable="true" class="table-contact">
				<template #thead>
					<tr>
						<th>No</th>
						<th>Nama</th>
						<th>No. Telepon</th>
						<th>Kategori</th>
					</tr>
				</template>
				<template #tbody>
					<tr v-for="(item, index) in contact" @click="$router.push(getEditContactUrl(item.id))">
						<td>{{ index + 1 }}</td>
						<td class="whitespace-nowrap">{{ item.nama }}</td>
						<td>{{ item.no_hp }}</td>
						<td class="text-xs font-medium min-w-[16rem]">{{ getCategory(item) }}</td>
					</tr>
				</template>
			</CardTable>
		</div>
	</div>
</template>
<style scoped>

.table-contact td {
	@apply cursor-pointer;
}

</style>