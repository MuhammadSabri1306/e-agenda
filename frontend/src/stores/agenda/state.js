
const filter = {
	items: ["Hari ini", "Kemarin", "Bulan ini", "Tahun ini", "Setahun lalu", "Semua"],
	selectedIndex: 2
};

const sort = {
	sortBy: {
		time: true,
		alphabet: false
	},
	isAsc: true
};

const calendarColors = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    indigo: "bg-indigo-500",
    teal: "bg-teal-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
	gray: "bg-gray-500"
};

const agenda = [];
const invitation = [];
const attendance = [];

export default { filter, sort, calendarColors, agenda, invitation, attendance };