<script setup>
import { ref, computed } from "vue";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import CardTable from "@/components/ui/CardTable.vue";
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="container py-8 md:px-16 lg:px-24">
				<h2 class="text-gray-800 text-3xl font-bold leading-tight mb-8">Data Operator</h2>
				<CardTable :hoverable="true">
					<template #thead>
						<tr>
							<th>No</th>
							<th>Nama</th>
							<th>Email</th>
						</tr>
					</template>
					<template #tbody>
						<!-- <tr>
							<td>1</td>
							<td>Muhammad Sabri</td>
							<td>muhammadsabri1306@gmail.com</td>
						</tr> -->
						<tr>
							<td colspan="3"><p class="text-gray-600 text-center font-semibold">Belum ada akun Operator.</p></td>
						</tr>
					</template>
				</CardTable>
			</div>
		</template>
	</BasicLayout>
</template>