import React, { useEffect, useState } from "react";
import auth from "../services/auth";
import HomeIcon from "@material-ui/icons/Home";
import "./index.css";
import Sidebar from "./Sidebar";
import queryString from "query-string";
import Main from "./Main";
import Produts from "../products/Produts";

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
	console.log(transactionsData);
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

	const sidebarLinks = [
		{
			path: "/dashboard",
			label: "Dashbord",
			icon: <HomeIcon />,
		},
		{ path: "/users", label: "User", icon: <HomeIcon /> },
		{
			path: "/category",
			label: "Category",
			icon: <HomeIcon />,
		},
		{
			path: "/products",
			label: "Products",

			icon: <HomeIcon />,
		},
	];

	return (
		<div>
			<div className="dashboard-area ">
				<div className="sidebar">
					<Sidebar links={sidebarLinks} currentRoute={currentRoute} />
				</div>
				<div className="main-area">
					{currentRoute === "/dashboard" && (
						<Main
							transactionsData={transactionsData}
							dashboardData={dashboardData}
						/>
					)}
					{currentRoute === "/products" && <Produts />}
				</div>
			</div>
		</div>
	);
}
