import moment from "moment";

function getChartData(transactions, period) {
	let data = {
		days: [],
		transactions: [],
	};

	let startDate = moment().startOf("isoweek");
	let endDate = moment().endOf("isoweek");
	console.log(startDate, endDate);
	console.log(transactions);
	for (let i = startDate; i <= endDate; i.add(1, "d")) {
		let currentDay = i.format("D");
		data.days.push(currentDay);
		let sum = 0;

		let filtered = transactions.filter(
			(tr) => moment(tr.createdAt).format("D") === currentDay,
		);

		if (filtered.length === 0) data.transactions.push(sum);
		else {
			filtered.forEach((tr) => {
				sum += tr.grandtotal;
			});
			data.transactions.push(sum);
		}
	}
	console.log(data);
	return data;
}

export default getChartData;
