export default {
	switchSortBy: state => {
		if(!state.sort.use)
			state.sort.use = true;

		state.sort.sortBy.time = !state.sort.sortBy.time;
		state.sort.sortBy.alphabet = !state.sort.sortBy.alphabet;
	},
	selectedCategory: state => state.category.items[state.category.selectedIndex],
	list: state => {
		return state.model.map(agenda => {
			const { id, title, ket, tempat } = agenda;
			const color = state.calendarColors[agenda.color];
			const time = { start: agenda.startTime, end: agenda.endTime }

			const startDate = new Date(agenda.startDate),
				endDate = new Date(agenda.endDate);

			const date = {
				start: {
					date: startDate.getDate(),
					month: startDate.getMonth() + 1,
					year: startDate.getFullYear() },
				end: {
					date: endDate.getDate(),
					month: endDate.getMonth() + 1,
					year: endDate.getFullYear()
				}
			};

			return { id, title, date, time, ket, tempat, color };
		});
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