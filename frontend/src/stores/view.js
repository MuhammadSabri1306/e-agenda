import { defineStore } from "pinia";

export const useViewStore = defineStore("view", {
	state: () => ({
		toast: null
	}),
	actions: {

		showToast(title, message, success) {
			this.toast = { title, message, success };
		}

	}
});