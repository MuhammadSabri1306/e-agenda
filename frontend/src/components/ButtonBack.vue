<script setup>
import { useRouter } from "vue-router";
import { ArrowLongLeftIcon } from "@heroicons/vue/24/solid";
defineProps({
	routeTo: String
});

const router = useRouter();
const onClick = () => {
	if(props.routeTo) {
		router.push(props.routeTo);
		return;
	}
	
	router.back();
};
</script>
<template>
	<button type="button" @click="onClick" class="btn btn-icon transition-colors text-gray-500 hover:text-gray-700 focus:text-gray-700">
		<ArrowLongLeftIcon />
		<span class="ml-2">Kembali</span>
	</button>
</template>
<style scoped>
	
.btn-icon svg {
	@apply w-5 h-5;
}

</style>