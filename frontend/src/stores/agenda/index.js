import { defineStore } from "pinia";
import getters from "./getters";
import actions from "./actions";

export const useAgendaStore = defineStore("agenda", {
	state: () => ({
		category: {
			items: [
				{ key: "recent", title: "Hari ini"},
				{ key: "yesterday", title: "Kemarin" },
				{ key: "lastMonth", title: "Sebulan terakhir" },
				{ key: "lastYear", title: "Tahun ini" },
				{ key: "all", title: "Semua" }
			],
			selectedIndex: 0
		},
		sort: {
			sortBy: {
				time: true,
				alphabet: false
			},
			isAsc: true,
			use: false
		},
		model: []
	}),
	getters,
	actions
});