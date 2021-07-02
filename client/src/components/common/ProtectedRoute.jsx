import React from "react";
import { Redirect, Route } from "react-router";
import {DataMenu} from '../dashboard/DataMenu';


export default function ProtectedRoute({ component: Component, ...rest }) {
	let token = localStorage.getItem("token");
	if (token)
		return <Route {...rest} render={(props) => <Component {...props} />} />;
	else return <Redirect to="/login" />;
}

export const PrivateComponent = DataMenu.map(({path, component}, key) => {
	return <ProtectedRoute exact component={component} key={key} path={path}></ProtectedRoute>	
});