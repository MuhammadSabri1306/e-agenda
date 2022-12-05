<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useContactStore } from "@/stores/contact";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import ListContactCategory from "@/components/ListContactCategory.vue";
import TableContact from "@/components/TableContact.vue";
import FormAddContact from "@/components/FormAddContact.vue";
import FormEditContact from "@/components/FormEditContact.vue";

const contactStore = useContactStore();
contactStore.filterCategoryType("fraksi");

const route = useRoute();
const showFormNew = computed(() => route.name == "contactNew");
const showFormEdit = computed(() => route.name == "contactEdit");
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="container py-8">
				<div class="grid grid-cols-1 md:grid-cols-[17rem_1fr] gap-8 px-4 md:px-0">
					<div>
						<ListContactCategory />
					</div>
					<div class="w-full overflow-x-hidden">
						<FormAddContact v-if="showFormNew" />
						<FormEditContact v-else-if="showFormEdit" />
						<TableContact v-else />
					</div>
				</div>
			</div>
		</template>
	</BasicLayout>
</template>