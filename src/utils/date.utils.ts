import moment from "moment-timezone";

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

export const getDateTimeUsingTimezone = (timezone: string): string => {
	return moment.utc().utcOffset(timezone).format("YYYY-MM-DD HH:mm:ss");
};

export const getStartTimeOfDate = (date: string, timezone?: string): Date => {
	return new Date(
		date.split(" ")[0] + " 00:00:00" + (timezone ? timezone : "")
	);
};

export const getEndTimeOfDate = (date: string, timezone?: string): Date => {
	return new Date(
		date.split(" ")[0] + " 23:59:59" + (timezone ? timezone : "")
	);
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
