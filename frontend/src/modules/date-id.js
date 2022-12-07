const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export const useDateId = dateObj => {
	if(typeof dateObj.getMonth !== "function")
		return;

	const date = dateObj.getDate();
	const month = months[dateObj.getMonth()];
	const day = days[dateObj.getDay()];
	
	let monthNum = dateObj.getMonth() + 1;
	monthNum = monthNum.toString() < 2 ? "0" + monthNum.toString() : monthNum.toString();

	const yy = dateObj.getYear();
	const year = (yy < 1000) ? yy + 1900 : yy;

	const toDateStr = function(){
		return `${ this.day }, ${ this.date } ${ this.month } ${ this.year }`;
	};

	return { dateObj, date, day, month, monthNum, year, toDateStr };
};

export const useTime = (src, separator = ":") => {
	const date = new Date();
	const timeArr = src.split(separator);

	if(timeArr.length > 0)
		date.setHours(timeArr[0]);
	if(timeArr.length > 1)
		date.setMinutes(timeArr[1]);
	date.setSeconds(0);
	date.setMilliseconds(0);

	const dateHours = date.getHours().toString();
	const dateMinutes = date.getMinutes().toString();

	return {
		date,
		src,
		h: dateHours.length < 2 ? "0" + dateHours : dateHours,
		m: dateMinutes.length < 2 ? "0" + dateMinutes : dateMinutes
	};
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