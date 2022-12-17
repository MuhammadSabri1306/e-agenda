import { useDateId, useTime } from "@/modules/date-id";
import { inYearRange, inMonthRange, inDateRange } from "@/modules/filter-date";

export default {
	list: state => {
		let colorIndex = 0;
		const colorKeys = Object.keys(state.calendarColors);

		return state.agenda.map(agenda => {
			const startDate = new Date(agenda.tanggal_mulai),
				endDate = new Date(agenda.tanggal_selesai);

			const id = agenda.id;
			const color = agenda.warna;
			const twColor = state.calendarColors[agenda.warna];
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
			const hasInvitation = (!agenda.file && !agenda.no_surat && !agenda.pesan) ? false : true;

			return { id, color, twColor, title, date, time, ket, location, letter, letterNo, message, hasInvitation };
		});
	},
	getById() {
		const list = this.list;
		return id => list.find(lItem => lItem.id == id);;
	},
	today() {
		const curDate = new Date();
		return this.list.filter(item => {

			if(item.date.start.year > curDate.getFullYear() || item.date.end.year < curDate.getFullYear())
				return false;
			if(item.date.start.month > (curDate.getMonth() + 1) || item.date.end.month < (curDate.getMonth() + 1))
				return false;
			if(item.date.start.date > curDate.getDate() || item.date.end.date < curDate.getDate())
				return false;
			return true;
		
		});
	},
	/*attendanceFormat: state => {
		return state.attendance.map(item => {});
	}*/
};