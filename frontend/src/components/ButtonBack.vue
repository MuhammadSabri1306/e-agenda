<script setup>
import { ArrowLongLeftIcon } from "@heroicons/vue/24/solid";
</script>
<template>
	<button type="button" @click="$router.back()" class="btn btn-icon transition-colors text-gray-500 hover:text-gray-700 focus:text-gray-700">
		<ArrowLongLeftIcon />
		<span class="ml-2">Kembali</span>
	</button>
</template>
<style scoped>
	
.btn-icon svg {
	@apply w-5 h-5;
}

</style>