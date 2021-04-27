import React from "react";
import { Redirect, Route } from "react-router";

export default function ProtectedRoute({ component: Component, ...rest }) {
	let token = localStorage.getItem("token");
	if (token)
		return <Route {...rest} render={(props) => <Component {...props} />} />;
	else return <Redirect to="/login" />;
}
