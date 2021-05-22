import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NativeSelect from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import queryString from "query-string";
import { useParams } from "react-router";
import { VerifiedUserOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	fileUploadBtn: {
		display: "none",
	},
}));

const URL = process.env.REACT_APP_API_URL;

export default function Product() {
	const params = useParams();
	const classes = useStyles();
	const [categories, setCategories] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		description: "",
		category: "",
	});
	const [productId, setProductId] = useState(params.id);
	const [method, setMethod] = useState(productId ? "PUT" : "POST");

	console.log(method);
	const handleSubmit = (e) => {
		e.preventDefault();
		let form_data = new FormData();
		Object.keys(formData).map((key) => {
			if (formData[key] === "category")
				return form_data.append(key, formData[key]);
			return form_data.append(key, formData[key]);
		});
		console.log(form_data);
		fetch(`${URL}product/${productId ? productId : ""}`, {
			method: method,
			body: form_data,
		});
	};
	const handleChange = (e) => {
		const newFormData = { ...formData };
		newFormData[e.target.name] = e.target.value;
		if (e.target.name === "category")
			newFormData[e.target.name] = e.target.value;
		setFormData(newFormData);
	};
	const handleFileChange = async (e) => {
		let asd = e.target.files[0];
		// console.log(file);
		const toBase64 = (file) =>
			new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = (error) => reject(error);
			});
		let result = await toBase64(asd);
		let newFormData = { ...formData };
		newFormData.image = result;
		setFormData(newFormData);
	};

	useEffect(() => {
		async function getCategories() {
			let response = await fetch(`${URL}category`);
			let { data } = await response.json();
			setCategories(data.categories);
		}
		async function getProduct(id) {
			let response = await fetch(`${URL}product/${id}`);
			response = await response.json();
			setFormData(response.data);
		}
		getCategories();
		getProduct(productId);
	}, []);
	// console.log(formData);

	return (
		<Container component="main" maxWidth="lg">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5" align="left">
					Product Form
				</Typography>
				<form
					className={classes.form}
					onChange={handleChange}
					onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="name"
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Name"
								autoFocus
								value={productId && formData.name}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="price"
								label="Price"
								name="price"
								autoComplete="price"
								value={productId && formData.price}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								multiline
								rowsMax={4}
								variant="outlined"
								required
								fullWidth
								id="description"
								label="Description"
								placeholder="Product Description"
								name="description"
								value={productId && formData.description}
							/>
						</Grid>
						<Grid item xs={12}>
							<NativeSelect
								style={{ width: "100%" }}
								native
								labelId="demo-simple-select-filled-label"
								name="category"
								id="demo-simple-select-filled"
								value="12">
								{categories &&
									categories.map((category) => (
										<option
											key={category._id}
											selected={
												productId && categories._id === formData.category
											}
											value={category._id}>
											{category.name}
										</option>
									))}
							</NativeSelect>
						</Grid>
						<Grid item xs={12}>
							<input
								name="file"
								onChange={handleFileChange}
								style={{ display: "none" }}
								accept="image/*"
								className={classes.input}
								id="contained-button-file"
								type="file"
							/>
							<label htmlFor="contained-button-file">
								<Button
									className="p-button"
									variant="contained"
									color="primary"
									component="span">
									Upload
								</Button>
							</label>
						</Grid>
					</Grid>
					<Grid style={{ textAlign: "right" }} item xs={12}>
						<Button
							type="submit"
							size="large"
							variant="contained"
							color="primary"
							className="p-button p-button-med">
							Submit
						</Button>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
