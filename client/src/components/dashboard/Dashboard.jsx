import React from "react";
import {DataMenu} from './DataMenu';
import "./index.css";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Navbar from './Navbar';
import User from '../user/User';
import Category from '../category/Category';
import CategoryForm from '../category/CategoryForm';
import Product from '../product/Product';
import UserForm from '../user/UserForm';
import ProductForm from '../product/ProductForm';
import Transaction from "../transaction/Transaction";


export default function Dashboard(props) {
	console.log(props);
	
	let currentRoute = props.history.location.pathname;
	const history = props.history;
	console.log(history);
	console.log("hello");

	return (
		<div>
			<div className="dashboard-area ">
				<div className="sidebar">
					<Sidebar links={DataMenu} currentRoute={currentRoute} history={history} />
				</div>
				<div className="container">
					<div className="navbar">
						<Navbar></Navbar>
					</div>
					<div className="main-area">
						{currentRoute === "/admin/dashboard" && (
							<Main />
						)}	

						{currentRoute === "/admin/user" && (
							<User {...props}></User>
						)}
						{currentRoute === "/admin/user/create" && (
							<UserForm></UserForm>
						)}
						{currentRoute.startsWith("/admin/user/update/") && (
							<UserForm {...props}></UserForm>
						)}
						{currentRoute === "/admin/category" && (
							<Category {...props}></Category>
						)}
						{currentRoute === "/admin/category/create" && (
							<CategoryForm></CategoryForm>
						)}

						{currentRoute.startsWith("/admin/category/update") && (
							<CategoryForm></CategoryForm>
						)}

						{currentRoute === "/admin/product" && (
							<Product {...props}></Product>	
						)}
						{currentRoute === "/admin/product/create" && (
							<ProductForm></ProductForm>
						)}
						{currentRoute.startsWith("/admin/product/update") && (
							<ProductForm></ProductForm>
						)}

						{currentRoute === "/admin/transaction" && (
							<Transaction></Transaction>
						)}


					</div>
				</div>
			</div>
		</div>
	);
}
