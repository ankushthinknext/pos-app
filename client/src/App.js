import logo from "./logo.svg";
import "./App.css";
import Login from "./components/auth/Login";
import { Route, Switch } from "react-router";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Products from "./components/dashboard/Products";

function App() {
	return (
		<div>
			<Switch>
				<ProtectedRoute path="/dashboard" component={Dashboard} exact />
				<ProtectedRoute path="/users" component={Dashboard} />

				<ProtectedRoute path="/products" component={Dashboard} />
				<ProtectedRoute path="/product/:id?" component={Dashboard} />
				<ProtectedRoute path="/categories" component={Dashboard} />
				<ProtectedRoute path="/category/:id?" component={Dashboard} />
				<ProtectedRoute path="/transactions" component={Dashboard} />
				<Route path="/login" exact component={Login} />
			</Switch>
		</div>
	);
}

export default App;
