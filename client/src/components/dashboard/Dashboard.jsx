import React, { useEffect, useState } from "react";
import auth from "../services/auth";
import HomeIcon from "@material-ui/icons/Home";
import "./index.css";
import Sidebar from "./Sidebar";
import queryString from "query-string";

export default function Dashboard(props) {
	let currentRoute = props.history.location.pathname;
	let interval = {
		start: new Date(),
		end: new Date(),
		limit: 20,
	};
	let date = queryString.stringify(interval);
	console.log("date", date);

	const sidebarLinks = [
		{
			path: "/dashboard",
			label: "Dashbord",
			icon: <HomeIcon />,
		},
		{ path: "/users", label: "User", isActive: false, icon: <HomeIcon /> },
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
				<div className="main-area"></div>
			</div>
		</div>
	);
}
