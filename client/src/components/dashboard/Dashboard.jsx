import React from "react";
import auth from "../services/auth";

export default function Dashboard() {
	return (
		<div>
			<h1>THis is dashboard</h1>
			<button onClick={auth.logout}>Logout</button>
		</div>
	);
}
