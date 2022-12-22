import { defineStore } from "pinia";
import { useAccountStore } from "@/stores/account";
import http from "@/modules/http-common";

export const useUserStore = defineStore("user", {
	state: () => ({
		user: []
	}),
	actions: {

		async fetchUser(force = false, callback = null) {
			if(!force && this.user.length > 0)
				return callback && callback(true);

			try {
				const accountStore = useAccountStore();
				const headers = { "Authorization": "Bearer " + accountStore.token };

				const response = await http.get("/user/operator", { headers });
				const data = response.data.data;

				if(!data)
					return callback && callback(false);
				this.user = data;
				callback && callback(true);
			
			} catch(err) {
				console.error(err);
				callback && callback(false);
			}
		},

		async saveUser(body, callback = null) {
			body.role = "operator";
			
			try {
				const accountStore = useAccountStore();
				const headers = { "Authorization": "Bearer " + accountStore.token };

				const response = await http.post("/register", body, { headers });
				const success = response.data.success;
				callback && callback(success);
			
			} catch(err) {
				console.error(err);
				callback && callback(false);
			}
		}

	}
});