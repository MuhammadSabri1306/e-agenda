import { login } from "./user";
import { agenda } from "./agenda";

const buildResponse = (success, data) => {
	return new Promise((resolve, reject) => {

		return setTimeout(() => {
			if(success)
				resolve({ success, data });
			else
				reject({ success, data });
		}, 500);

	});
};

export const fetchLogin = ({ username, password }) => {
	const { success, data } = login(username, password);
	return buildResponse(success, data);
};

export const fetchAgenda = (id = null) => {
	if(!id)
		return buildResponse(true, agenda);

	const data = agenda.find(item => item.id == id);
	return buildResponse(true, data);
};