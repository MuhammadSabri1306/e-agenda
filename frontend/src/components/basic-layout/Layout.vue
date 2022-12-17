<script setup>
// import { onMounted } from "vue";
// import { useRouter } from "vue-router";
import Header from "./Header.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import BottomNav from "./BottomNav.vue";

defineEmits(["new"]);
defineProps({
	baseBgClass: { type: String }
});

// const router = useRouter();
/*router.beforeEach(() => {
	const scrollPost = router.options.scrollBehavior();
});*/

/*onMounted(() => {
	const scrollPost = router.options.scrollBehavior();
	console.log(scrollPost)
});*/
</script>
<template>
	<div id="basicLayout" :class="baseBgClass">
		<Header />
		<Navbar @new="$emit('new')">
			<slot name="toolbar"></slot>
		</Navbar>

		<main class="pt-8 pb-16">
			<slot name="main"></slot>
		</main>
		<Footer />
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