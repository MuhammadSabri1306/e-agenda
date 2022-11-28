import { defineStore } from "pinia";

export const useViewStore = defineStore("view", {
	state: () => ({
		toast: null
	}),
	actions: {

		showToast(title, message, success) {
			console.log(title);
			this.toast = { title, message, success };
		}

	}
});