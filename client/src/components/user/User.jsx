import React , {useState, useEffect} from 'react';
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import IconButton from '@material-ui/core/IconButton';

import {Link} from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import { blue} from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 650,
	},
    snack: {
        backgroundColor: blue,
    },
    button: {
        margin: theme.spacing(1),
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});




export default function User(props) {
    console.log(props);

    const classes = useStyles();

    const URL = process.env.REACT_APP_API_URL;

    let query = {
        sort : 'Newest',
        limit : 20,
        role : 'all',
        page : 0
    };

    query = queryString.stringify(query);

    const [openDialog, setOpenDialog] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedID, setSelectedID] = useState("");



    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers(){
        let response = await(fetch(
            `${URL}user?${query}`
        ));
        response = await response.json();
        console.log("getUser", response);
        setUsers(response.data.users);
        
    }

    const confirmDelete = (id) => {
        setSelectedID(id);
        setOpenDialog(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDialog(false);
        setOpenToast(false);
        setSelectedID("");
    }

    const handleDelete = async() => {
        let response = await(fetch(
            `${URL}user/${selectedID}`,
            {
                method : "DELETE",
            }
        ));
        response = await response.json();
        
        if (response.status === "success") {
            setOpenToast(true);
        }
        setOpenDialog(false);
        setSelectedID("");
        getUsers();
    }


    return (
        <div>
            
            <Container maxWidth="lg">
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>}
                    onClick={() =>
                        props.history.push({ pathname: 'user/create'})}
                >
                    New Data
                </Button>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>FullName</TableCell>
								<TableCell align="left">UserName</TableCell>
								<TableCell align="right">Role</TableCell>
								<TableCell align="right">Last active</TableCell>
								<TableCell align="right"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users &&
								users.map((user) => (
									<TableRow key={user._id}>
										<TableCell align="left">{user.fullname}</TableCell>
										<TableCell align="left">{user.username}</TableCell>
										<TableCell align="right">
											<Chip
												label={user.role}
												color = {
                                                    user.role === "Admin" ? "secondary" : "primary"
                                                }
												variant="outlined"
											/>
										</TableCell>
                                        <TableCell align="right">
														{moment(user.lastactive).format("LLL")}	
										</TableCell>
										<TableCell align="right">
                                            {/* <Link to={`/admin/user/update/${user._id}`}>
                                                <FaIcons.FaEdit />
											</Link> */}
                                            <IconButton color="primary" onClick={() => props.history.push({
                                                    pathname: 'user/update/' + user._id })}>
                                                <FaIcons.FaEdit />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => confirmDelete(user._id)}>
                                                <FaIcons.FaTrash />
                                            </IconButton>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>

            <Dialog
				open={openDialog}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">
					{"Do you want to Delete this?"}
				</DialogTitle>
				<DialogContent></DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleDelete} color="secondary">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
            <Snackbar open={openToast} autoHideDuration={2000} onClose={handleClose} className="snack">
                <Alert onClose={handleClose} severity="success" color="success">
                    User removed successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}




