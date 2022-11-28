import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";

export const useDataForm = fields => {
	const state = {},
		validations = {};

	for(let key in fields) {
		const { value, ...validationItem } = fields[key];
		state[key] = value || null;
		validations[key] = validationItem;
	}

	const data = reactive(state);
	const v$ = useVuelidate(validations, data);

	return { data, v$ };
};