import React , {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import queryString from "query-string";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import CartItems from "./CartItems";

const URL = process.env.REACT_APP_API_URL;


function TabPanel(props) {
    const { image, name, price, children, value, index, ...other } = props;

    return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
    >
        {value === index && (
        <Paper elevation={3} >
            <Box p={3}>
                {children}
            </Box>
        </Paper>
        )}
    </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    productContainer : {
        width : "100%",
        display : "flex",
        flexWrap : "wrap",
        overflowY : 'auto'
    },
    product : {
        width: "20%",
		marginRight: "20px",
        marginBottom : "10px",
        cursor: "pointer",
    }
    // cart : {

    // }
}));

export default function Transaction() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [allProducts, setAllProducts] = useState([]); 
    const [categories, setCategories] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [settings, setSettings] = useState([]);

    let query = {
        limit : 10,
        page : 0
    };

    query = queryString.stringify(query);

useEffect(() => {
    fetchTransactionProduct();
    getSettingData();
}, []);

async function fetchTransactionProduct(){
    let response = await(fetch(
        `${URL}product/transaction?${query}`
    ));
    response = await response.json();
    console.log(response);
    setAllProducts(response.data.all);
    setCategories(response.data.categories);
};

async function getSettingData(){
    let response = await(fetch(
        `${URL}setting`
    ));
    response = await response.json();
    console.log(response);
    setSettings(response.data);
}

const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(value);
};

const AddToCart = (id) => {
    let itemIndex = cartItems.findIndex(item => item._id === id);
    if (itemIndex === -1) {
        let selectedItem = allProducts.find(p => p._id === id);
        selectedItem.qty = 1;
        setCartItems([...cartItems, selectedItem]);
    } else {
        let newCartItems = [...cartItems];
        newCartItems.splice(itemIndex, 1);
        setCartItems(newCartItems);
    }
}

const cartCounterUpdate = (id, action) => {
    let itemIndex = cartItems.findIndex(item => item._id === id);
    let newCartItems = [...cartItems];
    if (action === "decrement") {
        console.log("decrement");
        newCartItems[itemIndex].qty--;
    } else {
        newCartItems[itemIndex].qty++;
    }
    if(newCartItems[itemIndex].qty === 0) {
        newCartItems.splice(itemIndex, 1);
    }
    setCartItems(newCartItems);
}

const showTabs = () => {
        const Tabs = [
            {
            _id : 0,
            name : "ALL"
            }
        ];
    
        {categories && categories.forEach(category => {
            Tabs.push({id:category._id, name:category.name})
        })
        }
    
        return Tabs.map((tab,i) => (
            <Tab label={tab.name} 
                key={i}
                value = {tab._id}
                {...a11yProps(i)}></Tab>
        ))
    };
    
const showProducts = () => {

    let products = [
        {
            _id : 0,
            items : allProducts
        }
    ]
    
        {categories && categories.forEach(category => {
            // console.log(category);
            products.push({_id : category._id, items : category.items});
        })};

        // console.log("products", products)

        return products.map((item, i) => (
            <TabPanel value={value} index={i}>
                <div className={classes.productContainer}>
                    {item.items.map((product, j) => (
                        <Paper elevation={2} key={j} className={classes.product}
                            onClick={ () => AddToCart(product._id)}>
                            <div>
                                <img style={{ width: "100%", objectFit: "cover" }} alt=""
                                        src={product.image}>
                                </img>
                            </div>
                            <Typography style={{ fontSize:"15px",}}>
								{product.name}
							</Typography>

							<Typography variant="body2" component="p">
								${product.price}
							</Typography>
                        </Paper>
                    ))}
                </div>
                
            </TabPanel>
        ))
    };
    

    return (
        <div className={classes.root}>

            <Grid container spacing={3}>
				<Grid item xs={7}>
                    <Paper elevation={0}>
                        <Tabs
                        
                        onChange={handleChange}
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        >

                            {showTabs()}
                        </Tabs>
                    </Paper>
                    {showProducts()}
                </Grid>
                <Grid item xs={5}>
                    <Paper elevation={3} className={classes.cart}>
                            <CartItems cartItems = {cartItems} handleCartCounter= {cartCounterUpdate} 
                                        settings = {settings}>
                            </CartItems>
                    </Paper>
                </Grid>
            </Grid>

        </div>
    );
}
