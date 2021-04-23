import React from "react";
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

export default function Product() {
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="lg">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Product Form
				</Typography>
				<form className={classes.form} noValidate>
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
							/>
						</Grid>
						<Grid item xs={12}>
							<Select
								style={{ width: "100%" }}
								labelId="demo-simple-select-filled-label"
								id="demo-simple-select-filled"
								value="">
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12}>
							<input
								style={{ display: "none" }}
								accept="image/*"
								className={classes.input}
								id="contained-button-file"
								multiple
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
