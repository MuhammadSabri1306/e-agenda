<script setup>
import { ref } from "vue";

const props = defineProps({ icon: String });
const open = ref(false);
const show = ref(false);
let promiseResolve = null;

const answerYes = () => {
	promiseResolve(true);
	show.value = false;
};

const answerNo = () => {
	promiseResolve(false);
	show.value = false;
};

const confirm = () => {
	open.value = true;
	setTimeout(() => show.value = true, 100);

	return new Promise((resolve) => {
		promiseResolve = resolve;
	});
};

defineExpose({ confirm });
</script>
<template>
	<div v-if="open">
		<Transition name="confirm-fade" @after-leave="open = false">
			<div v-show="show" class="confirm-wrapper" @click.self="answerNo">
				<div class="confirm">
					<div class="confirm-body">
						<div class="flex items-center gap-4 mb-4">
							<span class="icon">
								<font-awesome-icon :icon="icon" />
							</span>
							<slot name="text"></slot>
						</div>
						<div class="flex items-end justify-end gap-2">
							<button type="button" @click="answerNo" class="px-4 py-2 rounded text-sm text-white bg-gray-500 hover:bg-gray-600">Batal</button>
							<slot name="btnConfirm" :clicked="answerYes"></slot>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>
<style scoped>
	
.confirm-wrapper {
	@apply fixed z-[8888] w-screen h-screen top-0 left-0 p-4 lg:p-8 flex justify-end items-start;
}

.confirm {
	@apply max-w-[25rem] bg-white rounded border shadow-lg;
}

.confirm-body {
    @apply overflow-auto max-h-[80vh] p-4;
}

.confirm-fade-enter-active,
.confirm-fade-leave-active {
	transition: opacity 0.3s, backdrop-filter 0.3s;
}

.confirm-fade-enter-from,
.confirm-fade-leave-to {
	@apply opacity-0;
}

.confirm-fade-enter-to,
.confirm-fade-leave-from {
	@apply opacity-100 backdrop-blur-none;
}

.confirm-fade-enter-active .confirm,
.confirm-fade-leave-active .confirm {
	transition: margin-top 0.3s;
}

.confirm-fade-enter-from .confirm,
.confirm-fade-leave-to .confirm {
	@apply mt-8;
}

.icon {
	@apply text-4xl text-gray-300;
}

</style>