import React,{useEffect,useState} from 'react'
import Card from '../components/Card'
import Layout from '../components/Layout'
import Stepper from '../components/Stepper'
import Summary from '../components/Summary'
import classes from '../styles/Payment.module.scss'
import { useDispatch,useSelector } from 'react-redux'
import {selectShippingAddress,selectPaymentMethod} from '../redux/features/checkoutSlice'
import {addItem,selectNbrItems,selectCart,selectTotal} from '../redux/features/cartSlice'
import CartItem from '../components/CartItem'
const Order = () => {
    // Get the shipping address from redux "checkoutSlice"
    const shippingAddress = useSelector(selectShippingAddress)
    // Get the payment method from redux "checkoutSlice"
    const paymentMethod= useSelector(selectPaymentMethod)
    // Get the products from cart (from redux "cartSlice")
    const products = useSelector(selectCart);
    useEffect(() => {
        document.title = "Order - FitVerse"

    }, [])
    return (
        <Layout>
            {/* This is the fourth step */}
            {/* In this page, user will pay the order using the chosen payment method */}
            <Stepper activeStep={3} />
                <div className={classes.container}>
                    <div className={classes.items}>
                        {/* Display the shipping address */}
                        <Card title="Shipping Address">
                            <div>Fullname : {shippingAddress!==null && shippingAddress.fullname}</div>
                            <div>Address : {shippingAddress!==null && shippingAddress.address}</div>
                            <div>City : {shippingAddress!==null && shippingAddress.city}</div>
                            <div>Postal Code : {shippingAddress!==null && shippingAddress.pcode}</div>
                            <div>Country : {shippingAddress!==null && shippingAddress.country}</div>
                        </Card>
                        {/* Display the chosen payment method */}
                        <Card title="Payment Method">
                            Payment Method: {paymentMethod}
                        </Card>
                        {/* Display the ordered products */}
                        <Card title="Shopping bag">
                            {products.map((cartItem,index)=><CartItem key={index} item={cartItem} />)}
                        </Card>
                    </div>
                    <div className={classes.summary}>
                        {/* The prices will be recalculated and the paypal button will be displayed in the "Summary" component */}
                        <Summary />
                    </div>
                </div>
        </Layout>
    )
}

export default Order
