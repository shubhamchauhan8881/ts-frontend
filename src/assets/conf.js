const BASE_URL = "http://elsker.pythonanywhere.com/api/v1";
const SERVER_URL = "http://elsker.pythonanywhere.com";

function GetAbsoluteURL(url) {
	return `${SERVER_URL}/${url}`;
}

function formatBytes(bytes, decimals = 2) {
	if (!+bytes) return "0 Bytes";
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = [
		"Bytes",
		"KiB",
		"MiB",
		"GiB",
		"TiB",
		"PiB",
		"EiB",
		"ZiB",
		"YiB",
	];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function trimToFixedDecimal(number, decimals) {
	const formatter = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
		useGrouping: false,
	});
	return formatter.format(number);
}

export { BASE_URL, GetAbsoluteURL, formatBytes, trimToFixedDecimal };
