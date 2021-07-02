import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as GoIcons from 'react-icons/go';
import User from '../user/User';
import UserForm from '../user/UserForm';
import Category from '../category/Category';
import CategoryForm from '../category/CategoryForm';
import Product from '../product/Product';
import ProductForm from '../product/ProductForm';
import Transaction from '../transaction/Transaction';
import Report from '../report/Report';
import Dashboard from '../dashboard/Dashboard';



export const DataMenu =  [
    {
        title : 'Dasboard',
        path : '/admin/dashboard',
        component: Dashboard,
        icon : <AiIcons.AiFillDashboard />,
        cName : "navText"
    },   

    {
        title : 'User',
        path : '/admin/user',
        children: ['/admin/user/create', '/admin/user/update'],
        component: User,
        icon : <FaIcons.FaUserFriends />,
        role : "Admin",
        cName : "navText"
        
    },

    {
        name: 'Create User',
        child: true,
        path: '/admin/user/create',
        component: UserForm,
    },

    {
        name: 'Update User',
        child: true,
        path: '/admin/user/update/:id',
        component: UserForm,
    },

    {
        title : 'Category',
        path : '/admin/category',
        children: ['/admin/category/create', '/admin/category/update'],
        component: Category,
        role: "Admin",
        icon : <FaIcons.FaBuffer />,
        cName : "navText"
        
    },

    {
        name: 'Create Category',
        child: true,
        path: '/admin/category/create',
        component: CategoryForm,
    },

    {
        name: 'Update Category',
        child: true,
        path: '/admin/category/update/:id',
        component: CategoryForm,
    },

    {
        title : 'Product',
        path : '/admin/product',
        icon : <FaIcons.FaCartPlus />,
        children: ['/admin/product/create', '/admin/product/update'],
        component: Product,
        cName : "navText"
        
    },

    {
        name: 'Create Product',
        child: true,
        path: '/admin/product/create',
        component: ProductForm,
    },

    {
        name: 'Update Product',
        child: true,
        path: '/admin/product/update/:id',
        component: ProductForm,
    },

    {
        title : 'Transaction',
        path : '/admin/transaction',
        component: Transaction,
        icon : <AiIcons.AiOutlineTransaction />,
        cName : "navText"
        
    },
    {
        title : 'Report',
        path : '/admin/report',
        component : Report,
        role: "Admin",
        icon : <GoIcons.GoGraph />,
        cName : "navText"
        
    }
]