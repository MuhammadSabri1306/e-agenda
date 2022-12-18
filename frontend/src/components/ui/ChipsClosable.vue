<script setup>

const emit = defineEmits(["close"]);
const props = defineProps({
	item: { required: true },
	labelKey: String
});

const onClick = () => {
	emit("close", props.item);
};
</script>
<template>
	<button type="button" @click="onClick" class="chips-closable group">
		<span>{{ item[labelKey] }}</span>
		<span class="icon-close text-white transition-opacity opacity-60 group-hover:opacity-80">
			<font-awesome-icon icon="fa-solid fa-circle-xmark" fixed-width />
		</span>
	</button>
</template>
<style scoped>
	
.chips-closable {
	@apply inline-flex gap-3 items-center whitespace-nowrap rounded-pill text-white bg-primary-500 border border-primary-600 py-2 pl-3 pr-2;
}

.chips-closable {
	@apply text-sm font-semibold leading-none;
}

.icon-close svg {
	@apply w-4 h-4;
}

</style>