import http from "@/modules/http-common";
import { useAccountStore } from "@/stores/account";
import { fetchAgenda, fetchInvitation, fetchAttendance } from "@/modules/sample-data";

export default {
	setFilterIndex(index) {
		if(index < 0 || index >= this.filter.items.length)
			return;
		
		this.filter.selectedIndex = index;
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

	async addAgenda(formData, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };

			const response = await http.post("/rapat", formData, { headers });
			const success = response.data.success;
			callback && callback(success);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async deleteAgenda(agendaId, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };

			const response = await http.delete("/rapat/" + agendaId, { headers });
			const success = response.data.success;
			callback && callback(success);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async updateAgenda(agendaId, formData, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };
			const response = await http.post("/rapat/" + agendaId, formData, { headers });
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

	async sendInvitation(body, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };

			const response = await http.post("/detail/rapat", body, { headers });
			const success = response.data.success;
			callback && callback(success);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async uploadAttFile(agendaId, file, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };

			const formData = new FormData();
			formData.append("file_absen", file);

			const response = await http.post("/rapat/absen/" + agendaId, formData, { headers });
			const success = response.data.success;
			callback && callback(success);
		
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	}
};