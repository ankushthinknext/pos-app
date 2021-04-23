import React, { useEffect, useState } from "react";
import auth from "../services/auth";
import HomeIcon from "@material-ui/icons/Home";
import "./index.css";
import Sidebar from "./Sidebar";
import queryString from "query-string";
import Main from "./Main";
import Products from "../products/Products";
import { Container } from "@material-ui/core";
import moment from "moment";
import Product from "../products/Product";

export default function Dashboard(props) {
	let URL = process.env.REACT_APP_API_URL;
	let currentRoute = props.history.location.pathname;

	let [dashboardData, setDashboardData] = useState([]);
	let [transactionsData, setTransactionsData] = useState([]);

	let interval = {
		limit: 20,
		start: moment().startOf("month"),
		end: moment().endOf("month"),
	};
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
				<Container>
					<div className="main-area">
						{currentRoute === "/dashboard" && (
							<Main
								transactionsData={transactionsData}
								dashboardData={dashboardData}
							/>
						)}
						{currentRoute === "/products" && <Products />}
						{currentRoute === "/product" && <Product />}
					</div>
				</Container>
			</div>
		</div>
	);
}
