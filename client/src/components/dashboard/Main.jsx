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

export default function Main(props) {
	const chartContainer = useRef(null);
	const [chartInstance, setChartInstance] = useState(null);
	const getWeeklyData = () => {
		let weekData = [];
	};
	const chartConfig = {
		type: "line",
		data: {
			// ...
			//Bring in data
			labels: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thrusday",
				"Friday",
				"Saturday",
			],
			datasets: [
				{
					label: "label ankush",
					data: [86, 67, 91, 50, 12, 34, 12],
					backgroundColor: "#f3a8bd",
				},
			],
		},
		options: {},
	};
	useEffect(() => {
		if (chartContainer && chartContainer.current) {
			const newChartInstance = new Chart(chartContainer.current, chartConfig);
			setChartInstance(newChartInstance);
		}
	}, [chartContainer]);
	const classes = useStyles();
	let { count, total, qty: quantity } = props.dashboardData;
	let { transactions } = props.transactionsData;
	console.log(transactions);

	return (
		<div>
			<div className="first-row">
				<div className="d-card d-card-maroon">
					<h5>{count}</h5>
				</div>
				<div className="d-card d-card-indigo">
					<h5>{total}</h5>
				</div>
				<div className="d-card d-card-orange">
					<h5>{quantity}</h5>
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
									{transactions &&
										transactions.map((transaction) => (
											<TableRow key={transaction._id}>
												<TableCell>{transaction._id}</TableCell>
												<TableCell align="right">
													{/* {Moment(transaction.createdAt).format("MM/DD/YYYY")} */}
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
