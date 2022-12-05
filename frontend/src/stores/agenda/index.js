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
		agenda: [],
		invitation: [],
		attendance: [],
		calendarColors: {
			gray: "bg-gray-500",
		    red: "bg-red-500",
		    orange: "bg-orange-500",
		    yellow: "bg-yellow-500",
		    green: "bg-green-500",
		    teal: "bg-teal-500",
		    blue: "bg-blue-500",
		    indigo: "bg-indigo-500",
		    purple: "bg-purple-500",
		    pink: "bg-pink-500"
		}
	}),
	getters,
	actions
});