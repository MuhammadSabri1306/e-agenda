import { useDateId, useTime } from "@/modules/date-id";

export default {
	switchSortBy: state => {
		if(!state.sort.use)
			state.sort.use = true;

		state.sort.sortBy.time = !state.sort.sortBy.time;
		state.sort.sortBy.alphabet = !state.sort.sortBy.alphabet;
	},
	selectedCategory: state => state.category.items[state.category.selectedIndex],
	list: state => {
		let colorIndex = 0;
		const colorKeys = Object.keys(state.calendarColors);

		return state.agenda.map(agenda => {
			const color = state.calendarColors[colorKeys[colorIndex]];
			colorIndex++;
			if(colorIndex == state.calendarColors.length)
				colorIndex = 0;

			const startDate = new Date(agenda.tanggal_mulai),
				endDate = new Date(agenda.tanggal_selesai);

			return {
				id: agenda.id,
				color: agenda.warna,
				twColor: state.calendarColors[agenda.warna],
				title: agenda.nama,
				date: {
					start: useDateId(startDate),
					end: useDateId(endDate)
				},
				time: {
					start: useTime(agenda.mulai_pukul),
					end: useTime(agenda.sampai_pukul)
				},
				ket: agenda.deskripsi,
				location: agenda.tempat,
				letter: agenda.file,
				letterNo: agenda.no_surat,
				message: agenda.pesan,
				hasInvitation: (!agenda.file && !agenda.no_surat && !agenda.pesan) ? false : true
			};
		});
	},
	getById(){
		const list = this.list;
		return id => list.find(lItem => lItem.id == id);;
	},
	today(){
		const curDate = new Date();
		return this.list.filter(item => {

			if(item.date.start.year > curDate.getFullYear() || item.date.end.year < curDate.getFullYear())
				return false;
			if(item.date.start.month > (curDate.getMonth() + 1) || item.date.end.month < (curDate.getMonth() + 1))
				return false;
			if(item.date.start.date > curDate.getDate() || item.date.end.date < curDate.getDate())
				return false;
			return true;
		
		});
	},
	timeString: () => {
		return timeObj => {
			let { m, s } = timeObj;
			m = (m.toString().length == 1) ? "0" + m.toString() : m.toString();
			s = (s.toString().length == 1) ? "0" + s.toString() : s.toString();
			return m + ":" + s;
		};
	}
};