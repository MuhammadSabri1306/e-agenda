<script setup>
import Header from "./Header.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import BottomNav from "./BottomNav.vue";

defineEmits(["new"]);
defineProps({
	baseBgClass: { type: String }
});
</script>
<template>
	<div ref="basicLayout" id="basicLayout" :class="baseBgClass">
		<Header />
		<Navbar @new="$emit('new')">
			<slot name="toolbar"></slot>
		</Navbar>

		<main class="pt-8 pb-16">
			<slot name="main"></slot>
		</main>
		<Footer class="pb-24 md:pb-0" />
		<BottomNav />
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