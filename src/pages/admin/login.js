import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'
import Product from '../../components/Product'
import classes from '../../styles/AdminLogin.module.scss'
import { selectUser } from '../../redux/features/authSlice'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import { useSelector,useDispatch } from 'react-redux'
import Login from '../../components/Login'
import Layout from '../../components/Layout'
const Orders = (props) => {
    const [orders, setorders] = useState([])
    const user = useSelector(selectUser)
    
    useEffect(() => {
        document.title = "Admin Login - FitVerse"
    }, [])

    return (
            <Layout>
               <div className={classes.wrapper}>
                    <Login />

               </div>
                   
            </Layout>
    
    )
}

export default Orders