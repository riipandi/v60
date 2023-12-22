const { DateTime } = require("luxon");

module.exports = {
	dateToFormat: (date, format) =>
		DateTime.fromJSDate(date, { zone: "utc" }).toFormat(String(format)),

	dateToISO: (date) =>
		DateTime.fromJSDate(date, { zone: "utc" }).toISO({
			includeOffset: false,
			suppressMilliseconds: true,
		}),

	obfuscate: (str) => {
		const chars = [];
		for (let i = str.length - 1; i >= 0; i--) {
			chars.unshift(["&#", str[i].charCodeAt(), ";"].join(""));
		}
		return chars.join("");
	},

	filterTagList(tags) {
		return (tags || []).filter(
			(tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1,
		);
	},
};
