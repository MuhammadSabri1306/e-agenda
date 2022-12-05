import { defineStore } from "pinia";
import { orderCategory } from "@/modules/contact";
import { fetchContact, fetchKomisi, fetchFraksi, fetchPansus, fetchOpd } from "@/modules/sample-data";

export const useContactStore = defineStore("contact", {
	state: () => ({
		contact: [],
		categoryType: ["fraksi", "komisi", "pansus", "opd"],
		categoryTypeFilter: "fraksi",
		fraksi: [],
		komisi: [],
		pansus: [],
		opd: [],
	}),
	getters: {

		category: state => {
			const formatList = item => {
				const { id, name } = item;
				return { id, name };
			};

			const fraksi = state.fraksi.map(formatList).map(item => ({ type: "fraksi", ...item }));
			if(state.categoryTypeFilter && state.categoryTypeFilter == "fraksi")
				return fraksi.sort(orderCategory);

			const komisi = state.komisi.map(formatList).map(item => ({ type: "komisi", ...item }));
			if(state.categoryTypeFilter && state.categoryTypeFilter == "komisi")
				return komisi.sort(orderCategory);

			const pansus = state.pansus.map(formatList).map(item => ({ type: "pansus", ...item }));
			if(state.categoryTypeFilter && state.categoryTypeFilter == "pansus")
				return pansus.sort(orderCategory);

			const opd = state.opd.map(formatList).map(item => ({ type: "opd", ...item }));
			if(state.categoryTypeFilter && state.categoryTypeFilter == "opd")
				return opd.sort(orderCategory);

			return [ ...fraksi, ...komisi, ...pansus, ...opd ].sort(orderCategory);
		}

	},
	actions: {

		async fetchContact(force = false, callback = null) {
			if(!force && this.contact.length > 0) {
				callback && callback(true);
				return;
			}

			try {
				const response = await fetchContact();
				const data = response.data;
				
				if(!data) {
					console.log(response.data);
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
				const response = await fetchFraksi();
				const data = response.data;
				
				if(!data) {
					console.log(response.data);
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
				const response = await fetchKomisi();
				const data = response.data;
				
				if(!data) {
					console.log(response.data);
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

		async fetchPansus(force = false, callback = null) {
			if(!force && this.pansus.length > 0) {
				callback && callback(true);
				return;
			}

			try {
				const response = await fetchPansus();
				const data = response.data;
				
				if(!data) {
					console.log(response.data);
					callback && callback(false);
					return;
				}

				this.pansus = data;
				callback && callback(true);
			} catch(err) {
				console.error(err);
				callback && callback(false);
			}
		},

		async fetchOpd(force = false, callback = null) {
			if(!force && this.opd.length > 0) {
				callback && callback(true);
				return;
			}

			try {
				const response = await fetchOpd();
				const data = response.data;
				
				if(!data) {
					console.log(response.data);
					callback && callback(false);
					return;
				}

				this.opd = data;
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
		}

	}
});