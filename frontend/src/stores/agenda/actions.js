import http from "@/modules/http-common";
import { useAccountStore } from "@/stores/account";
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
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };

			const response = await http.get("/rapat", { headers });
			const data = response.data.data;

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
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };

			const response = await http.get("/absen", { headers });
			const data = response.data.data;

			if(!data)
				return callback && callback(false);
			this.attendance = data;
			callback && callback(true);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async addAgenda(body, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };

			const response = await http.post("/rapat", body, { headers });
			const success = response.data.success;
			callback && callback(success);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async updateAgenda(agendaId, body, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };
			console.log(body);
			const response = await http.post("/rapat/" + agendaId, body, { headers });
			const success = response.data.success;
			callback && callback(success);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async updateAgendaStatus(agendaId, status, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };
			const response = await http.put("/rapat/" + agendaId, { "status_rapat": status }, { headers });
			const success = response.data.success;
			callback && callback(success);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async getAttRoomInfo(attUId, callback) {
		let data = null;
		let success = false;
		try {

			const response = await http.get("/rapat/detail/" + attUId);
			data = response.data.data;

			if(data)
				success = true;
			callback({ success, data });
		
		} catch(err) {
			console.error(err);
			callback({ success, data });
		}
	},

	async registAttendance(body, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };

			const response = await http.post("/absen", body, { headers });
			const success = response.data.success;
			callback && callback(success);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async saveInvitation(agendaId, body, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };

			const response = await http.post("/rapat/" + agendaId, body, { headers });
			const success = response.data.success;
			callback && callback(success);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	}
};