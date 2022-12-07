<script setup>
import { ref } from "vue";

const emit = defineEmits(["toggle"]);
const props = defineProps({
	value: { type: Boolean, default: false },
	disabled: { type : Boolean, default: false }
});

const toggleVal = ref(props.value);

const setValue = val => toggleVal.value = val;
defineExpose({ setValue });

const onTogglerClick = () => {
	if(props.disabled)
		return;

	toggleVal.value = !toggleVal.value;
	emit("toggle", toggleVal.value);
};
</script>
<template>
	<a role="button" @click="onTogglerClick" :class="{ 'active': toggleVal }" class="switch">
		<span class="switch-slider"></span>
	</a>
</template>
<style scoped>
	
.switch {
	@apply relative inline-block h-[1.5em] w-[2.6em];
}

.switch-slider {
	@apply absolute inset-0 rounded-[1em] bg-gray-300 transition-colors;
}

.switch.active .switch-slider {
	@apply bg-primary-500;
}

.switch-slider:before {
	content: "";
	@apply absolute left-[0.1em] top-[0.1em] h-[1.3em] w-[1.3em] rounded-full bg-white transition-transform translate-x-0;
}

.switch.active .switch-slider:before {
	@apply translate-x-[1.1em];
}

</style>