import { defineStore } from "pinia";
import { getCookie, setCookie } from "@/modules/app-cookie";
import { fetchLogin } from "@/modules/sample-data";

export const useAccountStore = defineStore("account", {
	state: () => ({
		user: null,
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

				const data = await fetchLogin({ username, password });
				this.user = {
					username: data.username,
					name: data.name
				};
				this.role = data.role;
				this.token = data.token;

				this.updateAccount(data);
				callback && callback(true);

			} catch(err) {

				console.error(err);
				callback && callback(false);

			}
		},

		updateAccount(params) {
			let user = this.user;

			if(params.username || params.name) {
				const user = this.user || {};
				if(params.username)
					user.username = params.username;
				if(params.name)
					user.name = params.username;
				this.user = user;
			}

			if(params.token)
				this.token = params.token;
			if(params.role)
				this.role = params.role;

			const data = {
				user: this.user,
				role: this.role,
				token: this.token
			};

			setCookie("user", data);
		},

		readAccountCookie() {
			const data = getCookie("user");
			let params = {};

			if(!data)
				return;

			if(data.user && data.user.username)
				params.username = data.user.username;
			if(data.user && data.user.name)
				params.name = data.user.name;
			if(data.role)
				params.role = data.role;
			if(data.token)
				params.token = data.token;

			this.updateAccount(params);
		}

	}
});