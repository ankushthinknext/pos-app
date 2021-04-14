import React from "react";
import auth from "../services/auth";
import "./index.css";
import Sidebar from "./Sidebar";

export default function Dashboard() {
	return (
		<div>
			<div className="dashboard-area">
				<div className="sidebar">
					<Sidebar />
				</div>
				<div className="main-area"></div>
			</div>
		</div>
	);
}
