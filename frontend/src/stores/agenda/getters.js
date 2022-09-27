export default {
	switchSortBy: (state) => {
		if(!state.sort.use)
			state.sort.use = true;

		state.sort.sortBy.time = !state.sort.sortBy.time;
		state.sort.sortBy.alphabet = !state.sort.sortBy.alphabet;
	},
	selectedCategory: (state) => state.category.items[state.category.selectedIndex]
};