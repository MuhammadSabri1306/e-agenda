const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default dateObj => {
	if(typeof dateObj.getMonth !== "function")
		return;

	const date = dateObj.getDate(),
		month = months[dateObj.getMonth()],
		day = days[dateObj.getDay()];

	const yy = dateObj.getYear();
	const year = (yy < 1000) ? yy + 1900 : yy;

	const toStr = function(){
		return `${ this.day }, ${ this.date } ${ this.month } ${ this.year }`;
	};

	return { dateObj, date, day, month, year, toStr };
};