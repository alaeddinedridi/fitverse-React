import React,{useEffect,useState} from 'react'
import CartItem from '../components/CartItem'
import Layout from '../components/Layout'
import Summary from '../components/Summary'
import classes from '../styles/Cart.module.scss'
import { useDispatch,useSelector } from 'react-redux'
import {addItem,selectNbrItems,selectCart,selectTotal} from '../redux/features/cartSlice'
import { Link } from 'react-router-dom'
const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectCart);
    const nbrCartItems = useSelector(selectNbrItems);

    useEffect(() => {
        document.title = "Cart - FitVerse"

    }, [])

    return (
        <Layout>
            <div className={classes.container}>
                <div className={classes.items}>
                    {nbrCartItems > 0 ? products.map((cartItem,index)=><CartItem key={index} item={cartItem} />):
                    <div>Cart is empty. <Link to="/collections" style={{textDecoration:"none",color:"black"}}><span className={classes.link}>Go shopping</span></Link></div>}
                </div>
                <div className={classes.summary}>
                    <Summary />
                </div>
            </div>
            
        </Layout>
    )
}

export default Cart
