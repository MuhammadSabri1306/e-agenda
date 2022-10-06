export default {
	setCategoryIndex(index){
		if(index < 0 || index >= this.category.items.lenth)
			return;
		
		this.category.selectedIndex = index;
	},
	toggleSortAsc(){
		this.sort.isAsc = !this.sort.isAsc;
	},
	fetchModel(){
		this.model = [
			{
				startDate: 1662652800000,
				endDate: 1664208000000,
				id: 0,
				title: "Tortor dignissim convallis aenean et",
				ket: "Ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra",
				color: "red"
			},
			{
				startDate: 1664726400000,
				endDate: 1665763200000,
				id: 1,
				title: "Tortor dignissim convallis aenean et",
				ket: "Ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra",
				color: "blue"
			}
		];
	}
};