export default {
	filteredContact: state => {
		return state.contact.filter(item => {
			const appliedFilter = state.appliedFilter;
			if(appliedFilter.length < 1)
				return true;

			let show = false;
			appliedFilter.forEach(filter => {
				if(show)
					return;

				if(filter.type == "fraksi" && item.fraksi) {
					show = item.fraksi.id === filter.id;
					return;
				}

				if(filter.type == "komisi" && item.komisi) {
					show = item.komisi.id === filter.id;
					return;
				}

				if(filter.type == "dewanTitle" && item.pimpinan_dewan) {
					const index = state.dewanTitle.findIndex(itemDewanTitle => itemDewanTitle.id == filter.id);
					const currTitle = state.dewanTitle[index] ? state.dewanTitle[index].title : null;
					
					show = item.pimpinan_dewan == currTitle;
					return;
				}

				if(filter.type == "badanDewan") {
					const index = state.badanDewan.findIndex(itemBadanDewan => itemBadanDewan.id == filter.id);
					const attrKey = index >= 0 ? "kedudukan_" + state.badanDewan[index].key : "x";
					
					if(item[attrKey] )
						show = item[attrKey] !== "Bukan Anggota";
					return;
				}
			});

			return show;
		});
	}
};