const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export const useDateId = dateObj => {
	if(typeof dateObj.getMonth !== "function")
		return;

	const date = dateObj.getDate(),
		month = months[dateObj.getMonth()],
		day = days[dateObj.getDay()];

	const yy = dateObj.getYear();
	const year = (yy < 1000) ? yy + 1900 : yy;

	const toDateStr = function(){
		return `${ this.day }, ${ this.date } ${ this.month } ${ this.year }`;
	};

	return { dateObj, date, day, month, year, toDateStr };
};

export const toTimeStr = (dateObj, separator = ".") => {
	let hour = dateObj.getHours().toString();
	let minutes = dateObj.getMinutes().toString();

	hour = hour.length < 2 ? `0${ hour }` : hour;
	minutes = minutes.length < 2 ? `0${ minutes }` : minutes;
	
	return {
		time: `${ hour }${ separator }${ minutes }`,
		hour, minutes
	};
};

export const objToTimeStr = ({ h, m }, separator = ".") => {
	let hour = h.toString();
	let minutes = m.toString();

	hour = hour.length < 2 ? `0${ hour }` : hour;
	minutes = minutes.length < 2 ? `0${ minutes }` : minutes;
	
	return {
		time: `${ hour }${ separator }${ minutes }`,
		hour, minutes
	};
};