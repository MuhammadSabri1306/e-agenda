<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["change"]);
const props = defineProps({
	value: String,
	title: String,
	list: { type: Array, default: [] }
});

const showOptions = ref(false);
const text = computed(() => props.value || props.title);
const content = computed(() => {
	return props.list.map(item => {
		const { value, disabled } = item;
		const selected = value == props.value;
		const text = item.text || item.value;

		return { value, selected, disabled, text };
	});
});

const listItemClass = (index) => {
	const { selected, disabled } = content.value[index];

	return {
		"rounded-t-md": !props.title && index === 0,
		"rounded-b-md": index === content.value.length - 1,
	};

	if(selected)
		return ["bg-indigo-600", "text-white"];
	if(disabled)
		return ["bg-gray-200", "text-gray-600"];
};

const onLostFocus = (event) => {
	if(!Boolean(event.relatedTarget))
		showOptions.value = false;
};

const getOptionClass = (index) => {
	const { selected, disabled } = content.value[index];
	return {
		"rounded-t-md": !props.title && index === 0,
		"rounded-b-md": index === content.value.length - 1,
	};
};

const change = (index) => {
	showOptions.value = false;
	emit("change", content.value[index].value);
};
</script>
<template>
	<div class="custom-select">
		<button role="listbox" class="relative block text-left" @click="showOptions = !showOptions" @focusout="onLostFocus">
			<span>{{ text }}</span>
			<div class="absolute top-1/2 right-0 -translate-y-1/2 pr-1">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="dropdown-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
			</div>
		</button>
		<div v-if="showOptions" class="relative">
			<div class="absolute top-2 left-0 min-w-[12rem] border rounded-md border-gray-300 shadow-sm flex flex-col items-stretch z-[8899]">
				<button v-if="title" role="option" class="rounded-t-md" disabled aria-disabled="true">{{ title }}</button>
				<button v-for="(item, index) in content" role="option" :aria-selected="item.selected" :disabled="item.disabled || item.selected" :aria-disabled="item.disabled || item.selected" @click="change(index)" :class="getOptionClass(index)" class="inline-flex items-center">
					<span class="block pr-4" :class="{ 'opacity-0': !item.selected }">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="selected-icon block"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
					</span>
					<span>{{ item.text }}</span>
				</button>
			</div>
		</div>
	</div>
</template>