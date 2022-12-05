<script setup>
import Header from "./Header.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

defineEmits(["new"]);
defineProps({
	baseBgClass: { type: String }
});
</script>
<template>
	<div id="basicLayout" :class="baseBgClass">
		<Header />
		<Navbar @new="$emit('new')" />

		<main class="pt-8 pb-16">
			<slot name="main"></slot>
		</main>
		<Footer />
	</div>
</template>
<style scoped>

body,
body > #app,
body > #app > div,
#basicLayout {
	@apply h-screen max-w-full overflow-x-hidden flex flex-col;
}

#basicLayout main {
	@apply text-gray-900 flex flex-col grow;
}

</style>