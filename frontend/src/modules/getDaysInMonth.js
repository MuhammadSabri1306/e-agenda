
/* 
 * @author MuhammadSabri1306
 * @param {int} month, [0-11]
 * @param {int} year
 * @return {Date[]} days
 */
export default (month, year) => {
	const days = [],
		date = new Date(year, month, 1);

	while(date.getMonth() === month){
		days.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}

	return days;
};