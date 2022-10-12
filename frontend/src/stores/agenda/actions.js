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
				startTime: { m: 8, s: 0 },
				endTime: { m: 12, s: 0 },
				id: 0,
				title: "Rapat kerja Komisi C dan D DPRD Provinsi DKI Jakarta",
				ket: "Pembahasan dan pendalaman komisi-komisi terhadap rancangan Kebijakan Umum Perubahan Anggaran (KUPA) serta Prioritas dan Plafon Anggaran Sementara (PPAS) TA 2022.",
				tempat: "Grand Cempaka",
				color: "red"
			},
			{
				startDate: 1664726400000,
				endDate: 1665763200000,
				startTime: { h: 9, m: 0 },
				endTime: { h: 18, m: 0 },
				id: 1,
				title: "Rapat Paripurna DPRD Provinsi Jawa Barat",
				ket: "-",
				tempat: "Kantor DPRD Provinsi Jawa Barat",
				color: "blue"
			}
		];
	}
};