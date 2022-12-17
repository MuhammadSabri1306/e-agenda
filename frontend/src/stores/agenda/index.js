import { defineStore } from "pinia";
import state from "./state";
import getters from "./getters";
import actions from "./actions";

export const useAgendaStore = defineStore("agenda", {
	state: () => state,
	getters,
	actions
});