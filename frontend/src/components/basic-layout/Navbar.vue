<script setup>
import { getNavItems } from "./navigations";
import ButtonOptions from "./ButtonOptions.vue";
import ButtonAccount from "./ButtonAccount.vue";

const navItems = getNavItems();
</script>
<template>
    <nav class="basic-navbar">
        <div class="container hidden md:block">
            <div class="flex items-stretch px-16">
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
                <ButtonOptions class="ml-auto" />
                <ButtonAccount />
            </div>
        </div>
        <slot></slot>
    </nav>
</template>
<style scoped>
	
.basic-navbar {
	@apply bg-white z-[2] sticky top-0 w-full md:shadow-sm;
}

.nav-menu {
	@apply hidden md:flex;
}

.nav-link {
	@apply h-full text-sm font-medium flex flex-col md:flex-row justify-center items-center p-4 gap-1 border-b-2 border-transparent transition-colors bg-transparent hover:bg-gray-100 text-gray-700 hover:text-primary-700;
}

.nav-link.active,
.nav-link.router-link-active {
	@apply text-primary-700 font-semibold border-primary-600;
}

.nav-link .icon > svg {
	@apply w-4 h-4;
}

.basic-navbar :deep(.navbar-btn) {
	@apply flex justify-center items-center p-4 text-xl transition-colors bg-transparent hover:bg-gray-100 text-gray-700 hover:text-primary-700;
}

.basic-navbar :deep(.navbar-btn) > svg {
	@apply w-8 md:w-6 h-8 md:h-6;
}

</style>