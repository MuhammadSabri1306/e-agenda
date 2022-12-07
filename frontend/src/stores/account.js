import { defineStore } from "pinia";
import { getCookie, setCookie, deleteCookie } from "@/modules/app-cookie";
import http from "@/modules/http-common";
import { useViewStore } from "@/stores/view";

export const useAccountStore = defineStore("account", {
	state: () => ({
		name: null,
		token: null,
		role: null
	}),
	getters: {

		isRoleAdmin: state => state.token && state.role == "admin",
		isRoleOperator: state => state.token && state.role == "operator",
		isRolePublic: state => !state.token

	},
	actions: {

		async login({ email, password }, callback = null) {
			try {

				const response = await http.post("/login", { email, password });
				const data = response.data.success;
				
				if(!data) {
					callback && callback(false);
					return;
				}

				this.updateAccount(data);
				callback && callback(true);

			} catch(err) {
				console.error(err);
				callback && callback(false);
			}
		},

		logout(callback = null) {
			deleteCookie("user");
			this.name = null;
			this.token = null;
			this.role = null;
			callback && callback();
		},

		updateAccount(params, updateCookie = true) {
			if(params.name && params.name !== undefined)
				this.name = params.name;
			if(params.token && params.token !== undefined)
				this.token = params.token;
			if(params.role && params.role !== undefined)
				this.role = params.role;

			if(!updateCookie)
				return;

			const data = {
				name: this.name,
				role: this.role,
				token: this.token
			};

			setCookie("user", data);
		},

		readAccountCookie() {
			const data = getCookie("user");
			let params = {};

			if(data && data !== undefined) {

				if(data.name)
					params.name = data.name;
				if(data.role)
					params.role = data.role;
				if(data.token)
					params.token = data.token;

				this.updateAccount(params, false);

			}
		}

	}
});