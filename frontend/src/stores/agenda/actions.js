export default {
	setCategoryIndex(index){
		if(index < 0 || index >= this.category.items.lenth)
			return;
		
		this.category.selectedIndex = index;
	},
	toggleSortAsc(){
		this.sort.isAsc = !this.sort.isAsc;
	}
};