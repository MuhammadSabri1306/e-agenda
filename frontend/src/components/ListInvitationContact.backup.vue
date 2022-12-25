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

const getContactByCategory = (categoryType, categoryId) => {
	return contact.value
		.filter(item => {
			const itemCategoryId = item[categoryType] ? item[categoryType].id : null;
			if(!itemCategoryId)
				return false;
			return itemCategoryId == categoryId;
		})
		.map(item => item.id);
};

const dewanTitle = [
	{ id: 1, typeKey: "dewanTitle", title: "Ketua", text: "Ketua DPRD" },
	{ id: 2, typeKey: "dewanTitle", title: "Wakil Ketua", text: "Wakil Ketua DPRD" }
];

const getContactByDewanTitle = id => {
	const index = dewanTitle.findIndex(item => item.id == id);
	const currTitle = dewanTitle[index] ? dewanTitle[index].title : null;
	return contact.value
		.filter(item => item.pimpinan_dewan == currTitle)
		.map(item => item.id);
};

const badanDewan = [
	{ id: 1, typeKey:"badanDewan", name: "musyawarah", text: "Badan Musyawarah", key: "badan_musyawarah" },
	{ id: 2, typeKey:"badanDewan", name: "perda", text: "Badan Pembentukan Perda", key: "badan_pembentukan_perda" },
	{ id: 3, typeKey:"badanDewan", name: "anggaran", text: "Badan Anggaran", key: "badan_anggaran" },
	{ id: 4, typeKey:"badanDewan", name: "kehormatan", text: "Badan Kehormatan", key: "badan_kehormatan" }
];
const getContactByBadanDewan = id => {
	const index = badanDewan.findIndex(item => item.id == id);
	const attrKey = index >= 0 ? "kedudukan_" + badanDewan[index].key : "x";

	return contact.value
		.filter(item => {
			if(!item[attrKey] || !item[attrKey] === undefined)
				return false;
			return item[attrKey] !== "Bukan Anggota";
		})
		.map(item => item.id);
};

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

const checkedFilter = reactive([]);

const getFilter = (type, filter) => {
	const title = (type == "fraksi") ? filter.nama_fraksi
		: (type == "komisi") ? filter.nama_komisi
		: (type == "dewanTitle" || type == "badanDewan") ? filter.text
		: null;

	return { title, type, id: filter.id };
};

const getMatchedContact = (filter) => {
	if(filter.type == "fraksi" || filter.type == "komisi")
		return getContactByCategory(filter.type, filter.id);

	if(filter.type == "dewanTitle")
		return getContactByDewanTitle(filter.id);
	
	if(filter.type == "badanDewan")
		return getContactByBadanDewan(filter.id);
	
	return [];
};

const addFilter = filter => {
	const type = filter.nama_fraksi ? "fraksi"
		: filter.nama_komisi ? "komisi"
		: (filter.typeKey || null);
	if(!type)
		return;

	const newFilter = getFilter(type, filter);
	newFilter && checkedFilter.push(newFilter);
};

const removeFilter = filter => {
	const currFilterIndex = checkedFilter.findIndex(item => item.type === filter.type && item.id === filter.id);
	if(currFilterIndex < 0)
		return;

	checkedFilter.splice(currFilterIndex, 1);
};

watch(checkedFilter, filters => {
	checkedContact.value = [];
	let matchedContact = [];

	filters.forEach(item => {
		matchedContact = [...getMatchedContact(item), ...matchedContact];
	});
	
	const checkedContactsId = [...matchedContact, ...checkedContact.value];
	checkedContact.value = [...new Set(checkedContactsId)];
});
</script>
<template>
	<div>
		<div class="mb-8">
			<div class="grid grid-cols-1 md:flex flex-wrap items-center gap-4 mb-8">
				<ListBox :list="dewanTitle" title="Pimpinan Dewan" labelKey="text" @select="addFilter" />
				<ListBox :list="badanDewan" title="Badan Kelengkapan" labelKey="text" @select="addFilter" />
				<ListBox v-if="categoryKomisi.length > 0" :list="categoryKomisi" title="Komisi" labelKey="nama_komisi" @select="addFilter" />
				<ListBox v-if="categoryFraksi.length > 0" :list="categoryFraksi" title="Fraksi" labelKey="nama_fraksi" @select="addFilter" />
			</div>
			<div class="form-group mb-4">
				<label>Kategori: </label>
			</div>
			<div class="p-4 flex flex-wrap items-center gap-4 min-h-[5rem] border bg-gray-100 rounded">
				<ChipsClosable v-for="item in checkedFilter" :item="item" labelKey="title" @close="removeFilter" />
			</div>
		</div>
		<CardTable v-if="contact.length > 0">
			<template #thead>
				<tr>
					<th>Nama</th>
					<th>Kategori</th>
				</tr>
			</template>
			<template #tbody>
				<tr v-for="(item, index) in contact">
					<td>
						<div class="flex items-center gap-2">
							<input type="checkbox" v-model="checkedContact" :value="item.id" :id="'cbContact' + index">
							<div class="form-group">
								<label :for="'cbContact'+index" class="leading-none">{{ item.nama }}</label>
							</div>
						</div>
					</td>
					<td class="text-sm text-gray-700">{{ getCategory(item) }}</td>
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