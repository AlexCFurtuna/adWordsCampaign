// generating start-end date array
function generateIntervalDate(startDate, stopDate) {
	let dateArray = [];
	let currentDate = startDate;
	// generate days in while loop until stopDate
	while (currentDate <= stopDate) {
		dateArray.push(getFormattedDate(new Date(currentDate)));
		currentDate = currentDate.addDays(1);
	}
	return dateArray;
}
//date formatter
function getFormattedDate(date) {
	return date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
}
// adding method to global Date
Date.prototype.addDays = function (days) {
	let date = new Date(this.valueOf())
	date.setDate(date.getDate() + days);
	return date;
}
// generate random min & hour
function randomHours() {
	//00-23
	let hrs = Math.round(Math.random() * 23);
	//0-59
	let min = Math.round(Math.random() * 59);
	return hourFormat(hrs,min)
}
// formatting hour
function hourFormat(hrs,min){
	let hFormat = (hrs < 10 ? "0" : "");
	let mFormat = (min < 10 ? "0" : "");
	return String(hFormat + hrs + ":" + mFormat + min);
}
function getSecondPartFromHour(str) {
	return str.split(':')[1];
}

function getFirstPartFromHour(str) {
	return str.split(':')[0];
}

module.exports = {
	randomHours, generateIntervalDate, getSecondPartFromHour, getFirstPartFromHour,hourFormat
}
