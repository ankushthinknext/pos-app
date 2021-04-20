import React, { useEffect, useState } from "react";
import {DataMenu} from './DataMenu';
import "./index.css";
import Sidebar from "./Sidebar";
import queryString from "query-string";
import Main from "./Main";
import Navbar from './Navbar';

export default function Dashboard(props) {
	let URL = process.env.REACT_APP_API_URL;
	let currentRoute = props.history.location.pathname;

	//
	let [dashboardData, setDashboardData] = useState([]);
	let [transactionsData, setTransactionsData] = useState([]);
	let { transactions } = transactionsData;

	let interval = {
		limit: 20,
		end: new Date(),
		start: new Date(),
	};
	interval.start.setDate(interval.end.getDate() - 6);

	useEffect(() => {
		async function fetchDashboardData() {
			let response = await fetch(`${URL}transaction/dashboard/?${query}`);
			let { data } = await response.json();
			setDashboardData(data);
		}
		async function fetchTransactionsData() {
			let response = await fetch(`${URL}transaction/?${query}`);
			let { data } = await response.json();
			setTransactionsData(data);
		}
		fetchDashboardData();
		fetchTransactionsData();
	}, []);

	let query = queryString.stringify(interval);

	return (
		<div>
			<div className="dashboard-area ">
				<div className="sidebar">
					<Sidebar links={DataMenu} currentRoute={currentRoute} />
				</div>
				<div className="navbar">
					<Navbar></Navbar>
				</div>
				<div className="main-area">
					{currentRoute === "/dashboard" && (
						<Main
							transactionsData={transactionsData}
							dashboardData={dashboardData}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
