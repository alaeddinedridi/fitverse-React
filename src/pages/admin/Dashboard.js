import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'

import AdminLayout from '../../components/AdminLayout'

const Dashboard = (props) => {
 

    return (
        <AdminLayout>
            <div>Number of products</div>
            <div>Number of Orders</div>
            <div>Number of Users</div>
        </AdminLayout>
    )
}

export default Dashboard
