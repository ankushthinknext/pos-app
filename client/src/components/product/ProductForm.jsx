import React, {useState, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import {useForm} from 'react-hook-form';
import { Card } from '@material-ui/core';
import {useParams} from 'react-router';

import * as AiIcons from 'react-icons/ai';

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


export default function UserForm() {

    const classes = useStyles();
	const params = useParams();
	const [categories, setCategories] = useState([]);
	const [productID, setProductID] = useState(params.id ? params.id : "");
	const [method, setMethod] = useState(productID ? "PUT" : "POST");
	const [singleProduct, setSingleProduct] = useState([]);


    const {register, formState : {errors}, handleSubmit, reset} = useForm({
        defaultValues: singleProduct,
    }); 
    const {ref : inputName, ...inputNameProps} = register('name', 
                {   required: "Enter the product name"  });
    const {ref: inputPrice, ...inputPriceProps} = register('price', 
                { required : "Enter the product's price", });
    const {ref : inputDescritpion, ...inputDescProps} = register('description');
    const {ref: inputCatRef, ...inputCatProps} = register('category');
    const {ref: inputFileRef, ...inputFileProps} = register('fileImage');


	useEffect(() => {
		async function getCategories() {
			let response = await fetch(`${URL}product`);
			let { data } = await response.json();
			setCategories(data.categories);
		}
		async function getSingleProduct(id) {
			let response = await fetch(`${URL}product/${id}`);
			response = await response.json();
			setSingleProduct(response.data);
			reset(response.data);
		}
		getCategories();
		getSingleProduct(productID);
	}, []);


    const onSubmit = (payload) => {
		let productURL = productID !== "" ? `${URL}product/${productID}` : `${URL}product`;
        console.log(payload);
		const formData = new FormData();
		const file = payload.fileImage;
		console.log(file);
		Object.keys(payload).map((key) => {
			return formData.append(key, payload[key]);
		});

		//formData.append("Image", file)
		

		fetch(productURL, {
			method: method,
			body: formData,
		});
	}; 

    const handleFileChange = async (e) => {
		// let asd = e.target.files[0];
		// // console.log(file);
		// const toBase64 = (file) =>
		// 	new Promise((resolve, reject) => {
		// 		const reader = new FileReader();
		// 		reader.readAsDataURL(file);
		// 		reader.onload = () => resolve(reader.result);
		// 		reader.onerror = (error) => reject(error);
		// 	});
        // let result = await toBase64(asd);
        // let newFormData = { ...formData };
        // newFormData.image = result;
        // setFormData(newFormData);
    };

    

    return (
        <Container component="main" maxWidth="lg">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5" align="left">
					Product Form
				</Typography>
				<Card>
					<form
						className={classes.form}
						onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="name"
									variant="outlined"
									inputRef = {inputName}
									{...inputNameProps}
									fullWidth
									id="name"
									label="Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									inputRef = {inputPrice}
									{...inputPriceProps}
									fullWidth
									id="price"
									label="Price"
									name="price"
									autoComplete="price"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									multiline
									rowsMax={4}
									variant="outlined"
									inputRef = {inputDescritpion}
									{...inputDescProps}
									fullWidth
									id="description"
									label="Description"
									placeholder="Product Description"
									name="description"
								/>
							</Grid>
							<Grid item xs={12}>
								<Select
									style={{ width: "100%" }}
									native
									labelId="demo-simple-select-filled-label"
									inputRef = {inputCatRef}
									{...inputCatProps}
									name="category"
									id="demo-simple-select-filled"
									value={inputCatRef.value}>
									{categories &&
										categories.map((category) => (
											<option key={category._id} value={category._id}>
												{category.name}
											</option>                                        
										))}
								</Select>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="caption">Images</Typography>
								<input
									name="file"
									style={{ display: "none" }}
									accept="image/*"
									inputRef = {inputFileRef}
									{...inputFileProps}
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
				</Card>
			</div>
		</Container>
    )
}
