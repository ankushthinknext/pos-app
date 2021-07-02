import React , {useState, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {useForm} from 'react-hook-form';
import { Card } from '@material-ui/core';
import {useParams} from 'react-router';

const URL = process.env.REACT_APP_API_URL;

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
}));

export default function CategoryForm() {

    const params = useParams();
    const classes = useStyles();
	const [categoryID, setCategoryID] = useState(params.id ? params.id : "");
	const [method, setMethod] = useState(categoryID ? "PUT" : "POST");
	const [singleCategory, setSingleCategory] = useState([]);

    useEffect(() => {
		async function getSingleCategory(id) {
			let response = await fetch(`${URL}category/${id}`);
			response = await response.json();
			setSingleCategory(response.data);
			reset(response.data);
		}
		getSingleCategory(categoryID);
	}, []);

    const {register, formState : {errors}, handleSubmit, reset} = useForm({
		defaultValues: singleCategory,
    }); 

    const {ref : inputCatgName, ...inputCatgProps} = register('name', 
                {   required: "Enter a valid category name",
    });

    const onSubmit = async(payload) => {

		let categoryURL = categoryID !== "" ? `${URL}category/${categoryID}` : `${URL}category`;
        
			try {
				let response = await fetch(categoryURL, 
				{
				method: method,
				headers:{
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
				});                                                                    
		
				response = await response.json();
				let status = await response.status;
			
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
                        Category Form
                    </Typography>
                    <Card>
                        <form
                            className={classes.form}
                            onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="name"
                                        name="name"
                                        variant="outlined"
                                        inputRef = {inputCatgName}
                                        {...inputCatgProps}
                                        fullWidth
                                        id="name"
                                        label="name"
                                        autoFocus
                                    />
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
