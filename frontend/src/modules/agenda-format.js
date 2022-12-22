import { useDateId, useTime } from "@/modules/date-id";

// ["Hari ini", "Kemarin", "Bulan ini", "Tahun ini", "Setahun lalu"]

const dateNow = new Date();

const filterToday =  () => {
	const startDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0);
	const endDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() + 1, 0);
	return { startDate, endDate };
};

const filterYesterday =  () => {
	const startDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - 1, 0);
	const endDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0);
	return { startDate, endDate };
};

const filterLastMonth = () => {
	const startDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1, 0);
	const endDate = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0, 0);
	return { startDate, endDate };
};

const filterLastYear = () => {
	const startDate = new Date(dateNow.getFullYear(), 0, 1, 0);
	const endDate = new Date(dateNow.getFullYear() + 1, 0, 0, 0);
	return { startDate, endDate };
};

const filterAYearAgo = () => {
	const startDate = new Date(dateNow.getFullYear() - 1, 0, 1, 0);
	const endDate = new Date(dateNow.getFullYear(), 0, 0, 0);
	return { startDate, endDate };
};

const filterDate = [filterToday, filterYesterday, filterLastMonth, filterLastYear, filterAYearAgo];

export const filterByDate = (date, filterIndex) => {
	if(filterIndex >= filterDate.length)
		return true;
	const { startDate, endDate } = filterDate[filterIndex]();
	return (date.start.dateObj.getTime() >= startDate.getTime()) && (date.end.dateObj.getTime() <= endDate.getTime());
};

export const formatAgenda = (agenda, calendarColors) => {
	const startDate = new Date(agenda.tanggal_mulai),
		endDate = new Date(agenda.tanggal_selesai);

	const id = agenda.id;
	const color = agenda.warna;
	const twColor = calendarColors[agenda.warna];
	const title = agenda.nama;
	const date = {
		start: useDateId(startDate),
		end: useDateId(endDate)
	};
	const time = {
		start: useTime(agenda.mulai_pukul),
		end: useTime(agenda.sampai_pukul)
	};
	const ket = agenda.deskripsi;
	const location = agenda.tempat;
	const letter = agenda.file;
	const letterNo = agenda.no_surat;
	const message = agenda.pesan;
	const isActive = Boolean(Number(agenda.status_rapat));
	const hasInvitation = (!agenda.file && !agenda.no_surat && !agenda.pesan) ? false : true;

	return { id, color, twColor, title, date, time, ket, location, letter, letterNo, message, isActive, hasInvitation };
};