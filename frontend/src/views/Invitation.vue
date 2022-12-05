<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "@/components/basic-layout/Layout.vue";
import ListInvitation from "@/components/ListInvitation.vue";
import HeroInvitation from "@/components/HeroInvitation.vue";
import FormAddInvitation from "@/components/FormAddInvitation.vue";
import FormEditInvitation from "@/components/FormEditInvitation.vue";

const route = useRoute();
const showFormNew = computed(() => route.name == "invitationNew");
const showFormEdit = computed(() => route.name == "invitationEdit");
</script>
<template>
	<BasicLayout>
		<template #main>
			<div class="container py-8">
				<div class="grid grid-cols-1 md:grid-cols-[17rem_1fr] gap-8">
					<div>
						<ListInvitation />
					</div>
					<div>
						<FormAddInvitation v-if="showFormNew" />
						<FormEditInvitation v-else-if="showFormEdit" />
						<HeroInvitation v-else />
					</div>
				</div>
			</div>
		</template>
	</BasicLayout>
</template>