import moment from 'moment';


function getChartData(transactions, period) {
    console.log("chart", transactions);

    let data = {
        days: [],
        transactions: []
    };
    
    let periodData = period === "week" ? "isoweek" : 'month';
    console.log(periodData)
    let startDate = moment().startOf(periodData);
    let endDate = moment().endOf(periodData);

    for (let i = startDate; i <= endDate; i.add(1, "d")) {
        let currentDate = i.format("dddd");
        data.days.push(currentDate);

        let sum = 0;
        console.log(currentDate);

        let filtered = transactions.filter((tr) => moment(tr.createdAt).format("dddd") === currentDate);

        if(filtered.length === 0) data.transactions.push(sum);
        else {
            filtered.forEach(tr => {
                sum += tr.grandtotal;
            });
            data.transactions.push(sum);
        }
        
    }
    console.log(data);
    return data;

}

export default getChartData