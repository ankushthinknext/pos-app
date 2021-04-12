import React from "react";
import { Redirect, Route } from "react-router";
import auth from "../services/auth";

export default function ProtectedRoute({ component: Component, ...rest }) {
	let token = localStorage.getItem("token");
	if (auth.isLoggedIn)
		return <Route {...rest} render={(props) => <Component {...props} />} />;
	else return <Redirect to="/login" />;
}
