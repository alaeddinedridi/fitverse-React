import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'

import classes from '../styles/AdminLayout.module.scss'
import Layout from './Layout'
import { Link,useNavigate } from 'react-router-dom'


const AdminLayout = (props) => {
 

    return (
        <Layout>
            <div className={classes.container}>
                <div className={classes.container__left}>
                <div className={classes.element}><Link style={{ textDecoration: 'none',color:'white' }} to={"/admin/dashboard"}>Dashboard</Link></div>
                <div className={classes.element}>products</div>
                <div className={classes.element}><Link style={{ textDecoration: 'none',color:'white' }} to={"/admin/product-upload"}>Add product</Link></div>
                <div className={classes.element}>Orders</div>
                <div className={classes.element}>Users</div>
                    
                </div>
                <div className={classes.container__grid}>
                    {props.children}
                </div>
          
            </div> 
        </Layout>
       
    )
}

export default AdminLayout
