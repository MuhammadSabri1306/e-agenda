<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["close"]);
const props = defineProps({
	closeByBackdrop: { type: Boolean, default: true } 
});

const open = ref(true);
const show = ref(false);

defineExpose({
	hide: () => show.value = false
});

onMounted(() => show.value = true);

const onModalClosed = () => {
	emit("close");
	open.value = false;
};

const onBackdropClick = () => {
	if(!props.closeByBackdrop)
		return;
	show.value = false;
};
</script>
<template>
	<div v-if="open">
		<Transition name="modal-fade" @after-leave="onModalClosed">
			<div v-show="show" class="modal-wrapper backdrop-blur" @click.self="onBackdropClick">
				<div class="modal">
					<div class="relative">
						<slot name="header"></slot>
						<button type="button" @click="show = false" class="absolute right-2 top-2 text-xl text-gray-400 hover:text-gray-600">
							<font-awesome-icon icon="fa-solid fa-circle-xmark" fixed-width />
						</button>
					</div>
					<slot name="body"></slot>
				</div>
			</div>
		</Transition>
	</div>
</template>
<style>
	
.modal-wrapper {
	@apply fixed z-[8888] w-screen h-screen top-0 left-0 p-4 lg:p-8 flex justify-center items-center bg-gray-900/70;
}

.modal {
	@apply w-[25rem] max-w-full bg-white rounded-2xl shadow-sm;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity 0.3s, backdrop-filter 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
	@apply opacity-0 backdrop-blur-none;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
	@apply opacity-100 backdrop-blur;
}

.modal-fade-enter-active .modal,
.modal-fade-leave-active .modal {
	transition: margin-top 0.3s;
}

.modal-fade-enter-from .modal,
.modal-fade-leave-to .modal {
	@apply mt-8;
}

</style>