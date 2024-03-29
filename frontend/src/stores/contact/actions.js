
import { useAccountStore } from "@/stores/account";
import http from "@/modules/http-common";

export default {

	async fetchContact(force = false, callback = null) {
		if(!force && this.contact.length > 0) {
			callback && callback(true);
			return;
		}

		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };

			const response = await http.get("/anggota-dewan", { headers });
			const data = response.data.data;
			
			if(!data) {
				console.log(response);
				callback && callback(false);
				return;
			}
			
			this.contact = data;
			callback && callback(true);
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async fetchFraksi(force = false, callback = null) {
		if(!force && this.fraksi.length > 0) {
			callback && callback(true);
			return;
		}

		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };
			const response = await http.get("/fraksi", { headers });
			const data = response.data.data;
			
			if(!data) {
				console.log(response);
				callback && callback(false);
				return;
			}

			this.fraksi = data;
			callback && callback(true);
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async fetchKomisi(force = false, callback = null) {
		if(!force && this.komisi.length > 0) {
			callback && callback(true);
			return;
		}

		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };
			const response = await http.get("/komisi", { headers });
			const data = response.data.data;
			
			if(!data) {
				console.log(response);
				callback && callback(false);
				return;
			}

			this.komisi = data;
			callback && callback(true);
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	filterCategoryType(type) {
		if(this.categoryType.indexOf(type) < 0)
			return;
		this.categoryTypeFilter = type;
	},

	async saveContactMember(body, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };
			
			const response = await http.post("/anggota-dewan", body, { headers });
			const success = response.data.success;
			callback && callback(success);
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async updateContactMember(id, body, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };
			
			const response = await http.put("/anggota-dewan/" + id, body, { headers });
			const success = response.data.success;
			callback && callback(success);
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	async deleteContactMember(id, callback = null) {
		try {
			const accountStore = useAccountStore();
			const headers = { "Authorization": "Bearer " + accountStore.token };
			
			const response = await http.delete("/anggota-dewan/" + id, { headers });
			const success = response.data.success;
			callback && callback(success);
		} catch(err) {
			console.error(err);
			callback && callback(false);
		}
	},

	addFilter(type, filter) {
		const title = (type == "fraksi") ? filter.nama_fraksi
			: (type == "komisi") ? filter.nama_komisi
			: (type == "dewanTitle" || type == "badanDewan") ? filter.text
			: null;

		const newFilter = { id: filter.id, title, type };
		this.appliedFilter = [...this.appliedFilter, newFilter];
	},

	removeFilter(filter) {
		const currIndex = this.appliedFilter
			.findIndex(({ type, id }) => {
				return type === filter.type && id === filter.id;
			});
		if(currIndex >= 0)
			this.appliedFilter.splice(currIndex, 1);
	}

}