<script setup>
import ButtonOptions from "./ButtonOptions.vue";
import ButtonAccount from "./ButtonAccount.vue";
</script>
<template>
	<header class="basic-header">
		<div class="container my-12">
			<router-link to="/" class="flex justify-center items-center p-4 transition-opacity opacity-100 hover:opacity-90">
				<h1 class="text-3xl md:text-4xl text-primary-600 font-bold font-body mr-4 leading-none text-shadow-black">E-RAPAT</h1>
				<div class="flex items-center">
					<img src="/assets/img/logo-pemprov-sulsel.webp" class="h-12 w-auto">
                    <div class="ml-2">
                        <h5 class="text-2xl leading-none font-bold tracking-widest text-warning-400 text-shadow-black">DPRD</h5>
                        <h6 class="text-xs leading-none font-semibold text-warning-400 text-shadow-black">SULAWESI SELATAN</h6>
                    </div>
				</div>
			</router-link>
		</div>
		<div class="container flex md:hidden items-stretch">
			<ButtonOptions class="ml-auto" />
            <ButtonAccount />
		</div>
	</header>
</template>
<style scoped>
	
.basic-header {
	@apply bg-gray-900;
}

.basic-header :deep(.navbar-btn) {
	@apply flex justify-center items-center p-4 text-xl transition-colors bg-transparent hover:bg-gray-800 text-gray-700 hover:text-primary-500;
}

.basic-header :deep(.navbar-btn) > svg {
	@apply w-6 h-6;
}

.basic-header :deep(ul) {
	@apply z-[10];
}

</style>