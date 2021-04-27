import React from "react";
import {DataMenu} from './DataMenu';
import "./index.css";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Navbar from './Navbar';

export default function Dashboard(props) {
	
	let currentRoute = props.history.location.pathname;

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
						<Main/>
					)}
				</div>
			</div>
		</div>
	);
}
