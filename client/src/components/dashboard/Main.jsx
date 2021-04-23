import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chart from "chart.js";
import queryString from "query-string";
import moment from "moment";
import getChartData from "./chartUtlils";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export default function Main() {
	const chartContainer = useRef(null);
	const [chartInstance, setChartInstance] = useState(null);

	let URL = process.env.REACT_APP_API_URL;

	let [dashboardData, setDashboardData] = useState([]);
	let [transactionsData, setTransactionsData] = useState([]);
	let monthlyData = {};

	useEffect(() => {
		let interval = {
			limit: 100,
			start: moment().startOf("month"),
			end: moment().endOf("month"),
		};
		let query = queryString.stringify(interval);
		async function fetchDashboardData() {
			let response = await fetch(`${URL}transaction/dashboard/?${query}`);
			let { data } = await response.json();
			setDashboardData(data);
		}
		async function fetchTransactionsData() {
			let response = await fetch(`${URL}transaction/?${query}`);
			let { data } = await response.json();
			setTransactionsData(data);
			let chartData = getChartData(data.transactions, "month");
			const chartConfig = {
				type: "line",
				data: {
					labels: chartData.days,
					datasets: [
						{
							data: chartData.transactions,
							backgroundColor: "#f3a8bd",
						},
					],
				},
				options: {},
			};
			if (chartContainer && chartContainer.current) {
				const newChartInstance = new Chart(chartContainer.current, chartConfig);
				setChartInstance(newChartInstance);
			}
		}

		fetchDashboardData();
		fetchTransactionsData();
	}, []);
	const classes = useStyles();

	return (
		<div>
			<div className="first-row">
				<div className="d-card d-card-maroon">
					<h5>{dashboardData.count}</h5>
				</div>
				<div className="d-card d-card-indigo">
					<h5>{dashboardData.total}</h5>
				</div>
				<div className="d-card d-card-orange">
					<h5>{dashboardData.quantity}</h5>
				</div>
			</div>

			<div className={classes.root}>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<Paper className={classes.paper}>
							<canvas ref={chartContainer} />
						</Paper>
					</Grid>
					<Grid item xs={6}>
						<Paper className={classes.paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Reciept No</TableCell>
										<TableCell align="right">Date</TableCell>
										<TableCell align="right">Qty</TableCell>
										<TableCell align="right">Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{transactionsData.transactions &&
										transactionsData.transactions.map((transaction) => (
											<TableRow key={transaction._id}>
												<TableCell>{transaction._id}</TableCell>
												<TableCell align="right">
													{moment(transaction.createdAt).format("ll")}
												</TableCell>
												<TableCell align="right">
													{transaction.items.length}
												</TableCell>
												<TableCell align="right">
													{transaction.subtotal}
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
