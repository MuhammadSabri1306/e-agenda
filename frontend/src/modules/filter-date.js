
export const inYearRange = (date, startDate, endDate) => {
	return date.start.getMonth() >= startDate.getMonth() && date.end.getMonth() <= endDate.getMonth();
};

export const inMonthRange = (date, startDate, endDate) => {
	return date.start.getMonth() >= startDate.getMonth() && date.end.getMonth() <= endDate.getMonth();
};

export const inDateRange = (date, startDate, endDate) => {
	return date.start.getDate() >= startDate.getDate() && date.end.getDate() <= endDate.getDate();
};