


const setupResponse = (dataObj, success = true) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if(success)
				resolve({ success, data: dataObj });
			else
				reject({ success });
		}, 300);
	});
};

export const fetchAgenda = (id = null) => {
	if(!id)
		return setupResponse({ agenda: agenda });

	const index = agenda.findIndex(item => item.id === id);
	if(index < 0)
		return setupResponse({ agendaItem: null }, false);
	return setupResponse({ agendaItem: agenda[index] });
};