<script setup>
import { getNavItems } from "./navigations";
const navItems = getNavItems();
</script>
<template>
	<nav class="basic-bottomnav">
        <div class="flex justify-center px-4">
        	<ul class="nav-menu">
        		<li v-for="item in navItems">
        			<router-link :to="item.to" :class="item.activeClass" class="nav-link">
						<span class="icon">
							<component :is="item.icon" />
						</span>
						<span>{{ item.title }}</span>
					</router-link>
				</li>
        	</ul>
        </div>
    </nav>
</template>
<style scoped>
	
.basic-bottomnav {
	@apply bg-white z-[8886] fixed md:hidden bottom-0 left-0 w-full border-t border-gray-400 shadow;
}

.nav-menu {
	@apply flex;
}

.nav-link {
	@apply h-full text-sm font-medium flex flex-col md:flex-row justify-center items-center p-4 gap-2 border-t-2 border-transparent transition-colors bg-transparent hover:bg-gray-100 text-gray-700 hover:text-primary-700;
}

.nav-link.active,
.nav-link.router-link-active {
	@apply text-primary-700 font-semibold border-primary-600;
}

.nav-link .icon > svg {
	@apply w-5 h-5;
}

</style>