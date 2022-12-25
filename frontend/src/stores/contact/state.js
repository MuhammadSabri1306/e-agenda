/*
const badanDewan = ["Badan Musyawarah", "Badan Pembentukan Perda", "Badan Anggaran", "Badan Kehormatan"];

const fraksiTitle = ["Penasehat", "Ketua", "Wakil Ketua", "Sekretaris", "Bendahara", "Wakil Bendahara", "Wakil Sekretaris", "Anggota"];

const komisiTitle = ["Ketua", "Wakil Ketua", "Sekretaris", "Anggota", "Bukan Anggota"];

const dewanTitle = ["Ketua", "Wakil Ketua", "Anggota"];

const badanDewanTitle = ["Ketua", "Wakil Ketua", "Anggota"];
*/
const dewanTitle = [
	{ id: 1, typeKey: "dewanTitle", title: "Ketua", text: "Ketua DPRD" },
	{ id: 2, typeKey: "dewanTitle", title: "Wakil Ketua", text: "Wakil Ketua DPRD" },
	{ id: 3, typeKey: "dewanTitle", title: "Anggota", text: "Anggota DPRD" }
];

const badanDewan = [
	{ id: 1, typeKey:"badanDewan", name: "musyawarah", text: "Badan Musyawarah", key: "badan_musyawarah" },
	{ id: 2, typeKey:"badanDewan", name: "perda", text: "Badan Pembentukan Perda", key: "badan_pembentukan_perda" },
	{ id: 3, typeKey:"badanDewan", name: "anggaran", text: "Badan Anggaran", key: "badan_anggaran" },
	{ id: 4, typeKey:"badanDewan", name: "kehormatan", text: "Badan Kehormatan", key: "badan_kehormatan" }
];

export default {
	contact: [],
	categoryType: ["fraksi", "komisi", "dewanTitle", "badanDewan"],
	appliedFilter: [],
	fraksi: [],
	komisi: [],
	dewanTitle,
	badanDewan
};