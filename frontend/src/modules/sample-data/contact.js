export const komisi = [
	{ id: 1, name: "Komisi A" },
	{ id: 2, name: "Komisi B" },
	{ id: 3, name: "Komisi C" },
	{ id: 4, name: "Komisi D" },
	{ id: 5, name: "Komisi E" }
];

export const fraksi = [
	{ id: 1, name: "Fraksi Golkar" },
	{ id: 2, name: "Fraksi Nasdem" },
	{ id: 3, name: "Fraksi Gerindra" },
	{ id: 4, name: "Fraksi Demokrat" },
	{ id: 5, name: "Fraksi PKS" },
	{ id: 6, name: "Fraksi PDIP" },
	{ id: 7, name: "Fraksi PKB" },
	{ id: 8, name: "Fraksi PAN" },
	{ id: 9, name: "Fraksi PPP" }
];

export const pansus = [
	{ id: 1, name: "Pansus Narkotika" },
	{ id: 2, name: "Pansus Pertanian Organik" },
	{ id: 3, name: "Pansus Produk Hukum" },
	{ id: 4, name: "Pansus Sampah Regional" }
];

export const opd = [
	{ id: 1, name: "Biro Ekonomi" },
	{ id: 2, name: "RSKD. GIGI DAN MULUT" }
];

export const contact = [
	{
		id: 1,
		name: "Ir. Selle KS Dalle",
		wa: "0811416526",
		email: "selleksdalle@gmail.com",
		isMember: true,
		fraksi: fraksi.find(item => item.id == 4),
		komisi: komisi.find(item => item.id == 5),
		pansus: null,
		opd: null
	},
	{
		id: 2,
		name: "ADIL ALIM, S. Tr.kes",
		wa: "08124227532",
		email: "selleksdalle@gmail.com",
		isMember: false,
		fraksi: null,
		komisi: null,
		pansus: null,
		opd: opd.find(item => item.id == 2)
	}
];