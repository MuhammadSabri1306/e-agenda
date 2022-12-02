<script setup>
import Header from "./Header.vue";
import Navbar from "./Navbar.vue";

defineEmits(["new"]);
defineProps({
	baseBgClass: { type: String }
});
</script>
<template>
	<div id="basicLayout" :class="baseBgClass">
		<Header />
		<Navbar @new="$emit('new')" />

		<main>
			<slot name="main"></slot>
			<footer></footer>
		</main>
	</div>
</template>
<style scoped>

body,
body > #app,
body > #app > div,
#basicLayout {
	@apply h-screen max-w-full overflow-x-hidden;
}

#basicLayout main {
	@apply text-gray-900 flex flex-col min-h-[100vh];
}

</style>