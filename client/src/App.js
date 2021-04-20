import "./App.css";
import Login from "./components/auth/Login";
import { Route, Switch, Redirect } from "react-router";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Products from "./components/dashboard/Products";
console.log(process.env.REACT_APP_API_URL);
function App() {
	return (
		<div>
			<Switch>
				<ProtectedRoute path="/dashboard" component={Dashboard} exact />
				<ProtectedRoute path="/users" component={Dashboard} />
				<ProtectedRoute path="/category" component={Dashboard} />
				<ProtectedRoute path="/products" component={Dashboard} />
				<ProtectedRoute path="/transaction" component={Dashboard} />
				<ProtectedRoute path="/report" component={Dashboard} />
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
