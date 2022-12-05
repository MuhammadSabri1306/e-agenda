<script setup>
import { ref, computed } from "vue";
import { useContactStore } from "@/stores/contact";
import CardTable from "@/components/ui/CardTable.vue";

const contactStore = useContactStore();
const contact = computed(() => contactStore.contact);
contactStore.fetchContact();

const getEditContactUrl = currId => `/contact/edit/${ currId }`;
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Kontak</h2>
		<div v-if="contact.length < 1">
			<p class="text-sm font-semibold text-gray-700">Belum ada kontak.</p>
		</div>
		<div v-else>
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
						<th>No. Whatsapp</th>
						<th>Kategori</th>
					</tr>
				</template>
				<template #tbody>
					<tr v-for="(item, index) in contact" @click="$router.push(getEditContactUrl(item.id))">
						<td>{{ index + 1 }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.wa }}</td>
						<td>
							<div class="flex flex-wrap items-start gap-2">
								<span v-if="item.fraksi" class="badge-contact-category">{{ item.fraksi.name }}</span>
								<span v-if="item.komisi" class="badge-contact-category">{{ item.komisi.name }}</span>
								<span v-if="item.pansus" class="badge-contact-category">{{ item.pansus.name }}</span>
								<span v-if="item.opd" class="badge-contact-category">{{ item.opd.name }}</span>
							</div>
						</td>
					</tr>
				</template>
			</CardTable>
		</div>
	</div>
</template>
<style scoped>
	
.badge-contact-category {
	@apply whitespace-nowrap px-2 py-1 text-xs font-semibold text-white bg-primary-500 rounded-pill cursor-pointer;
}

.table-contact td {
	@apply cursor-pointer;
}

</style>