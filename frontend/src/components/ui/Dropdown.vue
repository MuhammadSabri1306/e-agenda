<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["change"]);
const props = defineProps({
	options: { type: Array, default: [] },
	value: { default: null },
	defaultTitle: { type: String, default: "Choose a option" },
	labelKey: { type: String, default: "key"},
	valueKey: { type: String, default: "value"}
});

const selectedIndex = ref(-1);
if(props.value) {
	selectedIndex.value = props.options.findIndex(item => {
		if(typeof item == "string")
			return item == props.value;
		return item[props.valueKey] == props.value;
	});
}

const title = computed(() => {
	if(selectedIndex.value < 0 || selectedIndex.value >= props.options.length)
		return props.defaultTitle;

	const currOption = props.options[selectedIndex.value];
	
	if(typeof currOption == "string")
		return currOption;
	return currOption[props.labelKey];
});

const showOptions = ref(false);
const dropdownCollapse = ref(null);

const onDropdownBlur = event => {
	if(dropdownCollapse.value.contains(event.relatedTarget))
		return;
	showOptions.value = false;
};

const change = index => {
	selectedIndex.value = index;

	const currOption = props.options[index];
	if(typeof currOption == "string")
		emit("change", currOption);
	else
		emit("change", currOption[props.valueKey]);
};

const getItemTitle = index => {
	const currOption = props.options[index];
	if(typeof currOption == "string")
		return currOption;
	return currOption[props.labelKey];
};
</script>
<template>
	<div class="dropdown">
		<button type="button" @click="showOptions = !showOptions" @focusout="onDropdownBlur" class="dropdown-toggler group" >
			<span>{{ title }}</span>
			<span class="dropdown-icon">
				<font-awesome-icon icon="fa-solid fa-caret-up" fixed-width />
				<font-awesome-icon icon="fa-solid fa-caret-down" fixed-width />
			</span>
		</button>
		<Transition name="fade">
			<div v-show="showOptions" ref="dropdownCollapse" class="dropdown-collapse">
				<ul @focusout="onDropdownBlur" tabindex="-1">
					<li v-for="(item, index) in options">
						<button v-if="index == selectedIndex" type="button" class="dropdown-item active" disabled>{{ getItemTitle(index) }}</button>
						<button v-else type="button" @click="change(index)" class="dropdown-item">{{ getItemTitle(index) }}</button>
					</li>
				</ul>
			</div>
		</Transition>
	</div>
</template>
<style scoped>
	
.dropdown {
	@apply relative;
}

.dropdown-toggler {
	@apply flex justify-start items-center w-full whitespace-nowrap;
}

.dropdown-icon {
	@apply ml-auto inline-flex flex-col justify-center items-center text-[0.7em] opacity-70;
}

.dropdown-collapse {
	@apply overflow-hidden absolute w-full left-0 top-full;
}

.dropdown-collapse ul {
	@apply flex flex-col;
}

.dropdown-collapse li:not(:last-child) {
	@apply border-b;
}

.dropdown-item {
	@apply block w-full whitespace-nowrap text-left;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s, margin 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	@apply opacity-0 -mt-2 mb-2;
}

.dropdown-toggler {
	@apply bg-white px-4 py-2 min-w-[10rem] text-sm rounded border transition-colors text-gray-600 border-gray-300;
}

.dropdown-collapse {
	@apply bg-white py-2 rounded shadow;
}

.dropdown-item {
	@apply py-2 pl-8 pr-16 text-sm font-medium text-gray-600 bg-white hover:bg-gray-100;
}

.dropdown-item.active {
	@apply bg-gray-100;
}

</style>