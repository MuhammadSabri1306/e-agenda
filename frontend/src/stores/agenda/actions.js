import { fetchAgenda, fetchInvitation, fetchAttendance } from "@/modules/sample-data";

export default {
	setCategoryIndex(index) {
		if(index < 0 || index >= this.category.items.lenth)
			return;
		
		this.category.selectedIndex = index;
	},

	toggleSortAsc() {
		this.sort.isAsc = !this.sort.isAsc;
	},

	async fetchAgenda(force = false, callback = null) {
		if(!force && this.agenda.length > 0)
			return callback && callback(true);

		try {

			const response = await fetchAgenda();
			const data = response.data;

			if(!data)
				return callback && callback(false);
			this.agenda = data;
			callback && callback(true);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async fetchInvitation(force = false, callback = null) {
		if(!force && this.invitation.length > 0)
			return callback && callback(true);

		try {

			const response = await fetchInvitation();
			const data = response.data;

			if(!data)
				return callback && callback(false);
			this.invitation = data;
			callback && callback(true);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async fetchAttendance(force = false, callback = null) {
		if(!force && this.attendance.length > 0)
			return callback && callback(true);

		try {

			const response = await fetchAttendance();
			const data = response.data;

			if(!data)
				return callback && callback(false);
			this.attendance = data;
			callback && callback(true);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	}
};