import { login } from "./user";
import { agenda, invitation, attendance } from "./agenda";
import { contact, komisi, fraksi, pansus, opd } from "./contact";

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

export const fetchInvitation = (id = null) => {
	if(!id)
		return buildResponse(true, invitation);

	const data = invitation.find(item => item.id == id);
	return buildResponse(true, data);
};

export const fetchAttendance = (id = null) => {
	if(!id)
		return buildResponse(true, attendance);

	const data = attendance.find(item => item.id == id);
	return buildResponse(true, data);
};

export const fetchContact = (id = null) => {
	if(!id)
		return buildResponse(true, contact);

	const data = contact.find(item => item.id == id);
	return buildResponse(true, data);
};

export const fetchKomisi = () => buildResponse(true, komisi);
export const fetchFraksi = () => buildResponse(true, fraksi);
export const fetchPansus = () => buildResponse(true, pansus);
export const fetchOpd = () => buildResponse(true, opd);