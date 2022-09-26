<script setup>
import { ref, watch, computed } from "vue";

const emit = defineEmits(["changed"]);
const props = defineProps({
	label: String,
	checked: Boolean
});

const isChecked = ref(props.checked);
watch(isChecked, val => emit("changed", val));

</script>
<template>
	<button class="chips-filter inline-flex items-center whitespace-nowrap" :class="{ checked: isChecked}" @click="isChecked = !isChecked">
		<span :class="{ '-ml-2 mr-1 opacity-100': isChecked, '-mr-6 scale-x-0 opacity-0': !isChecked }" class="truncate text-lg leading-none transition-all duration-300 ease-in-out">
			<font-awesome-icon icon="fa-solid fa-check" fixed-width />
		</span>
		{{ label }}
	</button>
</template>