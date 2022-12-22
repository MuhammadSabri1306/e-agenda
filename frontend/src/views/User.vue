<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import CardTable from "@/components/ui/CardTable.vue";
import ModalNewUser from "@/components/ModalNewUser.vue";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const viewStore = useViewStore();

const isLoaded = ref(false);
userStore.fetchUser(false, success => {
	if(!success) {
		viewStore.showToast("Koneksi gagal", "Terjadi masalah saat menghubungi server.", false);
		return;
	}

	isLoaded.value = true;
});

const showFormNew = ref(false);
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="container py-8 md:px-16 lg:px-24">
				<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Data Operator</h2>
				<div v-if="isLoaded">
					<div class="flex items-center mb-8">
						<button type="button" @click="showFormNew = true" class="btn btn-icon text-white transition-colors bg-primary-600 hover:bg-primary-500 focus:bg-primary-500">
							<font-awesome-icon icon="fa-solid fa-plus" fixed-width />
							<span class="ml-2">Akun Baru</span>
						</button>
					</div>
					<CardTable v-if="user.length < 1" :hoverable="true">
						<template #thead>
							<tr>
								<th>No</th>
								<th>Nama</th>
								<th>Email</th>
							</tr>
						</template>
						<template #tbody>
							<tr>
								<td colspan="3"><p class="text-gray-600 text-center font-semibold">Belum ada akun Operator.</p></td>
							</tr>
						</template>
					</CardTable>
					<CardTable v-else :hoverable="true">
						<template #thead>
							<tr>
								<th>No</th>
								<th>Nama</th>
								<th>Email</th>
							</tr>
						</template>
						<template #tbody>
							<tr v-for="(item, index) in user">
								<td>{{ index + 1 }}</td>
								<td>{{ item.name }}</td>
								<td>{{ item.email }}</td>
							</tr>
						</template>
					</CardTable>
				</div>
			</div>
			<ModalNewUser v-if="showFormNew" @close="showFormNew = false" />
		</template>
	</BasicLayout>
</template>