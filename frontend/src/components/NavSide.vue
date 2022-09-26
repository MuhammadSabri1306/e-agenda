<template>
	<nav class="bg-white py-8">
		<ul class="list-none flex flex-col">
			<li>
				<a href="#" class="nav-link active">
					<font-awesome-icon icon="fa-regular fa-clock" fixed-width />
					<span class="text-sm font-medium">Terbaru</span>
				</a>
			</li>
			<li>
				<a href="#" class="nav-link">
					<font-awesome-icon icon="fa-regular fa-calendar-days" fixed-width />
					<span class="text-sm font-medium">Agenda</span>
				</a>
			</li>
			<li>
				<a href="#" class="nav-link">
					<font-awesome-icon icon="fa-regular fa-file-lines" fixed-width />
					<span class="text-sm font-medium">Undangan</span>
				</a>
			</li>
		</ul>
	</nav>
</template>
<style scoped>
	.nav-link {
		@apply flex items-center text-black/70 px-10 h-10 hover:bg-indigo-100/50;
	}

	.nav-link > *:not(span) {
		@apply pr-4 text-lg;
	}

	.nav-link.active {
		@apply text-indigo-500 border-l-4 border-indigo-500;
	}
</style>