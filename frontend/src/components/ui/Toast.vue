<script setup>
import { ref, computed, watch } from "vue";
import { useViewStore } from "@/stores/view";
import { CheckIcon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const viewStore = useViewStore();
const toastData = computed(() => viewStore.toast);
const openToast = ref(false);
const showToast = ref(false);

const duration = {
	show: 100,
	hide: 6000
};

watch(() => viewStore.toast, () => {
	openToast.value = true;
	setTimeout(() => showToast.value = true, duration.show);
	setTimeout(() => {
		
		if(showToast.value)
			showToast.value = false;

	}, duration.show + duration.hide);
});
</script>
<template>
	<div v-if="openToast" class="toast">
		<Transition name="fade" @after-leave="openToast = false">
			<div v-show="showToast" :class="{ 'toast-success': toastData.success, 'toast-error': !toastData.success }" class="toast-body">
				<span class="toast-icon">
					<slot name="icon"></slot>
					<CheckIcon v-if="!$slots.icon && toastData.success" />
					<ExclamationTriangleIcon v-if="!$slots.icon && !toastData.success" />
				</span>
				<p class="toast-content">
					<span class="toast-title">{{ toastData.title }}</span>
					<span class="toast-message">{{ toastData.message }}</span>
				</p>
				<button type="button" @click="showToast = false" class="toast-close">
					<XMarkIcon />
				</button>
			</div>
		</Transition>
	</div>
</template>
<style scoped>
	
.toast {
	@apply max-w-[100vw] max-h-screen w-[468px] p-4 md:p-8 fixed z-[8888] bottom-0 right-0;
}

.toast-body {
	@apply backdrop-blur-sm shadow-lg rounded px-4 py-6 border flex gap-4 items-start;
}

.toast-success {
	@apply bg-green-600/80 border-green-600;
}

.toast-error {
	@apply bg-red-600/80 border-red-600;
}

.toast-icon svg {
	@apply w-10 h-10;
}

.toast-icon,
.toast-content,
.toast-close {
	@apply text-white;
	text-shadow: 0 0 2px rgba(0,0,0,0.6);
}

.toast-icon {
	@apply opacity-60;
}

.toast-content {
	@apply grow flex flex-col gap-2;
}

.toast-title {
	@apply font-bold;
}

.toast-message {
	@apply text-sm;
}

.toast-close {
	@apply p-2 transition-opacity opacity-70 hover:opacity-100;
}

.toast-close svg {
	@apply w-6 h-6;
}

.fade-enter-active,
.fade-leave-active {
	transition: margin-top 0.3s, margin-bottom 0.3s, opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	@apply mt-4 -mb-4 opacity-0;
}

</style>