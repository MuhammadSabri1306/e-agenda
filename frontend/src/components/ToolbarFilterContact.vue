<script setup>
import { ref, computed } from "vue";
import { useContactStore } from "@/stores/contact";
import { useViewStore } from "@/stores/view";
import ListBox from "@/components/ui/ListBox.vue";
import ChipsClosable from "@/components/ui/ChipsClosable.vue";

const viewStore = useViewStore();
const contactStore = useContactStore();

const fraksi = computed(() => contactStore.fraksi);
const isFraksiLoaded = ref(false);

const komisi = computed(() => contactStore.komisi);
const isKomisiLoaded = ref(false);

const dewanTitle = contactStore.dewanTitle;
const badanDewan = contactStore.badanDewan;

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
</script>
<template>
	<div>
		<div class="form-group mb-4">
			<label>Kategori: </label>
		</div>
		<div class="grid grid-cols-1 gap-2 mb-8">
			<ListBox :list="dewanTitle" title="Kedudukan" labelKey="text" @select="addFilter" />
			<ListBox :list="badanDewan" title="Alat Kelengkapan" labelKey="text" @select="addFilter" />
			<ListBox v-if="isKomisiLoaded" :list="komisi" title="Komisi" labelKey="nama_komisi" @select="addFilter" />
			<ListBox v-if="isFraksiLoaded" :list="fraksi" title="Fraksi" labelKey="nama_fraksi" @select="addFilter" />
		</div>
		<div class="form-group mb-4">
			<label>Filter: </label>
		</div>
		<div class="p-4 flex flex-wrap items-center gap-4 min-h-[5rem] border bg-gray-100 rounded">
			<ChipsClosable v-for="item in appliedFilter" :item="item" labelKey="title" @close="removeFilter" />
		</div>
	</div>
</template>