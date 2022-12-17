<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAccountStore } from "@/stores/account";
import { UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/vue/24/outline";

const accountStore = useAccountStore();
const accountName = computed(() => accountStore.name);

const showCollapse = ref(false);
const collapseWrapper = ref(null);
const onBlur = event => {
	if(!collapseWrapper.value)
		return;
	if(collapseWrapper.value.contains(event.relatedTarget))
		return;
	showCollapse.value = false;
};

const router = useRouter();
const onLogout = () => {
	accountStore.logout(() => router.push("/login"));
};
</script>
<template>
	<div class="relative">
		<button type="button" @click="showCollapse = !showCollapse" @focusout="onBlur" class="navbar-btn">
	    	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
	    </button>
	    <Transition name="fade">
			<ul v-show="showCollapse" ref="collapseWrapper" @focusout="onBlur" class="collapse-account">
				<li>
					<button type="button" class="collapse-title">{{ accountName }}</button>
				</li>
				<li>
					<button type="button" class="collapse-item">
						<UserIcon class="icon text-primary-500" />
						<div>
							<h6 class="text-primary-700">Profil</h6>
							<p>Detail Akun saya</p>
						</div>
					</button>
				</li>
				<li>
					<button type="button" @click="onLogout" class="collapse-item">
						<ArrowRightOnRectangleIcon class="icon text-red-500" />
						<div>
							<h6 class="text-red-700">Log Out</h6>
							<p>Keluar dari Akun saya</p>
						</div>
					</button>
				</li>
			</ul>
		</Transition>
	</div>
</template>
<style scoped>
	
.collapse-account {
	@apply absolute top-full right-0 min-w-[18rem] mt-2 bg-white rounded border shadow-lg overflow-hidden grid grid-cols-1 z-[2];
}

.collapse-account li:not(:last-child) {
	@apply border-b;
}

.collapse-title {
	@apply text-sm w-full block font-bold text-center p-4 text-gray-700 cursor-default;
}

.collapse-item {
	@apply px-6 py-4 w-full text-left flex items-center transition-all opacity-80 hover:opacity-100 active:opacity-100 bg-white hover:bg-gray-100 focus:bg-gray-100;
}

.collapse-item > .icon {
	@apply w-12 h-12 mr-4;
}

.collapse-item h6 {
	@apply lg:text-sm font-bold mb-1 font-body;
}

.collapse-item p {
	@apply text-xs font-semibold text-gray-700;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s, margin-top 0.3s, margin-bottom 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	@apply opacity-0 -mt-4 mb-4;
}

</style>