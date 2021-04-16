import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import auth from "../services/auth";
import Joi from "joi-browser";

const URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	alert: {
		marginBottom: theme.spacing(1),
	},
}));

export default function Login(props) {
	const classes = useStyles();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [errors, setErrors] = useState([]);

	const schema = {
		username: Joi.string().min(8).max(20).required(),
		password: Joi.string().min(8).max(20).required(),
	};
	function browserValidate() {
		let validationResults = Joi.validate(formData, schema, {
			abortEarly: false,
		});
		console.log("browser validation results", validationResults);
		if (validationResults.error) {
			setErrors(validationResults.error.details);
			return false;
		}
		return true;
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (browserValidate()) attemptLogin();
	};

	async function attemptLogin() {
		let loginURL = `${URL}auth/login`;
		let response = await fetch(loginURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		response = await response.json();
		console.log(response);
		if (response.status === "failed") {
			if (!response.errors) setErrors([{ ...response }]);
			else setErrors(response.errors);
		} else if ((response.status = "success")) {
			setErrors([]);
			localStorage.setItem("username", response.user.username);
			localStorage.setItem("fullname", response.user.fullname);
			localStorage.setItem("token", response.token);
			props.history.push("/dashboard");
		}
	}
	console.log("errors state", errors);

	const handleChange = (e) => {
		let newFormData = { ...formData };
		newFormData[e.target.name] = e.target.value;
		setFormData(newFormData);
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					{errors &&
						errors.map((error) => (
							<Alert className={classes.alert} severity="error">
								{error.message}
							</Alert>
						))}
					<form
						onSubmit={handleSubmit}
						onChange={handleChange}
						className={classes.form}
						noValidate>
						<TextField
							error={errors.find((err) => {
								return err.path[0] === "username" ? true : false;
							})}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							autoFocus
							value={formData.username}
						
						/>
						<TextField
							error={errors.find((err) => {
								return err.path[0] === "password" ? true : false;
							})}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={formData.password}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="secondary"
							className={classes.submit}>
							Sign In
						</Button>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
