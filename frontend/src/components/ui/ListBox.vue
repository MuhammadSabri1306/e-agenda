<script setup>
import { ref } from "vue";

const emit = defineEmits(["select"]);
const props = defineProps({
	list: { type: Array, default: [] },
	title: { type: String, default: "Choose a option" },
	labelKey: { type: String, default: "label" },
	position: { type: String, default: "bottom" }
});

const showList = ref(false);
const listboxCollapse = ref(null);

const onListboxBlur = event => {
	if(listboxCollapse.value.contains(event.relatedTarget))
		return;
	showList.value = false;
};

const onSelect = item => {
	emit("select", item);
	showList.value = false;
};
</script>
<template>
	<div class="listbox">
		<button type="button" @click="showList = !showList" @focusout="onListboxBlur" class="listbox-toggler group" >
			<span>{{ title }}</span>
			<font-awesome-icon icon="fa-solid fa-magnifying-glass" fixed-width />
		</button>
		<Transition name="fade">
			<div v-show="showList" ref="listboxCollapse" :class="{ 'collapse-top': position == 'top' }" class="listbox-collapse">
				<ul @focusout="onListboxBlur" tabindex="-1">
					<li v-for="item in list">
						<button type="button" @click="onSelect(item)" class="listbox-item">{{ item[labelKey] }}</button>
					</li>
				</ul>
			</div>
		</Transition>
	</div>
</template>
<style scoped>
	
.listbox {
	@apply relative;
}

.listbox-toggler {
	@apply flex justify-start items-center gap-4 w-full whitespace-nowrap;
}

.listbox-toggler svg {
	@apply ml-auto;
}

.listbox-collapse {
	@apply overflow-hidden absolute min-w-full max-w-[80vw] left-0 top-full bg-white z-[2] border;
}

.listbox-collapse.collapse-top {
	@apply top-auto bottom-full;
}

.listbox-collapse ul {
	@apply flex flex-col;
}

.listbox-collapse li:not(:last-child) {
	@apply border-b;
}

.listbox-item {
	@apply block w-full whitespace-nowrap text-left;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s, margin 0.2s;
}

.fade-enter-from,
.fade-leave-to {
	@apply opacity-0 -mt-2 mb-2;
}

.fade-enter-from.collapse-top,
.fade-leave-to.collapse-top {
	@apply mt-2 -mb-2;
}

.listbox-toggler {
	@apply bg-white px-4 py-2 min-w-[10rem] text-sm rounded border transition-colors text-gray-600 border-gray-200;
}

.listbox-collapse {
	@apply bg-white py-2 rounded shadow;
}

.listbox-item {
	@apply py-3 px-8 text-sm font-medium text-gray-600 bg-white hover:bg-gray-100;
}

.listbox-item.active {
	@apply bg-gray-100;
}

</style>