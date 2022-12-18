import { defineStore } from "pinia";
import state from "./state";
import actions from "./actions";

export const useContactStore = defineStore("contact", {
	state: () => state,
	actions
});