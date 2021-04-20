import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as GoIcons from 'react-icons/go';


export const DataMenu =  [
    {
        title : 'Dasboard',
        path : '/dashboard',
        icon : <AiIcons.AiFillDashboard />,
        cName: 'nav-text'
    },
    {
        title : 'User',
        path : '/users',
        icon : <FaIcons.FaUserFriends />,
        cName: 'nav-text'
    },
    {
        title : 'Category',
        path : '/category',
        icon : <FaIcons.FaBuffer />,
        cName: 'nav-text'
    },
    {
        title : 'Product',
        path : '/products',
        icon : <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title : 'Transaction',
        path : '/transaction',
        icon : <AiIcons.AiOutlineTransaction />,
        cName: 'nav-text'
    },
    {
        title : 'Report',
        path : '/report',
        icon : <GoIcons.GoGraph />,
        cName: 'nav-text'
    }
]