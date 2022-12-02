import { login } from "./user";
import { agenda } from "./agenda";
import { contactAnggota, contactOpd, komisi, fraksi, pansus, opd } from "./contact";

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

export const fetchContactAnggota = (id = null) => {
	if(!id)
		return buildResponse(true, contactAnggota);

	const data = contactAnggota.find(item => item.id == id);
	return buildResponse(true, data);
};

export const fetchContactOpd = (id = null) => {
	if(!id)
		return buildResponse(true, contactOpd);

	const data = contactOpd.find(item => item.id == id);
	return buildResponse(true, data);
};

export const fetchKomisi = () => buildResponse(true, komisi);
export const fetchFraksi = () => buildResponse(true, fraksi);
export const fetchPansus = () => buildResponse(true, pansus);
export const fetchOpd = () => buildResponse(true, opd);