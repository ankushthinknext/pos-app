import "./App.css";
import Login from "./components/auth/Login";
import { Route, Switch, Redirect } from "react-router";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
console.log(process.env.REACT_APP_API_URL);
function App() {
	return (
		<div>
				<Switch>
					<ProtectedRoute path="/admin/dashboard" component={Dashboard} exact />
					<ProtectedRoute path="/admin/category/update/:id?" component={Dashboard} />
					<ProtectedRoute path="/admin/category/create" component={Dashboard} />
					<ProtectedRoute path="/admin/category" component={Dashboard} />
					<ProtectedRoute path="/admin/user/update/:id?" component={Dashboard} />
					<ProtectedRoute path="/admin/user/create" component={Dashboard} />
					<ProtectedRoute path="/admin/user" component={Dashboard} />
					<ProtectedRoute path="/admin/product/update/:id?" component={Dashboard} />
					<ProtectedRoute path="/admin/product/create" component={Dashboard} />
					<ProtectedRoute path="/admin/product" component={Dashboard} />
					<ProtectedRoute path="/admin/transaction" component={Dashboard} />
					<ProtectedRoute path="/admin/report" component={Dashboard} />
					<Route
					exact
					path="/"
					render={() => {
						return (
							<Redirect to="/login" /> 
						)
					}}
				/>
					<Route path="/login" exact component={Login} />
				</Switch>
		</div>
	);
}

export default App;
