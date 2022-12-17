<script setup>
import ButtonOptions from "./ButtonOptions.vue";
import ButtonAccount from "./ButtonAccount.vue";
</script>
<template>
    <nav class="basic-navbar">
        <div class="container hidden md:block">
            <div class="flex items-stretch px-16">
            	<ul class="nav-menu">
            		<li>
            			<router-link to="/agenda" class="nav-link">
							<span class="icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
							</span>
							<span>Agenda</span>
						</router-link>
					</li>
					<li>
						<router-link to="/inv" class="nav-link">
							<span class="icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
							</span>
							<span>Undangan</span>
						</router-link>
					</li>
					<li>
						<router-link to="/contact" class="nav-link">
							<span class="icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
							</span>
							<span>Kontak</span>
						</router-link>
					</li>
					<li>
						<router-link to="/att" class="nav-link">
							<span class="icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
							</span>
							<span>Absensi</span>
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