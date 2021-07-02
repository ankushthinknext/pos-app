import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { TableFooter } from '@material-ui/core';

const useStyles = makeStyles({});
export default function CartItems({cartItems, handleCartCounter, settings}) {
    const classes = useStyles();
    console.log("seetings", settings);
    return (
        <div>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItems && cartItems.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell component="th" scope="row">
                                {product.name}
                            </TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                            <TableCell align="right">
                                <RemoveCircleOutlineIcon
                                    onClick={() => handleCartCounter(product._id, "decrement")}
                                />
                                <AddCircleOutlineIcon
                                    onClick={() => handleCartCounter(product._id, "increment")}
                                />
                            </TableCell>
                            <TableCell align="right">{product.qty}</TableCell>
                            <TableCell align="right">{product.qty * product.price}</TableCell>
                        </TableRow>
                    ))}
                    {/* {settings && settings.map(s => (
                        <TableRow>
                                <TableCell colSpan = "5">
                                Tax{":"} {s.tax} 
                                </TableCell>
                                <TableCell colSpan = "5">
                                Discount{":"} {s.discount}
                                </TableCell>
                        </TableRow>
                    ))} */}
                
                </TableBody>
                
                <TableFooter>
                
                            <TableCell colSpan = "5">
                            SubTotal{" "}
                            {cartItems.length &&
                                cartItems.reduce((total, i) => total + i.qty * i.price, 0)}
                            </TableCell>
                </TableFooter>
            </Table>
        </div>
    )
}
