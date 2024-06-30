import React from 'react'
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
    const shippingAddress = useSelector(selectShippingAddress)
    const paymentMethod= useSelector(selectPaymentMethod)
    const products = useSelector(selectCart);
    
    return (
        <Layout>
            <Stepper activeStep={3} />
                <div className={classes.container}>
                    <div className={classes.items}>
                        <Card title="Shipping Address">
                            <div>Fullname : {shippingAddress!==null && shippingAddress.fullname}</div>
                            <div>Address : {shippingAddress!==null && shippingAddress.address}</div>
                            <div>City : {shippingAddress!==null && shippingAddress.city}</div>
                            <div>Postal Code : {shippingAddress!==null && shippingAddress.pcode}</div>
                            <div>Country : {shippingAddress!==null && shippingAddress.country}</div>
                        </Card>
                        <Card title="Payment Method">
                            Payment Method: {paymentMethod}
                        </Card>
                        <Card title="Shopping bag">
                            {products.map((cartItem,index)=><CartItem key={index} item={cartItem} />)}
                        </Card>
                    </div>
                    <div className={classes.summary}>
                        <Summary />
                    </div>
                </div>
        </Layout>
    )
}

export default Order
