import { contact } from "./contact";

export const agenda = [
	{
		id: 1,
		startDate: 1669852800000,
		endDate: 1669852800000,
		startTime: { h: 8, m: 0 },
		endTime: { h: 12, m: 0 },
		title: "Rapat Dengar Pendapat Komisi B",
		desc: "Pembahasan dan pendalaman komisi-komisi terhadap rancangan Kebijakan Umum Perubahan Anggaran (KUPA) serta Prioritas dan Plafon Anggaran Sementara (PPAS) TA 2022.",
		location: "Ruang Rapat Komisi B (Ged.Tower Lt.4)",
		color: "red",
		invitationId: 1,
		roomId: null
	},
	{
		id: 2,
		startDate: 1670803200000,
		endDate: 1670803200000,
		startTime: { h: 9, m: 0 },
		endTime: { h: 18, m: 0 },
		title: "Rapat Intern Komisi D",
		desc: "-",
		location: "Ruang Rapat Komisi D (Ged. Tower Lt.6)",
		color: "blue",
		invitationId: null,
		roomId: 1
	}
];

export const invitation = [
	{
		id: 1,
		attachment: "test.pdf",
		message: "Test pesan wa",
		agenda: agenda.find(item => item.invitationId == 1),
		contact: [2]
	}
];

const room = [
	{
		id: 1,
		available: false,
		agenda: agenda.find(item => item.roomId == 1)
	}
];

const presence = contact
	.filter(item => item.isMember)
	.map((item, index) => {
		const id = index + 1;
		const roomId = 1;
		const { name, email, wa, fraksi, komisi } = item;
		const dateTime = "02/12/2022 07:30";

		return { id, roomId, name, email, wa, fraksi, komisi, dateTime };
	});

export const attendance = room.map(roomItem => {
	const member = presence.filter(memberItem => memberItem.roomId == roomItem.id);
	const agendaId = roomItem.agenda.id;
	const agendaDate = new Date(roomItem.agenda.startDate).getTime();

	const uniqueKey = `${ roomItem.id }agd${ agendaId }t${ agendaDate }`;
	const roomUrl = "http://localhost:5173/att/room/" + uniqueKey;
	return { ...roomItem, member, uniqueKey, roomUrl };
});