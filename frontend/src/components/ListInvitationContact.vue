<script setup>
import { ref, reactive, computed, watch, nextTick } from "vue";
import { useContactStore } from "@/stores/contact";
import ListBox from "@/components/ui/ListBox.vue";
import CardTable from "@/components/ui/CardTable.vue";
import ChipsClosable from "@/components/ui/ChipsClosable.vue";

const emit = defineEmits(["change"]);
const props = defineProps({
	value: { type: Array, default: [] }
});

const contactStore = useContactStore();
const checkedContact = ref(props.value);
const contact = computed(() => contactStore.contact);

contactStore.fetchContact();
watch(checkedContact, val => {
	emit("change", val);
});

contactStore.fetchFraksi();
const categoryFraksi = computed(() => contactStore.fraksi);

contactStore.fetchKomisi();
const categoryKomisi = computed(() => contactStore.komisi);

const dewanTitle = contactStore.dewanTitle;
const badanDewan = contactStore.badanDewan;

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

const checkedFilter = ref([]);
const checkAll = ref(false);

const getFilter = (type, filter) => {
	const title = (type == "fraksi") ? filter.nama_fraksi
		: (type == "komisi") ? filter.nama_komisi
		: (type == "dewanTitle" || type == "badanDewan") ? filter.text
		: null;

	return { title, type, id: filter.id };
};

const addFilter = filter => {
	const type = filter.nama_fraksi ? "fraksi"
		: filter.nama_komisi ? "komisi"
		: (filter.typeKey || null);
	if(!type)
		return;

	const newFilter = getFilter(type, filter);
	if(!newFilter)
		return;

	checkedFilter.value = [...checkedFilter.value, newFilter];
	checkAll.value = false;
};

const removeFilter = filter => {
	const currFilterIndex = checkedFilter.value.findIndex(item => item.type === filter.type && item.id === filter.id);
	if(currFilterIndex < 0)
		return;

	checkedFilter.value.splice(currFilterIndex, 1);
	checkAll.value = false;
};

const filteredContact = computed(() => {
	return contact.value.filter(item => {
		if(checkedFilter.value.length < 1)
			return true;

		let show = false;
		checkedFilter.value.forEach(filter => {
			if(show)
				return;

			if(filter.type == "fraksi" && item.fraksi) {
				show = item.fraksi.id === filter.id;
				return;
			}

			if(filter.type == "komisi" && item.komisi) {
				show = item.komisi.id === filter.id;
				return;
			}

			if(filter.type == "dewanTitle" && item.pimpinan_dewan) {
				const index = dewanTitle.findIndex(itemDewanTitle => itemDewanTitle.id == filter.id);
				const currTitle = dewanTitle[index] ? dewanTitle[index].title : null;
				
				show = item.pimpinan_dewan == currTitle;
				return;
			}

			if(filter.type == "badanDewan") {
				const index = badanDewan.findIndex(itemBadanDewan => itemBadanDewan.id == filter.id);
				const attrKey = index >= 0 ? "kedudukan_" + badanDewan[index].key : "x";

				if(item[attrKey] )
					show = item[attrKey] !== "Bukan Anggota";
				return;
			}
		});

		return show;
	});
});

watch(checkAll, isChecked => {
	checkedContact.value = [];
	if(!isChecked)
		return;
	checkedContact.value = filteredContact.value.map(item => item.id);
});
</script>
<template>
	<div>
		<div class="mb-8">
			<div class="form-group mb-4">
				<label>Kategori: </label>
			</div>
			<div class="grid grid-cols-1 md:flex flex-wrap items-center gap-4 mb-8">
				<ListBox :list="dewanTitle" title="Kedudukan" labelKey="text" @select="addFilter" />
				<ListBox :list="badanDewan" title="Alat Kelengkapan" labelKey="text" @select="addFilter" />
				<ListBox v-if="categoryKomisi.length > 0" :list="categoryKomisi" title="Komisi" labelKey="nama_komisi" @select="addFilter" />
				<ListBox v-if="categoryFraksi.length > 0" :list="categoryFraksi" title="Fraksi" labelKey="nama_fraksi" @select="addFilter" />
			</div>
			<div class="form-group mb-4">
				<label>Filter: </label>
			</div>
			<div class="p-4 flex flex-wrap items-center gap-4 min-h-[5rem] border bg-gray-100 rounded">
				<ChipsClosable v-for="item in checkedFilter" :item="item" labelKey="title" @close="removeFilter" />
			</div>
		</div>
		<CardTable v-if="filteredContact && filteredContact.length > 0">
			<template #thead>
				<tr>
					<th>
						<div class="flex items-center gap-2">
							<input type="checkbox" v-model="checkAll" aria-label="check all">
							<span>No</span>
						</div>
					</th>
					<th>Nama</th>
					<th>Kategori</th>
				</tr>
			</template>
			<template #tbody>
				<tr v-for="(item, index) in filteredContact">
					<td>
						<div class="flex items-center gap-2">
							<input type="checkbox" v-model="checkedContact" :value="item.id" :id="'cbContact' + index" :aria-label="item.nama">
							<span>{{ index + 1 }}</span>
						</div>
					</td>
					<td>{{ item.nama }}</td>
					<td class="text-sm text-gray-700">{{ getCategory(item) }}</td>
				</tr>
			</template>
		</CardTable>
		<CardTable v-else>
			<template #thead>
				<tr>
					<th>No</th>
					<th>Nama</th>
					<th>Kategori</th>
				</tr>
			</template>
			<template #tbody>
				<tr>
					<td colspan="3"><p class="text-center">Data kosong.</p></td>
				</tr>
			</template>
		</CardTable>
	</div>
</template>
<style scoped>
	
.category-wrapper {
	@apply flex flex-col items-start gap-4 p-4;
}

.category-wrapper,
.contact-wrapper {
	@apply max-h-[20rem] overflow-y-auto;
}

.contact-wrapper {
	@apply pt-8;
}

.category-wrapper label {
	@apply text-xs font-semibold leading-none;
}

table {
	@apply border-separate border-spacing-0 w-full;
}

td {
	@apply w-auto px-4 py-2 border-b;
}

.form-group label {
	@apply block text-gray-700 text-sm font-medium;
}

</style>