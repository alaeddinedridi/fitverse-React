import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'

import AdminLayout from '../../components/AdminLayout'
import classes from '../../styles/Dashboard.module.scss'
const Dashboard = (props) => {
 

    return (
        <AdminLayout>
            <div className={classes.container}>
                <div className={classes.card}>Number of products <div>152</div></div>
                <div className={classes.card}>Number of Orders <div>33</div></div>
                <div className={classes.card}>Number of Users <div>9</div></div>
                <div className={classes.card}>Daily Sales <div>$249.95</div></div>
                <div className={classes.card}>Monthly Sales <div>$2.942.32</div></div>
                <div className={classes.card}>Yearly Sales <div>$8.638.32</div></div>
            </div>
            
        </AdminLayout>
    )
}

export default Dashboard
