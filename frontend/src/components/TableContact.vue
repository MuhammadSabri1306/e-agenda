<script setup>
import { ref, computed } from "vue";
import { useContactStore } from "@/stores/contact";
import { useViewStore } from "@/stores/view";
import CardTable from "@/components/ui/CardTable.vue";

const contactStore = useContactStore();
const contact = computed(() => contactStore.contact);

const viewStore = useViewStore();
const isContactLoaded = ref(false);
contactStore.fetchContact(false, success => {
	isContactLoaded.value = success;
	if(!success)
		viewStore.showToast("Koneksi gagal", "Terjadi masalah saat menghubungi server.", false);
});

const getEditContactUrl = currId => `/contact/edit/${ currId }`;

const getCategory = item => {
	const result = [];

	if(item.pimpinan_dewan != "Anggota")
		result.push(item.pimpinan_dewan + " DPRD");
	if(item.kedudukan_badan_kehormatan != "Bukan Anggota")
		result.push(item.kedudukan_badan_kehormatan + "Badan Kehormatan");
	if(item.kedudukan_badan_anggaran != "Bukan Anggota")
		result.push(item.kedudukan_badan_anggaran + "Badan Anggaran");
	if(item.kedudukan_badan_musyawarah != "Bukan Anggota")
		result.push(item.kedudukan_badan_musyawarah + "Badan Musyawarah");
	if(item.kedudukan_badan_pembentukan_perda != "Bukan Anggota")
		result.push(item.kedudukan_badan_pembentukan_perda + "Badan Perda");
	if(item.fraksi && item.fraksi.nama_fraksi)
		result.push(item.fraksi.nama_fraksi.replace("Partai ", ""));
	if(item.kedudukan_komisi && item.kedudukan_komisi != "Bukan Anggota" && item.komisi && item.komisi.nama_komisi)
		item.komisi.nama_komisi;

	return result.join(", ");
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Kontak</h2>
		<div v-if="isContactLoaded && contact.length < 1">
			<p class="text-sm font-semibold text-gray-700">
				<span class="mr-2">Belum ada kontak.</span>
				<a role="button" @click="$router.push('/contact/new')" class="border-b transition-colors border-transparent hover:border-primary-600 hover:text-primary-700">Buat kontak baru</a>
			</p>
		</div>
		<div v-if="isContactLoaded && contact.length > 0">
			<div class="flex items-center mb-8">
				<button type="button" @click="$router.push('/contact/new')" class="btn btn-icon text-white transition-colors bg-primary-600 hover:bg-primary-500 focus:bg-primary-500">
					<font-awesome-icon icon="fa-solid fa-plus" fixed-width />
					<span class="ml-2">Kontak Baru</span>
				</button>
			</div>
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
						<td class="text-xs font-medium">{{ getCategory(item) }}</td>
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