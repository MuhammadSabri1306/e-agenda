<script setup>
import Header from "./Header.vue";
import Navbar from "./Navbar.vue"; 
</script>
<template>
	<div id="basicLayout">
		<Header />
		<Navbar />

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
	@apply max-h-screen;
}

#basicLayout main {
	@apply text-gray-900 flex flex-col min-h-[100vh];
}

</style>