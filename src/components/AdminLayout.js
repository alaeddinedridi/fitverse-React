import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'

import classes from '../styles/AdminLayout.module.scss'
import Layout from './Layout'
import { Link,useNavigate } from 'react-router-dom'
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";





const AdminLayout = (props) => {
    
    const [showSidebar,setShowSidebar] = useState(false)

    const toggleSidebar=()=>{
        setShowSidebar(!showSidebar)
    }

    return (
        <Layout>
            <div className={classes.container}>
                <div className={classes.sidebar_toggler} onClick={toggleSidebar}>{showSidebar ? "Hide":"Show"} Sidebar <div>
                    {showSidebar? <MdKeyboardDoubleArrowUp /> : <MdKeyboardDoubleArrowDown />}
                    </div></div>
                <div className={showSidebar ? `${classes.container__left} ${classes.show_sidebar}` :`${classes.container__left} ${classes.hide_sidebar}`}>
                    <Link style={{ textDecoration: 'none',color:'white' }} to={"/admin/dashboard"}><div className={classes.element}>Dashboard</div></Link>
                    <Link style={{ textDecoration: 'none',color:'white' }} to={"/admin/products"}><div className={classes.element}>Products</div></Link>
                    <Link style={{ textDecoration: 'none',color:'white' }} to={"/admin/product-upload"}><div className={classes.element}>Add product</div></Link>
                    <Link style={{ textDecoration: 'none',color:'white' }} to={"/admin/orders"}><div className={classes.element}>Orders</div></Link>
                    <Link style={{ textDecoration: 'none',color:'white' }} to={"/admin/users"}><div className={classes.element}>Users</div></Link>
                    
                </div>
                <div className={classes.container__grid}>
                    {props.children}
                </div>
          
            </div> 
        </Layout>
       
    )
}

export default AdminLayout
