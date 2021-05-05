import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function Produts() {
	const classes = useStyles();
	let query = {
		sort: "Newest",
		limit: 20,
	};
	query = queryString.stringify(query);
	const URL = process.env.REACT_APP_API_URL;

	let [products, setProducts] = useState([]);
	const [open, setOpen] = useState(false);
	let [selectedId, setSelectedId] = useState("");
	useEffect(() => {
		async function getProducts() {
			let response = await fetch(`${URL}product?${query}`);
			response = await response.json();
			setProducts(response.data.products);
		}
		getProducts();
	}, []);
	const confirmDelete = (id) => {
		setSelectedId(id);
		setOpen(true);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleDelete = async () => {
		let response = await fetch(`${URL}product/${selectedId}`, {
			method: "DELETE",
		});
		response = await response.json();
		if (response.status === "success") {
			//show the toaster
		}
		setSelectedId("");
		setOpen(false);
	};
	const handleClose = () => {
		setOpen(false);
		setSelectedId("");
	};

	return (
		<div>
			<Container maxWidth="lg">
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Image</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Category</TableCell>
								<TableCell align="right"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products &&
								products.map((product) => (
									<TableRow key={product._id}>
										<TableCell>
											<img style={{ width: 50 }} src={product.image} alt="" />
										</TableCell>
										<TableCell align="left">{product.name}</TableCell>
										<TableCell align="right">{product.price}</TableCell>
										<TableCell align="right">
											<Chip
												label={product.category[0].name}
												color="secondary"
												variant="outlined"
											/>
										</TableCell>
										<TableCell align="right">
											<Link to={`product/${product._id}`}>
												<EditIcon />
											</Link>
											<DeleteIcon onClick={() => confirmDelete(product._id)} />
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
			<Dialog
				open={open}
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
					<Button onClick={handleDelete} color="danger">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Produts;
