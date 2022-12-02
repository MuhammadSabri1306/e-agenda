
export const orderCategory = (a, b) => {
	const typeA = a.type.toLowerCase();
	const typeB = b.type.toLowerCase();
	if(typeA != typeB)
		return (typeA < typeB) ? -1 : (typeA > typeB) ? 1 : 0;

	const nameA = a.name.toLowerCase();
	const nameB = b.name.toLowerCase();
	return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
};