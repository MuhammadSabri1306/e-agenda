<template>
	<div class="loader"></div>
</template>
<style scoped>
	
/*
 * From uiverse.io by @satyamchaudharydev
 * https://uiverse.io/detail/satyamchaudharydev/red-cow-21
 *
 */
.loader {
	@apply w-full h-full rounded-[50rem] bg-gray-300 relative before:absolute before:bg-primary-500 before:top-0 before:left-0 before:w-0 before:h-full before:rounded-[50rem] before:animate-[moving_1s_ease-in-out_infinite];
}

@keyframes moving {
	50% { width: 100%; }
	100% {
		width: 0;
		right: 0;
		left: unset;
	}
}

</style>