import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
	state: () => ({
		user: {},
		token: null
	}),
	getters: {

		isAuthed: state => {
			if(!user.role)
				return false;
			if(user.role < 1)
				return false;
			return state.token ? true : false;
		}

	},
	actions: {

		login(username, password) {
			if(username != "user123" || password != "user123")
				return { status: false };

			this.user.username = "user123";
			this.user.name = "Kurt Cobain";
			this.user.role = 1;
			this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMjMiLCJuYW1lIjoiS3VydCBDb2JhaW4iLCJyb2xlIjoxfQ.xIT1xqa0ulrAVP-o23HQ_i59SXixdkh6JLrcNDiaOuY";

			return { status: true };
		}

	}
});