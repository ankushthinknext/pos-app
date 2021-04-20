import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import _ from 'lodash/fp';

const URL = process.env.REACT_APP_API_URL;


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  console.log("props", props);
  const classes = useStyles();
  const {register, formState : {errors}, handleSubmit} = useForm({
    criteriaMode: "all",
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange"
  }); 
  
  //to register input field
  const {ref : inputEmailRef, ...inputEmailProps} = register('username', 
                {   required: "Enter your username" 
                }
                );

  const {ref: inputPasswRef, ...inputPasswProps} = register('password', 
  {
    required : "Enter your password ",
  })


  
  const onSubmit = async (payload) => {
    
    try {
      let loginURL = `${URL}auth/login`;
      let response = await fetch(loginURL, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });                                                                    

      let status = await response.status;
      response = await response.json;
      console.log("response", response);

      if (status === 200) {
        console.log(response.message);
        localStorage.setItem("username", response.username);
		localStorage.setItem("fullname", response.fullname);
		localStorage.setItem("token", response.token);
		props.history.push("/dashboard");
      } else if(status === 'failed'){
        alert("something went wrong");
      }
    } catch (error) {
      alert(error.message);
    }
  }


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
          <form className={classes.form} noValidate 
                onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef = {inputEmailRef}
              {...inputEmailProps}
              fullWidth
              id="username"
              label="Username"
              autoComplete="email"
              autoFocus
            />
            <ErrorMessage errors= {errors} name="username"
            	render = {({ messages }) => {console.log("messages", messages);
                    return messages 
                    ? _.entries(messages).map(([type, message]) =>
                    (<Alert severity="error">{message}</Alert>)
                ) : null;
                }}>
            </ErrorMessage>
                        
            <TextField
            	variant="outlined"
              	margin="normal"
              	inputRef = {inputPasswRef}
              	{...inputPasswProps}
              	fullWidth
              	label="Password"
              	type="password"
              	id="password"
              	autoComplete="current-password"
            />
            
            {errors?.password? <Alert severity="error">{errors.password.message}</Alert> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
