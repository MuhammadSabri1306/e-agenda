<script setup>
import { ref, watch } from "vue";

const props = defineProps({ ascending: Boolean });
const isAsc = ref(props.ascending);

watch(() => props.ascending, (val) => isAsc.value = val);
</script>
<template>
	<button class="ml-auto py-1 px-2 text-lg rounded-md text-gray-700 bg-white/50 hover:bg-white focus:bg-white border border-gray-200 hover:border-gray-300 focus:border-primary-500">
		<font-awesome-icon v-show="ascending" icon="fa-solid fa-arrow-down-wide-short" fixed-width />
		<font-awesome-icon v-show="!ascending" icon="fa-solid fa-arrow-up-short-wide" fixed-width />
	</button>
</template>