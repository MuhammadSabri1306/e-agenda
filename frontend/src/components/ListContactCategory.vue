<script setup>
import { ref, reactive, computed } from "vue";
import { useContactStore } from "@/stores/contact";
import Dropdown from "@/components/ui/Dropdown.vue";
import ModalFormContactCategory from "@/components/ModalFormContactCategory.vue";

const contactStore = useContactStore();
const category = computed(() => contactStore.category);

const fetchData = (...items) => {
	items.forEach(key => {
		if(key == "fraksi")
			contactStore.fetchFraksi();
		else if(key == "komisi")
			contactStore.fetchKomisi();
		else if(key == "pansus")
			contactStore.fetchPansus();
		else if(key == "opd")
			contactStore.fetchOpd();
	})
};

fetchData("fraksi", "komisi", "pansus", "opd");

const typeFilter = computed(() => contactStore.categoryTypeFilter);
const type = computed(() => contactStore.categoryType);
const onTypeFilterChange = val => contactStore.filterCategoryType(val);

const dataModalForm = reactive({
	show: false,
	type: null,
	id: null,
	name: null
});

const onModalFormClosed = () => {
	dataModalForm.show = false;
	dataModalForm.id = null;
	dataModalForm.name = null;
};

const modalFormAttrs = computed(() => {
	return {
		categoryType: typeFilter.value,
		categoryId: dataModalForm.id,
		categoryName: dataModalForm.name
	};
});

const openFormNewCategory = () => dataModalForm.show = true;
const saveNewCategory = (categoryType, categoryName) => {
	console.log(categoryType, categoryName);
	setTimeout(() => {
		dataModalForm.show = false;
		fetchData(categoryType);
	}, 600);
};

const openFormEditCategory = index => {
	const currCategory = category.value[index];
	dataModalForm.id = currCategory.id;
	dataModalForm.name = currCategory.name;
	dataModalForm.show = true;
};
const saveEditCategory = (categoryType, categoryId, categoryName) => {
	console.log(categoryType, categoryId, categoryName);
	setTimeout(() => {
		dataModalForm.show = false;
		fetchData(categoryType);
	}, 600);
};
</script>
<template>
	<div>
		<h2 class="text-gray-800 text-lg font-bold p-4 border-t-4 border-primary-500 mb-4">Kategori</h2>
		<div class="flex items-center mb-4 gap-2">
			<Dropdown :value="typeFilter" :options="type" @change="onTypeFilterChange" class="dropdown-category-filter grow" />
			<button type="button" @click="openFormNewCategory" class="ml-auto rounded w-10 h-10 flex justify-center items-center text-gray-500 transition-colors bg-transparent hover:bg-gray-100 focus:bg-gray-100">
				<font-awesome-icon icon="fa-solid fa-plus" />
			</button>
		</div>
		<div v-if="category.length < 1">
			<p class="text-sm font-semibold text-gray-700">Belum ada kategori.</p>
		</div>
		<ul v-else class="category-list">
			<li v-for="(item, index) in category" class="group">
				<span>{{ item.name }}</span>
				<button type="button" @click="openFormEditCategory(index)" class="ml-auto text-lg p-2 transition-all text-gray-400 hover:text-gray-600 opacity-30 group-hover:opacity-100">
					<font-awesome-icon icon="fa-solid fa-pencil" />
				</button>
				<button type="button" class="text-lg p-2 transition-all text-gray-400 hover:text-gray-600 opacity-30 group-hover:opacity-100">
					<font-awesome-icon icon="fa-solid fa-xmark" />
				</button>
			</li>
		</ul>
		<ModalFormContactCategory v-if="dataModalForm.show" v-bind="modalFormAttrs" @cancel="onModalFormClosed" @new="saveNewCategory" @update="saveEditCategory" />
	</div>
</template>

<style scoped>
	
.category-list {
	@apply flex flex-col;
}

.category-list li {
	@apply block flex items-center px-4 py-1 text-xs font-semibold text-gray-600;
}

.category-list li:not(:last-child) {
	@apply border-b;
}

.category-list button {
	@apply text-lg p-2 transition-colors text-gray-400 hover:text-gray-600;
}

.dropdown-category-filter :deep(.dropdown-toggler),
.dropdown-category-filter :deep(.dropdown-item) {
	@apply uppercase;
}

</style>