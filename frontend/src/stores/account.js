import { defineStore } from "pinia";
import { getCookie, setCookie } from "@/modules/app-cookie";
import { fetchLogin } from "@/modules/sample-data";

export const useAccountStore = defineStore("account", {
	state: () => ({
		username: null,
		name: null,
		token: null,
		role: null
	}),
	getters: {

		isRoleAdmin: state => state.token && state.role == "admin",
		isRoleOperator: state => state.token && state.role == "operator",
		isRoleMember: state => state.token && state.role == "member",
		isRolePublic: state => !state.token

	},
	actions: {

		async login({ username, password }, callback = null) {
			try {

				const response = await fetchLogin({ username, password });
				const data = response.data;
				
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

		updateAccount(params, updateCookie = true) {
			if(params.name && params.name !== undefined)
				this.name = params.name;
			if(params.username && params.username !== undefined)
				this.username = params.username;
			if(params.token && params.token !== undefined)
				this.token = params.token;
			if(params.role && params.role !== undefined)
				this.role = params.role;

			if(!updateCookie)
				return;

			const data = {
				username: this.username,
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

				if(data.username)
					params.username = data.username;
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