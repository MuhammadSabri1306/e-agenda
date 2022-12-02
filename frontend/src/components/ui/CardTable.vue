<script setup>
defineProps({
	hoverable: { type: Boolean, default: false }
});
</script>
<template>
	<div class="card-table" :class="{ 'card-table-hoverable': hoverable }">
		<table>
			<thead>
				<slot name="thead"></slot>
			</thead>
			<tbody>
				<slot name="tbody"></slot>
			</tbody>
		</table>
	</div>
</template>
<style scoped>
	
.card-table {
	@apply shadow-sm text-sm max-w-full overflow-x-auto;
}

.card-table table {
	@apply border-separate border-spacing-0 min-w-full lg:w-full;
}

.card-table thead :deep(tr):first-child > *:first-child {
	@apply rounded-tl-2xl lg:rounded-tl-lg;
}

.card-table thead :deep(tr):first-child > *:last-child {
	@apply rounded-tr-2xl lg:rounded-tr-lg;
}

.card-table tbody :deep(tr):last-child > *:first-child {
	@apply rounded-bl-2xl lg:rounded-bl-lg;
}

.card-table tbody :deep(tr):last-child > *:last-child {
	@apply rounded-br-2xl lg:rounded-br-lg;
}

.card-table :deep(th),
.card-table :deep(td) {
	@apply border-b;
}

.card-table :deep(tr):first-child th {
	@apply border-t;
}

.card-table :deep(th):first-child,
.card-table :deep(td):first-child {
	@apply border-l;
}

.card-table :deep(th):last-child,
.card-table :deep(td):last-child {
	@apply border-r;
}

.card-table :deep(th) {
	@apply bg-gray-100 px-4 lg:px-8 py-4 text-left text-gray-900;
}

.card-table :deep(td) {
	@apply bg-white px-6 lg:px-8 py-6 lg:py-4 text-left font-medium text-gray-700;
}

.card-table-hoverable :deep(tr):hover td {
	@apply bg-gray-100/70;
}

</style>