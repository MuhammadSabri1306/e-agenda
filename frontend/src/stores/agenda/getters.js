import { formatAgenda, filterByDate } from "@/modules/agenda-format";

export default {
	
	list: state => state.agenda.map(item => formatAgenda(item, state.calendarColors)),

	listFiltered: state => {
		const filterIndex = state.filter.selectedIndex;
		const filterItems = state.filter.items;
		const sortAsc = state.sort.isAsc;

		const agenda = state.agenda
			.map(item => formatAgenda(item, state.calendarColors))
			.filter(item => {
				if(filterIndex >= filterItems.length - 1)
					return true;
				return filterByDate(item.date, filterIndex);
			});

		if(!sortAsc)
			agenda.reverse();

		return agenda;
	},

	attendanceFiltered: state => {
		const filterIndex = state.filter.selectedIndex;
		const filterItems = state.filter.items;
		const sortAsc = state.sort.isAsc;

		const att = state.attendance
			.map(item => {
				return {
					absen: item.absen,
					...formatAgenda(item, state.calendarColors)
				};
			})
			.filter(item => {
				if(filterIndex >= filterItems.length - 1)
					return true;
				return filterByDate(item.date, filterIndex);
			});

		if(!sortAsc)
			att.reverse();
		
		return att;
	},

	getById() {
		const list = this.list;
		return id => list.find(lItem => lItem.id == id);;
	},

	today(state) {
		const curDate = new Date();
		return this.list
			.filter(item => {
				if(item.date.start.year > curDate.getFullYear() || item.date.end.year < curDate.getFullYear())
					return false;
				if(item.date.start.month > (curDate.getMonth() + 1) || item.date.end.month < (curDate.getMonth() + 1))
					return false;
				if(item.date.start.date > curDate.getDate() || item.date.end.date < curDate.getDate())
					return false;
				return true;
			})
			.sort((a, b) => a.date.start.dateObj.getTime() - b.date.start.dateObj.getTime());
	},
	/*attendanceFormat: state => {
		return state.attendance.map(item => {});
	}*/
};