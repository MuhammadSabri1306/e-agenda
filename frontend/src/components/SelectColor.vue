<script setup>
import { ref } from "vue";
import { useAgendaStore } from "@/stores/agenda";

const emit = defineEmits(["change"]);
const props = defineProps({
	defaultValue: { type: String, default: "blue" }
})

const agendaStore = useAgendaStore();
const getCalendarColors = () => {
	const data = [];
	const { blue, ...calColors } = agendaStore.calendarColors;
	data.push({ key: "blue", val: blue });

	for(let key in calColors) {
		data.push({ key, val: calColors[key] });
	}
	console.log(data);
	return data;
};

const colors = getCalendarColors();
let defaultIndex = colors.findIndex(item => item.key == props.defaultValue);
defaultIndex = defaultIndex < 0 ? 0 : defaultIndex;

const optionsBody = ref(null);
const selectedIndex = ref(defaultIndex);
const showOptions = ref(false);

const onOptionsBlur = event => {
	if(optionsBody.value.contains(event.relatedTarget))
		return;
	showOptions.value = false;
};

const onOptionsClick = index => {
	showOptions.value = false;
	if(index === selectedIndex.value)
		return;

	selectedIndex.value = index;
	emit("change", colors[index].key);
};
</script>
<template>
	<div class="relative">
		<button type="button" @click="showOptions = !showOptions" @focusout="onOptionsBlur" class="select-toggler">
			<div :class="[colors[selectedIndex].val]" class="color-circle"></div>
			<span class="color-text">{{ colors[selectedIndex].key }}</span>
			<span class="ml-auto text-gray-500">
				<font-awesome-icon icon="fa-solid fa-caret-down" fixed-width />
			</span>
		</button>
		<Transition name="fade">
			<ul v-show="showOptions" ref="optionsBody" @focusout="onOptionsBlur" class="option-body" tabindex="-1">
				<li v-for="(item, index) in colors">
					<button type="button" @click="onOptionsClick(index)" :class="{ 'active': index === selectedIndex }" class="option-item px-4 py-2 text-left">
						<div :class="item.val" class="color-circle"></div>
						<span class="color-text">{{ item.key }}</span>
					</button>
				</li>
			</ul>
		</Transition>
	</div>
</template>
<style scoped>

.select-toggler {
	@apply border rounded text-gray-700 border-gray-200 hover:border-gray-400 focus:border-gray-400;
}

.option-body {
	@apply absolute w-full flex flex-col bg-white rounded border shadow-sm max-h-[10rem] overflow-y-auto;
}

.option-item > li:not(:last-child) {
	@apply border-b;
}

.select-toggler,
.option-item {
	@apply flex items-center block w-full text-sm px-4 py-2 capitalize;
}

.option-item {
	@apply text-gray-600 transition-colors bg-transparent hover:bg-gray-100;
}

.option-item.active {
	@apply text-primary-600;
}

.select-toggler .color-circle,
.option-item .color-circle {
	@apply w-6 h-6 rounded-full mr-2;
}

.option-item .color-text {
	@apply block text-gray-700 text-sm font-medium;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s, margin 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	@apply opacity-0 -mt-2 mb-2;
}

</style>