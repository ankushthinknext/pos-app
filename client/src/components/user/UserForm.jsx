import React, {useState, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NativeSelect from "@material-ui/core/Select";
import {useForm} from 'react-hook-form';
import { Card } from '@material-ui/core';
import {useParams} from 'react-router';

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


export default function UserForm(props) {

	const params = useParams();
    const classes = useStyles();
	const [userID, setUserID] = useState(params.id ? params.id : "");
	const [method, setMethod] = useState(userID ? "PUT" : "POST");
	const [singleUser, setSingleUser] = useState([]);

	useEffect(() => {
		async function getSingleUser(id) {
			let response = await fetch(`${URL}user/${id}`);
			response = await response.json();
			setSingleUser(response.data);
			reset(response.data);
		}
		getSingleUser(userID);
	}, []);


    const {register, formState : {errors}, handleSubmit, reset} = useForm({
		defaultValues: singleUser,
        criteriaMode: "all",
        mode: "onChange",
        shouldFocusError: true,
        reValidateMode: "onChange"
    }); 

    const {ref : inputFullName, ...inputFNameProps} = register('fullname', 
                {   required: "Enter your full name",
                });

    const {ref: inputEmail, ...inputEmailProps} = register('email',
                {
                    required : "Email should not be empty",
					pattern: {
						value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[A-Z]{2,4}$/i,
						message : `enter a valid email`},
                });
    const {ref : inputUserName, ...inputUsrNameProps} = register('username', 
				{   required: "Enter a valid username" 
				});

    const {ref: inputPassword, ...inputPasswProps} = register('password', 
				{   required: "Enter a valid pasword"
				}
				);
    const {ref: inputRoleRef, ...inputRoleProps} = register('role');

		

    const onSubmit = async(payload) => {

		let userURL = userID !== "" ? `${URL}user/${userID}` : `${URL}user`;
		console.log(userURL);
        
			try {
				let response = await fetch(userURL, 
				{
				method: method,
				headers:{
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
				});                                                                    
		
				response = await response.json();
				let status = await response.status;
				console.log("response", response);
			
				if (status === "success") {
					console.log(response.message);
				} else if(status === 'failed'){
					alert("something went wrong");
				}
			} catch (error) {
				alert(error.message);
			}
	};


    return (
        <Container component="main" maxWidth="lg">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5" align="left">
					User Form
				</Typography>
				<Card>
					<form
						className={classes.form}
						onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="fullname"
									variant="outlined"
									inputRef = {inputFullName}
									{...inputFNameProps}
									fullWidth
									id="fullname"
									label="Fullname"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									inputRef = {inputUserName}
									{...inputUsrNameProps}
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoComplete="username"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									multiline
									rowsMax={4}
									variant="outlined"
									inputRef = {inputEmail}
									{...inputEmailProps}
									fullWidth
									id="email"
									label="Email ID"
									name="email"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									multiline
									rowsMax={4}
									variant="outlined"
									inputRef = {inputPassword}
									{...inputPasswProps}
									fullWidth
									type= "password"
									id="password"
									label="Password"
									name="password"
								/>
							</Grid>
							<Grid item xs={12}>
								<NativeSelect
									style={{ width: "100%" }}
									native
									variant = "outlined"
									labelId="demo-simple-select-filled-label"
									inputRef = {inputRoleRef}
									{...inputRoleProps}
									name="role"
									id="demo-simple-select-filled"
									value= {inputRoleRef.value}>
										<option value="Admin" key="Admin">Admin</option>
										<option value="Cashier" key="Cashier">Cashier</option>
								</NativeSelect>
							</Grid>
							<Grid style={{ textAlign: "right", borderStyle: "none" }} item xs={12}>
								<Button
									type="submit"
									size="large"
									variant="contained"
									color="primary"
									className="p-button p-button-med">
									Submit
								</Button>
							</Grid>
						</Grid>
						
					</form>
				</Card>
			</div>
		</Container>
    )
}
