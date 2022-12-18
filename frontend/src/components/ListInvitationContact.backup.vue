<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useContactStore } from "@/stores/contact";

const emit = defineEmits(["change"]);
const props = defineProps({
	value: { type: Array, default: [] }
});

const contactStore = useContactStore();
const checkedContact = ref(props.value);
const contact = computed(() => contactStore.contact);

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

const onCategoryChanged = (type, newList, oldList) => {
	const isAdd = newList.length > oldList.length;
	if(isAdd) {

		let checkedContactsId = [];
		newList.forEach(item => {
			const matchedContact = getContactByCategory(type, item);
			if(matchedContact.length > 0)
				checkedContactsId = [...checkedContactsId, ...matchedContact];
		});

		checkedContactsId = [...checkedContactsId, ...checkedContact.value];
		checkedContact.value = [...new Set(checkedContactsId)];

	} else {

		const uncheckedCategories = oldList.filter(item => newList.indexOf(item) < 0);
		let uncheckedContactsId = [];
		uncheckedCategories.forEach(item => {
			const matchedContact = getContactByCategory(type, item);
			if(matchedContact.length > 0)
				uncheckedContactsId = [...uncheckedContactsId, ...matchedContact];
		});
		uncheckedContactsId = [...new Set(uncheckedContactsId)];
		checkedContact.value = checkedContact.value.filter(item => uncheckedContactsId.indexOf(item) < 0);

	}
};

const checkedFraksi = ref([]);
watch(checkedFraksi, (newVal, oldVal) => onCategoryChanged("fraksi", newVal, oldVal,));

const checkedKomisi = ref([]);
watch(checkedKomisi, (newVal, oldVal) => onCategoryChanged("komisi", newVal, oldVal,));

contactStore.fetchContact();
watch(checkedContact, val => {
	emit("change", val);
});

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
	<div class="rounded overflow-hidden border">
		<div class="px-4 py-4 grid grid-cols-1 gap-4 border-b bg-gray-100">
			<div v-if="categoryFraksi.length > 0" class="form-group">
				<label>Fraksi</label>
				<div class="category-wrapper">
					<div v-for="(item, index) in categoryFraksi" class="flex items-center gap-2">
						<input type="checkbox" v-model="checkedFraksi" :value="item.id" :id="'cbFraksi' + index">
						<label :for="'cbFraksi' + index">{{ item.nama_fraksi }}</label>
					</div>
				</div>
			</div>
			<div v-if="categoryKomisi.length > 0" class="form-group">
				<label>Komisi</label>
				<div class="category-wrapper">
					<div v-for="(item, index) in categoryKomisi" class="flex items-center gap-2">
						<input type="checkbox" v-model="checkedKomisi" :value="item.id" :id="'cbKomisi' + index">
						<label :for="'cbKomisi' + index">{{ item.nama_komisi }}</label>
					</div>
				</div>
			</div>
		</div>
		<div class="contact-wrapper">
			<table v-if="contact.length > 0">
				<tr v-for="(item, index) in contact">
					<td>
						<div class="flex items-center gap-2">
							<input type="checkbox" v-model="checkedContact" :value="item.id" :id="'cbContact' + index">
							<div class="form-group">
								<label :for="'cbContact'+index" class="leading-none">{{ item.nama }}</label>
							</div>
						</div>
					</td>
					<td class="text-xs font-medium">{{ getCategory(item) }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<style scoped>
	
.category-wrapper {
	@apply flex flex-wrap items-start gap-4 px-4;
}

.category-wrapper label {
	@apply text-xs font-semibold leading-none;
}

.contact-wrapper {
	@apply h-[18rem] bg-white overflow-y-auto p-4;
}

.badge-contact-category {
	@apply whitespace-nowrap px-2 py-1 text-xs font-semibold text-white bg-primary-500 rounded-pill cursor-default;
}

table {
	@apply border-separate border-spacing-0 w-full;
}

td {
	@apply w-auto px-4 py-2 border-b;
}

/*.contact-wrapper li:not(:last-child) {
	@apply border-b;
}*/

</style>