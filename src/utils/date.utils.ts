export const toSqlDatetime = (inputDate: Date | string | null | undefined) => {
	if (!inputDate) return null;
	try {
		return new Date(inputDate).toISOString().slice(0, 19).replace("T", " ");
	} catch (error) {
		return null;
	}
};

export const toSqlDate = (inputDate: Date) => {
	return new Date(inputDate).toISOString().split("T")[0] || null;
};

export const getMonthName = (month: number) => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return monthNames[month - 1];
};
