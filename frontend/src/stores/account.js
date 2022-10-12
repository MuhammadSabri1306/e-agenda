import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
	state: () => ({

		user: {},
		token: null

	}),
	getters: {

		isAuthed: state => state.token ? true : false

	},
	actions: {

		setUser({ id, name, username, role }) {
			this.user.id = id || this.user.id;
			this.user.name = name || this.user.name;
			this.user.username = username || this.user.username;
			this.user.role = role || this.user.role;
		},

		setToken(token) {
			this.token = token;
		}

	}
});